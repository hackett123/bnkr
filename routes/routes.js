var msg // to send notifications at top of screen when getting to a page

function getMessage(req, res) {
    temp = msg
    msg = null
    res.send(temp)
}

function setMessage(req, res) {
    if (req.body.message) {
        msg = req.body.message
    }
    res.json({ "status": "success" })
}

function getSplash(req, res) {
    res.render('splash.ejs')
}
function getLogin(req, res) {
    res.render('login.ejs')
}

var getHome = function (req, res) {
    if (req.session.user == null) {
        res.redirect('/login');
    } else {
        res.render('home.ejs');
    }
}

module.exports = {
    get_splash: getSplash,
    get_login: getLogin,
    get_home: getHome,
    get_message: getMessage,
    set_message: setMessage
}