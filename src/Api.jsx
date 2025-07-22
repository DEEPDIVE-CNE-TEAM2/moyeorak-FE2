import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// Access Token 저장 및 가져오기 헬퍼 함수
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : null;
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 모든 요청에 accessToken 자동 포함
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 401시 토큰 재발급
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("Refresh token is missing.");

        const response = await axios.post(
          `${BASE_URL}/api/users/refresh`,
          { refreshToken },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        setAccessToken(newAccessToken);
        if (newRefreshToken) setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 로그인
export const login = async (email, password) => {
  const response = await apiClient.post('/api/users/login', { email, password });
  if (response.data.accessToken) {
    const token = response.data.accessToken.startsWith('Bearer ')
      ? response.data.accessToken.slice(7)
      : response.data.accessToken;
    setAccessToken(token);
  }
  if (response.data.refreshToken) {
    setRefreshToken(response.data.refreshToken);
  }
  return response.data;
};

// 회원가입
export const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/users/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: undefined,
    },
  });
  return response.data;
};

// 이메일 중복확인 API
export const checkEmailDuplicate = async (email) => {
  const response = await apiClient.get(`/api/users/check-email?email=${encodeURIComponent(email)}`);
  return response.data;
};

// 휴대폰 번호 중복확인 API
export const checkPhoneDuplicate = async (phone) => {
  const response = await apiClient.get(`/api/users/check-phone?phone=${encodeURIComponent(phone)}`);
  return response.data;
};

// 내 정보 조회
export const getUserInfo = async () => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

// 내 정보 수정
export const updateUserInfo = async (data) => {
  const response = await apiClient.put('/api/users/me', data);
  return response.data;
};

// 비밀번호 변경
export const changePassword = async ({ currentPassword, newPassword, confirmNewPassword }) => {
  const response = await apiClient.put('/api/users/password', {
    currentPassword, newPassword, confirmNewPassword
  });
  return response.data;
};

// 비밀번호 확인
export const verifyPassword = async (password) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${BASE_URL}/api/users/verify-password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async (password, confirmPassword) => {
  const response = await apiClient.delete('/api/users/delete', {
    data: { password, confirmPassword }
  });
  return response.data;
};

// 지역 전체 이름 리스트 조회 API
export const getRegionList = async () => {
  const response = await apiClient.get('/api/regions');
  return response.data.map(r => ({ id: r.id, name: r.name }));
};

// 지역별 시설 목록 조회 
export const getRentalFacilitiesByRegionId = async (regionId) => {
  const response = await apiClient.get(`/api/rentals/facilities/region/${regionId}`);
  return response.data;
};

// 대관신청 (GET)
export const getRentalFacilitiesByRegion = async (regionId) => {
  const response = await apiClient.get(`/api/rentals/region/${regionId}`);
  return response.data;
};

// 대관 신청 API (POST)
export const createRentalApplication = async ({
  rentalId, requestedDate, requestedStartTime, requestedEndTime, note, peopleCount
}) => {
  const response = await apiClient.post('/api/rental-applications', {
    rentalId, requestedDate, requestedStartTime, requestedEndTime, note, peopleCount
  });
  return response.data;
};

// 대관신청 상세화면
export const fetchRentalDetail = async (regionId, rentalId) => {
  const response = await axios.get(`${BASE_URL}/api/rentals/region/${regionId}/${rentalId}`);
  return response.data;
};

// 마이페이지 내 대관 신청 목록 조회
export const getMyRentalApplications = async () => {
  const response = await apiClient.get('/api/rental-applications/me');
  return response.data;
};

// 마이페이지 대관신청 취소
export const cancelRentalApplication = async (applicationId) => {
  const response = await apiClient.delete(`/api/rental-applications/${applicationId}`);
  return response.data;
};

// 마이페이지 수강신청 목록 조회
export const getMyEnrollments = async () => {
  try {
    const response = await apiClient.get('/api/enrollments/me');
    console.log('수강신청 목록 응답:', response.data);
    return response.data; 
  } catch (error) {
    console.error('내 수강신청 목록 조회 실패:', error);
    return [];
  }
};

// 마이페이지 수강신청 취소
export const cancelEnrollment = async (enrollmentId) => {
  try {
    const response = await apiClient.delete(`/api/enrollments/${enrollmentId}`);
    return response.data;
  } catch (error) {
    console.error('수강신청 취소 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 공지사항 목록 조회
export const getNoticesByRegion = async (regionId) => {
  const response = await apiClient.get(`/api/notices/region/${regionId}`);
  return response.data;
};

// 공지사항 단건 조회
export const getNoticeById = async (id) => {
  const response = await apiClient.get(`/api/notices/${id}`);
  return response.data;
};

// 수강신청 프로그램 목록 조회 API (GET)
export const getProgramsByRegion = async (regionId) => {
  try {
    const response = await apiClient.get(`/api/programs?regionId=${regionId}`);
    return response.data;
  } catch (error) {
    console.error("수강신청 프로그램 조회 실패:", error);
    return [];
  }
};

// 수강신청 상세화면
export const getProgramDetail = async (id) => {
  try {
    const response = await apiClient.get(`/api/programs/${id}`);
    return response.data;
  } catch (error) {
    console.error('프로그램 상세 조회 실패:', error);
    throw error;
  }
};

// 수강신청 API (POST)
export const enrollProgram = async (enrollmentData) => {
  const token = localStorage.getItem('accessToken'); 
  
  const response = await axios.post(
    `${BASE_URL}/api/enrollments`,
    enrollmentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
