const sha256 = require('sha256')
const User = require('../models/user.js')

function login(req, res) {
    email = req.body.email
    password = req.body.password
    User.get(email, (err, user) => {
        if (err) console.log(err)
        if (!user) res.json('something went wrong')
        else if (user.password.toString().toUpperCase() == sha256(password).toUpperCase()) {
            req.session.user = email
            console.log(req.session.user)
            res.json({ 'status': 'success', 'user': user })
        } else {
            res.json("wrong password")
        }
    })
}

function getUser(req, res) {
    User.get(req.session.user, (err, user) => err ?
        res.json({ 'status': 'failure', 'err': err }) :
        res.json({ 'status': 'success', 'user': user }))
}

module.exports = {
    login: login,
    get_user: getUser
}