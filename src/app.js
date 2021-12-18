import express from 'express';
import userRoutes from '@routes/userRoutes';

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({ status: true, msg: 'Welcome with Babel setup' });
});

// Handles 404 errors
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Handles global errors
app.use((err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
