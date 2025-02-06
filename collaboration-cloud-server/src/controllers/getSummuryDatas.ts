import { Request, Response } from "express";

const getSummuryDatas = async (req: Request, res: Response) => {
  const query = req?.query;
    // console.log('1ok', query?.projectId);
  if (query?.projectId) {
    // console.log("ok", query.projectId);
    res.status(200).json({
      message: "Get summury data successfully",
      data: {
        taskStatus: [
          {
            type: "计划中",
            value: 2,
          },
          {
            type: "新创建",
            value: 5,
          },
          {
            type: "推进中",
            value: 8,
          },
          {
            type: "已停滞",
            value: 5,
          },
          {
            type: "已完成",
            value: 10,
          },
        ],
        memberNum: 4,
        totTaskNum: 30,
        taskInfos: [
          {
            name: "张三",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
            finishedNum: 10,
            taskNum: 12,
          },
          {
            name: "李四",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar4.png",
            finishedNum: 3,
            taskNum: 6,
          },
          {
            name: "王二",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png",
            finishedNum: 3,
            taskNum: 4,
          },
          {
            name: "明明",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png",
            finishedNum: 1,
            taskNum: 8,
          },
        ],
        projectState: "进行中...",
        teachers: [
          {
            name: 'John',
            avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/teacher-avatar/teacher_avatar1.png",
          },
          { 
            name: 'Alice',
            avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/teacher-avatar/teacher_avatar2.png",
          },
        ],  
        members:  [
          {
            name: "张三",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
          },
          {
            name: "李四",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar4.png",
          },
          {
            name: "王二",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png",
          },
          {
            name: "明明",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png",
          },
        ],
        // mainIntro: "这是一段介绍",
        // feature: "项目特点",
        // goalsAndVision: "xxxxxx",
      },
    });
  }
};
export default getSummuryDatas;
