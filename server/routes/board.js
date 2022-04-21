const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const boardController = require('../controllers/board');

// 게시물 작성
router.post('/',isAuth, boardController.post);

// 게시물 상세 가져오기
router.get('/detail/:id',isAuth, boardController.get);

// 게시물 수정
router.put('/:id',isAuth, boardController.put);

// 게시물 삭제
router.delete('/:id',isAuth, boardController.remove);

module.exports = router;