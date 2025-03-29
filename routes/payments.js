const express = require('express');

const paymentController = require('../controllers/payments.controller');
const paymentValidators = require('../validators/payments.validators');
const { isAuthenticated } = require('../middleware/authenticate');



const router = express.Router();

// get all
router.get('/', paymentController.getAllPayments);

// get specific
router.get('/:id', paymentController.getPayment);

// create
router.post('/', isAuthenticated, paymentValidators.validatePayment, paymentController.createPayment);

// update
router.put('/:id', isAuthenticated, paymentValidators.updatePayment, paymentController.updatePayment);

// delete
router.delete('/:id', isAuthenticated, paymentController.deletePayment);

module.exports = router;