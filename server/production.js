const app = require('express')()
const config = require('./config')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const helmet = require('helmet')

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(config.db.URL, (err, db) => {
    if (err) {
      throw new Error(err)
    }
    console.log('server started in production mode')
    
    db.createCollection(config.db.coll.LOG, { capped : true, size : 5242880 })
    db.createCollection(config.db.coll.LATEST, { capped : true, size : 5242880 })
    
    require('../app/api')(app, db)
    require('../app/routes')(app, db)
  })
})