interface TextList {
  items: string[];
}

export const SystemIntroduce = "欢迎使用协同云，协同云是一款基于云端";

export const TextListData: TextList = {
  items: [
    "欢迎使用协同云，协同云是一款基于云端",
    "欢迎使用协同云，协同云是一款基于云端",
    "欢迎使用协同云，协同云是一款基于云端",
    "欢迎使用协同云，协同云是一款基于云端"
  ]
}

export const menuTitleList = ['项目中心', '我的项目组', '交流中心', '个人中心'];

export const tagColor: {[key: string]: string} = {
  '课程设计' : 'magenta',
  '学科竞赛' : 'volcano',
  '工程项目' : 'cyan',
  '科研创新' : 'geekblue',
  '跨学科协作' : 'purple',
}

export const mainRoutes = ['/item-center', '/my-projects', '/discussion-center', '/personal-center'];
// 项目标签
export const projectTags = [
  {
    title: "课程设计",
    value: "课程设计",
    text: "课程设计",
  },
  {
    title: "学科竞赛",
    value: "学科竞赛",
    text: "学科竞赛",
  },
  {
    title: "工程项目",
    value: "工程项目",
    text: "工程项目",
  },
  {
    title: "科研创新",
    value: "科研创新",
    text: "科研创新",
  },
  {
    title: "跨学科协作",
    value: "跨学科协作",
    text: "跨学科协作",
  },
];


export const getProjectsUrl = "http://localhost:4000/projects";
export const UPLOAD_URL = "http://localhost:4000/filesUpLoad";