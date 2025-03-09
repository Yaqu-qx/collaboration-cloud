import { Request, Response } from "express";
import {
  bucketName,
  region,
  cos,
} from "../utils/cosConnect";

export const deleteFilefold = async (req: Request, res: Response) => {
  const { prefix } = req.body;
  console.log('prefix', prefix);
  
  // 获取所有匹配前缀的文件
  const listParams = {
    Bucket: bucketName,
    Region: region,
    Prefix: prefix
  };

  cos.getBucket(listParams, function(listErr, listData) {
    if (listErr) return res.status(500).send("列表获取失败");
    
    const objects = listData.Contents.map(item => ({Key: item.Key}));
    
    cos.deleteMultipleObject({
      Bucket: bucketName,
      Region: region,
      Objects: objects
    }, function(err, data) {
      if (err) return res.status(500).send("删除失败");
      return res.status(200).send({"message": "删除成功", "data": data});
    });
  });
};
export default deleteFilefold;
