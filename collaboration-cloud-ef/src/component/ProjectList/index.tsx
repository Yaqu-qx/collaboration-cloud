import React, { useState, useEffect } from "react";
import type { Key } from "react";
import { ProList } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ApplyJoin from "@/component/ApplyJoin";
import "./index.scss";
import startIcon from "@/assets/star-smile-fill.png";

const avatarUrl =
  "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg";
const handleJoin = () => {
  console.log("join project");
};

const handleDelete = () => {
  console.log("delete project");
};

const handleBatchDelete = () => {
  console.log("batch delete project");
};

interface ProjectItem {
  name: string;
  avatar: string;
  description: string;
  group: string;
  teacher: string;
  peopleNum: number;
  create_time: string;
}

const dataSource = [
  {
    name: "project1",
    avatar: avatarUrl,
    description: "基于React和Spring Cloud的跨平台协作系统，采用微服务架构实现实时协作功能。",
    group: "前端开发组",
    teacher: "王教授",
    peopleNum: 8,
    create_time: "2024-03-15"
  },
  {
    name: "project2",
    avatar: avatarUrl,
    description: "使用Spark和Hadoop构建的分布式数据处理系统，支持PB级数据实时分析。",
    group: "数据工程组",
    teacher: "李教授",
    peopleNum: 12,
    create_time: "2024-02-28"
  },
  {
    name: "project3",
    avatar: avatarUrl,
    description: "基于ARM架构的嵌入式设备，支持多种工业协议转换和边缘计算。",
    group: "硬件开发组",
    teacher: "张教授",
    peopleNum: 6,
    create_time: "2024-04-01"
  },
  {
    name: "project4",
    avatar: avatarUrl,
    description: "集成TensorFlow和PyTorch的AI开发环境，提供可视化模型训练界面。",
    group: "人工智能组",
    teacher: "陈教授",
    peopleNum: 10,
    create_time: "2024-03-20"
  }
];

export default function ProjectList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [data, setData] = useState(dataSource);
  const [showApply, setShowApply] = useState(false);
  const [applyProject, setApplyProject] = useState<any>();

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  const handleDelete = (title: string) => {
    setData(data.filter((item) => item.name !== title));
    message.success(`已删除: ${title}`);
  };

  const handleBatchDelete = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.name)));
    setSelectedRowKeys([]);
    message.success(`已删除选中的 ${selectedRowKeys.length} 个项目`);
  };

  return (
    <>
      {showApply && (
        <ApplyJoin
          applyProject={applyProject}
          onClose={() => setShowApply(false)}
        />
      )}
      <div className="project-list-header">
        <h3 style={{ color: "#666" }}>全部收藏</h3>
        <div>
          <Button
            variant="outlined"
            onClick={handleBatchDelete}
            style={{ borderColor: "red", color: "red" }}
          >
            <DeleteOutlined />
            删除+
          </Button>
        </div>
      </div>
      <ProList<ProjectItem>
        metas={{
          description: {
            render:(text, record) => record.description,
          },
          avatar: {render: () => <img src={startIcon} style={{height: '1.2rem', width: '1.2rem'}} />},
          title: {
            render:(text, record) => record.name,
          },
          actions: {
            render: (text, record) => {
              return [
                <a
                  key="init"
                  onClick={() => {
                    setApplyProject(record);
                    setShowApply(true);
                  }}
                >
                  加入
                </a>,
                <Button
                  key="init"
                  type="text"
                  style={{ color: "rgb(225, 50, 50)" }}
                  onClick={() => handleDelete(record.name)}
                >
                  删除
                </Button>,
              ];
            },
          },
        }}
        rowKey="title"
        rowSelection={rowSelection}
        dataSource={data}
      />
    </>
  );
}
