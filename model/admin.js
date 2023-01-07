const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

AdminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({_id: admin._id.toString()}, 'web620221')
    admin.tokens = admin.tokens.concat({token})

    await admin.save()
    return token
}

AdminSchema.statics.findByCredentials = async (username, password) => {
    const admin = await Admin.findOne( {username: username})
    if (!admin) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return admin
}

//hash password
AdminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 10)
    }
    next()
})

AdminSchema.statics.checkExist = async(data) => {
    try {
        let admin = await this.findOne({ username: data.username });
        return !!admin;
    } catch (error) {
        throw error;
    }
}


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin