const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    title: {type: String, default: ""},
    start: {type: String, default: ""},
    end: {type: String, default: ""},
    description: {type: String, default: ""},
    poster: {type: String, default: "no_poster.jpg"}
});

const Events = mongoose.model('Events', EventsSchema);

module.exports = { Events };