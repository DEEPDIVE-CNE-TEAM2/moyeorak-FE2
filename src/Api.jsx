import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// Access Token 저장 및 가져오기 헬퍼 함수
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  // 'Bearer ' 접두사 제거
  return token.startsWith('Bearer ') ? token.slice(7) : token;
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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답에서 401 오류가 발생하면 리프레시 토큰을 이용해 재시도하는 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("Refresh token is missing.");
        }

        const accessToken = getAccessToken();

        // 리프레시 토큰으로 새 액세스 토큰 요청
        const response = await axios.post(
          `${BASE_URL}/api/users/refresh`,
          { refreshToken: refreshToken },
          {
            headers: {
              accessToken: accessToken,
            },
          }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        setAccessToken(newAccessToken);
        if (newRefreshToken) setRefreshToken(newRefreshToken);

        // 새로운 액세스 토큰으로 원래 요청 재시도
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

// 회원가입 API (Authorization 헤더 제거)
export const signup = async ({
  email,
  password,
  confirmPassword,
  name,
  regionId,
  gender,
  phone,
  birth,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/signup`,
      {
        email,
        password,
        confirmPassword,
        name,
        regionId,
        gender,
        phone,
        birth,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 에러:", error.response?.data || error.message);
    throw error;
  }
};

// 이메일 중복확인 API
export const checkEmailDuplicate = async (email) => {
  try {
    const response = await apiClient.get(`/api/users/check-email?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 휴대폰 번호 중복확인 API
export const checkPhoneDuplicate = async (phone) => {
  try {
    const response = await apiClient.get(`/api/users/check-phone?phone=${encodeURIComponent(phone)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그인 API
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/api/users/login', { email, password });

    if (response.data.accessToken) {
      // 저장 시점에서 'Bearer ' 제거 (있으면)
      const token = response.data.accessToken.startsWith('Bearer ')
        ? response.data.accessToken.slice(7)
        : response.data.accessToken;
      setAccessToken(token);
    }
    if (response.data.refreshToken) {
      setRefreshToken(response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 지역 전체 이름 리스트 조회 API
export const getRegionList = async () => {
  try {
    const response = await apiClient.get('/api/regions');
    const regionList = response.data.map(region => ({ id: region.id, name: region.name }));
    return regionList;
  } catch (error) {
    throw error;
  }
};

// 내 정보 조회
export const getUserInfo = async () => {
  try {
    // apiClient가 자동으로 Authorization 헤더를 넣음
    const response = await apiClient.get('/api/users/me');
    return response.data; // 사용자 정보 데이터
  } catch (error) {
    console.error('내 정보 조회 실패:', error);
    throw error;
  }
};

// 내 정보 수정
export const updateUserInfo = async (userData) => {
  try {
    const response = await apiClient.put('/api/users/me', userData);
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error('내 정보 수정 실패:', error);
    throw error;
  }
};

// 비밀번호 변경
export const changePassword = async ({ currentPassword, newPassword, confirmNewPassword }) => {
  try {
    const response = await apiClient.put('/api/users/password', {
      currentPassword,
      newPassword,
      confirmNewPassword
    });
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
};

// 비밀번호 확인
export const verifyPassword = async (password) => {
  try {
    const response = await apiClient.post(`/api/users/verify-password`, {
      password,
    });

    console.log("verifyPassword 응답:", response);
    console.log("verifyPassword 응답 data:", response.data);

    return response.data;
  } catch (error) {
    console.error("비밀번호 확인 실패:", error);
    throw error;
  }
};

// 회원 탈퇴
export const deleteUser = async (password, confirmPassword) => {
  try {
    const response = await apiClient.delete('/api/users/delete', {
      data: {
        password,
        confirmPassword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    throw error;
  }
};


// 대관신청 (GET)
export const getRentalFacilitiesByRegion = async (regionId) => {
  try {
    const response = await apiClient.get(`/api/rentals/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error("대관 시설 정보 가져오기 실패:", error);
    return [];
  }
};



// 대관 신청 API (POST)
export const createRentalApplication = async ({
  rentalId,
  requestedDate,
  requestedStartTime,
  requestedEndTime,
  note,
  peopleCount,
}) => {
  try {
    const response = await apiClient.post('/api/rental-applications', {
      rentalId,
      requestedDate,
      requestedStartTime,
      requestedEndTime,
      note,
      peopleCount,
    });
    return response.data;
  } catch (error) {
    console.error('대관 신청 실패:', error.response?.data || error.message);
    throw error;
  }
  
};

// 대관신청 상세화면
export const fetchRentalDetail = async (regionId, rentalId) => {
  try {
    console.log(`[DEBUG] 요청 URL: ${BASE_URL}/api/rentals/region/${regionId}/${rentalId}`);
    const response = await axios.get(`${BASE_URL}/api/rentals/region/${regionId}/${rentalId}`);
    return response.data;
  } catch (error) {
    console.error("대관 상세 API 호출 실패:", error);
    throw error;
  }
};

// 공지사항 목록 조회
export const getNoticesByRegion = async (regionId) => {
  try {
    const response = await apiClient.get(`/api/notices/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error("공지사항 정보 가져오기 실패:", error);
    return [];
  }
};

// 공지사항 단건 조회
export const getNoticeById = async (id) => {
  try {
    const response = await apiClient.get(`/api/notices/${id}`);
    return response.data;
  } catch (error) {
    console.error(`공지사항 ID ${id} 조회 실패:`, error);
    return null;
  }
};
