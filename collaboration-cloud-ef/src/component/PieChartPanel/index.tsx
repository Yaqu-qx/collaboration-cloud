import React, { useState } from "react";
import "./index.scss";
import { PieChart } from "@mui/x-charts";
import { PIE_CHART_COLORS } from "./pieConstant";
import { PlusSquareTwoTone } from "@ant-design/icons";

const taskStatus = [
  { label: "计划中", value: 2 },
  { label: "新创建", value: 5 },
  { label: "推进中", value: 8 },
  { label: "已停滞", value: 5 },
  { label: "已完成", value: 10 },
  { label: "任务总计", value: 30 },
];

const centerDisplay = (index: number) => {
  const percentage =
    (taskStatus[index].value / taskStatus[taskStatus.length - 1].value) * 100;
  let value = percentage.toFixed(2) + "%";
  if (index === taskStatus.length - 1) {
    value = `${taskStatus[index].value}项`;
  }
  return (
    <div className="pie-center">
      <p
        className="center-title"
        style={{ color: PIE_CHART_COLORS.active[index] }}
      >
        {value}
      </p>
      <p className="center-value">{taskStatus[index].label}</p>
    </div>
  );
};

export default function PieChartPanel() {
  const [data, setData] = useState(taskStatus);
  const [labelColors, setLabelColors] = useState(PIE_CHART_COLORS.unactive);
  const [selectedItem, setSelectedItem] = useState(
    (taskStatus.length - 1) as number
  );
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const displayIndex = hoveredItem !== null ? hoveredItem : selectedItem;

  const handleItemClieck = (value: any) => {
    console.log(value.dataIndex);
    // todo 跳转到list详情页面
  };

  // 颜色加深跟谁hover选项
  const updateColors = (selectedIndex: number) => {
    setLabelColors(() => {
      const newColors = [...PIE_CHART_COLORS.unactive];
      newColors[selectedIndex] = PIE_CHART_COLORS.active[selectedIndex];
      return newColors;
    });
  };

  const handleLegendClick = (index: number) => {
    setSelectedItem(index);
    updateColors(index);
  };

  const handleLegendHover = (index: number) => {
    setHoveredItem(index); // 悬停时更新 hoveredItem
    updateColors(index);
  };

  const handleLegendLeave = () => {
    setHoveredItem(null); // 鼠标移出时清除悬停状态
    updateColors(selectedItem);
  };

  return (
    <div className="pie-chart-panel">
      <p className="panel-title">项目进度总览</p>
      <p className="panel-desc">
        展示项目各阶段任务的数据分布，点击查看list详情
      </p>
      <div className="pie-container">
        <PieChart
          className="pie-chart"
          colors={labelColors}
          series={[
            {
              data: data.slice(0, 5),
              innerRadius: 55,
              outerRadius: 100,
              highlightScope: { fade: "global", highlighted: "item" },
              highlighted: { additionalRadius: 2 },
            },
          ]}
          height={200}
          width={200}
          margin={{ left: 100 }}
          slotProps={{
            legend: { hidden: true },
          }}
          onItemClick={(_, value) => handleItemClieck(value)}
        />
        {centerDisplay(displayIndex)}
        <div className="pie-legend">
          {data.slice(0, 5).map((item, index) => (
            <div
              className="legend-item"
              key={index}
              onClick={() => handleLegendClick(index)}
              onMouseEnter={() => handleLegendHover(index)}
              onMouseLeave={() => handleLegendLeave()}
            >
              <span
                className="color-block"
                style={{ backgroundColor: PIE_CHART_COLORS.active[index] }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}

          <div className="legend-bottom">
            <div className="total">
              <span className="bottom-text"> Total </span>
              <span className="legend-value">
                {data[data.length - 1].value}
              </span>
            </div>
            <div className="divider" />
            <div className="add-task" onClick={() => {}}>
              <PlusSquareTwoTone />
              <p className="bottom-text"> 新建任务状态 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
