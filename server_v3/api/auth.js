const router = require("express").Router();


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv'); 
require('dotenv').config()
const { registerValidation, loginValidation } = require("../validation")

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body)
  if(error) {
    return res.status(400).send({ success: false, message: error.details[0].message }),
    console.log(error.details[0].message)
    ;
  }
   const emailExist = await User.findOne({ where: { email: req.body.email}})
   if (emailExist) return res.status(400).send({ success: false, message: 'Email or User-name already exists'})

   const userNameExist = await User.findOne({ where: { name: req.body.UserName}})
   if (userNameExist) return res.status(400).send({ success: false, message: 'Email or User-name already exists'})
  
    
    const hashPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = {
        name: req.body.UserName,
        email: req.body.email,
        password: hashPassword, 
        isAdmin: false
    }
  await User.create(newUser);
  res.status(200).send('successfully registered')
});


router.post("/login", async (req, res) => {
  console.log(req.body)
    const { error } = loginValidation(req.body);
   if (error) return res.status(400).send({ success: false, message: error.details[0].message });


   const user = await User.findOne({ where: { email: req.body.email}})
   if (!user) return res.status(403).send({ success: false, message: 'Email or password is incorrect' })
   console.log(user.dataValues.name)

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(409).send({ success: false, message: 'Email or password is incorrect' })
    console.log (validPass)

    
      const expired = req.body.rememberMe ? "365 days" : "24h";
      console.log (expired)

      const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: expired
      })
      console.log (refreshToken)

      const accessToken = generateAccessToken({id: user.id});
      console.log (accessToken)
      console.log(user.dataValues.name)
      console.log(refreshToken)


      try{
        const isTokenExist = await RefreshToken.findOne({where: {userName: user.dataValues.name}})

        if (!isTokenExist) {
          await RefreshToken.create({
            userName: user.dataValues.name,
            token: refreshToken,
          });
        } else {
          await RefreshToken.update({ token: refreshToken }, {
            where: {
              userName: user.dataValues.name
            }
          });
        }
      
        res.cookie('userId', user.dataValues.id)
        res.cookie('name', user.dataValues.name)
        res.cookie('accessToken', accessToken)
        res.cookie('refreshToken', refreshToken)
        res.send({ success: true, message: 'Login successfully'} )
     
      } catch (error) {
        res.send({ error: err})

      }
     
    
    
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Token Required" });
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Access Token" });
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
}


module.exports = router;
