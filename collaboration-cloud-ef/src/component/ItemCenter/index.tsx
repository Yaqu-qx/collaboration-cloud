import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Button, Input, TreeSelect, Table, Dropdown, Tag, Space, message, } from "antd";
import type { GetProps, TableProps, MenuProps, InputRef, TableColumnType, } from "antd";
import { tagColor, projectTags } from "@/constant/const";
import { EllipsisOutlined, StarTwoTone, SearchOutlined, MinusCircleTwoTone, PushpinOutlined, } from "@ant-design/icons";
import { ProjectInfo } from "@/typings/api/project_info";
import { fetchProjects, fetchProjectsByTags } from "@/utils/server";
import type { FilterDropdownProps } from "antd/es/table/interface";
import CreatePanel from "../CreatePanel";
import { DataType } from "@/typings/type";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;

// interface DataType {
//   key: string;
//   name: string;
//   group: string;
//   peopleNum: number;
//   teacher: string;
//   tags: string[];
//   create_time: string;
//   description: string;
// }
type DataIndex = keyof DataType;
interface IProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  projectData: DataType[];
  setProjectData: (data: DataType[]) => void;
  tagsValue: string[];
  setTagsValue: (value: string[]) => void;
}

// 数据转换
const transformProjectData = (item: ProjectInfo, index: number): DataType => {
  return {
    key: index.toString(),
    name: item.project_name,
    group: item.team_name,
    peopleNum: item.member_count,
    teacher: item.teacher,
    tags: item.tags,
    create_time: item.create_time,
    description: item.description,
  };
};

export default function ItemCenter(props: IProps) {
  // const [tapsValue, setTapsValue] = useState([] as string[]);
  // const [projectData, setProjectData] = useState<DataType[]>([]);
  const { searchValue, setSearchValue, projectData, setProjectData, tagsValue, setTagsValue } = props;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [applyPanelVisible, setApplyPanelVisible] = useState(false);
  const [createPanelVisible, setCreatePanelVisible] = useState(false);
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => { setApplyPanelVisible(true); }} >
          申请加入
        </span>
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

  // alert message
  const loadAlert = () => {
    messageApi.open({
      type: "success",
      content: "加载成功，已推荐20个最新项目！",
      className: "custom-class",
      duration: 1,
      style: {
        marginTop: "20vh",
        marginLeft: "5vw",
      },
    });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "项目名",
      dataIndex: "name",
      key: "name",
      render: (text) => <Button type="text" className="project-btn" onClick={() => handleLinkClick(text)}>{text}</Button>,
    },
    {
      title: "所属小组",
      dataIndex: "group",
      key: "group",
      ...getColumnSearchProps("group"),
    },
    {
      title: "成员人数",
      dataIndex: "peopleNum",
      key: "peopleNum",
      align: "center",
      sorter: (a, b) => a.peopleNum - b.peopleNum,
    },
    {
      title: "指导老师",
      key: "teacher",
      dataIndex: "teacher",
      ...getColumnSearchProps("teacher"),
    },
    {
      title: "标签",
      key: "tags",
      dataIndex: "tags",
      filters: projectTags,
      onFilter: (text, record) => {
        return record.tags.includes(text as string);
      },
      //
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
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.create_time) < new Date(b.create_time) ? -1 : 1,
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

  const onTagsChange = (newValue: string[]) => {
    console.log("onChange ", newValue);
    fetchProjectsByTags(newValue)
      .then((response) => response.json())
      .then((data) => {
        console.log("filted: ", data);
        setProjectData(
          data.map((item: ProjectInfo, index: number) =>
            transformProjectData(item, index)
          )
        );
        setTagsValue(newValue);
        setSearchValue("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tProps = {
    treeData: projectTags,
    value: tagsValue,
    onChange: onTagsChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "按标签搜索",
    style: {
      width: "20rem",
    },
  };

  const fetchProjectsByName = (value: string, isRecommend: boolean = false) => {
    fetchProjects(value, isRecommend)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjectData(
          data.map((item: ProjectInfo, index: number) =>
            transformProjectData(item, index)
          )
        );
        setTagsValue([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    fetchProjectsByName(value, false);
    setSearchValue(value);
  };
 
  // 跳转详情页
  const handleLinkClick = (projectName: string) => {
    console.log("link click");
    // TODO: 获取对应项目数据
    
    // 获取到的项目数据
    let projectData = {
      name: projectName,
      group: "团队名称",
      peopleNum: 10,
      teacher: "指导老师",
      tags: ["标签1", "标签2"],
      create_time: "2022-01-01",
      description: "项目描述",
    }

    navigate("/home/project-detail", {state: projectData});
    
  };

  return (
    <>
      {contextHolder}
      <div className="ic-header">
        <span className="ic-title"> 项目中心 </span>
        <div>
          <Button
            color="primary"
            variant="solid"
            className="create-btn"
            onClick={() => setCreatePanelVisible(true)}
          >
            创建项目
          </Button>
          <Button
            color="primary"
            variant="filled"
            onClick={() => {
              fetchProjectsByName("", true);
              loadAlert();
            }}
            className="template-btn"
          >
            推荐
          </Button>
        </div>
      </div>

      <div className="search-block">
        <Search
          value={searchValue}
          onChange={(e)=>{setSearchValue(e.target.value);}}
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
          pagination={{ position: ["bottomCenter"] }}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
              ) : (
                <PushpinOutlined onClick={(e) => onExpand(record, e)} />
              ),
          }}
        />
      </div>
      {createPanelVisible && (
        <div className="create-panel-mask">
          <div className="create-panel">
            <CreatePanel
              onPanelVisible={(visible) => setCreatePanelVisible(visible)}
            />
          </div>
        </div>
      )}

      {applyPanelVisible && (
        <div className="apply-panel-mask">
          <div className="apply-to-join">
            <p>请输入申请理由*：</p>
            <button className="submit-btn">提交</button>
          </div>
        </div>
        
      )}
    </>
  );
}
