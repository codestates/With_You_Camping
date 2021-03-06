const User = require('../models/user');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  sendToken,
  checkToken,
  generateRefreshToken,
  verifyToken,
} = require('./functions/jwtToken');
const { hashPassword } = require('./functions/security');

module.exports = {
  // 회원가입
  signup: async (req, res, next) => {
    try {
      const { email, password, nickname, name } = req.body;
      const exUser = await User.findOne({
        where: {
          email,
        },
      });
      if (exUser) {
        return res.status(401).send('중복된 이메일 입니다.');
      }

      const hashPw = await hashPassword(password);

      await User.create({
        email,
        password: hashPw,
        nickname,
        name,
      });
      return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  // 로그인
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userInfo = await User.findOne({ where: { email } });

      if (!userInfo) {
        return res.status(401).json({
          success: false,
          message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
        });
      }
      const match = await bcrypt.compare(
        password,
        userInfo.dataValues.password,
      );
      if (!match) {
        return res.status(401).json({
          success: false,
          message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
        });
      }
      delete userInfo.dataValues.password;

      const accessToken = generateAccessToken(userInfo.dataValues.id);
      const refreshToken = generateRefreshToken(userInfo.dataValues.id);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // path: '/auth/token',
        maxAge: 60 * 60 * 24 * 7,
      });
      res.status(200).json({
        userId: userInfo.id,
        accessToken,
        message: '로그인에 성공했습니다.',
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  signout: async (req, res, next) => {
    try {
      // 로그아웃 할 때는 쿠키를 삭제한다.
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      res.status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error!' });
    }
  },
  validateToken: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ meesage: 'not exists token' });
    } else {
      const data = verifyToken(token, 'accessToken');

      const userInfo = await User.findOne({
        attributes: ['id', 'email', 'nickname', 'profile', 'provider', 'snsId'],
        where: {
          id: data.data,
        },
      });
      if (data === 'fail') {
        res.status(200).json({
          valid: false,
          message: 'success',
          userInfo,
        });
      } else {
        res.status(200).json({
          valid: true,
          message: 'success',
          userInfo,
        });
      }
    }
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(400).json({ message: 'fail : require refresh token' });
    } else {
      const data = verifyToken(refreshToken, 'refreshToken');
      if (data === 'fail') {
        res.status(400).json({ message: 'fail : invalid refresh token' });
      } else {
        const accessToken = generateToken({ data }, 'accessToken');
        res.json({
          accessToken,
          message: 'success',
        });
      }
    }
  },
};
