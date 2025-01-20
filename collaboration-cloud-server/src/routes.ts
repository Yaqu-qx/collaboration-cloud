import { login } from "./controllers/login";
import getProjects from "./controllers/getProjects";

export const attachPublicRoutes = (app: any): void => {
  // app.get('/', (req:any, res: any) => { res.send('Welcome to the Express server!'); });
  app.get("/login", login);
  app.get("/projects", getProjects);
};
