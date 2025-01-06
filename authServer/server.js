require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(8080, '0.0.0.0', () => console.log('API is running on http://localhost:8080/login'));
