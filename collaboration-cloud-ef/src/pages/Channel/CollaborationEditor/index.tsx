import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "./index.scss";
import FoldUpIcon from "@/assets/foldup.png";
import FoldDownIcon from "@/assets/folddown.png";
import ToolBarModeIcon from "@/assets/toolBarMode.png";
import { SaveFilled } from "@ant-design/icons";
import { Button, Tooltip, message } from "antd";
import { saveCollaborateFile, openCollaborationFile } from "@/utils/server";

interface Props {
  channelId: string;
}

export default function CollaborationEditor(props: Props) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState("<h1 class='editor-title' placeholder='请输入标题'></h1><hr class='title-divider'/>");
  const [tabMode, setTabMode] = useState("simple");
  const [showToolbar, setShowToolbar] = useState(true);
  const { channelId } = props;
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // 新增文件选择处理函数
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 读取文件内容
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setHtml(content); // 更新编辑器内容
      setCurrentFile(file);
    };

    if (file.type === "text/html") {
      reader.readAsText(file);
    } else {
      alert("仅支持HTML文件");
    }
  };

  // 模拟 ajax 请求，异步设置 html
  // useEffect(() => {
  //   openCollaborationFile(channelId, "document.html")
  //    .then((res) => res.json())
  //    .then((res) => {
  //       console.log("文件内容", res);
  //       setHtml(res.data.content); // 更新编辑器内容
  //     })
  //    .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  const handleSave = async () => {
    try {
      // 创建文件对象
      const blob = new Blob([html], { type: "text/html" });
      const file = new File([blob], "document.html", { type: "text/html" });

      // 调用后端API
      saveCollaborateFile(file, html, channelId)
        .then((res) => res.json())
        .then((res) => {
          console.log("文件保存返回消息", res.data);
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

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div className="collab-editor">
        <img
          src={showToolbar ? FoldUpIcon : FoldDownIcon}
          alt="toggle"
          className="toggle-toolbar-icon"
          onClick={() => setShowToolbar(!showToolbar)}
        />
        {showToolbar && (
          <Tooltip
            title={tabMode === "simple" ? "展开更多工具" : "切换到简约模式"}
          >
            <img
              src={ToolBarModeIcon}
              alt="toggle"
              className="toggle-mode-icon"
              onClick={() =>
                setTabMode((prevMode) =>
                  prevMode === "simple" ? "default" : "simple"
                )
              }
            />
          </Tooltip>
        )}

        <Button
          icon={<SaveFilled />}
          className="save-button"
          onClick={handleSave}
        >
          保存
        </Button>

        {showToolbar && (
          <Toolbar
            key={tabMode}
            editor={editor}
            defaultConfig={toolbarConfig}
            mode={tabMode}
            className="editor-toolbar"
            style={{ transition: "all 0.3s ease" }}
          />
        )}
        {/*todo! // <input /> */}
        <Editor
          className="editor-content"
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
        />
      </div>
    </>
  );
}
