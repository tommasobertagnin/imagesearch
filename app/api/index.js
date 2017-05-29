module.exports = (app, db) => {
  require('./search')(app, db)
  require('./latest')(app, db)
}