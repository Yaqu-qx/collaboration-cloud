import React, { useState } from "react";
import "./index.scss";
import { Badge, Typography, Input } from "antd";
import { CheckSquareTwoTone, EditTwoTone } from "@ant-design/icons";
import { INTRODUCE_EXEPAMPLE } from "../constant"

const { Paragraph } = Typography;
const { TextArea } = Input;

interface EllipsisConfig {
  rows?: number;
  expandable?: boolean | "collapsible";
  expanded?: boolean;
  onExpand?: (arg1: any, arg2: any) => void;
  symbol?: string;
}

interface IProps {
  mainIntro: string;
  feature: string;
  goalsAndVision: string;
}

export default function ProjectIntroduce(props: IProps) {
  const [mainIntro, setMainIntro] = useState(props.mainIntro || INTRODUCE_EXEPAMPLE.mainIntro);
  const [feature, setFeature] = useState(props.feature || INTRODUCE_EXEPAMPLE.feature);
  const [goalsAndVision, setGoalsAndVision] = useState(props.goalsAndVision || INTRODUCE_EXEPAMPLE.goalsAndVision);
  const [expanded, setExpanded] = useState(false);

  const [editFeature, setEditFeature] = useState(false);
  const [editGoalsAndVision, setEditGoalsAndVision] = useState(false);
  const [editMainIntro, setEditMainIntro] = useState(false);

  const ellipsisProps: EllipsisConfig = {
    rows: 6,
    expandable: "collapsible",
    expanded,
    onExpand: (_: any, info: any) => setExpanded(info.expanded),
    symbol: expanded ? "收起" : "展开",
  };

  const displayStrToList = (str: string) => {
    const arr = str.split("\n");
    return arr.map((item, index) => <div key={index}>{item}</div>);
  };

  return (
    <div className="info-block">
      <p className="title"> 项目介绍 </p>
      <Badge
        status="processing"
        text="该项目主要是干什么的？"
        className="badge"
      />
      {editMainIntro ? (
        <div className="text-edit">
          <TextArea
            className="intro-text-edit"
            value={mainIntro}
            onChange={(e) => setMainIntro(e.target.value)}
            rows={6}
          />
          <CheckSquareTwoTone onClick={() => setEditMainIntro(false)} />
        </div>
      ) : (
        <div className="text-edit">
          <Paragraph
            className="intro-text"
            // editable={{ onChange: setMainIntro, text: mainIntro }}
            ellipsis={ellipsisProps}
          >
            {displayStrToList(mainIntro)}
          </Paragraph>
          <EditTwoTone onClick={() => setEditMainIntro(true)} />
        </div>
      )}
      <Badge status="processing" text="项目特点" className="badge" />
      {editFeature ? (
        <div className="text-edit">
          <TextArea
            className="feature-text"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            rows={6}
          />
          <CheckSquareTwoTone onClick={() => setEditFeature(false)} />
        </div>
      ) : (
        <div className="text-edit">
          <Paragraph
            className="feature-text"
            // editable={{ onChange: setFeature, text: feature }}
            ellipsis={ellipsisProps}
          >
            {displayStrToList(feature)}
          </Paragraph>
          <EditTwoTone onClick={() => setEditFeature(true)} />
        </div>
      )}
      <Badge status="processing" text="目标与展望" className="badge" />
      {editGoalsAndVision ? (
        <div className="text-edit">
          <TextArea
            className="goalsAndVision-text"
            value={goalsAndVision}
            onChange={(e) => setGoalsAndVision(e.target.value)}
            rows={6}
          />
          <CheckSquareTwoTone onClick={() => setEditGoalsAndVision(false)} />
        </div>
      ) : (
        <div className="text-edit">
          <Paragraph className="goalsAndVision-text" ellipsis={ellipsisProps}>
            {displayStrToList(goalsAndVision)}
          </Paragraph>
          <EditTwoTone onClick={() => setEditGoalsAndVision(true)} />
        </div>
      )}
    </div>
  );
}
