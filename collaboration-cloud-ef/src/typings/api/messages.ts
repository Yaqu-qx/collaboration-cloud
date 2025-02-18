export interface fileInfoSimple {
  id: string;
  fileUrl: string;
  size: number;
  title: string;
}

export interface MessageInfo {
  messageId: string;
  userName: string;
  userAvatar: string;
  sendTime: number;
  content: string;
  isFile: boolean;
  isImage: boolean;
  fileInfo?: fileInfoSimple;
  imageUrl?: string;
  isFirst: boolean;
}

export interface PersonalContinuousMessage {
  userName: string;
  messages: Array<MessageInfo>;
}

export interface MessageList {
  date: string;
  messages: Array<PersonalContinuousMessage>;
}

export interface sendMessageInfo {
  userName: string;
  sendTime: number;
  content: string;
  isFile: boolean;
  isImage: boolean;
  isFirst: boolean;
}
