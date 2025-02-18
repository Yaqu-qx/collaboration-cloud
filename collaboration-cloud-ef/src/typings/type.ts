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
  channelId: string;
}

export interface personalTasksInfoType {
  member_name: string;
  member_avatar: string;
  tasks: string[];
  finished_tasks: string[];
  unfinished_tasks: string[];
}

export interface projectSummaryInfo {
  taskStatus: { status: string; num: number }[];
  memberNum: number;
  totTaskNum: number;
  taskInfos: personalTasksInfo[];
  teachers: peopleInfoType[];
  members: peopleInfoType[];
}

export type personalTasksInfo = {
  name: string;
  avatar: string;
  finishedNum: number;
  taskNum: number;
};

export type peopleInfoType = {
  name: string;
  avatar: string;
};

export interface IFileType {
  id: number;
  filename: string;
  size: number;
  creater: string;
  createrName: string;
  createTime: string;
  downloadUrl: string;
  latestModifiedTime: string;
  latestModifier: string;
}

export type IChannelState = {
  channelId?: string;
  projectId?: string;
};

export interface sendMessageInfo {
  userName: string;
  sendTime: number;
  content: string;
  isFile: boolean;
  isImage: boolean;
  isFirst: boolean;
}
