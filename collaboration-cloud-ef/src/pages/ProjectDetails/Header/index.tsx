import React from "react";
import "./index.scss";
import { EllipsisOutlined } from "@ant-design/icons";
import ColoredTags from "@/component/ColoredTags";

interface Props {
  title: string;
  imageUrl: string;
  tags: string[];
}

export default function Header(props: Props) {
  const { title, imageUrl, tags } = props;
  return (
    <div className="header">
      <img src={imageUrl} alt="project-image" className="project-image" />
      <p className="project-title"> {title} </p>

      <div className="tags-container">
        <ColoredTags tags={tags} />
      </div>
      <EllipsisOutlined className="more-icon" />
    </div>
  );
}
