var express = require('express');
var path = require('path');
var port = process.env.PORT || 3001;
var cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport');
initializePassport(passport);



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = express();

if (process.env.NODE_ENV === "production") {
    console.log('production?')
    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes  html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
    });
} else {
    console.log('here')
    app.use(express.static('public'));
    
}
console.log(typeof process.env.DB_PASSWORD)

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser('secret'))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(cors());

/*app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}))*/
//const helmet = require('helmet')
/*app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "https://d3js.org/d3.v6.min.js"],
      },
    })
  );*/

const apiRouter = express.Router();
app.use('/api', apiRouter);

const restaurantRouter = require('./routes/restaurantRoutes.js');
const reviewsRouter = require('./routes/reviewsRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const businessRouter = require('./routes/businessRoutes.js');

apiRouter.use('/restaurants', restaurantRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/business', businessRouter);

app.listen(port, async() => {
  //await sequelize.authenticate();
  console.log(`App running on port ${port}.`)
})

module.exports = app;