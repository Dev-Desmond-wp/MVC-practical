const express = require('express');
const router = express.Router();
const { getoneUser , allUsers, newUser, deleteoneUser, updateUser } = require('../controller/user.js');
const {logger} = require('../middleware/logger.js')

router.use(logger)

router.get('/getoneUser/:id', getoneUser);

router.get('/alluser', allUsers)

router.post('/newuser', newUser)

router.delete('/deleteoneUser/:id', deleteoneUser);

router.put('/updateuser/:id', updateUser);

module.exports = router