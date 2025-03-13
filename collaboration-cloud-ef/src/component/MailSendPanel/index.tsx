import React, { useState, useEffect } from "react";
import "./index.scss";
// 在顶部引入 message 组件
import { Modal, message, Avatar } from "antd";
import SelectInput from "@/component/SelectInput";
import type { SelectProps } from "antd";
import allMembers from "@/constant/allMembers.json";
import defaultAvater from "@/assets/defaultAvater.png";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

interface Iprops {
  isSomeOne: boolean;
  showSendPanel: boolean;
  setShowSendPanel: (showSendPanel: boolean) => void;
  toPersonName?: string;
  toPersonAvater?: string;
}

const options: SelectProps["options"] = allMembers.map((member) => ({
  ...member,
  avatar: member.avatar.trim() || defaultAvater, // 使用导入的默认头像
}));

export default function MailSendPanel(props: Iprops) {
  const {
    isSomeOne,
    showSendPanel,
    setShowSendPanel,
    toPersonName,
    toPersonAvater,
  } = props;
  const [selectMembers, setSelectMembers] = useState<string>(toPersonName ?? '');
  // 新增编辑器状态
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState("");

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入私信内容...",
    autoFocus: false,
  };

  // 组件卸载时销毁编辑器
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      "bold",
      "italic",
      "underline",
      "bulletedList",
      "numberedList",
      "todo",
      "emotion",
    ],
  };

  // 新增发送处理逻辑
  const handleSend = () => {
    if (!selectMembers.trim() && !html.trim()) {
      message.error("请填写收件人和私信内容");
      return;
    }
    if (!isSomeOne &&!selectMembers.trim()) {
      message.error("请选择收件人");
      return;
    }
    if (!html.trim()) {
      message.error("请填写私信内容");
      return;
    }

    // 这里添加实际发送逻辑（调用API等）
    message.success("私信发送成功！");
    setHtml("");
    setSelectMembers("");
  };

  // 新增时间状态
  const [currentTime, setCurrentTime] = useState<string>("");

  // 实时时钟逻辑
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = `${now.getFullYear()}年${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}月${now.getDate().toString().padStart(2, "0")}日 ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      setCurrentTime(formatted);
    };

    // 立即更新一次
    updateTime();

    // 设置定时器
    const timer = setInterval(updateTime, 1000);

    // 清除定时器
    return () => clearInterval(timer);
  }, []);

  return (
    <Modal
      open={showSendPanel}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: "20px",
          }}
        >
          <span>发私信</span>
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              fontWeight: "normal",
              marginLeft: "5px",
            }}
          >
            {currentTime}
          </span>
        </div>
      }
      onCancel={() => setShowSendPanel(false)}
      okText="发送"
      cancelText="取消"
      width={800}
      styles={{
        body: {
          height: "38rem",
          display: "flex",
          flexDirection: "column",
        },
      }}
      onOk={handleSend} // 添加发送处理
    >
      <div className="mail-divider" />
      {isSomeOne ? (
        <div className="toPeople-info-block">
          <span>收件人：</span>
          <Avatar src={toPersonAvater} style={{border:'1px solid #333'}} />
          <span>{toPersonName}</span>
        </div>
      ) : (
        <SelectInput
          value={selectMembers}
          onChange={(value: any) => setSelectMembers(value)}
          maxCount={10}
          required={false}
          label="收件人:"
          showSearch={true}
          placeholder="选择发送对象"
          width="23rem"
          options={options as any}
        />
      )}
      <p style={{ marginTop: "0.8rem" }}>请填写内容:</p>
      <div
        className="mail-editor"
        style={{ flex: 1, marginTop: "0.5rem", position: "relative" }}
      >
        <Toolbar
          defaultConfig={toolbarConfig}
          editor={editor}
          mode="simple"
          className="editor-toolbar"
          style={{
            transition: "all 0.3s ease",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#fafafa", // 添加浅色背景
          }}
        />
        <Editor
          className="editor-content"
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{
            height: "calc(100% - 40px)",
            overflowY: "auto", // 改为自动滚动
            padding: "0 16px", // 添加内边距
          }}
        />
      </div>
    </Modal>
  );
}
