// server/src/server.ts
import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // 前端地址
    methods: ["GET", "POST"]
  }
});

// 文档存储路径
const DOCS_DIR = path.join(__dirname, '../collaborationFiles');

// 确保存储目录存在
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR);
}

// 文档操作
const getDocPath = (channelId: string) => path.join(DOCS_DIR, `${channelId}.json`);

io.on('connection', (socket) => {
  socket.on('join', (channelId: string) => {
    const docPath = getDocPath(channelId);
    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf-8');
      socket.emit('init-data', content);
    } else {
      socket.emit('init-data', '');
    }
  });

  socket.on('save-doc', ({ channelId, content }) => {
    fs.writeFileSync(getDocPath(channelId), content);
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});