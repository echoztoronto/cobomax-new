const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema({
    username: {type: String, default: ""},
    password: {type: String, default: ""},
});

const Accounts = mongoose.model('Accounts', AccountsSchema);

module.exports = { Accounts };