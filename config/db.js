const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('Jarvis is up and running, DB is connected');
  } catch (error) {
    console.log(error);
    res.send('Error in connectDB check CONFIG/DB.JS');
    process.exit(1);
  }
};
module.exports = connectDB;
