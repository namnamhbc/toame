const express = require('express');
const path = require('path');
const cors = require('cors'); // Import thư viện CORS

const app = express();
const PORT = process.env.PORT || 3000;

let isToaimeRunning = false;

// Cấu hình CORS: chỉ cho phép trang web "www.nydravn.site" truy cập API
app.use(cors({
  origin: 'https://www.nydravn.site', // Đường dẫn của trang Ladipage
}));

// API kiểm tra trạng thái chuyển hướng
app.get('/status', (req, res) => {
  res.json({ redirectEnabled: isToaimeRunning });
});

// API bật chuyển hướng
app.get('/start', (req, res) => {
  isToaimeRunning = true;
  res.json({ message: 'Chuyển hướng đã được bật', redirectEnabled: true });
});

// API tắt chuyển hướng
app.get('/stop', (req, res) => {
  isToaimeRunning = false;
  res.json({ message: 'Chuyển hướng đã được tắt', redirectEnabled: false });
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
