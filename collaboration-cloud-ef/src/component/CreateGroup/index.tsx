import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Button, Divider, Input, message } from "antd";
import {
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./index.scss";
import RequiredInput from "../RequiredInput";
import newItemIcon from "@/assets/newItemIcon.png";
import SelectInput from "../SelectInput";
import defaultAvater from "@/assets/defaultAvater.png";
import projectItemIcon from "@/assets/projectItemIcon.png";
import teamIcon from "@/assets/teamIcon.png";
import ImageUpload from "../ImageUpload";
import { groupInfo } from "../../typings/api/project_info";
import { generateId } from "@/utils/utils";

const { TextArea } = Input;
interface Iprops {
  onPanelVisible: (visible: boolean) => void;
  isFromNewItemPanel: boolean;
  item?: string;
  onNewGroup?: (groupName: string) => void; // 新项目创建面板入口 修改父组件的团队选择 
  onGroupCreate?: (group: groupInfo) => void; // 我的项目组页面入口 列表中增加新项目组
}

const itemsOptions = [
  { value: "1", label: "project 1", avatar: projectItemIcon },
  { value: "2", label: "project 2", avatar: projectItemIcon },
  { value: "3", label: "project 3", avatar: projectItemIcon },
];


export default function CreateGroup(props: Iprops) {
  const { onPanelVisible, item, isFromNewItemPanel, onNewGroup, onGroupCreate } = props;
  const [members, setMembers] = useState([
    { value: "1", label: "成员1", avatar: defaultAvater },
    { value: "2", label: "成员2", avatar: defaultAvater },
    { value: "3", label: "成员3", avatar: defaultAvater },
  ]); // 指导老师列表
  const [textAreaValue, setTextAreaValue] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMember] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const onTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value);
  };

  // 创建项目逻辑
  const handleProCreact = () => {
    console.log("create project");
    // todo 发送请求 创建新项目
    let hasError = false;
    console.log("???????", groupName, selectedMembers, isFromNewItemPanel);
    if (
      !groupName.trim() ||
      selectedMembers.length === 0 ||
      (!isFromNewItemPanel && selectedItems.length === 0)
    ) {
      hasError = true;
    }
    if (hasError) {
      message.error("请填写所有带星号的必填项！");
      return;
    }

    // 将团队信息传递给父组件 或更新父组件的团队列表
    onNewGroup?.(groupName);
    onGroupCreate?.({
      group_id: generateId(),
      group_name: groupName,
      member_count: selectedMembers.length,
      create_time: new Date().getDate().toString(),
      description: textAreaValue,
      members: selectedMembers,
      group_avatar: imageUrl,
    });


    message.success("新团队创建成功！");
    onPanelVisible(false);
  };

  return (
    <div className="create-panel-mask">
      <div className="create-panel">
        <div className="panel-header">
          <span className="panel-title"> 新团队</span>
          <div className="panel-btns">
            <IconButton aria-label="minus" size="small">
              <MinusOutlined />
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
              还没有团队？这里选择你的队友组建新团队，系统将自动为新团队绑定一个项目频道。
            </p>
            <p className="required-tip">
              必填字段标有星号 <span style={{ color: "red" }}>*</span>
            </p>
          </div>

          <RequiredInput
            label="团队名称"
            placeholder="请为你的团队创建一个名称"
            value={groupName}
            onInputChange={(e) => setGroupName(e.target.value)}
            width="23rem"
          />
          {/* 队员选择 */}
          <SelectInput
            value={selectedMembers}
            onChange={(value: any) => setSelectedMember(value)}
            required={true}
            label="团队成员"
            showSearch={true}
            placeholder="请选择队员"
            mode="tags"
            prefix={
              <img src={teamIcon} alt="teamIcon" className="new-item-icon" />
            }
            options={members}
            width="23rem"
            faq="创建团队后，你的队员将会收到受邀通知。此外，绑定项目的指导老师也会收到通知。"
          />

          {/* 绑定项目 */}
          {isFromNewItemPanel ? (
            <p>绑定项目: {item || ""}</p>
          ) : (
            <SelectInput
              value={selectedItems}
              onChange={(value: any) => setSelectedItems(value)}
              required={true}
              label="绑定项目"
              showSearch={true}
              placeholder="请选择现有项目"
              mode="tags"
              prefix={
                <img
                  src={newItemIcon}
                  alt="teamIcon"
                  className="new-item-icon"
                />
              }
              options={itemsOptions}
              width="23rem"
              faq="每个团队必须要绑定至少一个项目"
            />
          )}

          <Divider />

          {/**团队头像 */}
          <ImageUpload title="团队头像" faq="上传至多一张图片，若未上传系统将自动分配默认头像" imageUrl={imageUrl} onUrlChange={setImageUrl} />
          
          <div>
            <p>团队描述</p>
            <TextArea
              value={textAreaValue}
              showCount
              onChange={onTextAreaChange}
              placeholder="形容一下你的团队"
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
      </div>
    </div>
  );
}
