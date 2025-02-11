import { peopleInfoType } from "@/typings/type";

export interface ChannelInfo {
  channelName: string;
  channelId: string;
  projectName?: string;
  theme?: string;
  description?: string;
  members: peopleInfoType[];
  teachers: peopleInfoType[];
  messages: channelMessage[];
  createdAt: string;
  createdBy: string;
}

export interface channelMessage {
  messageId: string;
  sender: peopleInfoType;
  content?: string;
  fileUrl?: string; 
  sendTime: string;
}
