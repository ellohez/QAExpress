// import Express to a constant using require()
const express = require('express');
require("./db");
// Call that constant as function to initialise the Express application
const app = express();

// Middleware that parses the body into json
app.use(express.json());

//  Doesn't matter which order the body parser
//  and the logger are called 
const logger = (req, res, next) => {
    console.log("host:", req.hostname);
    console.log("method:", req.method);
    console.log("path:", req.path);
    // Stop this and call the next function - one of the request methods
    // (GET/POST etc.) otherwise execution will freeze 
    return next();
};
// Use our own middleware logger
app.use(logger);

// Import our router 
const catRoutes = require("./routes/cats");
//  Use the router add /cats to the path (so path will be localhost:post/cats/___)
app.use("/cats", catRoutes);

// Error handling middleware - called by request methods if needed
// Need to have next even though we might not use it. But error handler
// has to have 4 parameters JS can't tell two methods apart if they have same 
// number of parameters.
app.use((err, req, res, next) => {
    res.status(err.status).send(err.msg);
});

//  In order to communicate with the Express app we need
//  to get the app to start listening for traffic on a port.
// pass a callback to .listen(), to log useful info about the server
const server = app.listen(4494, ()=> 
                console.log('server started on port number', server.address().port));

// Export server for use elsewhere
module.exports = server;  