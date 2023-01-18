import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {

  res.send('hello from backend to frontend');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ weatherText: 'City is not found!' });
  }

  return res.status(200).json(cityName)

});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));