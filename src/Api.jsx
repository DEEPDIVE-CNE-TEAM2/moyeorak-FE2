import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 'Bearer ' 접두사 제거 후 저장
export const setAccessToken = (token) => {
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  localStorage.setItem("accessToken", cleanedToken);
};

// 저장된 토큰에 'Bearer ' 붙여서 반환
export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : null;
};

// 'Bearer ' 접두사 제거 후 저장
export const setRefreshToken = (token) => {
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  localStorage.setItem("refreshToken", cleanedToken);
};

// 저장된 리프레시 토큰 반환
export const getRefreshToken = () => localStorage.getItem("refreshToken");

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 리프레시 요청은 별도 인스턴스(인터셉터 없음)로 처리 (무한 루프 방지용)
const refreshClient = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터: 모든 요청에 accessToken 자동 삽입
apiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  console.log("API 요청 헤더 Authorization:", token);
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => Promise.reject(error));

// 토큰 재발급 처리
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 응답 인터셉터: 401 발생 시 토큰 재발급 시도
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // 재발급 진행 중이면 요청 대기 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = token;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("Refresh token is missing.");

        // 리프레시 토큰으로 새 토큰 요청 (별도 axios 인스턴스 사용)
        const response = await refreshClient.post(
          `/api/users/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        if (!newAccessToken) throw new Error("New access token not provided.");

        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        const bearerToken = `Bearer ${newAccessToken}`;
        console.log("토큰 재발급 성공! 새로운 액세스 토큰:", newAccessToken);

        processQueue(null, bearerToken);

        originalRequest.headers.Authorization = bearerToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        processQueue(refreshError, null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 관리자 로그인
export const adminLogin = async (email, password) => {
  const response = await apiClient.post('/api/users/login', { email, password });

  if (response.data.accessToken) {
    let token = response.data.accessToken;
    if (token.startsWith('Bearer ')) token = token.slice(7);
    setAccessToken(token);
  }

  if (response.data.refreshToken) {
    let refresh = response.data.refreshToken;
    if (refresh.startsWith('Bearer ')) refresh = refresh.slice(7);
    setRefreshToken(refresh);
  }

  return response.data;
};

// 관리자 정보 조회
export const getAdminInfo = async () => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

// 회원 조회
export const fetchAdminUsers = async () => {
  const response = await apiClient.get('/api/admin/users');
  return response.data;
};

// 회원 상세 정보 조회
export const fetchAdminUserDetail = async (userId) => {
  const response = await apiClient.get(`/api/admin/users/${userId}`);
  return response.data;
};

// 회원 정보 수정
export const updateAdminUser = async (userId, updatedData) => {
  const response = await apiClient.put(`/api/admin/users/${userId}`, updatedData);
  return response.data;
};

// 회원 수강 이력 조회
export const getUserEnrollments = async (userId) => {
  try {
    const response = await apiClient.get(`/api/admin/users/${userId}/enrollments`);
    return response.data;
  } catch (error) {
    console.error("회원 수강 이력 조회 실패:", error);
    throw error;
  }
};

// 수강 취소
export const cancelEnrollment = async (enrollmentId) => {
  try {
    const token = getAccessToken() || "";
    const response = await axios.delete(
      `${BASE_URL}/api/admin/users/enrollments/${enrollmentId}`,
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    console.error("수강 취소 API 실패:", error);
    throw error;
  }
};

// 회원 생성
export const createUser = async (userData) => {
  const response = await apiClient.post('/api/admin/users', userData);
  return response.data;
};

// 프로그램 추가
export const createProgram = async (programData) => {
  const response = await apiClient.post('/api/admin/programs', programData);
  return response.data;
};

// 프로그램 조회
export async function fetchPrograms() {
  const token = getAccessToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = token;

  const response = await fetch(`${BASE_URL}/api/admin/programs`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API 호출 실패: ${response.status}\n${text}`);
  }

  return await response.json();
}

// 프로그램 상세 조회
export const fetchAdminProgramDetail = async (programId) => {
  const response = await apiClient.get(`/api/admin/programs/${programId}`);
  return response.data;
};

// 프로그램 수정
export const updateAdminProgram = async (programId, data) => {
  const response = await apiClient.patch(`/api/admin/programs/${programId}`, data);
  return response.data;
};

// 프로그램 삭제
export const deleteProgram = async (programId) => {
  const response = await apiClient.delete(`/api/admin/programs/${programId}`);
  return response.data;
};

// 공지사항 조회
export const getNotices = async () => {
  try {
    const response = await apiClient.get("/api/admin/notice");
    return response.data;
  } catch (error) {
    console.error("공지사항 조회 오류:", error);
    return [];
  }
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId) => {
  try {
    const response = await apiClient.get(`/api/admin/notice/${noticeId}`);
    return response.data;
  } catch (error) {
    console.error("공지사항 상세 조회 오류:", error);
    return null;
  }
};

// 공지사항 수정
export const updateNotice = async (noticeId, data) => {
  const response = await apiClient.put(`/api/admin/notice/${noticeId}`, data);
  return response.data;
};

// 공지사항 생성
export const createNotice = async (title, content) => {
  const response = await apiClient.post('/api/admin/notice', { title, content });
  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (noticeId) => {
  const response = await apiClient.delete(`/api/admin/notice/${noticeId}`);
  if (response.status === 204 || response.status === 200) {
    return true;
  }
  throw new Error("삭제 실패");
};

// 홍보물 리스트 조회
export const getPromotionImages = async () => {
  const res = await apiClient.get('/api/admin/main-img');
  return res.data;
};

// 홍보물 생성
/*
export const uploadPromotionImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post('/api/admin/main-img', formData);
  return response.data; // { imageUrl: "..." }
};
*/
export const uploadPromotionImage = async (file) => {
  const token = localStorage.getItem('accessToken');  // 토큰 키 이름 변경
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post('/api/admin/main-img', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

// 홍보물 수정
export const patchMainImage = async (payload) => {
  const response = await apiClient.patch('/api/admin/main-img', payload);
  return response.data;
};

//홍보물 삭제
export const deleteMainImage = async (id) => {
  const response = await apiClient.delete(`/api/admin/main-img/${id}`);
  return response.data;
};
