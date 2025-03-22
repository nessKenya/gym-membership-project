const mongodb = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMembers = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('members').find();
  result.toArray().then((users) => {
    return res.status(200).json(users)
  }).catch(error=> res.status(400).json(error));
}

const getMember = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const memberId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('members').find({_id: memberId})
  result.toArray().then((users) => {
    return res.status(200).json(users[0])
  }).catch(error=> res.status(400).json(error))
}

const createMember = async (req, res) => {
  const {firstName, lastName, weight, phone, address, favoriteWorkout, birthday} = req.body;
  const newDoc = {firstName, lastName, weight, phone, address, favoriteWorkout, birthday};
  const newMember = await mongodb.getDatabase().db().collection('members').insertOne(newDoc);

  return res.status(201).json({memberId: newMember.insertedId})
}

const updateMember = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const {firstName, lastName, weight, phone, address, favoriteWorkout, birthday} = req.body;
  const memberId = {_id: new ObjectId(req.params.id)};
  const updateDoc = {$set: {firstName, lastName, weight, phone, address, favoriteWorkout, birthday}};
  await mongodb.getDatabase().db().collection('members').updateOne(memberId, updateDoc);
  return res.status(200).json({message: `member ${req.params.id} updated`})
}

const deleteMember = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const memberId = {_id: new ObjectId(req.params.id)};
  const result = await mongodb.getDatabase().db().collection('members').deleteOne(memberId);
  if (result.deletedCount === 1) {
    return res.status(204);
  } else {
    return res.status(404).json({error: result.error ||"Document not found."});
  }
}

module.exports = {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
}
