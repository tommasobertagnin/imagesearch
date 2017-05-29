const URL = require('../config').URL + '/api/search'
const request = require('request')

const text = '/wonderful'
const offset = 20
const query = '?offset=' + offset

describe('\ntesting the search endpoint /api/search/:text', () => {
  test('the response status is 200', done => {
    request(URL + text, (err, res, body) => {
      expect(err).toBeNull()
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  test('the response body has a msg property', done => {
    request(URL + text, (err, res, body) => {
      expect(err).toBeNull()
      const parsedBody = JSON.parse(body)[0]
      expect(parsedBody).toHaveProperty('msg')
      done()
    })
  })

  test('the :text value is the one expected', done => {
    request(URL + text, (err, req, body) => {
      expect(err).toBeNull()
      const parsedMsg = JSON.parse(body)[0].msg
      expect('/' + parsedMsg).toBe(text)
      done()
    })
  })
})

describe('\ntesting the offset query on endpoint /api/search/:text?offset=<value>', () => {
  test('the offset is 0 by default', done => {
    request(URL + text, (err, res, body) => {
      expect(err).toBeNull()
      const parsedOffset = JSON.parse(body)[0].offset
      expect(Number(parsedOffset)).toBe(0)
      done()
    })
  })

  test('the offset value is the one expected', done => {
    request(URL + text + query, (err, res, body) => {
      expect(err).toBeNull()
      const parsedOffset = JSON.parse(body)[0].offset
      expect(Number(parsedOffset)).toBe(offset)
      done()
    })
  })
})