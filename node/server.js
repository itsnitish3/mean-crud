const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4300;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  mongoose.connect(dbConfig.url, options);

  app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
  

// define a root/default route
app.get('/', (req, res) => {
    res.send({hi: "hi", "message": [    "GET /api/contacts: will give all contacts stored in database",    "",    "",    "GET /api/contacts/<contact_id>: will give a specific contact with contact_id.",    "",    "",    "POST /api/contacts : contact can create a new contact",    "",    "",    "PATCH /api/contacts/<contact_id>: update a contact partially",    "",    "",    "DELETE /api/contacts/<contact_id>: delete a contact",    "",    "",    "PUT /api/contacts/<contact_id>: update a contact completely"]});
    
});

// Require Users routes
const contactRoutes = require('./routes/user.routes')
// using as middleware
app.use('/api', contactRoutes)

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});