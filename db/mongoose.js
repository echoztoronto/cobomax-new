const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cobomax', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});


mongoose.connect(
    'mongodb+srv://echo:<wodeMONGOmima>@cluster0.hr2rg.mongodb.net/Cobomax?retryWrites=true&w=majority'
    || 
    'mongodb://localhost:27017/cobomax', 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});


module.exports = { mongoose }