const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/events');

router.get('/', eventsController.getAll);

// router.get('/:id', contactsController.getSingle);

router.post('/', eventsController.createEvent);

// router.put('/:id', contactsController.updateContact);

// router.delete('/:id', contactsController.deleteContact);

module.exports = router;
