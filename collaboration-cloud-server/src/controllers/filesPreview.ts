import { Request, Response } from 'express';
import { cos, bucketName, region } from '../utils/cosConnect';

// 定义预览响应类型
interface PreviewResponse {
  PreviewUrl?: string;
  Error?: any;
}

// 获取在线文档预览地址（返回 Promise）
function getDocHtmlPreviewUrl(key: string): Promise<PreviewResponse> {
  return new Promise((resolve, reject) => {
    const config = {
      Bucket: bucketName,
      Region: region,
    };
    const host = `${config.Bucket}.cos.${config.Region}.myqcloud.com/${encodeURIComponent(key)}`;
    const url = `https://${host}`;

    cos.request(
      {
        Method: 'GET',
        Key: key,
        Url: url,
        RawBody: true,
        Query: {
          'ci-process': 'doc-preview', // 必须参数
          'dstType': 'html',          // 必须参数
          'weboffice_url': 1          // 需要返回预览链接
        }
      },
      (err, data) => {
        try {
          if (err) return reject(err);

          // 解析响应数据
          let body: PreviewResponse = {};
          if (data?.Body) {
            body = JSON.parse(data.Body as string);
          }
          console.log('Preview response:', body);

          // 返回标准化结果
          if (body.PreviewUrl) {
            resolve({ PreviewUrl: body.PreviewUrl });
          } else {
            reject(new Error('Failed to get preview URL'));
          }
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    );
  });
}

const getFilesPreview = async (req: Request, res: Response) => {
  const { key } = req.query;
  console.log('Preview request:', key);
  
  if (!key || typeof key !== 'string') {
    return res.status(400).json({ error: '错误的key' });
  }

  try {
    const { PreviewUrl } = await getDocHtmlPreviewUrl(key);
    res.status(200).json({ previewUrl: PreviewUrl });
  } catch (error) {
    console.error('文档预览失败:', error);
    res.status(500).json({ 
      error: 'Failed to generate preview',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default getFilesPreview;