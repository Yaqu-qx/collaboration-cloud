import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

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

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
}

// 创建用户上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 定义一个自定义的 Hook 方便使用上下文
export const useUserInfo = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// 提供者组件
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
