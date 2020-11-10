  
const { Router } = require('express');

const router = Router();

router.use('/songs', require('./song'));
router.use('/albums', require('./album'));
router.use('/artists', require('./artist'));
router.use('/playlists', require('./playlist'));
router.use('/user', require('./auth'));
router.use('/admin', require('./admin'));




module.exports = router;