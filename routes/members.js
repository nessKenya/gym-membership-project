const express = require('express');

const memberController = require('../controllers/members.controller');
const memberValidators = require('../validators/members.validators');
const { isAuthenticated } = require('../middleware/authenticate');


const router = express.Router();

// get all
router.get('/', memberController.getAllMembers);

// get specific
router.get('/:id', memberController.getMember);

// create
router.post('/', isAuthenticated, memberValidators.validateMember, memberController.createMember);

// update
router.put('/:id', isAuthenticated, memberValidators.updateMember,memberController.updateMember);

// delete
router.delete('/:id', isAuthenticated, memberController.deleteMember);

module.exports = router;