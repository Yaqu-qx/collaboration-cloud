import React from "react";
import "./index.scss";
import { Select } from "antd";
import defaultAvater from "../../assets/defaultAvater.png";

type optionType = {
  value: string;
  label: string;
  avatar?: string;
};

interface IProps {
  required?: boolean;
  mode?: "multiple" | "tags" | undefined;
  showSearch: boolean;
  label: string;
  placeholder: string;
  prefix?: React.ReactNode;
  faq?: string;
  width?: string;
  options?: optionType[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectInput(props: IProps) {
  return (
    <div className="select-input">
      <p className="input-label">
        {" "}
        {props.label}{" "}
        {props.required && <span style={{ color: "red" }}>*</span>}
      </p>
      <Select
        mode={props?.mode}
        showSearch={props.showSearch}
        loading={false}
        size="large"
        placeholder={props.placeholder}
        prefix={props.prefix}
        onChange={props.onInputChange}
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
      />
      <p className="faq">{props.faq}</p>
    </div>
  );
}
