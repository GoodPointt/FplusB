const app = require('./app');
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
