const router = require('express').Router();

const PostsController = require('../controllers/PostsController');

router.get('/posts',PostsController.index);
router.post('/posts',PostsController.create);

module.exports = router;
