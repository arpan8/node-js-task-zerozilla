const Joi = require('joi');

const Auth = require('../../controllers/auth');

const router = [
    {
        path: '/user-login',
        method: 'post',
        options:{
            handler: Auth.userLogin,
            description: 'User login',
            tags: ['api','auth'],
            auth: false,
            validate:{
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
    {
        path: '/user-signup',
        method: 'post',
        options:{
            handler: Auth.userSignup,
            description: 'User sign up',
            tags: ['api','auth'],
            auth: false,
            validate:{
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
]

module.exports = router;