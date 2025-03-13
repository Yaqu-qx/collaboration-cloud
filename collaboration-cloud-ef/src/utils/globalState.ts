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

export const getUserPortrait = (): string | undefined => {
  return globalUserInfo?.portrait ?? 'https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg';
};

export const getUserAccount = (): string | undefined => {
  return globalUserInfo?.account;
};

export const getUserName = (): string | undefined => {
  return globalUserInfo?.name;
};

export const getUserTelephone = (): string | undefined => {
  return globalUserInfo?.telephone;
};

export const getUserId = (): string | undefined => {
  return globalUserInfo?.id;
};

export const getUserPassword = (): string | undefined => {
  return globalUserInfo?.password;
};