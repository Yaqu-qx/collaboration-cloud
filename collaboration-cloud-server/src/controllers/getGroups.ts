import { Request, Response } from "express";
import connection from "../database";


const getGroups = async (req: Request, res: Response) => {
  //   const groups: GroupInfo[] = [];
  //   const result = await connection.query("SELECT * FROM groups");
  res.status(200).json([
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
    },
    {
      group_id: "00000002",
      group_name: "Group 2",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar3.png",
    },
    {
      group_id: "00000003",
      group_name: "Group 3",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar4.png",
    },
    {
      group_id: "00000004",
      group_name: "Group 4",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar5.png",
    },
    {
      group_id: "00000005",
      group_name: "Group 5",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar1.png",
    },
    {
      group_id: "00000006",
      group_name: "啦啦啦啦",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar2.png",
    },
    {
      group_id: "00000007",
      group_name: "滴答滴答",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
      group_avatar: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar/group-avatar/group_avatar3.png",
    },
  ]);
};
export default getGroups;
