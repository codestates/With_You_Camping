const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Board = require('./board');
const BoardData = require('./boarddata');
const Locate = require('./locate');
const Comment = require('./comment');
const Like = require('./like');

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;
db.BoardData = BoardData;
db.Located = Locate;
db.Comment = Comment;
db.Like = Like;

User.init(sequelize);
Board.init(sequelize);
BoardData.init(sequelize);
Locate.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);

User.associate(db);
Board.associate(db);
Locate.associate(db);
BoardData.associate(db);
Comment.associate(db);
Like.associate(db);

module.exports = db;
