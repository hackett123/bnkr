function getSplash(req, res) {
    res.render('splash.ejs')
}

module.exports = {
    get_splash: getSplash
}