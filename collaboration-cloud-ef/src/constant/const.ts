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
    value: "0",
    key: "0",
  },
  {
    title: "学科竞赛",
    value: "1",
    key: "1",
  },
  {
    title: "工程项目",
    value: "2",
    key: "2",
  },
  {
    title: "科研创新",
    value: "3",
    key: "3",
  },
  {
    title: "跨学科协作",
    value: "4",
    key: "4",
  },
];
