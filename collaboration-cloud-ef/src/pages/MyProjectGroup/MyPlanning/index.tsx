import React, { useState, useEffect } from "react";
import "./index.scss";
import { openMyPlanning, saveMyPlanning } from "@/utils/server";
import { getUserId } from "@/utils/globalState";
import { message, Button } from "antd";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { SaveFilled } from "@ant-design/icons";

const userId = getUserId() || "00000001";

type Props = {
  onClose: () => void;
};

export default function MyPlanning(props: Props) {
  const { onClose } = props;
  const [html, setHtml] = useState("");
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const handleSave = async () => {
    try {
      // 创建文件对象
      const blob = new Blob([html], { type: "text/html" });
      const file = new File([blob], `myPlanning.html`, { type: "text/html" });

      // 调用后端API
      saveMyPlanning(file, html, userId)
        .then((res) => res.json())
        .then((res) => {
          console.log("文件保存返回消息", res?.data);
          message.success("文件保存成功");
          // 将文件添加到协作文件列表
        })
        .catch((error) => {
          console.error(error);
          message.error("文件保存失败");
        });
    } catch (error) {
      console.error(error);
      message.error("文件保存失败");
    }
  };

  useEffect(() => {
    const isOpened = Boolean(localStorage.getItem('isOpenedMyPlanning') || 'false');
    if (!isOpened) {
      localStorage.setItem('isOpenedMyPlanning', 'true');
      return;
    }

    openMyPlanning(userId)
      .then((res) => res.json())
      .then((res) => {
        console.log("文件内容", res);
        const defaultContent = '<h3>在这里开始你的项目规划吧！</h3>';
        setHtml(res?.data?.content || defaultContent); // 更新编辑器内容
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMaskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) { 
      handleSave()
        .then(() => {
          message.success("保存成功");
        })
        .catch(() => {
          message.error("保存失败");
        });
      onClose();
    }
  };

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = { toolbarKeys: [
    'bold',
    'italic',
    'underline',
    'bulletedList',
    'numberedList',
    'todo',
    'emotion'
  ]};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  return (
    <div className="my-planning-mask" onClick={handleMaskClick}>
      <div className="my-planning-container">
        <div className="header">
          <span>MY PLANNING</span>
          <Button
            icon={<SaveFilled />}
            className="save-button"
            onClick={(e) => {e.stopPropagation(); handleSave();}}
          >
            保存
          </Button>
        </div>

        <Toolbar
          defaultConfig={toolbarConfig}
          editor={editor}
          mode="simple"
          className="editor-toolbar"
          style={{ transition: "all 0.3s ease" }}
        />
        <Editor
          className="editor-content"
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
        />
      </div>
    </div>
  );
}
