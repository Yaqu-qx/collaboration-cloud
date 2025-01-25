import React from "react";
import { Tag } from "antd";
import { tagColor } from "@/constant/const";

interface IProps {
  tags: string[];
}

export default function ColoredTags(props: IProps) {
  const { tags } = props;

  return (
    <>
      {tags.map((tag) => (
        <Tag color={tagColor[tag]} key={tag}>
          {tag}
        </Tag>
      ))}
    </>
  );
}
