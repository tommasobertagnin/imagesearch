const app = require('express')()
const morgan = require('morgan')
const config = require('./config')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

const routes = require('../app/routes')
const api = require('../app/api')


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(config.db.URL, (err, db) => {
    if (err) {
      throw new Error(err)
    }
    console.log('app is live! http://localhost:8080')
    // create collections if necessary
    db.createCollection(config.db.coll.LOG, { capped : true, size : 5242880 })
    db.createCollection(config.db.coll.LATEST, { capped : true, size : 5242880 })
    // mount routes and api endpoints
    routes(app, db)
    api(app, db)
  })
})