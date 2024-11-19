const express = require('express');
const path = require('path');

const app = express();
const PORT = 3; // Cổng server sẽ chạy

let isToaimeRunning = false; // Trạng thái app TOAIME

// Phục vụ file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint '/boc' để chuyển hướng
app.get('/boc', (req, res) => {
  if (isToaimeRunning) {
    // Nếu TOAIME đang chạy, trả về trang chứa logic chuyển hướng
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    res.status(503).send('TOAIME không hoạt động.');
  }
});

// API bật TOAIME
app.get('/start', (req, res) => {
  isToaimeRunning = true;
  res.send('TOAIME đã bật.');
});

// API tắt TOAIME
app.get('/stop', (req, res) => {
  isToaimeRunning = false;
  res.send('TOAIME đã tắt.');
});

// Chạy server trên cổng và cho phép truy cập từ mọi IP
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy trên http://0.0.0.0:${PORT}`);
});
