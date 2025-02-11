export interface MessageInfo {
  messageId: string;
  userName: string;
  userAvatar: string;
  sendTime: number;
  content: string;
  files?: Array<string>;
  images?: Array<string>;
  isFirst: boolean;
}
