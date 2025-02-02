import React, { useState, useEffect } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-components";
import avatarExample from "@/assets/avatarExample.png";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title: string;
  readonly?: string;
  decs: string;
  responsisbleAvatar: string;
  responsisbleName: string;
  state?: string;
  due_to_finish: string;
  update_at: string;
  created_at: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: "调研与分析",
    readonly: "调研与分析",
    decs: "调研市场，分析竞品，制定方案...",
    responsisbleAvatar: avatarExample,
    responsisbleName: "Amily",
    state: "TODO",
    due_to_finish: "2025-03-01",
    created_at: "2025-01-01",
    update_at: "2025-01-01",
  },
  {
    id: 624691229,
    title: "收集数据",
    readonly: "收集数据",
    decs: "在网上查阅收集相关的数据，包括现有系统分析报告、现有系统技术难点、shiro权限配置等",
    responsisbleAvatar: avatarExample,
    responsisbleName: "Amily",
    state: "进行中",
    due_to_finish: "2025-03-01",
    created_at: "2025-01-01",
    update_at: "2025-01-01",
  },
  {
    id: 624271229,
    title: "技术方案设计",
    readonly: "技术方案设计",
    decs: "分析数据，制定技术方案，包括技术选型、架构设计、技术实现等",
    responsisbleAvatar: avatarExample,
    responsisbleName: "John",
    state: "已完成",
    due_to_finish: "2025-03-01",
    created_at: "2025-01-01",
    update_at: "2025-01-01",
  },
  {
    id: 624270000,
    title: "制作ppt",
    readonly: "制作ppt",
    decs: "制作答辩ppt，包括产品介绍、功能介绍、技术架构、用户体验等",
    responsisbleAvatar: avatarExample,
    responsisbleName: "John",
    state: "延期中",
    due_to_finish: "2025-03-01",
    created_at: "2025-01-01",
    update_at: "2025-01-01",
  },
];

export default function TaskList() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [filteredData, setFilteredData] =
    useState<readonly DataSourceType[]>(defaultData); // 修改4：增加filteredData状态
  const [stateFilter, setStateFilter] = useState<string | undefined>(undefined); // 修改5：增加状态过滤器状态
  const [responsisbleFilter, setResponsisbleFilter] = useState<
    string | undefined
  >(undefined); // 修改6：增加负责人过滤器状态

  useEffect(() => {
    // TODO 从服务器获取数据
    setDataSource(defaultData);
  }, []);

  // 修改7：添加useEffect进行数据过滤
  useEffect(() => {
    setFilteredData(
      dataSource.filter(
        (item) =>
          (stateFilter ? item.state === stateFilter : true) &&
          (responsisbleFilter
            ? item.responsisbleName === responsisbleFilter
            : true)
      )
    );
  }, [stateFilter, responsisbleFilter, dataSource]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "任务名称",
      dataIndex: "title",
      //   tooltip: "只读，使用form.getFieldValue获取不到值",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: "此项为必填项" }] : [],
        };
      },
      ellipsis: true,
      tooltip: "标题过长会自动收缩",
    },

    {
      title: "负责人",
      dataIndex: "avatar",
      render: (dom, entity) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={entity.responsisbleAvatar}
            alt={entity.responsisbleName}
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
          <span> {entity.responsisbleName} </span>
        </div>
      ),
      align: "center",
    },
    {
      title: "主要内容",
      dataIndex: "decs",
      tooltip: "内容过长会自动收缩，突出重点任务内容，建议不超过500字",
      ellipsis: true,
      //   tooltip: "只读，使用form.getFieldValue可以获取到值",
      //   readonly: true,
    },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        todo: { text: "TODO", status: "Default" },
        processing: {
          text: "进行中",
          status: "Processing",
        },
        finished: {
          text: "已完成",
          status: "Success",
        },
        postponing: {
          text: "延期中",
          status: "Warning",
        },
        stopped: {
          text: "已终止",
          status: "Error",
        },
      },
      align: "center",
    },
    {
      title: "计划完成日期",
      dataIndex: "due_to_finish",
      valueType: "date",
      width: "12%",
      align: "center",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "update_at",
      valueType: "date",
      tooltip: "编辑保存后，时间会自动更新",
      width: "10%",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "date",
      width: "10%",
      align: "center",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "操作",
      valueType: "option",
      align: "center",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
            // 服务端数据更新
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="任务详情"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        // recordCreatorProps={
        //   position !== "hidden"
        //     ? {
        //         position: position as "top",
        //         record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        //       }
        //     : false
        // }
        loading={false}
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     key="render"
        //     fieldProps={{
        //       value: position,
        //       onChange: (e) => setPosition(e.target.value),
        //     }}
        //     options={[
        //       {
        //         label: "添加到顶部",
        //         value: "top",
        //       },
        //       {
        //         label: "添加到底部",
        //         value: "bottom",
        //       },
        //       {
        //         label: "隐藏",
        //         value: "hidden",
        //       },
        //     ]}
        //   />,
        // ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
        toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                // actionRef.current?.reload();
              }}
              type="primary"
            >
              新建
            </Button>,
          ]}
      />
    </>
  );
}
