
import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import getRoutes from './routes/get.js';

const app = express();

const PORT = process.env.PORT || 8081;

const sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

const allowedOrigins = ['https://localhost:3000']
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true, withCredentials: true }));
app.use('/fetch', getRoutes);
app.use('/auth', authRoutes);

https.createServer(sslOptions, app).listen(PORT, 'localhost', () => {
    console.log(`Secure server running at https://localhost:${PORT}`);
});
