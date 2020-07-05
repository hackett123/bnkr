const sha256 = require('sha256')
const User = require('../models/user.js')

function login(req, res) {
    email = req.body.email
    password = req.body.password
    User.get(email, (err, user) => {
        if (err) {
            res.json(err)
        } else if (user.password.toUpperCase() == sha256(password).toUpperCase()) {
            req.session.user = email
            console.log(req.session.user)
            res.json({'status':'success', 'user': user})
        } else {
            res.json("wrong password")
        }
    })
}

module.exports = {
    login: login
}