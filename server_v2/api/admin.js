const router = require("express").Router();
const verify = require("./verifyToken")

router.get('/', verify,  (req, res) => {
res.json({users: {name:"hello"}})
})


module.exports = router;