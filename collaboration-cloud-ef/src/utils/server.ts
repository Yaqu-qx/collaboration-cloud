// import { selectedFile, sendMessageExtraInfo } from "@/typings/api/messages";

import { selectedFile } from "@/typings/api/messages";

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
  files: selectedFile[],
  content: string
) => {
  const formData = new FormData();
  // const messageExtraInfos: sendMessageExtraInfo[] = [];
  // 添加文件
  files.forEach((iFile) => {
    const encodedName = encodeURIComponent(iFile.file.name);
    const correctedFile = new File([iFile.file], encodedName, { type: iFile.file.type });
    formData.append("files", correctedFile);
  });

  // 添加其他参数
  formData.append("channelId", channelId);
  formData.append("date", date);
  formData.append("userName", userName);
  formData.append("sendTime", sendTime.toString());
  formData.append("content", content || "");
  // formData.append('messages', JSON.stringify(messageExtraInfos));

  return fetch(`http://localhost:4000/addNewMessages`, {
    method: "POST",
    body: formData,
  });
};


export const saveCollaborateFile = async (file: File, html: string, channelId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("content", html);
  formData.append("channelId", channelId);
  return fetch(`http://localhost:4000/saveCollaborateFile`, {
    method: "POST",
    body: formData,
  })
}

export const openCollaborationFile = async (channelId: string, fileName: string) => {
  return fetch(`http://localhost:4000/openCollaborationFile?channelId=${channelId}&fileName=${fileName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }) 
}

export const openMyPlanning = async (userId: string) => {
  return fetch(`http://localhost:4000/openMyPlanning?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }) 
}

export const saveMyPlanning = async (file: File, html: string, userId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("content", html);
  formData.append("userId", userId);
  return fetch(`http://localhost:4000/saveMyPlanning`, {
    method: "POST",
    body: formData,
  }) 
}

export const deleteFiles = async (key: string) => {
  return fetch(`http://localhost:4000/deleteFiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }), 
  });
}

export const deleteFolder = async (prefix: string) => {
  return fetch(`http://localhost:4000/deleteFilefold`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefix }),
  });
}