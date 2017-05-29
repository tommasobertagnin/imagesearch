const config = require('../../server/config')
const request = require('request-promise-native')
const flickr = require('../utils/flickr-api')

module.exports = (app, db) => {
  app.get('/api/search/:text', (req, res) => {
    const page = req.query.offset ? req.query.offset : 1
    const url = flickr.getSearchUrl(req.params.text, page)

    request(url)
      .then(data => {
        const photoList = JSON.parse(data).photos.photo
          .map(photo => ({
            title: photo.title || 'Sans Title',
            url: photo.url_o,
            height: photo.height_o + ' px',
            width: photo.width_o + ' px',
          }))

        res.json(photoList)
      })
      .catch(err => res.send(err))

    db.collection(config.db.coll.LATEST)
      .insertOne({
        term: req.params.text,
        when: new Date()
      })
  })
}