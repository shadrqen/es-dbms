/* Service that handles authentication */

class AuthService {
  /* The function that handles authentication, that is before entry into any route */
  static auth = (req, res, next) => {
    /* Getting the header that contains the allowed origin */
    const ORIGIN = req.headers['x-allowed-origin']

    let apiKey, targetOrigin

    const ENVIRON = process.env.NODE_ENV || 'development'

    /* Setting the variables */
    if (ENVIRON && ENVIRON === 'production') {
      targetOrigin = ['https://api.essayspring.com:gkjslif', 'https://api.writeray.com:rthjerht45thjer']
      apiKey = process.env.API_KEY
    } else {
      targetOrigin = ['http://localhost:3100:lspauidg', 'http://localhost:6200:hj34we4y3hjw4e3j']
      apiKey = process.env.DEV_API_KEY
    }

    /* Performing authentication - making sure that the origin variable is not null, and
    * its value is as expected.
    * Also, making sure that the api key is the one that is expected by the application */
    if (ORIGIN) {
      if (targetOrigin.includes(ORIGIN)) {
        const INNER_API_KEY = req.headers.api_key
        if (INNER_API_KEY && INNER_API_KEY === apiKey) {
          /* Process to the next callback in case the origin and api key match */
          next()
        } else {
          /* Otherwise return status 500 */
          res.status(500).send('I\'m lost.')
        }
      } else {
        /* Otherwise return status 500 */
        res.status(500).send('I\'m lost.')
      }
    } else {
      /* Otherwise return status 500 */
      res.status(500).send('I\'m lost.')
    }
  }
}

module.exports = AuthService
