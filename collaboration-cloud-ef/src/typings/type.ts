import { Avatar } from "@mui/material";

export interface DataType {
  key: string;
  name: string;
  group: string;
  peopleNum: number;
  teacher: string;
  tags: string[];
  create_time: string;
  description: string;
}

export interface personalTasksInfoType {
  member_name: string;
  member_avatar: string;
  tasks: string[];
  finished_tasks: string[];
  unfinished_tasks: string[];
}

export interface projectSummaryInfo {
  taskStatus: {status: string; num: number}[];
  memberNum: number;
  totTaskNum: number;
  taskInfos: personalTasksInfo[];
}

export type personalTasksInfo = {
  name: string;
  avatar: string;
  finishedNum: number;
  taskNum: number;
};
