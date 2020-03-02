const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./middleware/passport');
const user = require('./routes/users');
const posts = require('./routes/items.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/static'));

// the main app routes 
app.use('/users', user);
app.use('/items', posts);


app.listen(port, () => console.log(`Application running on port: ${port}`))