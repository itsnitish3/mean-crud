const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');

// Retrieve all contacts
router.get('/get', userController.findAll);

// Create a new contact
router.post('/create', userController.create);

// Retrieve a single contact with id
router.get('/getuser/:id', userController.findOne);

// Update a contact with id
router.put('/update/:id', userController.update);
//
// Delete a contact with id
router.delete('/delete/:id', userController.delete);

module.exports = router
