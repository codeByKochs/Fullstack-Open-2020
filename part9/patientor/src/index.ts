import express from 'express';
import diagnoseRouter from './routes/diagnose';

const app = express();
app.use(express.json());

const PORT = 3048;

app.get('/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});