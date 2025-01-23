export interface projectInfo {
  project_id: string;
  project_name: string;
  team_name: string;
  member_count: number;
  teacher: string;
  tags: string[];
  create_time: string;
  description: string;
}

export interface groupInfo {
  id: string;
  name: string;
  member_count: number;
  create_time: string;
  description: string;
}
