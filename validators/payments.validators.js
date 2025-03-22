const validator = require('../utilities/validator');

const validatePayment = async (req, res, next) => {
  const validationRule = {
    "amount": "required|integer",
    "status": "required|string",
    "mode": "required|string",
    "member_id": "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          res
          .status(412)
          .json({
                  success: false,
                  message: 'Validation failed',
                  data: err
                });
      } else {
          next();
      }
  }).catch( err => console.log(err))
};

const updatePayment = async (req, res, next) => {
  const validationRule = {
    "amount": "integer",
    "status": "string",
    "mode": "string",
    "member_id": "string",
  };

  await validator(req.body, validationRule, {}, async (err, status) => {
      if (!status) {
          res
          .status(412)
          .json({
                  success: false,
                  message: 'Validation failed',
                  data: err
                });
      } else {
         next();
      }
  }).catch( err => console.log(err))
};

module.exports = {
  validatePayment,
  updatePayment
}