const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    // const token = req.cookies['auth-token']
    const token = req.header('auth-token')
    const decodedToken = jwt.verify(token, 'secretkeyfromnaqvi')
    
    if(decodedToken) {
        next()
    } else {
        next(new Error('unauthorised user'))
    }

}