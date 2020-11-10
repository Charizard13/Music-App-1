
const Joi = require("@hapi/joi");



// //Token Validation
// const tokenValidation = (data) => {
//   const schema = Joi.object({
//     token: Joi.string().required(),
//   })

//   return schema.validate(data);
// }

// // //Password Update Validation
// const pwdUpdateValidation = (data) => {
//   const schema = Joi.object({
//     resetToken: Joi.string().required(),
//     password: Joi.string().min(8).required(),
//   })
//   console.log(data)
//   return schema.validate(data);
// }

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object( {
        UserName: Joi
        .string()
        .min(3).message('User name must have at least 3 characters')
        .regex(/^[A-Za-z0-9]*$/).message('User name must contain only letters and numbers')
        .required(),
        email: Joi
        .string()
        .min(6)
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).message('Email is invalid')
        .email()
        .required()
        ,
        password: Joi
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/).message('Password must contain at least 1 Uppercase, 1 Lowercase, 1 Number and 1  Special characters'),
        
        confirmPassword: Joi.ref('password'),
      });
      console.log(data)
       return schema.validate(data);
}

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        rememberMe: Joi
        .boolean()
        .required(),
      });
       return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
// module.exports.registerValidation = tokenValidation;
// module.exports.registerValidation = pwdUpdateValidation;



