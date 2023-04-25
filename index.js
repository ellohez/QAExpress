// import Express to a constant using require()
const express = require('express');
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

const cats = [];

// Requests have two major components we are interested in: the path 
// and the method. The path is the location the request will be sent to (e.g. /getAll)
//  and the method is the type of request (e.g. GET/POST/PATCH).

// req is an object that represents the received request and can be used to view 
// sent data and request metadata such as headers, cookies, etc.
app.get('/getAll', (req, res) => {res.json(cats)});

// Post requests create data
app.post('/create', (req, res) => {
                        const newCat = req.body; 
                        cats.push(newCat);
                        res.status(201).json(cats[cats.length - 1]);
});

app.delete('/remove/:id', (req, res) => {
                        const {id} = req.params;
                        const removed = cats.splice(id, 1);
                        res.json(removed);
});

                   
// Patch - partial update request method
app.patch('/update/:id', (req, res, next) => {
                        const {id} = req.params;
                        if(id >= cats.length)
                            return next({msg:`ID: ${id} out of bounds`, status: 404});
                        const {name} = req.query;
                        const catToUpdate = cats[id];
                        catToUpdate.name = name;
                        res.json(catToUpdate);
});

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