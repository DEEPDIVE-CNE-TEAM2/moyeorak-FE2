const S3_BASE_URL = "https://s3-goorm-frontend.s3.ap-northeast-2.amazonaws.com";

export const getFullImageUrl = (relativePath) => {
  if (!relativePath) return "";
  if (relativePath.startsWith("http")) return relativePath;
  if (!relativePath.startsWith("/")) relativePath = "/" + relativePath;
  return encodeURI(S3_BASE_URL + relativePath);
};
