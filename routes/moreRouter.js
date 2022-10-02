var express = require('express');
var router = express.Router();

// Auth
const auth = require('../middleware/loginCheck');

// controller
const moreController = require('../controller/moreController');

// check ins page
router.get('/checks_in', auth, moreController.checkin_find);

// sports page
router.get('/sport', auth, moreController.sports_find);

// tv shows page
router.get('/tv_show', auth, moreController.tvshows_find);

// music page
router.get('/music', auth, moreController.music_find);

// movies page
router.get('/movies', auth, moreController.movies_find);

// books page
router.get('/books', auth, moreController.books_find); 

// checkin add users
router.post('/checkin-add-user', auth, moreController.checkin_add_user);

// sports add user
router.post('/sports-add-user', auth, moreController.sports_add_user);

// music add user
router.post('/music-add-user', auth, moreController.music_add_user);

// movies add user
router.post('/movies-add-user', auth, moreController.movies_add_user);

// tv shows add user
router.post('/tvshows-add-user', auth, moreController.tvshows_add_user);

// books add user
router.post('/books-add-user', auth, moreController.books_add_user);


module.exports = router;