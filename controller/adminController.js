const Admin = require('../model/admin');
const mongoose = require('mongoose');

module.exports = {
    login: async (req, res) => {
        console.log(req.body)
    },
    logout: async (reg, res) => {

    },
    signup: async (req, res) => {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(401).send({
                    error: "Invalid username or password"
                })
            }

            let existAdmin = await Admin.findOne({username: req.body.username});
            if (existAdmin) {
                res.status(401).send({
                    error: "Account exist"
                })
            }
            else {
                console.log(req.body)
                const admin = new Admin({
                    ...req.body,
                    _id: new mongoose.Types.ObjectId(),
                })

                try {
                    try {
                        await admin.save()
                    } catch (e) {
                        console.log(e)
                    }

                    res.status(201).send(admin)
                } catch (e) {
                    res.status(400).send(e)
                }
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    }
}