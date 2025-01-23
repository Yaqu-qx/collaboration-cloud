import { Request, Response } from "express";
import connection from "../database";

export interface GroupInfo {
  group_id: string;
  group_name: string;
  member_count: number;
  main_mentor: string;
  other_mentors: string[];
  create_time: string;
  description: string;
  members: string[];
}

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
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
    {
      group_id: "00000001",
      group_name: "Group 1",
      member_count: 3,
      main_mentor: "John Doe",
      other_mentors: ["Jane Doe", "Mike Smith"],
      create_time: "2021-09-01",
      description: "这是一个xxx项目，负责人是xxx。主要研究方向是xxx。",
      members: ["Tom", "Jerry", "Alice"],
    },
  ]);
};
export default getGroups;
