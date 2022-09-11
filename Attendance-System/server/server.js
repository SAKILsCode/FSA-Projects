const express = require('express');

const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

app.get('/private', authenticate, (req, res) => {
  console.log('USER:', req.user);
  res.status(200).json({ message: 'I am private route' });
});

app.get('/public', (_req, res) => {
  res.status(200).json({ message: 'I am public route' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'This is root route' });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : 'Server Error Occurred';
  res.status(status).json({ message });
});

connectDB('mongodb://localhost:27017/attendance-db')
  .then(() => {
    console.log('Database Connected');
    app.listen(4000, () => {
      console.log('Listening in port: 4000');
    });
  })
  .catch((e) => console.log(e));
