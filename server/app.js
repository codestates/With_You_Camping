const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const { sequelize } = require('./models');
dotenv.config();
const app = express();

app.set('port', process.env.PORT || 8090);

app.use(morgan('dev'));
const corsOption = {
  origin: '*',  
  // origin: 'https://withyoucamping.link',  
  credentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(cors(corsOption));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('RDS DB 연결 성공');
    })
    .catch(err => {
      console.error(err);
    });
} else {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Local DB 연결 성공');
    })
    .catch(err => {
      console.error(err);
    });
}

app.use('/api', indexRouter);

app.get('/api/connect', (req, res) => {
  res.send('서버 연결 테스트');
});

// 지원하지 않는 api
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), `포트에서 대기중`);
});
