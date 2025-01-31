const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const recordsRoutes = require('./routes/records');  // 正確引入 routes

console.log("Loaded recordsRoutes:", recordsRoutes); // 確認 Router 是否正確載入

const app = express();
const port = process.env.PORT || 5000;
const morgan = require('morgan');

// ✅ 中間件
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// ✅ **確保 API 路由正確掛載**
app.use('/api/records', recordsRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance')
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ✅ **檢查註冊的路由**
console.log("Registered routes:", app._router.stack.map(r => r.route ? r.route.path : r.name));
