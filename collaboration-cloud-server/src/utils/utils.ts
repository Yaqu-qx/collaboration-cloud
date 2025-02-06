export const formatDate = (date: Date) => {
  const year = date.getFullYear().toString(); // 获取年份的后两位
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，并补全两位
  const day = date.getDate().toString().padStart(2, "0"); // 获取日期，并补全两位
  return `${year}-${month}-${day}`;
};

export const generateRandom = () => {
  const timestamp = Date.now(); // 获取当前时间戳
  const randomNum = Math.floor(Math.random() * 1e10); // 生成随机数并转换为字符串

  // 将时间戳和随机数组合并截取前10位字符
  const randomNumberString = (timestamp + randomNum).toString().slice(-11, -1);

  return randomNumberString;
};

