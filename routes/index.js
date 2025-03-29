const routes = require('express').Router();
const passport = require('passport')
const memberRoute = require('./members')
const paymentRoute = require('./payments')

routes.get('/', (req, res) => {
  return res.send(req.session?.user ? `Logged In! <br><br>Welcome, ${req.session.user.displayName}`: 'Logged Out')
})

routes.use('/members', memberRoute);

routes.use('/payments', paymentRoute);

routes.get('/login', passport.authenticate('google', { scope: ['profile'] }));

routes.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/');
  });

routes.get('/logout', function(req, res, next) {
  req.logout(function(err){
    if(err) {return next(err)}
    res.redirect('/')
  })
})

module.exports = routes;