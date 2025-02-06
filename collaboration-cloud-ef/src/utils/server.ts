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
