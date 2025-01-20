import { Request, Response } from "express";
import connection from "../database";

export interface ProjectInfo {
  project_id: string;
  project_name: string;
  team_name: string;
  member_count: number;
  teacher: string;
  tags: string[];
  create_time: string;
}

function generateRandomProjects(): ProjectInfo[] {
  const projects: ProjectInfo[] = [];
  const tags = ['课程设计', '学科竞赛', '工程项目', '科研创新', '跨学科协作'];
  for (let i = 0; i < 20; i++) {
    projects.push({
      project_id: `P${Math.floor(Math.random() * 10000)}`,
      project_name: `Project ${i + 1}`,
      team_name: `Team ${Math.floor(Math.random() * 10)}`,
      member_count: Math.floor(Math.random() * 10) + 1,
      teacher: `Teacher ${Math.floor(Math.random() * 10)}`,
      tags: tags.slice(0, Math.floor(Math.random() * 5)),
      create_time: new Date().toISOString().split("T")[0],
    });
  }
  return projects;
}

const getProjects = async (req: Request, res: Response) => {
  // console.log("?????????", req.query.project_name, req.query?.isRecommend);
  if (req.query?.project_name === "") {
    if (req.query?.isRecommend === 'true') {
      const resData: ProjectInfo[] = generateRandomProjects();
      res.status(200).json(resData);
      return;
    }

    res.status(200).json([]);
    return;
  }

  res.status(200).json([
    {
      project_id: "00000001",
      project_name: "Project 1",
      team_name: "Team 1",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2021-09-01",
    },
    {
      project_id: "00000002",
      project_name: "Project 2",
      team_name: "Team 2",
      member_count: 8,
      teacher: "Julie Smith",
      tags: ["工程项目", "跨学科协作"],
      create_time: "2024-09-01",
    },
    {
      project_id: "00000003",
      project_name: "Project 3",
      team_name: "Team 3",
      member_count: 8,
      teacher: "John Doe",
      tags: ["学科竞赛", "科研创新"],
      create_time: "2024-03-01",
    },
    {
      project_id: "00000004",
      project_name: "Project 4",
      team_name: "Team 4",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2025-02-01",
    },
    {
      project_id: "00000005",
      project_name: "Project 1",
      team_name: "Team 1",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2021-09-01",
    },
    {
      project_id: "00000006",
      project_name: "Project 2",
      team_name: "Team 2",
      member_count: 8,
      teacher: "Julie Smith",
      tags: ["工程项目", "跨学科协作"],
      create_time: "2024-09-01",
    },
    {
      project_id: "00000007",
      project_name: "Project 3",
      team_name: "Team 3",
      member_count: 8,
      teacher: "John Doe",
      tags: ["学科竞赛", "科研创新"],
      create_time: "2024-03-01",
    },
    {
      project_id: "00000008",
      project_name: "Project 4",
      team_name: "Team 4",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2025-02-01",
    },
    {
      project_id: "00000009",
      project_name: "Project 1",
      team_name: "Team 1",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2021-09-01",
    },
    {
      project_id: "00000010",
      project_name: "Project 2",
      team_name: "Team 2",
      member_count: 8,
      teacher: "Julie Smith",
      tags: ["工程项目", "跨学科协作"],
      create_time: "2024-09-01",
    },
    {
      project_id: "00000011",
      project_name: "Project 3",
      team_name: "Team 3",
      member_count: 8,
      teacher: "John Doe",
      tags: ["学科竞赛", "科研创新"],
      create_time: "2024-03-01",
    },
    {
      project_id: "00000012",
      project_name: "Project 4",
      team_name: "Team 4",
      member_count: 3,
      teacher: "John Doe",
      tags: ["课程设计", "工程项目", "跨学科协作"],
      create_time: "2025-02-01",
    },
  ]);
};

export default getProjects;
