const {Router} = require('express');
const {check} = require('express-validator');
const {signUp,signIn} = require('../controller/user');

const router = Router();

router.post('/signup',signUp);
router.post('/signin',signIn);

module.exports = router;