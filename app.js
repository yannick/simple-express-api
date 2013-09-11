var express = require('express');
var fs        = require('fs');

items = require('./items');
var app = express();

var publicdir = __dirname;
app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = publicdir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists)
        req.url += '.html';
      next();
    });
  }
  else
    next();
});
app.use(express.static(publicdir));

app.get('/items/:id', items.findById);
app.get('/items', items.findAll);
app.listen(process.env.PORT || 4730);