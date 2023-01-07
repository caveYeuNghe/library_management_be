const Admin = require('../model/admin');
const mongoose = require('mongoose');

module.exports = {
    login: async (req, res) => {
        try {
            const admin = await Admin.findByCredentials(req.body.username, req.body.password)
            const token = await admin.generateAuthToken()
            res.status(200).send({admin, token})
        } catch(e) {
            res.status(400).send(e)
        }
    },
    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()

            res.status(200).send("log out successfully")

        } catch (e) {
            res.status(500).send()
        }
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