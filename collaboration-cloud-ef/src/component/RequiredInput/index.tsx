import React from "react";
import "./index.scss";
import { Input } from "antd";

interface IProps {
  label: string;
  placeholder: string;
  prefix?: React.ReactNode;
  faq?: string;
  width?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RequiredInput(props: IProps) {
  return (
    
    <div className="required-input">
      <p className="input-label">
        {" "}
        {props.label} <span style={{ color: "red" }}>*</span>
      </p>
      <Input
        size="large"
        placeholder={props.placeholder}
        prefix={props.prefix}
        onChange={props.onInputChange}
        style={{ width: props.width }}
      />
      <p className="faq">{props.faq}</p>
    </div>
  );
}
