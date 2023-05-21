export const getFormattedCreatedAt = (createdAt: string) => {
  const pastTime = new Date(createdAt).getTime();
  const presentTime = new Date().getTime();
  let result = Math.floor(Math.abs(presentTime - pastTime) / 1000);
  if (result < 60) {
    return '방금 전';
  }
  result = Math.floor(result / 60);
  if (result < 60) {
    return `${result}분 전`;
  }
  result = Math.floor(result / 60);
  if (result < 24) {
    return `${result}시간 전`;
  }
  result = Math.floor(result / 24);
  if (result < 30) {
    return `${result}일 전`;
  }
  result = Math.floor(result / 30);
  if (result < 12) {
    return `${result}개월 전`;
  }
  result = Math.floor(result / 12);
  return `${result}년 전`;
};
