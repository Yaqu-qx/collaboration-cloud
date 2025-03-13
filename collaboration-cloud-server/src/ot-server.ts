// // 服务端代码
// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   socket.on('doc_update', ({ channelId, content }) => {
//     // 这里添加保存到数据库的逻辑
//     console.log(`Received update from channel ${channelId}: ${content}`);
//     // 然后广播给同频道的其他客户端
//     socket.to(channelId).emit('doc_update', content);
//     socket.join(channelId);
//   });
// });

// server.listen(3001);