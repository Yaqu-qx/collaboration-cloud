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
import ProjectDetailPage from "./component/ProjectDetailPage";
import { DataType } from "./typings/type";

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
          <Route path="my-projects" element={<div>我的项目组</div>} />
          <Route path="discussion-center" element={<div>交流中心</div>} />
          <Route path="personal-center" element={<div>个人中心</div>} />

          <Route path="project-detail" element={<ProjectDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
