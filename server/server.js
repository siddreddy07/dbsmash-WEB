import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { genAi } from './src/services/GeminiApi.js';
import redis from './src/config/redis.js';

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  const forwarded = socket.handshake.headers['x-forwarded-for'];
  let ip = (forwarded || socket.handshake.address || '').split(',')[0].trim();
  if (ip === '::1' || ip === '127.0.0.1') ip = 'localhost-dev';
  const rediskey = `iplimit:${ip}`;

  // Handle prompt
  socket.on('sendPrompt', async (userPrompt) => {
    console.log('📝 Prompt received:', userPrompt);

    try {
      const currentCount = await redis.get(rediskey);
      const count = currentCount ? parseInt(currentCount) : 0;

      if (count >= 2) {
        socket.emit('limitexceeded', '🚫 Daily Limit Exceeded (2 prompts/day)');
        return socket.disconnect(true);
      }

      // Call Gemini API
      const response = await genAi(userPrompt);

      if (response) {
        socket.emit('airesponse', response);

        // ✅ Now increase the prompt count
        const newCount = await redis.incr(rediskey);
        if (newCount === 1) {
          await redis.expire(rediskey, 86400); // Set expiry on first prompt
        }

      } else {
        socket.emit('aiError', '❌ Empty response from AI');
      }
    } catch (error) {
      console.error('❌ Prompt Error:', error);
      socket.emit('aiError', '⚠️ Something went wrong.');
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});