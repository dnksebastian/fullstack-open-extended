import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.get('/patients', (_req, res) => {
  res.send('patients...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});