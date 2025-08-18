// CloudFront CDN 도메인으로 교체
const CDN_BASE_URL = "https://www.moyeorak.cloud";

export const getFullImageUrl = (relativePath) => {
  if (!relativePath) return "";

  // 절대 경로면 그대로 반환 (중복 방지)
  if (
    relativePath.startsWith("http://") ||
    relativePath.startsWith("https://")
  ) {
    return encodeURI(relativePath);
  }

  // 상대경로가 '/img/' 로 시작할 때는 CDN_BASE_URL과 결합 (중복 슬래시 방지)
  if (relativePath.startsWith("/img/")) {
    return encodeURI(`${CDN_BASE_URL}${relativePath}`);
  }

  // '/' 없으면 추가
  if (!relativePath.startsWith("/")) {
    relativePath = "/" + relativePath;
  }

  return encodeURI(CDN_BASE_URL + relativePath);
};
