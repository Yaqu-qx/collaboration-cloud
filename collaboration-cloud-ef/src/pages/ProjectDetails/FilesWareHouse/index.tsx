import React, { useState, useEffect } from "react";
import { ProList } from "@ant-design/pro-components";
import { IFile } from "@/typings/api/files";
import {
  Breadcrumb,
  Button,
  Space,
  Tooltip,
  Upload,
  Dropdown,
  message,
  Form,
  Input,
  Modal,
} from "antd";
import { IconButton } from "@mui/material";
import type { Key } from "react";
import { UPLOAD_URL, FILESVIEW_URL_PREFIX } from "@/constant/const";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DnsTwoToneIcon from "@mui/icons-material/DnsTwoTone";
import {
  FileOutlined,
  MoreOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
  FolderFilled,
  ArrowDownOutlined,
  ArrowUpOutlined,
  UploadOutlined,
  CaretRightOutlined,
  RollbackOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import defaultAvatar from "@/assets/avatarExample.png";
import "./index.scss";
import {
  fetchProjectFiles,
  downloadFiles,
  downloadFileFolder,
  getFilesPreview,
  deleteFiles,
  deleteFolder,
} from "@/utils/server";
import { getUserName } from "@/utils/globalState";
import { formatSize } from "@/utils/utils";
import FileViewer from "@/component/FileViewer";
import Loading from "@/component/Loading";
import { fileTypes } from "@/constant/const";
const username = getUserName();

interface IProps {
  projectName: string;
}

// const fileTypes = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];

export default function FilesWareHouse(props: IProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  const [isRise, setIsRise] = useState(true);
  const [isMultiple, setIsMultiple] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([
    props.projectName,
  ]);
  const [viewUrl, setViewUrl] = useState<string>("");
  const [viewType, setViewType] = useState<string>("");
  const [showView, setShowView] = useState(false);
  const { projectName } = props;
  const [isLoading, setIsLoading] = useState(true);

  const [renameVisible, setRenameVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<IFile | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // 获取项目下的文件列表
    console.log("projectName", projectName);
    fetchProjectFiles(projectName)
      .then((res) => res.json())
      .then((res) => {
        // console.log("信息", res);
        setFiles(res.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };
  const handleStattedClick = (fileId: string) => {
    // todo 通知服务端修改
    setFiles(
      files.map((file) => {
        if (file.id === fileId) {
          file.isStarred = !file.isStarred;
        }
        return file;
      })
    );
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index < 0) return;
    const newPath = breadcrumbItems.slice(0, index + 1).join("/");
    setBreadcrumbItems(breadcrumbItems.slice(0, index + 1));
    fetchProjectFiles(newPath)
      .then((res) => res.json())
      .then((res) => {
        setFiles(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMultipleClick = () => {
    // todo 批量操作]
    setIsMultiple(!isMultiple);
  };

  const refresh = () => {
    fetchProjectFiles(breadcrumbItems.join("/"))
      .then((res) => res.json())
      .then((res) => {
        setFiles(res.data || []);
      });
  };

  const handleCopyClick = async (key: string, isFilefolder: boolean) => {
    try {
      // 获取下载链接
      const downloadF = isFilefolder ? downloadFileFolder : downloadFiles;
      const res = await downloadF(key);
      const data = await res.json();

      if (data?.data?.downloadUrl) {
        // 复制到剪贴板
        await navigator.clipboard.writeText(data.data.downloadUrl);
        message.success("链接已复制到剪贴板");
      }
    } catch (error) {
      message.error("复制失败，请重试");
    }
  };

  const handleFileDelete = async (key: string, isFilefolder: boolean) => {
    // const key = breadcrumbItems.join("/") + "/" + fileName;
    // console.log("key", key);
    if (isFilefolder) {
      console.log("key", key);
      try {
        await deleteFolder(key);
        message.success("文件夹删除成功");
        // 刷新文件列表
      } catch (error) {
        message.error("文件夹删除失败");
      }
    } else {
      deleteFiles(key)
        .then((res) => res.json())
        .then((res) => {
          console.log("删除文件成功", res);
          message.success("删除文件成功");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    refresh();
  };

  const handleUploadOnChange = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} 文件上传成功`);
      // 更新文件列表
      const newFile: IFile = {
        id: `${Date.now()}`, // 生成唯一 ID
        title: info.file.name,
        createrAvatar: defaultAvatar,
        createrName: username || "张三", // 替换为当前登录用户
        key: info.file.response.key,
        // downloadUrl: info.file.response.downloadUrl, // 从响应中获取下载链接
        latestModifiedTime: new Date().toLocaleDateString(),
        latestModifier: username || "张三", // 替换为当前登录用户
        isStarred: false,
        isFilefolder: false,
      };
      console.log("newFile", newFile);
      //setFiles([...files, newFile]);
      // 更新文件列表
      refresh();
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const handleDownloadClick = (key: string, isFilefolder: boolean) => {
    console.log("key", key);
    const downloadF = isFilefolder ? downloadFileFolder : downloadFiles;
    // (isFilefolder ? downloadFileFolder(key) : downloadFiles(key))
    downloadF(key)
      .then((res) => res.json())
      .then((res) => {
        const downloadUrl = res.data.downloadUrl;
        console.log("downloadUrl", downloadUrl);
        window.open(downloadUrl);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileClick = (file: IFile) => {
    console.log("file", file);
    if (file.isFilefolder) {
      fetchProjectFiles(breadcrumbItems.join("/") + "/" + file.title)
        .then((res) => res.json())
        .then((res) => {
          setBreadcrumbItems([...breadcrumbItems, file.title]);
          setFiles(res.data || []);
        });
    } else {
      // todo 打开文件
      console.log("打开文件？", file.key);
      const type = file.key.split(".").pop() || "";
      if (fileTypes.includes(type)) {
        getFilesPreview(file.key)
          .then((res) => res.json())
          .then((res) => {
            console.log("res", res);
            setViewUrl(res.previewUrl);
            setViewType(type);
            setShowView(true);
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      } else {
        console.log("该文件类型无法通过cos在线预览");
      }
      const previewUrl = FILESVIEW_URL_PREFIX + encodeURIComponent(file.key);
      console.log("previewUrl", previewUrl);
      setViewUrl(previewUrl);
      setViewType(type);
      setShowView(true);
    }
  };

  const handleBatchDownload = async () => {
    try {
      const selectedFiles = files.filter((file) =>
        selectedRowKeys.includes(file.id)
      );

      console.log("selectedFiles", selectedFiles);

      // 批量下载
      for (const file of selectedFiles) {
        const res = file.isFilefolder
          ? await downloadFileFolder(file.key)
          : await downloadFiles(file.key);
        const data = await res.json();
        if (data?.data?.downloadUrl) {
          // 创建隐藏iframe实现静默下载
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = data.data.downloadUrl;
          document.body.appendChild(iframe);
          setTimeout(() => document.body.removeChild(iframe), 5000);
        }
      }
      message.success("已开始批量下载");
    } catch (error) {
      message.error("下载过程中发生错误");
    }
  };

  const handleBatchDelete = async () => {
    try {
      const selectedFiles = files.filter((file) =>
        selectedRowKeys.includes(file.id)
      );
      // 区分文件和文件夹删除
      await Promise.all(
        selectedFiles.map((file) =>
          file.isFilefolder ? deleteFolder(file.key) : deleteFiles(file.key)
        )
      );
      message.success("批量删除成功");
      refresh();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("删除过程中发生错误");
    }
  };

  const extraItems = (record: IFile) => [
    {
      key: "delete",
      label: "删除",
      icon: <DeleteOutlined />,
      onClick: () => {
        handleFileDelete(record.key, record.isFilefolder);
      },
    },
  ];

  const handleRename = async (values: { newName: string }) => {
    if (!currentFile) return;

    try {
      const res = await fetch(`http://localhost:4000/renameFile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldKey: currentFile.key,
          newName: values.newName,
          isFolder: currentFile.isFilefolder,
        }),
      });

      const data = await res.json();
      if (data.success) {
        message.success("重命名成功");
        refresh();
        setRenameVisible(false);
      }
    } catch (error) {
      message.error("重命名失败");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="position-correction">
          <Loading />
        </div>
      ) : (
        <>
          <Breadcrumb
            separator={<CaretRightOutlined />}
            className="files-list-breadcrumb"
          >
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item
                key={index}
                onClick={() => handleBreadcrumbClick(index)}
                className="breadcrumb-item"
              >
                {index === 0 ? (
                  <DnsTwoToneIcon sx={{ fontSize: "1.2rem" }} />
                ) : null}
                <span>{item}</span>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="upload-container">
            <div className="blank" />
            <Button type="primary" onClick={handleMultipleClick}>
              {isMultiple ? "取消批量" : "批量操作"}
            </Button>
            <Upload
              showUploadList={false}
              action={UPLOAD_URL}
              multiple
              onChange={handleUploadOnChange}
              data={(file) => ({
                // 动态传递路径参数给后端
                fileName: file.name,
                basePath: breadcrumbItems.join("/"), // 基础路径（如：项目/文件夹1）
                relativePath: (file as any).webkitRelativePath || "", // 文件的相对路径（如：子文件夹/文件.txt）
              })}
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
            <Upload
              showUploadList={false}
              action={UPLOAD_URL}
              multiple
              directory={true}
              onChange={handleUploadOnChange}
              data={(file) => ({
                // 动态传递路径参数给后端
                basePath: breadcrumbItems.join("/"), // 基础路径（如：项目/文件夹1）
                relativePath: (file as any).webkitRelativePath || "", // 文件的相对路径（如：子文件夹/文件.txt）
              })}
            >
              <Button icon={<UploadOutlined />}>上传文件夹</Button>
            </Upload>
          </div>
          <div className="item-header">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>名称</span>
              <IconButton
                size="small"
                onClick={() =>
                  handleBreadcrumbClick(breadcrumbItems.length - 2)
                }
              >
                <RollbackOutlined />
              </IconButton>
            </div>
            <span style={{ marginLeft: "21.8rem" }}>所有者</span>
            <div
              className="last-modified-time"
              onClick={() => setIsRise(!isRise)}
            >
              <span>上次修改日期</span>
              <IconButton size="small">
                {isRise ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </IconButton>
            </div>
            <span style={{ marginLeft: "4.2rem" }}>文件大小</span>
            <MoreOutlined
              style={{ marginLeft: "auto" }}
              className="files-more-icon"
            />
          </div>
          <ProList<IFile>
            dataSource={files}
            rowKey="id"
            rowClassName="files-list-item"
            metas={{
              title: {
                render: (text, record) => (
                  <div
                    className="info-container file-container"
                    onClick={() => handleFileClick(record)}
                  >
                    {record.isFilefolder ? (
                      <FolderFilled className="file-icon" />
                    ) : (
                      <FileOutlined className="file-icon" />
                    )}
                    <div className="info-container">{text}</div>
                    {record.isStarred && <StarFilled />}
                  </div>
                ),
              },
              content: {
                render: (_: any, record: IFile) => (
                  <Space direction="horizontal" className="file-info">
                    <div className="info-container creater-container">
                      <img src={defaultAvatar} className="creater-avatar" />
                      <span>{record.createrName}</span>
                    </div>
                    <div className="info-container time-container">
                      <span>{record.latestModifiedTime}</span>
                      <span>{record.latestModifier}</span>
                    </div>
                    <div className="info-container size-container">
                      <span>{formatSize(record.size || -1)}</span>
                    </div>
                  </Space>
                ),
              },
              actions: {
                render: (_: any, record: any) => (
                  <div className="actions-container">
                    <Tooltip title="下载">
                      <IconButton
                        onClick={() =>
                          handleDownloadClick(record.key, record.isFilefolder)
                        }
                      >
                        <DownloadOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="复制">
                      <IconButton
                        onClick={() =>
                          handleCopyClick(record.key, record.isFilefolder)
                        }
                      >
                        <CopyOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="重命名">
                      <IconButton
                        onClick={() => {
                          setCurrentFile(record);
                          setRenameVisible(true);
                          form.setFieldsValue({ newName: record.title });
                        }}
                      >
                        <DriveFileRenameOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={record.isStarred ? "取消标星" : "标星置顶"}>
                      <IconButton onClick={() => handleStattedClick(record.id)}>
                        {record.isStarred ? <StarFilled /> : <StarOutlined />}
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
              },
              extra: {
                render: (_: any, record: any) => (
                  <Dropdown
                    trigger={["click"]}
                    menu={{ items: extraItems(record) }}
                  >
                    <MoreOutlined className="files-more-icon" />
                  </Dropdown>
                ),
              },
            }}
            rowSelection={isMultiple ? rowSelection : false}
            tableAlertRender={() => (
              <div className="select-alert-container">
                <span>已选择 {selectedRowKeys.length} 项</span>
                <div className="select-alert-actions">
                  <Tooltip title="下载">
                    <IconButton size="small" onClick={handleBatchDownload}>
                      <DownloadOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="删除">
                    <IconButton size="small" onClick={handleBatchDelete}>
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            )}
          />
          {showView && (
            <div
              className="file-viewer-mask"
              onClick={() => setShowView(false)}
            >
              <div
                className="file-viewer-container"
                onClick={(e) => e.stopPropagation()}
              >
                <FileViewer url={viewUrl} type={viewType} />
              </div>
            </div>
          )}
          <Modal
            title="重命名文件"
            open={renameVisible}
            onCancel={() => setRenameVisible(false)}
            onOk={() => form.submit()}
          >
            <Form form={form} onFinish={handleRename}>
              <Form.Item
                name="newName"
                rules={[{ required: true, message: "请输入新名称" }]}
              >
                <Input placeholder="输入新文件名" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}
