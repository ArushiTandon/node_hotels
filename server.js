const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
const localAuthMid = passport.authenticate('local', {session: false});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.get('/', localAuthMid, (req, res) => {
    res.send('Welcome to the restaurant');
});

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log('Server started at port:', PORT);
});