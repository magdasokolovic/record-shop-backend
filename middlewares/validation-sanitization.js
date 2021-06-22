const {check,body, validationResult} = require("express-validator")


let validateSanitize = [check("email").isEmail().normalizeEmail().withMessage('email - invalid syntax'), 

check('password').isLength({min: 3}).withMessage("password is too short, minimum 3 characters"), 

check('firstname').not().isEmpty().trim().escape().withMessage('please provide valid name'), 

(req, res, next) => {
    console.log('I am last in validation')
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        // {status: 400,message: {email: "emailis invalid", password: "it is too short"}}
        let errorObject = result.errors.reduce((acc, item)=>{
            acc.message = {...acc.message, [item.param]: item.msg}
            return acc
        }, {})
        errorObject.status = 400
        next(errorObject)
    }
}
]

module.exports = validateSanitize