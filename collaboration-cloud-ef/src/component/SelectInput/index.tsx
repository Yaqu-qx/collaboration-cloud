import React from "react";
import "./index.scss";
import { Select, Tag } from "antd";
import defaultAvater from "@/assets/defaultAvater.png";
import type { SelectProps } from 'antd';

type optionType = {
  value: string;
  label: string;
  avatar?: string;
};

interface IProps {
  value: string | string[];
  tagColor?: {
    [key: string]: string;
};
  maxCount?: number;
  notFoundNode?: React.ReactNode;
  required?: boolean;
  mode?: "multiple" | "tags" | undefined;
  showSearch: boolean;
  label: string;
  placeholder: string;
  prefix?: React.ReactNode;
  faq?: string;
  width?: string;
  options?: optionType[];
  onChange?: (value: string|string[]) => void; 
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
type TagRender = SelectProps['tagRender'];
// const tagRender: TagRender = (tagProps) => {
//   const { label, value, closable, onClose } = tagProps;
//   const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   return (
//     <Tag
//       color={props.tagColor[label as string]}
//       onMouseDown={onPreventMouseDown}
//       closable={closable}
//       onClose={onClose}
//       style={{ marginInlineEnd: 4 }}
//     >
//       {label}
//     </Tag>
//   );
// };

export default function SelectInput(props: IProps) {

    const tagRender: TagRender = (tagProps) => {
      const { label, value, closable, onClose } = tagProps;
      const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color={(props.tagColor && props.tagColor[label as string])} 
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginInlineEnd: 4 }}
        >
          {label}
        </Tag>
      );
    };
  
  return (
    <div className="select-input">
      <p className="input-label">
        {" "}
        {props.label}{" "}
        {props.required && <span style={{ color: "red" }}>*</span>}
      </p>
      <Select
        value={props.value}
        maxCount={props.maxCount}
        notFoundContent={props?.notFoundNode}
        mode={props?.mode}
        showSearch={props.showSearch}
        loading={false}
        size="large"
        placeholder={props.placeholder}
        prefix={props.prefix}
        onChange={props.onChange}
        style={{ width: props.width }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={props.options}
        optionRender={(option) => (
          <div className="tea-option">
            <img
              src={option.data?.avatar ?? defaultAvater}
              className="tea-avatar"
            />
            {option.data.label}
          </div>
        )}
        tagRender={props?.tagColor ? tagRender : undefined}
      />
      <p className="faq">{props.faq}</p>
    </div>
  );
}
