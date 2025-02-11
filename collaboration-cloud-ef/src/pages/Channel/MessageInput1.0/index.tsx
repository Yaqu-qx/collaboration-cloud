// components/MessageInput/index.tsx
import React, { useState, useRef } from 'react';
import { Button, Input, Tooltip, Upload, Space, message } from 'antd';
import { SmileOutlined, PaperClipOutlined, PictureOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import './index.scss';

interface MessageInputProps {
  onSend: (content: string, files: File[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 处理表情选择
  const handleEmojiSelect = (emoji: any) => {
    setContent(prev => prev + emoji.emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  // 处理文件选择
  const handleFileSelect = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    if (newFiles.some(f => f.size > 50 * 1024 * 1024)) { // 限制50MB
      message.error('文件大小不能超过50MB');
      return;
    }
    setFiles(prev => [...prev, ...newFiles]);
  };

  // 发送消息
  const handleSend = () => {
    if (!content.trim() && files.length === 0) return;
    
    onSend(content, files);
    setContent('');
    setFiles([]);
  };

  return (
    <div className="message-input-container">
      {/* 文件预览区 */}
      {files.length >= 0 && (
        <div className="file-previews">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              {file.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="预览" 
                  className="image-preview"
                />
              ) : (
                <div className="file-info">
                  <PaperClipOutlined />
                  <span>{file.name}</span>
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

      {/* 输入主区域 */}
      <div className="input-area">
        <Input.TextArea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="输入消息..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* 操作按钮区 */}
        <div className="action-buttons">
          <Space>
            <Upload
              multiple
              showUploadList={false}
              beforeUpload={(_, fileList) => {
                handleFileSelect(fileList as any);
                return false; // 阻止默认上传
              }}
            >
              <Tooltip title="发送文件">
                <Button type="text" icon={<PaperClipOutlined />} />
              </Tooltip>
            </Upload>

            <Upload
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={(_, fileList) => {
                handleFileSelect(fileList as any);
                return false;
              }}
            >
              <Tooltip title="发送图片">
                <Button type="text" icon={<PictureOutlined />} />
              </Tooltip>
            </Upload>

            <Tooltip title="表情符号">
              <Button 
                type="text" 
                icon={<SmileOutlined />} 
                onClick={() => setShowEmoji(!showEmoji)}
              />
            </Tooltip>

            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              disabled={!content.trim() && files.length === 0}
            >
              发送
            </Button>
          </Space>
        </div>
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