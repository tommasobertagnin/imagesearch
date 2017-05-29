const secret = require('../secret')

const config = {
  db: {
    URL: `mongodb://${secret.mlab.USER}:${secret.mlab.PASSWORD}@ds137191.mlab.com:37191/heroku_0s4xxln0`,
    coll: {
      LOG: 'appLog',
      LATEST: 'latestSearches',
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  config.db.URL = 'mongodb://localhost:27017/imagesearch'
}

module.exports = config