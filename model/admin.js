const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
})


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin