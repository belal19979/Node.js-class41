import express from 'express';
import fetch from 'node-fetch';
import { keys } from './sources/keys.js';
export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ weatherText: 'City is not found!' });
  }

  const { API_KEY } = keys;
  const respond = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
  );
  const data = await respond.json();
  if (data.cod === 200) {
    const {
      name,
      main: { temp },
    } = data;
    res.status(200).json({ weatherText: `${name} is ${temp} degrees` });
  } else {
    res.status(404).json({ weatherText: 'CityName is not found!' });
  }
});


