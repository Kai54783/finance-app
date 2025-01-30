const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // 使用 .env 環境變數
const recordsRoutes = require('./routes/records');  // 引入 records 路由

const app = express();
const port = process.env.PORT || 5000; // 使用環境變數 PORT
const morgan = require('morgan')

// 中間件
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// 連接 MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance')
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

// 註冊路由
app.use('/api/records', recordsRoutes);

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
