import { Request, Response } from "express";
import {
  cos,
  bucketName,
  region,
  generatePresignedUrl,
} from "../utils/cosConnect";
import archiver from "archiver";
import COS = require("cos-nodejs-sdk-v5");

// const listObjects = (prefix: string): Promise<any> => {
//     return new Promise((resolve, reject) => {
//       cos.getBucket({
//         Bucket: bucketName,
//         Region: region,
//         Prefix: prefix,
//         Delimiter: '/'
//       }, (err, data) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(data.Contents);
//       });
//     });
//   };

//   // 下载文件并添加到压缩包中
//   const addFileToArchive = (archive: any, fileKey: string) => {
//     return new Promise((resolve, reject) => {
//       cos.getObject({
//         Bucket: bucketName,
//         Region: region,
//         Key: fileKey
//       }, (err, data) => {
//         if (err) {
//           return reject(err);
//         }
//         archive.append(data.Body, { name: fileKey.split('/').pop() });
//         resolve('success');
//       });
//     });
//   };

//   // 将文件夹打包成 ZIP 文件
// const zipFolder = async (prefix: string, zipFilePath: string): Promise<string> => {
//     return new Promise(async (resolve, reject) => {
//       const output = fs.createWriteStream(zipFilePath);
//       const archive = archiver('zip', {
//         zlib: { level: 9 } // 设置压缩级别
//       });

//       output.on('close', () => {
//         resolve(zipFilePath);
//       });

//       archive.on('error', (err) => {
//         reject(err);
//       });

//       archive.pipe(output);

//       const files = await listObjects(prefix);
//       for (const file of files) {
//         await addFileToArchive(archive, file.Key);
//       }

//       archive.finalize();
//     });
//   };
// 提交文件压缩任务
const postFileCompressTask = (
  prefix: string,
  zipFilekey: string
): Promise<any> => {
  const host = `${bucketName}.ci.${region}.myqcloud.com`;
  const url = `https://${host}/file_jobs`; // 确保路径正确
  const body = COS.util.json2xml({
    Request: {
      Tag: "FileCompress", // 必须
      Operation: {
        FileCompressConfig: {
          Flatten: "0",
          Format: "zip",
          Prefix: prefix, // 目录前缀
        },
        Output: {
          Bucket: bucketName, // 保存压缩后文件的存储桶
          Region: region, // 保存压缩后文件的存储桶地域
          Object: zipFilekey, // 压缩后文件的文件名
        },
      },
    },
  });

  return new Promise((resolve, reject) => {
    cos.request(
      {
        Method: "POST",
        Key: "file_jobs",
        Url: url,
        Body: body,
        ContentType: "application/xml",
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log("文件压缩任务成功:", data);
        resolve(data);
      }
    );
  });
};

const fileFoldDownload = async (req: Request, res: Response) => {
  const prefix = (req.query.prefix || "") as string;
  const zipFilekey = `zips/${prefix.replace(/\//g, "_")}.zip`;
  try {
    if (!prefix) {
      return res.status(400).json({ error: "缺少 prefix 参数" });
    }
    const result = await postFileCompressTask(prefix, zipFilekey);
    const downloadUrl = await generatePresignedUrl(zipFilekey);
    console.log("result:", result, "下载链接:", downloadUrl);
    res.status(200).json({ downloadUrl: downloadUrl });
  } catch (error) {
    console.error("文件压缩任务失败:", error);
    res.status(500).send("文件压缩任务失败");
  }
};

export default fileFoldDownload;
