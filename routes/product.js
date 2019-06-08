var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
  secret: config.secretKey
});

function getProducts(done){
    db.get().query('SELECT * FROM products', function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}
function getProduct(id,done){
    db.get().query('SELECT * FROM products WHERE id=?',[id], function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}
function getBarcode(barcode,done){
    db.get().query('SELECT * FROM products WHERE barcode=?',[barcode], function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}
//app.use('/products', jwtCheck);
app.get('/products', function(req, res) {
  getProducts(function(result) {
      res.status(200).send(result);
  });
});
app.use('/product', jwtCheck);
app.get('/product/:id?', function(req, res) {
  getProduct(req.params.id, function(result) {
      res.status(200).send(result);
  });
});
app.use('/barcode', jwtCheck);
app.get('/barcode/:barcode?', function(req, res) {
  getBarcode(req.params.barcode, function(result) {
      res.status(200).send(result);
  });
});
