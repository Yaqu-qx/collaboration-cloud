export interface fileInfoSimple {
  id: string;
  key: string;
  size: number;
  title: string;
}

export interface MessageInfo {
  messageId: string;
  userName: string;
  userAvatar: string;
  sendTime: number;
  content?: string;
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

export interface sendMessageExtraInfo {
  content?: string;
  isFile: boolean;
  isImage: boolean;
  file?: File;
}

export interface selectedFile {
  file: File;
  isImg: boolean;
}