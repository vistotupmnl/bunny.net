require('dotenv').config();
const express = require('express');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(express.json());

app.use('/api/videos', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`VISTO API running on http://localhost:${PORT}`);
});
