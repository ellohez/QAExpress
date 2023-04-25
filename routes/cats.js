// Cat handling code

const router = require("express").Router();
module.exports = router;

// Cats to save
const cats = [];

// Requests have two major components we are interested in: the path 
// and the method. The path is the location the request will be sent to (e.g. /getAll)
//  and the method is the type of request (e.g. GET/POST/PATCH).
// 
// req is an object that represents the received request and can be used to view 
// sent data and request metadata such as headers, cookies, etc.
router.get('/getAll', (req, res) => {res.json(cats)});

// Post requests create data
router.post('/create', (req, res) => {
                        const newCat = req.body; 
                        cats.push(newCat);
                        res.status(201).json(cats[cats.length - 1]);
});

router.delete('/remove/:id', (req, res) => {
                        const {id} = req.params;
                        const removed = cats.splice(id, 1);
                        res.json(removed);
});
             
// Patch - partial update request method
router.patch('/update/:id', (req, res, next) => {
                        const {id} = req.params;
                        if(id >= cats.length)
                            return next({msg:`ID: ${id} out of bounds`, status: 404});
                        const {name} = req.query;
                        const catToUpdate = cats[id];
                        catToUpdate.name = name;
                        res.json(catToUpdate);
});
