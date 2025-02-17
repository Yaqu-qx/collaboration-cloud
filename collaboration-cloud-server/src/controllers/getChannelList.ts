import { Request, Response } from "express";


const getChannelList = (req: Request, res: Response) => {
  const userId = req.query.userId;
  const channelList = [
    {
      id: "0000000001",
      name: "项目1频道交流群",
    },
    {
      id: "0000000002",
      name: "项目2的频道",
    },
    {
      id: "0000000003",
      name: "项目3频道交流群",
    }
  ];
  res.status(200).json({message: "success", data: channelList});
};

export default getChannelList;