import { useState, useEffect } from "react";
import "./index.scss";
import { Drawer, Space, Button, Input, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MailInfo } from "@/typings/type";
import MailCard from "./MailCard";
import { getMailMessage } from "@/utils/server";
import { getUserId } from "@/utils/globalState";
import type { SearchProps } from "antd/lib/input";
import { tags } from "./const";
import MailSendPanel from "@/component/MailSendPanel";

interface Iprops {
  open: boolean;
  onClose: () => void;
  haveNoRead: boolean;
  onNoRead: () => void;
}
const { Search } = Input;

export default function MailDrawer(props: Iprops) {
  const { open, onClose } = props;
  const [mailList, setMailList] = useState<MailInfo[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedList, setSearchedList] = useState<MailInfo[]>([]);
  const [showSendPanel, setShowSendPanel] = useState(false);

  useEffect(() => {
    // TODO: 获取邮件列表
    getMailMessage(getUserId() || "123456777")
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setMailList(res?.data ?? []);
        setSearchedList(res?.data ?? []);
      });
  }, []);

  const handleMailDelete = (mailId: string) => {
    const newMailList = mailList.filter((item) => item.messageId !== mailId);
    setMailList(newMailList);
    handleSearchMail(searchValue);
  };

  const handleSearchMail = (value: string) => {
    if (!value) {
      setSearchedList(mailList);
      return;
    }
    const newMailList = mailList.filter(
      (item) =>
        item.content?.includes(value) ||
        item.fromName?.includes(value) ||
        item.description?.includes(value) ||
        tags[item.tagType].title === value
    );
    setSearchedList(newMailList);
  };

  const handleMailUpdate = (mailId: string, newType: number) => {
    const newMailList = mailList.map((item) => {
      if (item.messageId === mailId) {
        return { ...item, tagType: newType };
      }
      return item;
    });
    setMailList(newMailList);
    handleSearchMail(searchValue);
  };

  return (
    <Drawer
      title="收件箱"
      placement={"right"}
      width={"40rem"}
      className="mail-drawer"
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => setShowSendPanel(true)}
            style={{ background: "green" }}
            icon={<PlusOutlined />}
          >
            发私信
          </Button>
        </Space>
      }
    >
      <MailSendPanel
        isSomeOne={false}
        showSendPanel={showSendPanel}
        setShowSendPanel={setShowSendPanel} // 正确绑定自身状态
      />
      <Search
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value);
          handleSearchMail(e.target.value);
        }}
        placeholder="搜索信件 支持匹配标题、内容、发件人"
        onSearch={() => handleSearchMail(searchValue)}
        allowClear
        className="mail-search"
        style={{ marginBottom: "1rem" }}
      />
      <div className="mail-list">
        {searchedList.length === 0 && <Empty />}
        {searchedList.map((item, index) => (
          <MailCard
            key={index}
            mailInfo={item}
            onMailDelete={handleMailDelete}
            onMailUpdate={handleMailUpdate}
          />
        ))}
      </div>
    </Drawer>
  );
}
