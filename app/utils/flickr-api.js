const secret = require('../../secret')

module.exports = {
  getSearchUrl: (text, page) => `https://api.flickr.com/services/rest/?api_key=${secret.flickr.KEY}&format=json&nojsoncallback=1&method=flickr.photos.search&extras=url_o&text=${text}&per_page=25&page=${page}`
}