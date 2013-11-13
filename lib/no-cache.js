/*
 * Middleware to set cache headings correctly when pages are not to be cached.
 */
module.exports = middleware

function middleware(req, res, next) {
  if (res) {
    res.set(
      { 'Cache-Control': 'max-age=0'
      , 'Pragma': 'no-cache'
      , 'Expires': 0
      })
  }
  next()
}