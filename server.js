const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// const bugs
const app = express();
// Connect DB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/bugs', require('./routes/bugs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));

//Serve production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
