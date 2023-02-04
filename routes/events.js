const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

router.get('/', eventsController.getAll);

router.get('/:id', eventsController.getSingle);

router.post('/', eventsController.createEvent);

// router.put('/:id', contactsController.updateContact);

// router.delete('/:id', contactsController.deleteContact);

module.exports = router;
