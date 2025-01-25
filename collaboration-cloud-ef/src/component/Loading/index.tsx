import react, { useState } from "react";
import "./index.scss";
import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default function Loading() {
  return (
    <div className="loading-container">
      <Spin tip="Loading" size="large">
        {content}
      </Spin>  
    </div>
  );
}
