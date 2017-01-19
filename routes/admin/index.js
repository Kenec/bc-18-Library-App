var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var firebase = require('../config.js');
var addBook = require('./addBook.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/add_book', function(req, res, next) {
  //addBook.addBook();
  var starCountRef = firebase.ref('Categories/');
  starCountRef.on('value', function(snapshot) {
    //console.log(snapshot.val());
    data_returned = snapshot.val();
    //console.log(data_returned);
    res.render('admin/add_book', { dataa: data_returned });
  });

});

router.post('/add_book', urlencodedParser, function(req, res, next) {
  //addBook.addBook();
  var category = req.body.category;
  var bookname = req.body.bookname;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var qty = req.body.qty;
  var bookadder = firebase.ref(category+'/');
  var dataa = {};
  dataa[bookname] = {
    Author:author,
    Publisher:publisher,
    img: "/images/intro_to_math.jpg",
    qty:qty
  };
  bookadder.update(dataa);

  console.log("Item added successfully");
  res.render('admin/add_book', { dataa: "Item successfully Added" });

});

router.get('/manage_book', function(req, res, next) {
  res.render('admin/manage_book');
});

router.get('/borrowers', function(req, res, next) {
  var starCountRef = firebase.ref('Borrowers/');
  starCountRef.on('value', function(snapshot) {
    //console.log(snapshot.val());
    data_returned = snapshot.val();
    console.log(data_returned);
    res.render('admin/borrowers', { borrowers: data_returned });
  });
  //res.render('admin/borrowers');
})

module.exports = router;
