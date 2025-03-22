const mongodb = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPayments = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('payments').find();
  result.toArray().then((users) => {
    return res.status(200).json(users)
  }).catch(error=> res.status(400).json(error));
}

const getPayment = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const paymentId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('payments').find({_id: paymentId})
  result.toArray().then((users) => {
    return res.status(200).json(users[0])
  }).catch(error=> res.status(400).json(error))
}

const createPayment = async (req, res) => {
  const {amount, status, mode, member_id} = req.body;
  const newDoc = {amount, status, mode, member_id};
  const newPayment = await mongodb.getDatabase().db().collection('payments').insertOne(newDoc);

  return res.status(201).json({paymentId: newPayment.insertedId})
}

const updatePayment = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const {amount, status, mode, member_id} = req.body;
  const paymentId = {_id: new ObjectId(req.params.id)};
  const updateDoc = {$set: {amount, status, mode, member_id}};
  await mongodb.getDatabase().db().collection('payments').updateOne(paymentId, updateDoc);
  return res.status(200).json({message: `payment ${req.params.id} updated`})
}

const deletePayment = async (req, res) => {
  // id validation
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({error: 'invalid id'})
  }

  const paymentId = {_id: new ObjectId(req.params.id)};
  const result = await mongodb.getDatabase().db().collection('payments').deleteOne(paymentId);
  if (result.deletedCount === 1) {
    return res.status(204);
  } else {
    return res.status(404).json({error: result.error ||"Document not found."});
  }
}

module.exports = {
  getAllPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment
}