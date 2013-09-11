var express = require('express');
 items = require('./items');
var app = express();

app.get('/items/:id', items.findById);

app.listen(process.env.PORT || 4730);