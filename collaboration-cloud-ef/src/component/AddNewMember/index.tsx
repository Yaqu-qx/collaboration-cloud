import React, { useState } from "react";
import "./index.scss";
import SelectInput from "@/component/SelectInput";
import type { SelectProps } from "antd";
import allMembers from "@/constant/allMembers.json";
import { Button } from "antd";
import defaultAvater from "@/assets/defaultAvater.png";

type Iprops = {
  onClose: () => void;
  onInvite?: (members: string[]) => void;
};

const options: SelectProps["options"] = allMembers.map((member) => ({
  ...member,
  avatar: member.avatar.trim() || defaultAvater, // 使用导入的默认头像
}));

export default function AddNewMember(props: Iprops) {
  const [selectMembers, setSelectMembers] = useState<string[]>([]);
  const { onClose } = props;
  const [isInvited, setIsInvited] = useState(false);
  return (
    <div
      className="add-new-member-mask"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {!isInvited ? (
        <div className="add-new-member" onClick={(e) => e.stopPropagation()}>
          <SelectInput
            value={selectMembers}
            onChange={(value: any) => setSelectMembers(value)}
            maxCount={10}
            required={false}
            mode="multiple"
            label="邀请成员"
            showSearch={true}
            placeholder="选择成员"
            width="23rem"
            options={options as any}
            faq="请选择邀请的成员，注意一次邀请最多不能超过10人，每个项目最多不能超过30人。"
          />
          <div className="operation-btns">
            <Button type="text" onClick={onClose}>
              取消
            </Button>
            <Button
              disabled={selectMembers.length === 0}
              type="primary"
              onClick={(e) => {
                e.stopPropagation(); // 阻止按钮点击冒泡
                setIsInvited(true);
              }}
              className="invite-btn"
            >
              批量邀请
            </Button>
          </div>
        </div>
      ) : (
        <div className="invite-success">
          <p >已成功发送邀请，待对方接收！</p>
          <Button type="primary" onClick={onClose} className="invite-success-btn">
            确定
          </Button>
        </div>
      )}
    </div>
  );
}
