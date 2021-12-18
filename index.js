const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Create server
const app = express();

//Connect to database
connectDB();

//Enable Cors
app.use(cors());

//Enable express.json
app.use( express.json({ extended: true }));

//Port for app
const port = process.env.port || 4000;

//import Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

//Start app
app.listen(port, '0.0.0.0', () => {
    console.log(`The varible is working in PORT ${port}`);
});