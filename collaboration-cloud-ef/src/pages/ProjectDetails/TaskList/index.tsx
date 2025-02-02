import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { AutoComplete, message } from "antd";
import avatarExample from "@/assets/avatarExample.png";
import "./index.scss";

// import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type TaskItem = {
  //   url: string;
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
  children?: TaskItem[];
};

const defaultData: TaskItem[] = [
  {
    id: 624748504,
    title: "调研与分析",
    readonly: "调研与分析",
    decs: "调研市场，分析竞品，制定方案...",
    responsisbleAvatar: avatarExample,
    responsisbleName: "Amily",
    state: "todo",
    due_to_finish: "2025-09-01",
    created_at: "2025-03-01",
    update_at: "2025-09-01",
  },
  {
    id: 624691229,
    title: "收集数据",
    readonly: "收集数据",
    decs: "在网上查阅收集相关的数据，包括现有系统分析报告、现有系统技术难点、shiro权限配置等",
    responsisbleAvatar: avatarExample,
    responsisbleName: "Amily",
    state: "processing",
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
    state: "finished",
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
    state: "postponing",
    due_to_finish: "2025-03-01",
    created_at: "2025-01-01",
    update_at: "2025-01-01",
  },
];

const options = [
  { value: "Amily", label: "Amily", avatar: avatarExample },
  { value: "John", label: "John", avatar: avatarExample },
  // 可以添加更多选项
];

const personRenderFormItem = (
  item: any,
  { defaultRender: any, ...rest }: any,
  form: any
) => {
  return (
    <AutoComplete
      options={options.map((option) => ({
        value: option.value,
        label: (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src={option.avatar}
              alt={option.label}
              style={{ width: 24, height: 24, borderRadius: "50%" }}
            />
            {option.label}
          </div>
        ),
      }))}
      {...rest}
      onChange={(value: any) => {
        const selectedOption = options.find((option) => option.value === value);
        console.log("selectedOption: ", selectedOption);
        form.setFieldValue(item.dataIndex, value);
        form.setFieldValue(
          "responsisbleAvatar",
          selectedOption?.avatar || avatarExample
        );
      }}
      onBlur={() => {
        const responsisbleName = form.getFieldValue("responsisbleName");
        const selectedOption = options.find(
          (option) => option.value === responsisbleName
        );
        form.setFieldValue(
          "responsisbleAvatar",
          selectedOption ? selectedOption.avatar : ""
        ); // 确保失焦时保存头像 URL
      }}
    />
  );
};

