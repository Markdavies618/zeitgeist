module.exports = middleware
 
function middleware(maxAge) {
  if (!maxAge) maxAge = 120
 
  return function (req, res, next) {
    if (res) {
      res.set(
        { 'Cache-Control': 'max-age=' + maxAge
        })
    }
    next()
  }
}