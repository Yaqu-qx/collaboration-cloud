// globalState.ts
interface UserInfo {
  id: string;
  name: string;
  password: string;
  account: string;
  telephone: string;
  sex: string;
  age: number;
  class: string;
  portrait: string;
}

let globalUserInfo: UserInfo | null = null;

export const setGlobalUserInfo = (userInfo: UserInfo | null) => {
  globalUserInfo = userInfo;
};

export const getGlobalUserInfo = (): UserInfo | null => {
  return globalUserInfo;
};

export const getUserPortrait = (): String | undefined => {
  return globalUserInfo?.portrait;
};

export const getUserAccount = (): String | undefined => {
  return globalUserInfo?.account;
};

export const getUserName = (): String | undefined => {
  return globalUserInfo?.name;
};
