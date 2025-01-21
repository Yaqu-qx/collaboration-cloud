import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Button, Divider, Input, message, Upload } from "antd";
import type { UploadProps } from "antd";
import {
  MinusOutlined,
  ShrinkOutlined,
  CloseOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import "./index.scss";
import RequiredInput from "../RequiredInput";
import newItemIcon from "assets/newItemIcon.png";
import teacherIcon from "assets/teacherIcon.png";
import SelectInput from "../SelectInput";
import defaultAvater from "../../assets/defaultAvater.png";
import competitionsIcon from "../../assets/competitionsIcon.png";
import curriculumDesignIcon from "../../assets/curriculumDesignIcon.png";
import InterdisciplinaryIcon from "../../assets/InterdisciplinaryIcon.png";
import projectItemIcon from "../../assets/projectItemIcon.png";
import researchIcon from "../../assets/researchIcon.png";
import teamIcon from "../../assets/teamIcon.png";
import applicationSuccessImg from "../../assets/application_success.png";
import successIcon from "../../assets/successIcon.png";
const { TextArea } = Input;
const { Dragger } = Upload;
interface Iprops {
  onPanelVisible: (visible: boolean) => void;
}

const tagOptions = [
  { value: "1", label: "课程设计", avatar: curriculumDesignIcon },
  { value: "2", label: "学科竞赛", avatar: competitionsIcon },
  { value: "3", label: "工程项目", avatar: projectItemIcon },
  { value: "4", label: "科研创新", avatar: researchIcon },
  { value: "5", label: "跨学科协作", avatar: InterdisciplinaryIcon },
];

export default function CreatePanel(props: Iprops) {
  const { onPanelVisible } = props;
  const [teachers, setTeachers] = useState([
    { value: "1", label: "Jack", avatar: defaultAvater },
    { value: "2", label: "Lucy", avatar: defaultAvater },
    { value: "3", label: "Tom", avatar: defaultAvater },
  ]); // 指导老师列表
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const onTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value);
  };

  const upLoadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    className: "upload-block",
  };

  // 创建项目逻辑
  const handleProCreact = () => {
    console.log("create project");
    // todo 发送请求 创建新项目

    setIsCreated(true);
  };

  return (
    <>
      {!isCreated ? (
        <>
          <div className="panel-header">
            <span className="panel-title"> 新项目</span>
            <div className="panel-btns">
              <IconButton aria-label="minus" size="small">
                <MinusOutlined />
              </IconButton>
              <IconButton aria-label="shrink" size="small">
                <ShrinkOutlined />
              </IconButton>
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => onPanelVisible(false)}
              >
                <CloseOutlined />
              </IconButton>
            </div>
          </div>
          {/* // 滚动 */}
          <div className="panel-body">
            <div>
              <p>
                探索与团队合作所能实现的可能性，随时在项目设置中编辑项目详细信息。
              </p>
              <p className="required-tip">
                必填字段标有星号 <span style={{ color: "red" }}>*</span>
              </p>
            </div>

            <RequiredInput
              label="项目名称"
              placeholder="请输入项目名称"
              prefix={
                <img
                  src={newItemIcon}
                  alt="newItemIcon"
                  className="new-item-icon"
                />
              }
              width="23rem"
            />
            {/* 选择指导老师 */}
            <SelectInput
              required={true}
              label="主指导老师"
              showSearch={true}
              placeholder="请选择指导老师"
              prefix={
                <img
                  src={teacherIcon}
                  alt="teacherIcon"
                  className="new-item-icon"
                />
              }
              options={teachers}
              width="23rem"
              faq="为了项目管理和任务分配的顺利进行，每个项目需指定一名指导老师，未指定则分配默认负责人。选择创建后将向指导老师发送申请，审核通过后项目方可加入。"
            />
            {/* 选择标签 */}
            <SelectInput
              required={true}
              mode="tags"
              label="Tags"
              showSearch={false}
              placeholder="请选择项目标签"
              width="23rem"
              options={tagOptions}
            />

            <SelectInput
              required={true}
              label="项目组"
              showSearch={true}
              placeholder="选择一个团队"
              prefix={
                <img
                  src={teamIcon}
                  alt="teacherIcon"
                  className="new-item-icon"
                />
              }
              options={teachers}
              width="23rem"
              faq="绑定你的团队或新建一个项目组"
            />

            <Divider style={{ borderColor: "#ccc" }} />

            <SelectInput
              required={false}
              mode="multiple"
              label="更多导师"
              showSearch={true}
              placeholder="多选指导老师"
              width="23rem"
              options={teachers}
              faq="如有多个指导老师，可在此处选择，最多可选择5人。"
            />

            <div>
              <p>创建理由</p>
              <TextArea
                showCount
                maxLength={100}
                onChange={onTextAreaChange}
                placeholder="简要说明你的申请理由"
                style={{ marginTop: "0.2rem" }}
              />
            </div>

            <div className="attachment-block">
              <p>初始附件</p>
              <Dragger {...upLoadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading private data or other banned files.
                </p>
              </Dragger>
              <p className="attachment-tip">
                项目初始文件，可上传项目相关资料，如需求文档、设计图、源代码等。
              </p>
            </div>

            <div>
              <p>项目描述</p>
              <TextArea
                showCount
                onChange={onTextAreaChange}
                placeholder="请简要介绍一下新项目"
                style={{ height: 120, resize: "none", marginTop: "0.2rem" }}
              />
            </div>
          </div>

          <div className="panel-footer">
            <Button
              type="text"
              onClick={() => onPanelVisible(false)}
              className="cancel-btn"
            >
              取消
            </Button>
            <Button
              type="primary"
              className="create-btn"
              onClick={handleProCreact}
            >
              创建
            </Button>
          </div>
        </>
      ) : (
        <div className="panel-after-create">
          <div className="panel-header-2">
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => onPanelVisible(false)}
              className="close-btn"
            >
              <CloseOutlined />
            </IconButton>
          </div>

          <img
            src={applicationSuccessImg}
            className="application-success-img"
          />
          <div className="success-tip-block">
            <img src={successIcon} className="success-icon" />
            <span className="success-tip">已向项目管理人发送申请！</span>
          </div>

          <p className="success-tip-more">
            您可以在 [消息]-{`>`}
            [我的申请]
            中查看审核进度。也可以给对应导师发送反馈信息，提醒审核任务哦~
          </p>
          <div className="panel-footer">
            <Button
              type="text"
              onClick={() => onPanelVisible(false)}
              className="detail-btn"
            >
              查看详情
            </Button>
            <Button
              type="primary"
              className="finish-btn"
              onClick={() => onPanelVisible(false)}
            >
              完成
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
