const S3_BASE_URL = "https://s3-goorm-frontend.s3.ap-northeast-2.amazonaws.com";

export const getFullImageUrl = (relativePath) => {
  if (!relativePath) return "";

  // 절대 경로면 그대로 반환 (중복 방지)
  if (
    relativePath.startsWith("http://") ||
    relativePath.startsWith("https://")
  ) {
    return encodeURI(relativePath);
  }

  // 상대경로가 '/img/' 로 시작할 때는 S3_BASE_URL과 결합 (중복 슬래시 방지)
  if (relativePath.startsWith("/img/")) {
    // S3_BASE_URL 끝에 슬래시 없으면 붙임, relativePath는 그대로 붙임
    return encodeURI(`${S3_BASE_URL}${relativePath}`);
  }

  // '/' 없으면 추가
  if (!relativePath.startsWith("/")) {
    relativePath = "/" + relativePath;
  }

  return encodeURI(S3_BASE_URL + relativePath);
};
