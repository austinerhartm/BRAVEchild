require('dotenv').config();

const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const getRoutes = require('./routes/get');

const app = express();

const PORT = 8081;

const sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

app.use(cors());

app.use(express.json());
app.use('/fetch', getRoutes);
app.use('/auth', authRoutes);

https.createServer(sslOptions, app).listen(PORT, 'localhost', () => {
    console.log(`Secure server running at https://localhost:${PORT}`);
});
