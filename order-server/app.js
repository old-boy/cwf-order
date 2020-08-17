var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')
var clients = require('./routes/clients')
var tags = require('./routes/tags')
var pays = require('./routes/pay')
var orderType = require('./routes/orderType')


var app = express()

var mongoose = require('mongoose')

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://127.0.0.1:27017/blog')
// db
const dburl = "mongodb://localhost:27017/blog";

mongoose.connect(dburl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log('Database Successful！')).catch((err) => console.log(err));


var port = normalizePort(process.env.PORT || '3000');
// 

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


mongoose.connection.on('error', () => {
  console.log('Mongodb connected fail!')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected!')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
// app.set('port', port)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('ordersecrettoken'))
app.use(session({
  secret: 'ordersecrettoken',
  cookie: {
    maxAge: 24 * 3600 * 1000 * 7
  },
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/blog'
  }),
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, 'public')))

// 记录访问次数
/* app.use((req, res, next) => {
  if (req.session.views) {
    req.session.views++
    console.log(`欢迎第 ${req.session.views} 次访问`)
    next()
  } else {
    req.session.views = 1
    console.log(`欢迎首次访问`)
    next()
  }
}) */

app.use('/', index)
app.use('/users', users)
app.use('/clients', clients)
app.use('/tag',tags)
app.use('/pay',pays)
app.use('/order/type',orderType)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


const server = app.listen(port, 'localhost', () => {
  const host = server.address().address
  const port = server.address().port
  console.log("server started! 访问地址为 http://%s:%s", host, port)
});
// module.exports = app