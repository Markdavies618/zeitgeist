module.exports.createRoutes = function (app) {
  app.get('/404', function(req, res){
    res.render('errors/404');
  })
  app.get('/500', function(req, res){
    res.render('errors/500');
  })
}