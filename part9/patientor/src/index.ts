import express from 'express';
import diagnoseRouter from './routes/diagnose';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3048;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});