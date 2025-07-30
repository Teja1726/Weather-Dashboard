const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.OPENWEATHERMAP_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: 'City is required' });

  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.cod !== 200) {
      res.json({ error: data.message });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
