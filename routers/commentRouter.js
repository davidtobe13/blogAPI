const express = require('express');
const router = express.Router();
const { newCommment, getComment, getAllComment, updateComment, deleteComment } = require('../controllers/commentController');



router.post('/newcomment', newCommment)
router.get('/getcomment/:id', getComment)
router.get('/getallcomment', getAllComment)
router.put('/updatecomment/:id', updateComment)
router.delete('/deletecomment/:id', deleteComment)

module.exports = router