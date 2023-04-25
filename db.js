const mongoose = require('mongoose');

// Connect to mongoose using the default port
mongoose.connect("mongodb://127.0.0.1:27017/cats", {}).
                    then(() => console.log("Yay")).catch(() => console.log("Nay"));

const catSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    colour: String,
    evil: Boolean
});

const catModel = mongoose.model("cat", catSchema);
module.exports = {catModel};
