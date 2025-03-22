const validator = require('../utilities/validator');

const validateMember = async (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "weight": "required|integer",
    "phone": "required|string",
    "address": "required|string",
    "favoriteWorkout": "required|string",
    "birthday": "required|string"
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

const updateMember = async (req, res, next) => {
  const validationRule = {
    "firstName": "string",
    "lastName": "string",
    "weight": "integer",
    "phone": "string",
    "address": "string",
    "favoriteWorkout": "string",
    "birthday": "string"
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
  validateMember,
  updateMember
}