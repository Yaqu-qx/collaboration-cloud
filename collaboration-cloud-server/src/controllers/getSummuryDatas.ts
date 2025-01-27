import { Request, Response } from 'express';

const getSummuryDatas = async (req: Request, res: Response) => {
  const query = req?.query;
//   console.log('1ok', query?.projectId);
  if (query?.projectId) {
    console.log('ok', query.projectId);
    res.status(200).json({
      message: 'Get summury data successfully',
      data: {
        taskStatus: [
          {
            type: '计划中',
            value: 27
          }, {
            type: '新创建',
            value: 25
          }, {
            type: '推进中',
            value: 18
          }, {
            type: '已停滞',
            value: 15
          }, {
            type: '已完成',
            value: 10
          },
        ],
        memberNum: 4,
        totTaskNum: 21,
        taskInfos: [
            {
                name: '张三',
                avatar: 'https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png',
                finishedNum: 8,
                taskNum: 10,
            }, {
                name: '李四',
                avatar: 'https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar3.png',
                finishedNum: 1,
                taskNum: 4,
            }, {
                name: '王二',
                avatar: 'https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png',
                finishedNum: 2,
                taskNum: 3,
            }, {
                name: '明明',
                avatar: 'https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png',
                finishedNum: 0,
                taskNum: 4,
            },

        ]
      }
    });
  }
};
export default getSummuryDatas;