const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const mongoose = require('mongoose');
const { DEV_PORT, DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(DEV_PORT, () => {
      console.log(`🛠️  Server is up and ready on port: ${DEV_PORT}`);
    });
  })
  .then(() => console.log('🌐 Database connected successfully'))
  .catch((error) => {
    console.log('⚠️ Database conection failed:', error.message);
    process.exit(1);
  });

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server erorr' } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
