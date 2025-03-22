const express = require('express');

const paymentController = require('../controllers/payments.controller');
const paymentValidators = require('../validators/payments.validators')


const router = express.Router();

// get all
router.get('/', paymentController.getAllPayments);

// get specific
router.get('/:id', paymentController.getPayment);

// create
router.post('/', paymentValidators.validatePayment, paymentController.createPayment);

// update
router.put('/:id', paymentValidators.updatePayment, paymentController.updatePayment);

// delete
router.delete('/:id', paymentController.deletePayment);

module.exports = router;