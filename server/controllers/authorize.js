const { User } = require('../models');
const { checkToken } = require('./functions/jwtToken');

module.exports = {
  auth: async (req, res) => {
    try {
      // 쿠키에 에세스 토큰이 유무 확인.
      const { accessToken } = req.cookies;
      if (!accessToken) {
        return res.status(401).json({ message: 'Access token not provided!' });
      }

      // 에세스 토큰이 유효한지 확인.
      const accessTokenData = checkToken(accessToken);
      if (!accessTokenData) {
        return res.status(401).json({ message: 'Invalid token!' });
      }

      // 에세스 토큰 정보가 유효한지 확인.

      const { email } = accessTokenData;
      const userInfo = await User.findOne({ where: { email } });
      if (!userInfo) {
        return res.status(403).json({ message: 'Not authorized!' });
      }
      return res.status(200).json(accessTokenData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error!' });
    }
  },

  // 사용자 인증
  isAuth: async (req, res) => {
    // 쿠키에 에세스 토큰이 유무 확인.
    console.log('cookies:', req.cookies);
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
      return false;
    }
    // 에세스 토큰이 유효한지 확인.
    const accessTokenData = checkToken(accessToken);
    const refreshTokenData = checkToken(refreshToken);
    if (accessTokenData === null) {
      if (refreshTokenData === undefined) {
        return false;
      }
    }
    // 에세스 토큰 정보가 유효한지 확인.
    const { email } = accessTokenData;
    const userInfo = await User.findOne({ where: { email } });
    if (!userInfo) {
      return false;
    }
    return userInfo;
  },
};
