import { login } from "./controllers/login";
import getProjects from "./controllers/getProjects";
import getGroups from "./controllers/getGroups";
import getSummuryDatas from "./controllers/getSummuryDatas";
import filesUpLoad, { upload } from "./controllers/filesUpLoad";
import getFilesInfo from "./controllers/getFilesInfo";
import filesDownload from "./controllers/filesDownload";
import fileFoldDownload from "./controllers/fileFoldDownload";

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
};
