import COS from 'cos-nodejs-sdk-v5';
import dotenv from 'dotenv';
export const bucketName = "cc-bucket-1338630949";
export const region = "ap-shanghai";

dotenv.config();

export const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

// 生成 COS 文件下载链接
export const generatePresignedUrl = (fileName: any) => {
    return new Promise((resolve, reject) => {
      cos.getObjectUrl({
        Bucket: bucketName,
        Region: region,
        Key: fileName,
        Expires: 3600  // 链接有效时间，单位为秒
      }, (err: any, data: any) => {
        if (err) {
          return reject(err);
        }
        resolve(data.Url);
      });
    });
  };