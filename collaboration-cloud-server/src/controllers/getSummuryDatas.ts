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
            value: 1,
          },
          {
            type: "进行中",
            value: 4,
          },
          {
            type: "已停滞",
            value: 5,
          },
          {
            type: "延期中",
            value: 7,
          },
          {
            type: "已完成",
            value: 13,
          },
        ],
        memberNum: 4,
        totTaskNum: 30,
        taskInfos: [
          {
            name: "张三",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
            finishedNum: 8,
            taskNum: 9,
          },
          {
            name: "李四",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar4.png",
            finishedNum: 4,
            taskNum: 8,
          },
          {
            name: "王二",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png",
            finishedNum: 4,
            taskNum: 6,
          },
          {
            name: "明明",
            avatar:
              "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png",
            finishedNum: 1,
            taskNum: 7,
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
