import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import express from 'express';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit('user-connected', socket.id);
    });

    socket.on('offer', ({ to, offer }) => {
      socket.to(to).emit('offer', { from: socket.id, offer });
    });

    socket.on('answer', ({ to, answer }) => {
      socket.to(to).emit('answer', { from: socket.id, answer });
    });

    socket.on('ice-candidate', ({ to, candidate }) => {
      socket.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });

    socket.on('chat-message', ({ roomId, message }) => {
      io.to(roomId).emit('chat-message', message);
    });

    socket.on('whiteboard-draw', ({ roomId, data }) => {
      socket.to(roomId).emit('whiteboard-draw', data);
    });

    socket.on('whiteboard-clear', (roomId) => {
      socket.to(roomId).emit('whiteboard-clear');
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  expressApp.all(/.*/, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
