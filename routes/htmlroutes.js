const router = require('express').Router();
const path = require('path');
// const homeroute = require('./server.js')
router.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/Public/index.html'));
  });

  router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,'../Public/login.html'));
  });

  
  router.get('/signup', function(req,res){
    res.sendFile(path.join(__dirname,'../Public/signup.html'));
  });

  router.get('/search', function(req,res){
    res.sendFile(path.join(__dirname,'../Public/search.html'));
  });

  router.get('/mybooks', function(req,res){
    res.sendFile(path.join(__dirname,'../Public/mybooks.html'));
  });

  router.get('/book', function(req,res){
    res.sendFile(path.join(__dirname,'../Public/book.html'));
  });




module.exports = router;