export default function TaskList() {
  const actionRef = useRef<ActionType>(null);
  const [dataSource, setDataSource] = useState<TaskItem[]>(defaultData);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTitleText, setSearchTitleText] = useState(""); // 搜索框文本状态

  // 过滤数据的逻辑
  const handleSearch = (value: string) => {
    setSearchTitleText(value);
    if (!value) {
      setDataSource(defaultData); // 如果搜索框为空，重置为默认数据
    } else {
      const filteredData = defaultData.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setDataSource(filteredData);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    // 模拟从服务端重新获取数据
    setTimeout(() => {
      setDataSource(defaultData); // 重新设置数据源
      setIsLoading(false);
      message.success("刷新成功");
    }, 1000); // 延迟 2 秒刷新
  };

  const columns: ProColumns<TaskItem>[] = [
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
      search: true,
    },
    {
      title: "负责人",
      dataIndex: "responsisbleName",
      render: (dom, entity) => (
        <div className="task-list-avatar-wrapper">
          <img
            className="task-list-avatar"
            src={entity.responsisbleAvatar}
            alt={entity.responsisbleName}
          />
          <span> {entity.responsisbleName} </span>
        </div>
      ),
      renderFormItem: (item, { defaultRender, ...rest }, form) =>
        personRenderFormItem(item, { defaultRender, ...rest }, form),
      search: true,
      width: 200,
      align: "center",
      ellipsis: true,
    },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      filters: [
        { text: "TODO", value: "TODO" },
        { text: "进行中", value: "processing" },
        { text: "已完成", value: "finished" },
        { text: "延期中", value: "postponing" },
        { text: "已终止", value: "stopped" },
      ],
      onFilter: (value, record) => record.state === value,
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
      search: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: "主要内容",
      dataIndex: "decs",
      tooltip: "内容过长会自动收缩，突出重点任务内容，建议不超过500字",
      ellipsis: true,
      search: false,
    },
    {
      title: "计划完成日期",
      dataIndex: "due_to_finish",
      valueType: "date",
      sorter: (a, b) => {
        return (
          new Date(a.due_to_finish).getTime() -
          new Date(b.due_to_finish).getTime()
        );
      },
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "update_at",
      valueType: "date",
      tooltip: "编辑保存后，时间会自动更新",
      search: false,
    },
    {
      title: "创建时间",
      key: "showTime",
      dataIndex: "created_at",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateRange",
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      hideInTable: true,
    },
    {
      title: "操作",
      valueType: "option",
      align: "center",
      width: 150,
      render: (text, record, _, action) => (
        <div className="action-buttons">
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
              // 服务端数据更新
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ];

  return (
    <EditableProTable<TaskItem>
      columns={columns}
      actionRef={actionRef}
      defaultValue={defaultData}
      value={dataSource}
      cardBordered
      editable={{
        type: "multiple",
        editableKeys,
        onSave: async (rowKey, data, row) => {
          setIsLoading(true);
          // 服务端数据更新
          console.log("onSave: ", rowKey, data, row);
          let isNew = true;
          const newData = dataSource.map((item) => {
            if (item.id === rowKey) {
              isNew = false;
              return { ...item, ...data };
            } else return item;
          });
          if (isNew) {
            const selectedOption = options.find(
              (option) => option.value === data.responsisbleName
            );
            newData.push({
              ...data,
              id: rowKey as any,
              responsisbleAvatar: selectedOption?.avatar || "",
            });
          }
          setDataSource(newData);
          await waitTime(2000);
          setIsLoading(false);
        },
        onChange: setEditableRowKeys,
        actionRender: (row, config, dom) => [dom.save, dom.cancel],
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      recordCreatorProps={{
        position: "bottom", // 可以设置为 'top' 或 'bottom'
        record: () => ({
          id: Date.now(),
          title: "",
          decs: "",
          responsisbleAvatar: "",
          responsisbleName: "",
          state: "TODO",
          due_to_finish: new Date().toISOString(),
          update_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }), // 初始化新行数据
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
        defaultColsNumber: 4,
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
        reload: handleReload,
      }}
      loading={isLoading}
      dateFormatter="string"
      tableLayout="auto"
      request={async (params, sorter, filter) => {
        // 确保在这里处理搜索参数
        console.log("query params: ", "1:", params, "2:", sorter, "3:", filter);

        const filteredData = defaultData.filter((item) => {
          const created_at = new Date(item.created_at).getTime();
          const startTime = params.startTime
            ? new Date(params.startTime).getTime()
            : 0;
          const endTime = params.endTime
            ? new Date(params.endTime).getTime()
            : Infinity;
         
          return Object.keys(params).every((key) => {
            if (!params[key]) return true; // 如果参数为空，跳过过滤
            if (
              key === "responsisbleName" &&
              item.responsisbleName.includes(params[key])
            ) {
              return true; // 过滤负责人的名称
            }
            // 处理其他搜索条件
            if (key === "title" && item.title.includes(params[key])) {
              return true;
            }
            if (key === "state" && item.state === params[key]) {
              return true;
            }

            // 处理日期搜索
            if (key === "startTime" || key === "endTime") {
              return created_at >= startTime && created_at <= endTime; // 按时间段过滤
            }
            return false;
          });
        });
        setDataSource(filteredData);
        console.log("filteredData: ", filteredData);
        return {
          data: filteredData,
          success: true,
        };
      }}
    />
  );
}
