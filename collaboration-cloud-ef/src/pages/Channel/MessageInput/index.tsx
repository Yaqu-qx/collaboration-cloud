import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Tooltip,
  Upload,
  Space,
  List,
  Avatar,
  message,
} from "antd";
import {
  SmileOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import "./index.scss";
import { MessageInfo, MessageList } from "@/typings/api/messages";
import { sendMessageExtraInfo, selectedFile } from "@/typings/api/messages";
import { getUserName } from "@/utils/globalState";
import { addNewMessages } from "@/utils/server";

interface MessageInputProps {
  channelId: string;
  updateMessageList: (newMessageList: MessageList[]) => void;
  members: Array<{ id: string; name: string; avatar?: string }>; // 成员列表
}

const userName = getUserName() ?? "Yaqu";
const date = new Date().toLocaleDateString();

const MessageInput: React.FC<MessageInputProps> = (
  props: MessageInputProps
) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<selectedFile[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [mentionVisible, setMentionVisible] = useState(false);
  const [mentionPosition, setMentionPosition] = useState(0);
  const inputRef = useRef<any>(null);
  const filePreviewRef = useRef<HTMLDivElement>(null);
  const [mentionQuery, setMentionQuery] = useState("");

  const { channelId, updateMessageList, members } = props;

  // 正确获取原生textarea元素的方法
  const getTextareaElement = () => {
    return inputRef.current?.resizableTextArea?.textArea;
  };

  // 处理@按钮点击
  const handleAtButtonClick = () => {
    const textarea = getTextareaElement();
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const newContent =
      content.slice(0, startPos) + "@" + content.slice(startPos);

    setContent(newContent);
    setMentionPosition(startPos);
    setMentionQuery("");
    setMentionVisible(true);

    // 设置光标位置
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = startPos + 1;
      textarea.focus();
    }, 0);
  };

  // 改进的输入处理逻辑
  useEffect(() => {
    const textarea = getTextareaElement();
    if (!textarea) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      const value = target.value;
      setContent(value); // 确保内容同步更新

      const lastAtPos = value.lastIndexOf("@");
      if (lastAtPos > -1) {
        // 检查@符号是否在有效位置
        const isInValidPosition =
          lastAtPos === 0 ||
          value[lastAtPos - 1] === " " ||
          value[lastAtPos - 1] === "\n";

        if (isInValidPosition && !value.substring(lastAtPos).includes(" ")) {
          const query = value.slice(lastAtPos + 1);
          setMentionQuery(query);
          setMentionPosition(lastAtPos);
          setMentionVisible(true);
          return;
        }
      }
      setMentionVisible(false);
    };

    textarea.addEventListener("input", handleInput);
    return () => textarea.removeEventListener("input", handleInput);
  }, [content]);

  // 改进的提及插入逻辑
  const handleMentionSelect = (member: { id: string; name: string }) => {
    const textarea = getTextareaElement();
    if (!textarea) return;

    const insertText = `@${member.name} `;
    const newValue =
      content.slice(0, mentionPosition) +
      insertText +
      content.slice(textarea.selectionEnd);

    setContent(newValue);
    setMentionVisible(false);

    // 精确设置光标位置
    setTimeout(() => {
      const newPosition = mentionPosition + insertText.length;
      textarea.selectionStart = newPosition;
      textarea.selectionEnd = newPosition;
      textarea.focus();
    }, 0);
  };

  // 处理表情选择
  const handleEmojiSelect = (emoji: any) => {
    setContent((prev) => prev + emoji.emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  // 处理文件选择
  const handleFileSelect = (fileList: FileList, isImg: Boolean) => {
    const newFiles = Array.from(fileList);
    if (newFiles.some((f) => f.size > 50 * 1024 * 1024)) {
      // 限制50MB
      message.error("文件大小不能超过50MB");
      return;
    }
    // 带图片判断的文件列表
    const newFilesPro = newFiles.map((file) => ({
      file: file,
      isImg: isImg,
    }));
    setFiles((prev) => [...prev, ...(newFilesPro as selectedFile[])]);
  };

  // 创建消息信息
  // const createMessageExtraInfo = (): sendMessageExtraInfo[] => {
  //   let messageExtraInfos: sendMessageExtraInfo[] = [];
  //   let isFirst = true;
  //   files.map((iFile) => {
  //     if (iFile.isImg) {
  //       messageExtraInfos.push({
  //         isFile: false,
  //         isImage: true,
  //         isFirst: isFirst,
  //         file: iFile.file,
  //       })
  //     } else {
  //       messageExtraInfos.push({
  //         isFile: true,
  //         isImage: false,
  //         isFirst: isFirst,
  //         file: iFile.file,
  //       })
  //     }
  //     isFirst = false;
  //   })

  //   if(content && content.trim()) {
  //     messageExtraInfos.push({
  //       isFile: false,
  //       isImage: false,
  //       isFirst: isFirst,
  //       content: content,
  //     })
  //   }

  //   return messageExtraInfos;
  // }
  // 发送消息
  const handleSend = () => {
    if (!content.trim() && files.length === 0) return;

    const sendTime = Date.now();
    addNewMessages(
      channelId,
      date,
      userName,
      sendTime,
      files || [],
      content || ""
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('newMessage!!', res.data);
        // 更新消息列表
        updateMessageList(res.data);
        setContent("");
        setFiles([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="message-input-container">
      {/* 文件预览区 */}
      {files.length > 0 && (
        <div ref={filePreviewRef} className="file-previews">
          {files.map((iFile, index) => (
            <div key={index} className="file-item">
              {iFile.file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(iFile.file)}
                  alt="预览"
                  className="image-preview"
                />
              ) : (
                <div className="file-info">
                  <PaperClipOutlined />
                  <span>{iFile.file.name}</span>
                </div>
              )}
              <Button
                type="text"
                danger
                size="small"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
              >
                移除
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 输入框 */}
      <div className="input-container">
        <Input.TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={inputRef}
          placeholder="输入消息..."
          autoSize={{ minRows: 2, maxRows: 6 }}
        />

        {/* 改进的提及成员列表 */}
        {mentionVisible && (
          <div className="mention-list">
            <List
              dataSource={members.filter((m) =>
                m.name.toLowerCase().includes(mentionQuery.toLowerCase())
              )}
              renderItem={(member) => (
                <List.Item
                  onClick={() => handleMentionSelect(member)}
                  className="mention-item"
                >
                  <Space>
                    <Avatar
                      src={member?.avatar}
                      icon={<UserOutlined />}
                      size="small"
                    />
                    <span>{member.name}</span>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )}

        <Space className="input-actions">
          <div>
            <Tooltip title="表情符号">
              <Button
                type="text"
                icon={<SmileOutlined />}
                onClick={() => setShowEmoji(!showEmoji)}
              />
            </Tooltip>

            <Tooltip title="提及成员">
              <Button
                type="text"
                icon={
                  <AlternateEmailOutlinedIcon style={{ fontSize: "1.1rem" }} />
                }
                onClick={handleAtButtonClick}
              />
            </Tooltip>
            <Upload
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={(_, fileList) => {
                handleFileSelect(fileList as any, true);
                return false;
              }}
            >
              <Tooltip title="发送图片">
                <Button type="text" icon={<PictureOutlined />} />
              </Tooltip>
            </Upload>
            <Upload
              multiple
              showUploadList={false}
              beforeUpload={(_, fileList) => {
                handleFileSelect(fileList as any, false);
                return false;
              }}
            >
              <Tooltip title="发送文件">
                <Button type="text" icon={<PaperClipOutlined />} />
              </Tooltip>
            </Upload>
          </div>
          <Button
            type="primary"
            className="send-button"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!content.trim() && files.length === 0}
          >
            发送
          </Button>
        </Space>
      </div>

      {/* 表情选择器 */}
      {showEmoji && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
