const config = require('../../server/config')

module.exports = (app, db) => {
  app.get('/api/latest', (req, res) => {
    db.collection(config.db.coll.LATEST).find({}, { _id: 0 })
      .limit(10)
      .toArray((err, docs) => {
        if (err) {
          res.send(err)
        }
        else {
          res.json(docs)
        }
      })
  })
}