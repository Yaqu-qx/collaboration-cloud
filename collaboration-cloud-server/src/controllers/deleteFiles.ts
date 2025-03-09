import { Request, Response } from "express";
import {
  bucketName,
  region,
  cos,
} from "../utils/cosConnect";

export const deleteFiles = async (req: Request, res: Response) => {
  const { key } = req.body;
  console.log('deletekey', key);
  // 上传文件到 COS
  cos.deleteObject(
    {
      Bucket: bucketName,
      Region: region,
      Key: key,
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send("删除失败");
      } else {
        console.log(data);
        return res.status(200).send({"message": "删除成功", "data": data});
      }
    }
  );
};
export default deleteFiles;
