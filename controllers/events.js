const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
  .getDb()
  .db()
  .collection('events')
  .find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Event id to find an Event.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('events')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createEvent = async (req, res) => {
  const event = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
  };
  const response = await mongodb.getDb().db().collection('events').insertOne(event);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Event.');
  }
};

const updateEvent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('events')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the Event.');
  }
};

const deleteEvent = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('events').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Event.');
  }
};

module.exports = {
  getAll,
   getSingle,
  createEvent,
  updateEvent,
  deleteEvent
};
