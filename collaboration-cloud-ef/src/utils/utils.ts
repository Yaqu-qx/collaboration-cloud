import { time } from "console";

export const formatSize = (bytes: number): string => {
  if (bytes < 0) return " - ";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const getFileExtension = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return filename.substring(lastDotIndex + 1);
  }
  return '';
};

/**
 * 将时间戳转换为指定格式的日期字符串
 * @param timestamp 时间戳（毫秒）
 * @returns 格式化后的日期字符串
 */
export function formatTimestamp(timestamp: number): any {
  const date = new Date(timestamp);
  console.log("date", date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat('zh-CN', options);
  const formattedDate = formatter.format(date);

  // 将格式化后的日期字符串转换为所需格式
  const [year, month, day, hour, minute] = formattedDate.match(/\d+/g) || [];

  let timeFrame = '上午';
  if(Number(hour) <= 12 && Number(hour) >= 6) { 
    timeFrame = '上午';
  } else if(Number(hour) > 12 && Number(hour) <= 18) {
    timeFrame = '下午';
  } else {
    timeFrame = '晚上';
  }
  // return `${year}年${month}月${day}日 ${timeFrame} ${hour}:${minute}`;
  return ({
    date: `${year}年${month}月${day}日`,
    timeFrame: `${timeFrame}`,
    time: `${hour}:${minute}`,
  });
}