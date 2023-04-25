// Cat handling code
const router = require("express").Router();
const {catModel} = require("../db");

// Cats to save
const cats = [];

// Requests have two major components we are interested in: the path 
// and the method. The path is the location the request will be sent to (e.g. /getAll)
//  and the method is the type of request (e.g. GET/POST/PATCH).
// 
// req is an object that represents the received request and can be used to view 
// sent data and request metadata such as headers, cookies, etc.
// router.get('/getAll', (req, res) => {res.json(cats)});
router.get('/getAll', async(req, res) => {
            try {
                const found = await catModel.find({});
                res.status(200).json(found);
            } catch(err) {
                return next({
                    status:500, msg: "Cat herding fail"
                });
            }
});

// Post requests create data
router.post('/create', async({body}, res, next) => {
                try {
                    const created = await catModel.create(body); 
                    res.status(201).json(created);
                } catch(err) {
                    return next({
                        status:500, msg: "Oops"
                        });
                }
});

router.delete('/remove/:id', async(req, res, next) => {
                try{
                    const {id} = req.params;
                    const removed = await catModel.findByIdAndDelete(id);
                    res.status(200).json(removed);
                } catch(err) {
                    return next({
                        status:404, msg: "Nope!"
                    });
                }
});
             
// Patch - partial update request method
router.patch('/update/:id', async(req, res, next) => {
                try{
                    const {id} = req.params;
                    if(id >= cats.length)
                        return next({msg:`ID: ${id} out of bounds`, status: 404});
                    const {name} = req.query;
                    const catToUpdate = await catModel.findByIdAndUpdate(id, req.query,{returnDocument: "after"});
                    // const catToUpdate = cats[id];
                    catToUpdate.name = name;
                    res.json(catToUpdate);
                } catch(err) {
                    return next({
                        status:404, msg: "Nope!"
                    });
                }
});

module.exports = router;