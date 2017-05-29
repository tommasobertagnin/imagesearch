const request = require('supertest')('http://localhost:8080')

request.get('/').expect(200, (err, res) => {
  console.log(res)
})