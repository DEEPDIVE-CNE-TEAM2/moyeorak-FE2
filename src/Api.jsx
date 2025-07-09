import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;


// Access Token 저장 및 가져오기 헬퍼 함수
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
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
  address,
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
        address,
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
      setAccessToken(response.data.accessToken);
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

// 대관신청
export const getRentalFacilitiesByRegion = async (regionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/rentals/region/${regionId}`);
    return response.data;
  } catch (error) {
    console.error("대관 시설 정보 가져오기 실패:", error);
    return [];
  }
};

export const createRentalApplication = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/rental-applications`, data);
    return response.data;
  } catch (error) {
    console.error("대관 신청 실패:", error);
    throw error;
  }
};

// 대관신청 상세화면
export const fetchRentalDetail = async (regionId, rentalId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${regionId}/${rentalId}`);
    return response.data; // API가 반환하는 시설 상세 데이터
  } catch (error) {
    console.error("대관 상세 API 호출 실패:", error);
    throw error;
  }
};