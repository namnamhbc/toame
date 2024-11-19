const express = require('express');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

let isToaimeRunning = false; // Trạng thái mặc định là OFF

// Cấu hình CORS: Chỉ cho phép từ www.nydravn.site
app.use(cors({
  origin: 'https://www.nydravn.site',
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

// Endpoint chính cho khách hàng truy cập
app.get('/emsjapan', (req, res) => {
  if (isToaimeRunning) {
    res.redirect('https://www.nydravn.site/emsnhatban');
  } else {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
});

// Endpoint mặc định cho "/"
app.get('/', (req, res) => {
  res.send('Welcome to TOAIME! Server is running.');
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
