const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Import Routes
const productsRoute = require('./routes/products');
const usersRouter = require('./routes/users');

// Initialize Express App
const app = express();

// Use Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/api/products', productsRoute);
app.use('/api/users', usersRouter);

// Export the app
module.exports = app;
