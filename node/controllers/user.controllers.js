const User = require('../models/user.model');

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of contacts."
        });
    });
};

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
        console.log('inserted')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new user."
        });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {

    User.findById( id = req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error getting user with id " + id
        });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};
