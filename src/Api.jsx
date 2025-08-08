import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// --- 토큰 저장 & 가져오기 헬퍼 함수 ---
// 'Bearer ' 접두사를 제거하고 순수한 토큰만 localStorage에 저장합니다.
export const setAccessToken = (token) => {
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  localStorage.setItem("accessToken", cleanedToken);
};

// 저장된 순수 토큰에 'Bearer '를 다시 붙여서 반환합니다.
export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : null;
};

// 'Bearer ' 접두사를 제거하고 순수한 리프레시 토큰만 저장합니다.
export const setRefreshToken = (token) => {
  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  localStorage.setItem("refreshToken", cleanedToken);
};

// 저장된 리프레시 토큰을 반환합니다.
export const getRefreshToken = () => localStorage.getItem("refreshToken");

// --- Axios 인스턴스 생성 ---
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터에서 매 요청마다 토큰 자동 삽입
apiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  //📍확인 후 삭제
  console.log("API 요청 인터셉터 - 토큰:", token);

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});



// --- 요청 인터셉터 (Request Interceptor) ---
// 모든 요청이 보내지기 전에 실행되며, AccessToken을 자동으로 헤더에 추가합니다.
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log("API 요청 헤더 Authorization:", token);
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- 응답 인터셉터 (Response Interceptor) ---
// 응답을 받기 전에 실행되며, 401 에러 발생 시 토큰 재발급을 시도합니다.
let isRefreshing = false;
let failedQueue = [];

// 토큰 재발급 성공/실패 시 대기 중인 요청들을 처리합니다.
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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도 요청이 아니며, 리프레시 토큰이 있는 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      // 이미 토큰 재발급 요청이 진행 중인 경우, 현재 요청을 대기 큐에 추가합니다.
      if (isRefreshing) {
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

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
        const response = await axios.post(
          `${BASE_URL}/api/users/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        let newAccessToken = response.data.accessToken;
        let newRefreshToken = response.data.refreshToken;

        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        const bearerToken = `Bearer ${newAccessToken}`;
        // ✅ 토큰 재발급 성공 로그 추가
        console.log("✅ 토큰 재발급 성공! 새로운 액세스 토큰:", newAccessToken);
        processQueue(null, bearerToken);

        // 원래 요청의 헤더를 새 토큰으로 업데이트하고 재시도합니다.
        originalRequest.headers.Authorization = bearerToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // ❌ 토큰 재발급 실패 로그 추가
        console.error("❌ 토큰 재발급 실패:", refreshError);
        processQueue(refreshError, null);

        // 실패 시 모든 토큰을 삭제하고 로그인 페이지로 이동시킵니다.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // 401 에러가 아니거나, 재시도할 수 없는 경우 기존 에러를 반환합니다.
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
/*
export const fetchAdminUsers = async () => {
  const response = await axios.get(`${BASE_URL}/api/admin/users`, {
    headers: {
      Authorization: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "",
    },
  });
  return response.data;
};

// 회원 상세 정보 조회
export const fetchAdminUserDetail = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/admin/users/${userId}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "",
    },
  });
  return response.data;
};
*/
export const fetchAdminUsers = async () => {
  const response = await apiClient.get('/api/admin/users');
  return response.data;
};

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
    const token = localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : "";

    const response = await axios.delete(
      `${BASE_URL}/api/admin/users/enrollments/${enrollmentId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("수강 취소 API 실패:", error);
    throw error;
  }
};

// 회원 생성
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post(
      '/api/admin/users',
      userData
    );
    return response.data;
  } catch (error) {
    console.error("회원 생성 실패:", error);
    throw error;
  }
};

// 프로그램 추가
export const createProgram = async (programData) => {
  try {
    const response = await apiClient.post('/api/admin/programs', programData);
    return response.data;
  } catch (error) {
    console.error("프로그램 등록 실패:", error);
    throw error;
  }
};

// 프로그램 조회
export async function fetchPrograms() {
  const token = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token;
  }

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
  try {
    const response = await apiClient.get(`/api/admin/programs/${programId}`);

    return response.data;
  } catch (error) {
    console.error("프로그램 상세 조회 실패:", error);
    throw error;
  }
};

// 프로그램 수정
/*
export const updateAdminProgram = async (programId, data) => {
  try {
    const response = await apiClient.put(`/api/admin/programs/${programId}`, data);
    return response.data;
  } catch (error) {
    console.error("프로그램 수정 실패:", error);
    throw error;
  }
};

export const updateAdminProgram = async (programId, data) => {
  console.log("업데이트 요청 데이터:", data);
  const token = localStorage.getItem("accessToken");
  console.log("저장된 토큰:", token);
  try {
    const response = await apiClient.put(`/api/admin/programs/${programId}`, data);
    console.log("응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로그램 수정 실패:", error.response?.status, error.response?.data);
    throw error;
  }
};*/
export const updateAdminProgram = async (programId, data) => {
  console.log("업데이트 요청 데이터:", data);
  try {
    const response = await apiClient.put(`/api/admin/programs/${programId}`, data);
    console.log("프로그램 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("프로그램 수정 실패:", error.response?.status, error.response?.data);
    throw error;
  }
};

// 프로그램 삭제
export const deleteProgram = async (programId) => {
  const token = localStorage.getItem("token"); // 또는 Recoil, Redux 등에서 가져오기

  const response = await fetch(`https://api.moyeorak.cloud/api/admin/programs/${programId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ 반드시 포함
    },
    // credentials: "include", ← 세션 기반일 때만 사용 (JWT 인증이면 보통 ❌)
  });

  if (!response.ok) {
    throw new Error("프로그램 삭제 실패");
  }

  return await response.json();
};

// 공지사항 조회
export const getNotices = async () => {
  try {
    const response = await apiClient.get("/api/admin/notice"); // apiClient 사용!
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
  try {
    // data 예: { title: "새 제목", content: "새 내용" }
    const response = await apiClient.put(`/api/admin/notice/${noticeId}`, data);
    return response.data;
  } catch (error) {
    console.error("공지사항 수정 오류:", error);
    throw error;
  }
};

// 공지사항 생성
export const createNotice = async (title, content) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/notice`, {
      title,
      content,
    });
    return response.data; // 서버에서 응답한 데이터 반환
  } catch (error) {
    console.error("공지사항 생성 실패:", error);
    throw error; // 호출한 쪽에서 처리할 수 있도록 에러 던짐
  }
};









// 홍보물 리스트 조회
export const getPromotionImages = async () => {
  try {
    const res = await apiClient.get('/api/admin/main-img');
    return res.data;
  } catch (err) {
    console.error("홍보물 리스트 조회 실패:", err);
    throw err;
  }
};

// 홍보물 생성
/*
export const uploadPromotionImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post("/api/admin/main-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // { imageUrl: "string" }
};
*/
export const uploadPromotionImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  // apiClient는 인터셉터로 자동 토큰 붙음
  // Content-Type 헤더 직접 지정하지 말고 axios에 맡기기
  const response = await apiClient.post('/api/admin/main-img', formData);

  return response.data;
};

// 홍보물 수정
export const patchMainImage = async (payload) => {
  try {
    const response = await axios.patch('/api/admin/main-img', payload);
    return response.data;
  } catch (error) {
    console.error('메인 이미지 수정 실패:', error);
    throw error;
  }
};
