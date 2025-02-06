import { Request, Response } from "express";
import { cos, bucketName, region } from "../utils/cosConnect";
import { formatDate, generateRandom } from "../utils/utils";

interface IFile {
  id: string;
  title: string;
  size?: number;
  createrAvatar: string;
  createrName: string;
  key: string;
  latestModifiedTime: string;
  latestModifier: string;
  isStarred: boolean;
  isFilefolder: boolean;
}
// todo 关系数据库 文件唯一id

// 列出指定文件夹下的所有文件和文件夹
const listObjects = (prefix: string) => {
    // console.log("prefix", prefix);
  return new Promise((resolve, reject) => {
    cos.getBucket(
      {
        Bucket: bucketName,
        Region: region,
        Prefix: prefix,
        Delimiter: "/",
      },
      (err, data) => {
        if (err) return reject(err);
        console.log("data", data);
        resolve(data);
      }
    );
  });
};

const getFilesInfo = async (req: Request, res: Response) => {
  const { projectName } = req.query; // 从查询参数中获取文件夹路径
//   console.log('projectName',projectName);
  if (!projectName) {
    return res.status(400).send("请提供项目文件夹名");
  }

  try {
    const data: any = await listObjects(projectName + "/");
    const objectsList: any[] = [];
    // 遍历返回的文件夹列表
    if (data.CommonPrefixes) {
      data.CommonPrefixes.forEach((item: any) => {
        objectsList.push({
          id: generateRandom(),
          title: item.Prefix.split("/").filter(Boolean).pop(),
          createrAvatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fpersonal-avatar%2FavatarExample.png",
          createrName: "Yaqu",
          key: item.Prefix,
          latestModifiedTime: formatDate(new Date(Date.now())),
          latestModifier: "Yaqu",
          isStarred: false,
          isFilefolder: true,
        });
      });
    }

    // 遍历返回的文件列表
    if (data.Contents) {
      data.Contents.forEach((item: any) => {
        objectsList.push({
          id: generateRandom(),
          title: item.Key.split("/").pop(),
          size: item.Size,
          createrAvatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fpersonal-avatar%2FavatarExample.png",
          createrName: "Yaqu",
          key: item.Key,
          latestModifiedTime: (item.LastModified).toString().substr(0, 10),
          latestModifier: "Yaqu",
          isStarred: false,
          isFilefolder: false,
        });
      });
    }
    console.log('objectsList',objectsList);
    res.status(200).json({message: "success", data: objectsList});
  } catch (err) {
    console.error(err);
    res.status(500).send("获取文件信息失败");
  }
};

export default getFilesInfo;
