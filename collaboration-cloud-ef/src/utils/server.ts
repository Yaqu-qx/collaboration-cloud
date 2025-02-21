import { sendMessageExtraInfo } from "@/typings/api/messages";

export const fetchProjects = async (
  value: string,
  isRecommend: boolean = false
) =>
  fetch(
    `http://localhost:4000/projects?project_name=${value}&isRecommend=${isRecommend}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const fetchProjectsByTags = async (tags: string[]) =>
  fetch(`http://localhost:4000/projects?tags=${tags.join(",")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const fetchProjectsByUserName = async (username: string) =>
  fetch(`http://localhost:4000/projects?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const fetchGroups = async () =>
  fetch(`http://localhost:4000/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const fetchProjectFiles = async (projectName: string) =>
  fetch(`http://localhost:4000/files?projectName=${projectName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const downloadFiles = async (key: string) =>
  fetch(`http://localhost:4000/filesDownload?key=${key}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const downloadFileFolder = async (prefix: string) =>
  fetch(`http://localhost:4000/fileFoldDownload?prefix=${prefix}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getFilesPreview = async (key: string) =>
  fetch(`http://localhost:4000/getFilesPreview?key=${key}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getChannelList = async (userId: string) =>
  fetch(`http://localhost:4000/getChannelList?userName=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getChannelInfo = async (channelId: string) =>
  fetch(`http://localhost:4000/getChannelInfo/${channelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getChannelMessages = async (channelId: string) =>
  fetch(`http://localhost:4000/getChannelMessages/${channelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// 频道页发送消息 用户维度
// 一开始显示50条消息， 上拉更新显示更多，到顶显示已经加载全部的toast
export const addNewMessages = async (
  channelId: string,
  date: string,
  userName: string,
  sendTime: number,
  newMessagesInfo: sendMessageExtraInfo[],
) => {
  const formData = new FormData();
  
  // 添加文件
  if (files) {
    files.forEach(file => {
      formData.append('files', file);
    });
  }

  // 添加其他参数
  formData.append('data', JSON.stringify({
    channelId,
    date,
    userName,
    sendTime,
    newMessagesInfo
  }));

  return fetch(`http://localhost:4000/addNewMessages`, {
    method: "POST",
    body: formData
  });
};
