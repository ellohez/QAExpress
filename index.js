// import Express to a constant using require()
const express =require('express');
// Call that constant as function to initialise the Express application
const app = express();
// Middleware that parses the body into json
app.use(express.json());

const cats = [];
app.get('/getAll', (req, res) => {res.json(cats)});
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

                    
app.patch('/update/:id', (req, res) => {
                        const {id} = req.params;
                        const {name} = req.query;
                        const catToUpdate = cats[id];
                        catToUpdate.name = name;
                        res.json(catToUpdate);
});

//  In order to communicate with the Express app we need
//  to get the app to start listening for traffic on a port.
// pass a callback to .listen(), to log useful info about the server
const server = app.listen(4494, ()=> 
                console.log('server started on port number', server.address().port));