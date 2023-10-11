import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import router from './routes/cities';
import CityAndDistrictsModel from './models/city';

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/local')
  .then(() => {
    app.listen(PORT, () => console.log('Database connected successfully'));
  })
  .catch((err) => console.error('connection error', err));

app.get('/api/cities', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await CityAndDistrictsModel.find({});

    if (!cities || cities.length == 0) {
      return res.status(404).json({ message: 'No cities found' });
    }

    return res.status(200).json({ cities });
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

app.use('/', router);
app.use(express.json());



