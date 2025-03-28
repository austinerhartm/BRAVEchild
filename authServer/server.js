import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import getRoutes from './routes/get.js';
import sponsorRoutes from './routes/sponsor.js';
import postRoutes from './routes/post.js';
import paymentRoutes from './routes/payment.js';

const app = express();

const PORT = process.env.PORT || 8081;

const sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://localhost:3000'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(express.json());
app.use(cors(corsOptions));
app.use('/fetch', getRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/sponsor', sponsorRoutes); 
app.use('/payment', paymentRoutes);

https.createServer(sslOptions, app).listen(PORT, 'localhost', () => {
    console.log(`Secure server running at https://localhost:${PORT}`);
});
