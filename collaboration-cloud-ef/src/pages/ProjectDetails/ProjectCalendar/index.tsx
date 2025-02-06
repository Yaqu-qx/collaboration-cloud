import React, { useState, useEffect } from "react";
import "./index.scss";
import type { BadgeProps, CalendarProps, DatePickerProps } from "antd";
import {
  DatePicker,
  Badge,
  Calendar,
  Modal,
  Input,
  Button,
  Select,
  message,
} from "antd";
import type { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

const dateListData = [
  {
    date: "2025-01-01",
    listData: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
    ],
  },
  {
    date: "2025-02-10",
    listData: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
      { type: "error", content: "This is error event." },
    ],
  },
  {
    date: "2025-01-15",
    listData: [
      { type: "warning", content: "This is warning event" },
      { type: "success", content: "This is very long usual event......" },
      { type: "error", content: "This is error event 1." },
      { type: "error", content: "This is error event 2." },
      { type: "error", content: "This is error event 3." },
      { type: "error", content: "This is error event 4." },
    ],
  },
];

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function ProjectCalendar() {
  const [listData, setListData] = useState( dateListData );
  const [newEventContent, setNewEventContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedLevel, setSelectedLevel] = useState<{label: string, value: string}>({label:"普通", value:"success"});


  const getListData = (value: Dayjs) => {
    const dateKey = value.format("YYYY-MM-DD");
    const data = listData.find((item) => item.date === dateKey);
    return data?.listData || [];
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectedDate(dateString as string);
  };

  const handleAddEvent = () => {
    if (!selectedDate || !selectedLevel || !newEventContent) {
      message.warning("请选择日期、事件等级，并填写事项内容！");
      return;
    }

    const dateKey = selectedDate;
    const newDateListData = listData.map((item) => ({
      ...item,
      listData: [...item.listData],
    }));
    const dateData = newDateListData.find((item) => item.date === dateKey);

    if (dateData) {
      dateData.listData.push({ type: selectedLevel.value, content: newEventContent });
    } else {
      newDateListData.push({
        date: dateKey,
        listData: [{ type: selectedLevel.value, content: newEventContent }],
      });
    }

    setListData(newDateListData);
    setNewEventContent("");
    setSelectedDate(undefined);
    setSelectedLevel({label:"普通", value:"success"});
    setModalVisible(false);
    message.success("日事项添加成功！");
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className="add-event-btn"
      >
        <PlusOutlined />
        添加日事项
      </Button>
      <Calendar cellRender={cellRender} />
      <Modal
        title="添加日事项"
        open={modalVisible}
        centered={true}
        okText="添加"
        cancelText="取消"
        onCancel={() => setModalVisible(false)}
        onOk={handleAddEvent}
        className="add-event-modal"
      >
        <div className="add-event-modal-selection">
          <div>
            <span>请选择日期：</span>
            <DatePicker onChange={onDateChange} />
          </div>
          <div>
            <span>事件等级：</span>
            <Select
              value={selectedLevel}
              options={[
                { label: "普通", value: "success" },
                { label: "重要", value: "warning" },
                { label: "紧急", value: "error" },
              ]}
              optionRender={(option) => {
                return (
                  <Badge
                    status={option.value as BadgeProps["status"]}
                    text={option.label}
                  />
                );
              }}
              labelRender={(option) => {
                return (
                  <Badge
                    status={option.value as BadgeProps["status"]}
                    text={option.label}
                  />
                );
              }}
              defaultValue={{ label: "普通", value: "success" }}
              onChange={(_,item : any) => {
                // console.log(item);
                setSelectedLevel(item);
              }}
            />
          </div>
        </div>

        <Input.TextArea
          rows={3}
          className="add-event-modal-content"
          placeholder="请输入事项内容"
          value={newEventContent}
          onChange={(e) => setNewEventContent(e.target.value)}
        />
      </Modal>
    </>
  );
}
