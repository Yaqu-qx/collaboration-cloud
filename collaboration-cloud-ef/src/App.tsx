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
          <Route path="my-projects" element={<MyProjectGroup />} />
          <Route path="discussion-center" element={<div>交流中心</div>} />
          <Route path="personal-center" element={<PersonalCenter />} />

          <Route path="project-detail" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
