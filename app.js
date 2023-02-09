var express = require('express');
var path = require('path');
var port = process.env.PORT || 3001;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = express();

app.use(express.static('public'));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(port, async() => {
  //await sequelize.authenticate();
  console.log(`App running on port ${port}.`)
})

module.exports = app;