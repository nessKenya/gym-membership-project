const express = require('express')
const cors = require('cors');
const app = express()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const port = 3000
const mongodb = require('./config/database')

const {SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env

app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const excludedPaths = ["/", "/login", "/auth/google/callback", "/logout"];
excludedPaths.forEach(path => delete swaggerDocument.paths[path]);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))  

app.use('/', require('./routes'));

const isProduction = process.env.NODE_ENV === "production";
const domain = isProduction ? "https://gym-membership-project.onrender.com":"http://localhost:3000";

passport.serializeUser((user, done)=>{done(null, user)})

passport.deserializeUser((user, done)=>{done(null, user)})

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${domain}/auth/google/callback/`
},
function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

mongodb.initDb((err) => {
  if(err) {
    console.error(err)
  } else {
    console.log(`Database is running`)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})