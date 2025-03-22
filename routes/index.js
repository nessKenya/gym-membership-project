const routes = require('express').Router();

const memberRoute = require('./members')
const paymentRoute = require('./payments')

routes.use('/members', memberRoute);

routes.use('/payments', paymentRoute);

module.exports = routes;