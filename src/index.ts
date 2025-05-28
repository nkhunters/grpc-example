import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pino } from 'pino';

const log = pino();
const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  };

  res.status(200).send(data);
});

app.listen(process.env.PORT || 3001, async () => {
  log.info(`Server is running on port ${process.env.PORT || 3001}`);
  log.info('Connected to MongoDB');
});
