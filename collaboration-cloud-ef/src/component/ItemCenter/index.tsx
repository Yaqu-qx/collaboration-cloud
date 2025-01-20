import React, { useState } from "react";
import "./index.scss";
import { Button, Input, TreeSelect, Table, Dropdown, Tag } from "antd";
import type { GetProps, TableProps, MenuProps } from "antd";
import { tagColor, projectTags } from "../../constant/const";
import { EllipsisOutlined, StarTwoTone } from "@ant-design/icons";
import { ProjectInfo } from '../../typings/api/project_info'
import { fetchProjects } from '../../utils/server'
import { get } from "http";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { SHOW_PARENT } = TreeSelect;

interface DataType {
  key: string;
  name: string;
  group: string;
  peopleNum: Number;
  teacher: string;
  tags: string[];
  create_time: string;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        申请加入
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <div className="dropdown">
        <StarTwoTone />
        <span>收藏</span>
      </div>
    ),
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "项目名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "所属小组",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "成员人数",
    dataIndex: "peopleNum",
    key: "peopleNum",
    align: "center",
  },
  {
    title: "指导老师",
    key: "teacher",
    dataIndex: "teacher",
  },
  {
    title: "标签",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag, index) => {
          let color = tagColor[tag];
          return (
            <Tag color={color} key={`${tag}-${index}`}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "创建时间",
    key: "create_time",
    dataIndex: "create_time",
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.create_time) < new Date(b.create_time) ? -1 : 1,
  },
  {
    title: "更多操作",
    key: "action",
    render: () => (
      <Dropdown menu={{ items }} placement="bottom">
        <EllipsisOutlined />
      </Dropdown>
    ),
    align: "center",
  },
];

// 数据转换
const transformProjectData = (item: ProjectInfo, index: number): DataType => {
  return {
    key: index.toString(),
    name: item.project_name,
    group: item.team_name,
    peopleNum: item.member_count,
    teacher: item.teacher,
    tags: item.tags,
    create_time: item.create_time
  };
};

export default function ItemCenter() {
  const [tapsValue, setTapsValue] = useState(["0-0-0"]);
  const [projectData, setProjectData] = useState<DataType[]>([]);
  const onTapsChange = (newValue: string[]) => {
    console.log("onChange ", newValue);
    setTapsValue(newValue);
  };
  const tProps = {
    treeData: projectTags,
    tapsValue,
    onTapsChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "按标签搜索",
    style: {
      width: "20rem",
    },
  };

  const fetchProjectsData = (value: string, isRecommend: boolean = false) => {
    fetchProjects(value, isRecommend)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProjectData(data.map((item: ProjectInfo, index: number) => transformProjectData(item, index)));
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value );
    fetchProjectsData(value, false);
  }
  
  return (
    <>
      <div className="ic-header">
        <span className="ic-title"> 项目中心 </span>
        <div>
          <Button color="primary" variant="solid" className="create-btn">
            创建项目
          </Button>
          <Button color="primary" 
          variant="filled"
          onClick={() => fetchProjectsData('', true)}
          className="template-btn">
            推荐
          </Button>
        </div>
      </div>

      <div className="search-block">
        <Search
          placeholder="搜索项目"
          onSearch={onSearch}
          allowClear
          className="project-search"
        />

        <TreeSelect {...tProps} />
      </div>

      <div className="list-block">
        <Table<DataType>
          columns={columns}
          dataSource={projectData}
          className="item-table"
          tableLayout="auto"
          pagination={{ position: ['bottomCenter'], total: 60, pageSize: 8 }}
        />
      </div>
    </>
  );
}
