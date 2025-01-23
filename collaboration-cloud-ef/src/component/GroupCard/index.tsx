import React from "react";
import "./index.scss";
import { groupInfo } from "@/typings/api/project_info";

interface Props {
  group: groupInfo;
}

export default function GroupCard(props: Props) {
  return <div className="group-card">group card</div>;
}
