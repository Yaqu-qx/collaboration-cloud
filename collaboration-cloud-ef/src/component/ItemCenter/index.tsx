import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Input,
  TreeSelect,
  Table,
  Dropdown,
  Space,
  message,
} from "antd";
import type {
  GetProps,
  TableProps,
  MenuProps,
  InputRef,
  TableColumnType,
} from "antd";
import ColoredTags from "@/component/ColoredTags";
import { projectTags } from "@/constant/const";
import {
  EllipsisOutlined,
  StarTwoTone,
  SearchOutlined,
  MinusCircleTwoTone,
  PushpinOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { projectInfo } from "@/typings/api/project_info";
import { fetchProjects, fetchProjectsByTags } from "@/utils/server";
import type { FilterDropdownProps } from "antd/es/table/interface";
import CreatePanel from "../CreatePanel";
import { DataType } from "@/typings/type";
import { getUserAccount, getUserName } from "@/utils/globalState";
import applySuccessImg from "@/assets/application_success.png";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;

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
const transformProjectData = (item: projectInfo, index: number): DataType => {
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
  const {
    searchValue,
    setSearchValue,
    projectData,
    setProjectData,
    tagsValue,
    setTagsValue,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [applyPanelVisible, setApplyPanelVisible] = useState(false);
  const [createPanelVisible, setCreatePanelVisible] = useState(false);
  const [applyText, setApplyText] = useState("");
  const [applyProject, setApplyProject] = useState<DataType>();
  const [applyFinish, setApplyFinish] = useState(false);
  const navigate = useNavigate();

  // create panel 的提交数据状态存储 （最小化）

  const handleApplyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplyText(e.target.value);
  };

  // alert message 推荐成功提醒
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

  // 单列字段筛选 todo看明白
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

  // 更多操作
  const handleMoreAction = (action: string, record: DataType) => {
    console.log("getUserName", getUserName());
    if (action === "apply") {
      console.log("apply");
      setApplyPanelVisible(true);
      setApplyProject(record);
      return;
    }

    // 收藏逻辑 TODO
    messageApi.open({
      type: "success",
      content: "收藏成功！",
      duration: 1,
    });

  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "项目名",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Button
          type="text"
          className="project-btn"
          // onClick={() => handleLinkClick(text)}
        >
          {text}
        </Button>
      ),
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
      render: (_, { tags }) => (
        <>
          <ColoredTags tags={tags} />
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
      render: (_, record) => {
        // 动态生成 Dropdown 菜单
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <span onClick={() => handleMoreAction("apply", record)}>
                申请加入
              </span>
            ),
          },
          {
            key: "2",
            label: (
              <div
                className="dropdown"
                onClick={() => handleMoreAction("favorite", record)}
              >
                <StarTwoTone />
                <span>收藏</span>
              </div>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} placement="bottom">
            <EllipsisOutlined />
          </Dropdown>
        );
      },
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
          data.map((item: projectInfo, index: number) =>
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
  // 按项目名加载项目数据
  const fetchProjectsByName = (value: string, isRecommend: boolean = false) => {
    fetchProjects(value, isRecommend)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjectData(
          data.map((item: projectInfo, index: number) =>
            transformProjectData(item, index)
          )
        );
        setTagsValue([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // 搜索触发回调
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    fetchProjectsByName(value, false);
    setSearchValue(value);
  };

  // 提交申请
  const handleApplySubmit = () => {
    console.log("apply submit");
    // TODO: 文本框内容判断
    
    // TODO: 发送申请请求 

    setApplyText("");
    setApplyProject(undefined);
    setApplyFinish(true);
  };

  const handleFinishApply = () => {
    setApplyText("");
    setApplyProject(undefined);
    setApplyPanelVisible(false);
    setApplyFinish(false);
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
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
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
          
            {!applyFinish ? (
              <div className="apply-to-join">
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={handleFinishApply}
                  className="apply-close-btn"
                >
                  <CloseOutlined />
                </IconButton>
                <p className="title">申请加入</p>
                <div className="apply-info">
                  <div className="info-block">
                    <p>申请人：{getUserName() ?? ""} </p>
                    <p>申请人学号：{getUserAccount() ?? ""} </p>
                  </div>
                  <div className="info-block">
                    <p>项目名称：{applyProject?.name ?? ""} </p>
                    <p>项目组：{applyProject?.group ?? ""} </p> 
                    <p>主指导老师：{applyProject?.teacher ?? ""} </p>
                  </div>
                </div>
                <div className="apply-reason">
                  <p>
                    申请理由 <span style={{ color: "red" }}>*</span>
                  </p>
                  <TextArea
                    placeholder="请输入申请理由"
                    allowClear
                    onChange={handleApplyText}
                    value={applyText}
                    className="reason-input"
                  />
                  <p style={{ color: "#999" }}>
                    申请后将向项目的项目管理人（主指导老师）发送申请通知，审核通过方可加入。
                  </p>
                </div>
                <button className="submit-btn" onClick={handleApplySubmit}>
                  提交申请
                </button>
              </div>
            ) : (
              <div className="apply-success-popup">
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={handleFinishApply}
                  className="apply-close-btn"
                >
                  <CloseOutlined />
                </IconButton>
                <img src={applySuccessImg} className="apply-success-img" />
                <p className="apply-success-text"> 提交成功！待审核中... </p>
                <Button
                  type="primary"
                  className="finish-btn"
                  onClick={handleFinishApply}
                >
                  完成
                </Button>
              </div>
            )}
        </div>
      )}
    </>
  );
}
