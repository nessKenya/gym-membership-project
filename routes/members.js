const express = require('express');

const memberController = require('../controllers/members.controller');
const memberValidators = require('../validators/members.validators')


const router = express.Router();

// get all
router.get('/', memberController.getAllMembers);

// get specific
router.get('/:id', memberController.getMember);

// create
router.post('/', memberValidators.validateMember, memberController.createMember);

// update
router.put('/:id', memberValidators.updateMember,memberController.updateMember);

// delete
router.delete('/:id', memberController.deleteMember);

module.exports = router;