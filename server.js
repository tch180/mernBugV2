const express = require('express');
const connectDB = require('./config/db');

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
//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
