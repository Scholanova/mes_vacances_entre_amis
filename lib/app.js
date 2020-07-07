const createError = require('http-errors')
const express = require('express')
const { json, urlencoded } = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes')
const helmet = require('helmet')
const eventRouter = require('./routes/eventRouter')
const authRouter = require('./routes/authRouter')

const expenseRouter = require('./routes/expenseRouter')
const { ResourceNotFoundError } = require('./errors')
const { LoginError } = require('./errors')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (app.get('env') == 'development') {
  app.use(logger('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayout)

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/events', eventRouter)
app.use('/expenses', expenseRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
