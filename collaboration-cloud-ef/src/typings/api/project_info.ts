export interface projectInfo {
  project_id: string;
  project_name: string;
  team_name: string;
  member_count: number;
  teacher: string;
  tags: string[];
  create_time: string;
  description: string;
  channelId: string;
}


export interface groupInfo {
  group_id: string;
  group_name: string;
  member_count: number;
  main_mentor: string;
  other_mentors: string[];
  create_time: string;
  description: string;
  members: string[];
  group_avatar: string;
}
