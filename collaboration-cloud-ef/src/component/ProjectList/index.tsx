import React, { useState, useEffect } from "react";
import type { Key } from "react";
import { ProList } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./index.scss";

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

const dataSource = [
  {
    title: "Project A",
    avatar: avatarUrl,
  },
  {
    title: "Project B",
    avatar: avatarUrl,
  },
  {
    title: "Project C",
    avatar: avatarUrl,
  },
  {
    title: "Project D",
    avatar: avatarUrl,
  },
];

export default function ProjectList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [data, setData] = useState(dataSource);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  const handleDelete = (title: string) => {
    setData(data.filter((item) => item.title !== title));
    message.success(`已删除: ${title}`);
  };

  const handleBatchDelete = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.title)));
    setSelectedRowKeys([]);
    message.success(`已删除选中的 ${selectedRowKeys.length} 个项目`);
  };

  return (
    <>
      <div className="project-list-header">
        <h3 style={{ color: "#666" }}>全部收藏</h3>
        <div>
          <Button
          type="primary"
          onClick={handleJoin}
          style={{ marginRight: 8, backgroundColor: "green" }}
        >
          加入+
        </Button>
        <Button
          variant="outlined"
          onClick={handleBatchDelete}
          style={{ borderColor: "red", color: "red" }}
        >
          <DeleteOutlined />
          删除+
        </Button > 
        </div>
       
      </div>
      <ProList<{ title: string }>
        metas={{
          description: {
            render: () => {
              return "这是一个很特别的项目，项目主要做的是xxx，需要结合最新技术完成，该项目的核心方向是结合xxxx的方法，以xxx向转型完成一个具有难度的系统。";
            },
          },
          avatar: {},
          actions: {
            render: (text, record) => {
              return [
                // TODO: 这里的删除按钮应该是异步的，因为删除操作需要网络请求
                // 待完成 “查看”和“加入” 逻辑
                
                <a key="init" >查看</a>,
                <a key="init" >加入</a>,
                <Button key="init" type="text" style={{ color: "rgb(225, 50, 50)" }} onClick={() => handleDelete(record.title)}>删除</Button>,
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
