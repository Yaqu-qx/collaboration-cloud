import { Request, Response } from 'express';
import {
    bucketName,
    region,
    cos,
  } from "../utils/cosConnect";

const renameFile = async (req: Request, res: Response) => {
  const { oldKey, newName, isFolder } = req.body;
  console.log('oldKey', oldKey, 'newName', newName, 'isFolder', isFolder);
  try {
    // 处理文件名合法性校验
    if (!/^[\w\u4e00-\u9fa5\-\.]+$/.test(newName)) {
      return res.status(400).json({ success: false, message: '文件名包含非法字符' });
    }

    // 获取文件路径和扩展名
    const pathParts = oldKey.split('/');
    const oldName = pathParts.pop() || '';
    const newKey = [...pathParts, newName].join('/');

    if (isFolder) {
      // 处理文件夹重命名
      const { Contents } = await cos.getBucket({
        Bucket: bucketName,
        Region: region,
        Prefix: oldKey + '/'
      });

      if (!Contents || Contents.length === 0) {
        return res.status(404).json({ success: false, message: '文件夹不存在' });
      }

      // 批量复制并删除旧文件
      await Promise.all(Contents.map(async (object) => {
        const newObjectKey = object.Key.replace(oldKey, newKey);
        await cos.putObjectCopy({
          Bucket: bucketName,
          Region: region,
          Key: newObjectKey,
          CopySource: `/${bucketName}/${object.Key}`
        });
        await cos.deleteObject({
          Bucket: bucketName,
          Region: region,
          Key: object.Key
        });
      }));

    } else {
      // 处理文件重命名
      // 复制文件到新路径
      console.log( `${bucketName}.cos.${region}.myqcloud.com/${oldKey}`);
      await cos.putObjectCopy({
        Bucket: bucketName,
        Region: region,
        Key: newKey,
        CopySource: `${bucketName}.cos.${region}.myqcloud.com/${encodeURIComponent(oldKey)}`
      });
      
      // 删除原文件
      await cos.deleteObject({
        Bucket: bucketName,
        Region: region,
        Key: oldKey
      });
    }

    res.json({ success: true, message: '重命名成功' });
    
  } catch (error) {
    console.error('重命名失败:', error);
    res.status(500).json({ success: false, message: '重命名操作失败' });
  }
};

export default renameFile;