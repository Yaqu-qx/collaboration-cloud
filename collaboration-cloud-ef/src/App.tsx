import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginOrRegister";
import "./App.scss";
import ItemCenter from "./component/ItemCenter";
import ProjectDetails from "./pages/ProjectDetails";
import MyProjectGroup from "./pages/MyProjectGroup";
import PersonalCenter from "./pages/PersonalCenter";
import Channel from "./pages/Channel";
import { DataType } from "./typings/type";
import { getUserName, getUserPortrait } from "./utils/globalState";
const UserName = getUserName() || "Yaqu";
const UserPortrait =
  getUserPortrait() ||
  "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg";

function App() {
  const [projectData, setProjectData] = useState<DataType[]>([]);
  const [tagsValue, setTagsValue] = useState([] as string[]);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/** 子路由 */}
        <Route path="/Home" element={<Home />}>
          <Route path="" element={<Navigate to="item-center" />} />
          <Route
            path="item-center"
            element={
              <ItemCenter
                projectData={projectData}
                setProjectData={setProjectData}
                tagsValue={tagsValue}
                setTagsValue={setTagsValue}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            }
          />
          <Route path="my-projects" element={<MyProjectGroup />} />
          <Route path="discussion-center" element={<Channel />} />
          <Route
            path="personal-center"
            element={
              <PersonalCenter
                name={UserName}
                avatarUrl={UserPortrait}
                isOwner={true}
              />
            }
          />
          <Route path="project-detail" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
