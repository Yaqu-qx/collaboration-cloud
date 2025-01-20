import React, { useState } from "react";
import "./index.scss";

interface Iprops {
  onPanelVisible: (visible: boolean) => void;
}

export default function CreatePanel(props: Iprops) {
  const { onPanelVisible } = props;

  return (
    <>
      <div className="panel-header"></div>
      {/* // 滚动 */}
      <div className="panel-body"></div>
      <div className="panel-footer"></div>
    </>
  );
}
