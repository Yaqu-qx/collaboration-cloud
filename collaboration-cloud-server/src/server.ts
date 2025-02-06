import mysql from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {attachPublicRoutes} from './routes';

const app = express();

//npx ts-node src/server.ts

// 添加中间件
app.use(cors());
// app.use(bodyParser.json());

// 路由
// 添加处理根路径的 GET 请求 
app.get('/', (req, res) => { res.send('Welcome to the Express server!'); });
attachPublicRoutes(app);
// 监听端口
const PORT = 4000; 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});