const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const user = require('./routes/api/users');
const blog = require('./routes/api/blog');
const path=require('path');
const profile = require('./routes/api/profile');

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./config/passport')(passport);
mongoose.connect(db)
.then(() => console.log('database connected'))
.catch(err => console.log(err));
app.use("/", express.static(path.join(__dirname, 'dist')));

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/blog', blog);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));