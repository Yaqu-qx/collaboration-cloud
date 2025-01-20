// src/models/userModel.ts
export interface User {
    username: string;
    password: string; // 注意: 密码通常会被加密存储
}

export const users: User[] = [
    { username: 'admin', password: '123456' },
    { username: 'user', password: 'password' }
];
