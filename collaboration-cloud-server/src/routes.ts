import { login } from "./controllers/login";
import getProjects from "./controllers/getProjects";
import getGroups from "./controllers/getGroups";
import getSummuryDatas from "./controllers/getSummuryDatas";
import multer from "multer";
import filesUpLoad from "./controllers/filesUpLoad";
import getFilesInfo from "./controllers/getFilesInfo";
import filesDownload from "./controllers/filesDownload";
import fileFoldDownload from "./controllers/fileFoldDownload";
import getFilesPreview from "./controllers/filesPreview";
import getChannelList from "./controllers/getChannelList";
import getChannelInfo from "./controllers/getChannelInfo";
import getChannelMessages from "./controllers/getChannelMessages";
import addNewMessages from "./controllers/addNewMessages";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 限制10MB
  }
});

export const attachPublicRoutes = (app: any): void => {
  // app.get('/', (req:any, res: any) => { res.send('Welcome to the Express server!'); });
  app.get("/login", login);
  app.get("/projects", getProjects);
  app.get("/groups", getGroups)
  app.get("/details/projectSummery", getSummuryDatas);
  app.post("/filesUpLoad",  upload.single('file'), filesUpLoad);

  app.get("/files", getFilesInfo);
  app.get("/filesDownload", filesDownload);
  app.get("/fileFoldDownload", fileFoldDownload);
  app.get("/getFilesPreview", getFilesPreview);

  app.get("/getChannelList", getChannelList);
  app.get("/getChannelInfo/:channelId", getChannelInfo);
  app.get("/getChannelMessages/:channelId", getChannelMessages);

  app.post("/addNewMessages", upload.array('files'), addNewMessages);
};
