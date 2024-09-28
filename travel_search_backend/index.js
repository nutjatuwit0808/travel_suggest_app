const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const port = 9000;

// Middleware สำหรับการ parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
};

// Enable CORS with options
app.use(cors(corsOptions));

// ตั้งค่า json-server
const router = jsonServer.router('db.json'); // ไฟล์ db.json ที่สร้างไว้
const middlewares = jsonServer.defaults();

// ดึงข้อมูลตาม ID (GET by ID)
app.get('/api/trips/:id', (req, res) => {
  const db = router.db;
  const tripId = req.params.id;
  const trip = db.get('trips').find({ eid: tripId }).value();

  if (trip) {
    res.json(trip);
  } else {
    res.status(404).json({ message: 'Trip not found' });
  }
});

// ลบข้อมูลตาม ID (DELETE)
app.delete('/api/trips/:id', (req, res) => {
  const db = router.db;
  const tripId = req.params.id;
  const trip = db.get('trips').find({ eid: tripId }).value();

  if (trip) {
    db.get('trips').remove({ eid: tripId }).write();
    res.json({ message: `Trip with ID ${tripId} deleted successfully` });
  } else {
    res.status(404).json({ message: 'Trip not found' });
  }
});

// ดึงข้อมูลทั้งหมด (GET all)
app.get('/api/trips', (req, res) => {
  const db = router.db; // เข้าถึง lowdb instance
  const trips = db.get('trips').value(); // ดึงข้อมูลทั้งหมดจาก "trips"
  
  const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';

  // ถ้ามีการค้นหาโดยใช้ keyword
  if (keyword) {
    const filteredTrips = trips.filter(trip => {
      const title = trip.title.toLowerCase();
      const description = trip.description.toLowerCase();
      const tags = trip.tags.map(tag => tag.toLowerCase());

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        tags.some(tag => tag.includes(keyword))
      );
    });
    return res.json(filteredTrips);
  }

  // ถ้าไม่มีการค้นหาโดยใช้ keyword, ให้แสดงข้อมูลทั้งหมด
  res.json(trips);
});

// ใช้งาน json-server ภายใต้ route /api
app.use('/api', middlewares, router);

// เริ่มการทำงานของเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});