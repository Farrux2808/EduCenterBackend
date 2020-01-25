var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getTable(){
    if(status == 1) {
        db.get().query('SELECT `Teacher_id`,`Group_id`,`pair`,`room`,`type`, `isEven`, `Day_id`,`Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Teacher_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
    {
        db.get().query('SELECT `Teacher_id`,`Group_id`,`pair`,`room`,`type`, `isEven`,`Day_id`, `Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Group_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });  
    }
  
}


function getProducts( done) {
    let a = 'SELECT * FROM products where id = ' + id;
    db.get().query(a, function(err, rows) {
        if (err) throw err;
        done(rows);
    });  

}

// app.use('/table', jwtCheck);

app.get('/getallproducts', function(req, res) {
  getProducts(function(result) {
    res.status(200).send(result);      
  })
});

function getOneProduct(id, done) {
    let a = 'SELECT * FROM products where id = ' + id;
    db.get().query(a, function(err, rows) {
        if (err) throw err;
        done(rows);
    });  

}


app.get('/getoneproduct/:id?', function(req, res) {
    console.log(req.params);
    
    getOneProduct(req.params.id , function(result) {
      res.status(200).send(result);      
    })
});

function postproduct (body,done) {
    product = {
        latitude : body.latitude,
        longitude : body.longitude,
        category : body.category,
        product : body.product,
        price : body.price,
        barcode : body.barcode
    }
    
    db.get().query(`INSERT INTO products SET ? `, [product], function(err, result){
        if (err) throw err;

        newProduct = {
            id: result.insertId,
            latitude : product.latitude,
            longitude : product.longitude,
            category : product.category,
            product : product.product,
            price : product.price,
            barcode : body.barcode
        };

        done(newProduct);
    })
}




app.post('/addproduct', function(req, res) { 
    console.log(req.body);
    postproduct(req.body, function(err, result) {
        res.status(200).send(result);
    });
});
  

// app.use('/tablebyday', jwtCheck);
// app.get('/tablebyday/:status/:id/:day?', function(req, res) {
//     getTablebyDay(req.params.status, req.params.id, req.params.day,function(result) {
//       res.status(200).send(result);
//   });
// });
