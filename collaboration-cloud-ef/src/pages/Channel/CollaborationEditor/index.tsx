import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "./index.scss";
import FoldUpIcon from "@/assets/foldup.png";
import FoldDownIcon from "@/assets/folddown.png";
import ToolBarModeIcon from "@/assets/toolBarMode.png";
import {
  SaveFilled,
  FolderOpenOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, message, Modal } from "antd";
import { saveCollaborateFile, openCollaborationFile } from "@/utils/server";
import FileList from "./FileList";

interface Props {
  channelId: string;
  fileList: string[];
}

const defaultHtml =
  "<h1 placeholder='请输入标题'></h1><hr class='title-divider'/>";

export default function CollaborationEditor(props: Props) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState(defaultHtml);
  const [tabMode, setTabMode] = useState("simple");
  const [showToolbar, setShowToolbar] = useState(true);
  const { channelId, fileList } = props;
  const [title, setTitle] = useState("");
  const [isFileOpened, setIsFileOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showFileList, setShowFileList] = useState(false);

  const openFile = (fileName: string) => {
    openCollaborationFile(channelId, fileName + ".html")
      .then((res) => res.json())
      .then((res) => {
        console.log("文件内容", res);
        setHtml(res?.data?.content || ""); // 更新编辑器内容
        setTitle(fileName); // 更新编辑器内容
        setShowFileList(false);
        setIsFileOpened(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    scroll: true,
    EXTEND_CONF: {
      // 修复 Slate DOM 解析问题
      useCreated: true,
      // 添加空段落保护
      hoverbarKeys: {
        text: {
          menuKeys: [],
        },
      },
    },
  };

  const handleSave = async () => {
    try {
      // 创建文件对象
      const blob = new Blob([html], { type: "text/html" });
      const file = new File([blob], `${title}.html`, { type: "text/html" });

      // 调用后端API
      saveCollaborateFile(file, html, channelId)
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

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleCreateNewFile = () => {
    setIsModalOpen(false);
    setTitle(inputValue);
    setIsFileOpened(true);
    setHtml(defaultHtml);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileQuit = () => {
    handleSave()
      .then(() => {
        setIsFileOpened(false);
      })
      .catch(() => {
        console.log("文件保存失败");
        message.error("当前文件保存失败，请手动保存！");
      });
  };

  return (
    <>
      <div className="collab-editor">
        <img
          src={showToolbar ? FoldUpIcon : FoldDownIcon}
          alt="toggle"
          className="toggle-toolbar-icon"
          onClick={() => setShowToolbar(!showToolbar)}
          style={{ zIndex: 100000 }}
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
              style={{ zIndex: 100000 }}
            />
          </Tooltip>
        )}

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

        {!isFileOpened && (
          <div className="not-open-default">
            <p>还没有打开任何文件!</p>
            <div className="btns">
              <Button
                icon={<FolderOpenOutlined />}
                onClick={() => setShowFileList(true)}
              >
                打开文件
              </Button>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                新建文件
              </Button>
            </div>

            {/** 新建文件对话框 */}
            {isModalOpen && (
              <div
                className="start-modal-mask"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFileList(false);
                }}
              >
                <Modal
                  title={"新文件名"}
                  open={isModalOpen}
                  onOk={handleCreateNewFile}
                  onCancel={handleCancel}
                  okText={"创建"}
                  cancelText={"取消"}
                  getContainer={() =>
                    document.querySelector(".not-open-default")!
                  }
                  className="new-create-modal"
                  // centered
                  mask={false}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="create-input"
                    placeholder="请输入文件名"
                  />
                </Modal>
              </div>
            )}

            {/**文件列表对话框 */}
            {showFileList && (
              <div
                className="start-modal-mask"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFileList(false);
                }}
              >
                <FileList
                  fileList={fileList}
                  showHeader={true}
                  openFile={openFile}
                />
              </div>
            )}
          </div>
        )}

        <>
          <div
            className="title-container"
            style={{ display: isFileOpened ? "flex" : "none" }}
          >
            <span className="title-content">当前文件: {title}</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                icon={<SaveFilled />}
                className="save-button"
                onClick={handleSave}
              >
                保存
              </Button>
              <Tooltip title="关闭文件，系统将自动保存文件内容" zIndex={999999}>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  className="logout-button"
                  onClick={handleFileQuit}
                />
              </Tooltip>
            </div>
          </div>

          <Editor
            className="editor-content"
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ display: isFileOpened ? "block" : "none", zIndex: 100 }}
          />
        </>
      </div>
    </>
  );
}
