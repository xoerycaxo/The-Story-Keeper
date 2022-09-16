var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
require('dotenv').config()
const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');


//PORT designation and the app expression
const PORT = process.env.PORT || 3002;
const app = express();
//--
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect app to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'mystories'
    },
    console.log(`Connected to mystories database.`)
);

//app.get("/H", (req, res)=>{
    //res.json(
   //     "Server is running"
   // )
//})

// //test connection (successful)
// app.get("/", (req, res)=>{
//     res.json({
//         message: "Hello there"
//     });
// });


//DELETE books OPERATION
app.delete('/api/mybooks/:id', (req, res) => {
const sql = `DELETE FROM mybooks WHERE id = ?`;
const params = [req.params.id];

db.query(sql, params, (err, result) =>{
    if(err){
        res.statusMessage(400).json({err: res.message});
    } else if( !result.affectedRows){
        res.json({
            message: 'Book not found'
        });
    } else {
        res.json({
            message: 'Book deleted',
            changes: result.affectedRows,
            id: req.params.id
        });
    }
});
});
//user
app.delete('/api/users/:id', (req, res) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) =>{
        if(err){
            res.statusMessage(400).json({err: res.message});
        } else if( !result.affectedRows){
            res.json({
                message: 'User not found'
            });
        } else {
            res.json({
                message: 'User deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
    });

//CREATE user
app.post('/api/users', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'email', 'passwords');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO users (first_name, last_name, email, passwords)
    VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.email, body.passwords];

    db.query(sql, params, (err, result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.post('/add', function(req, res){
  
    const sql = `INSERT INTO users (first_name, last_name, email, passwords)
    VALUES (?,?,?,?)`;
    const params = [req.body.first_name, req.body.last_name, req.body.email, req.body.passwords];

    db.query(sql, params, (err, result) =>{
            if (err) {
                return console.log(err.message);
              }
              
              res.sendFile(path.join(__dirname,'./Public/login.html'));
    });
});

//CREATE myBooks
app.post('/api/mybooks', ({body}, res) => {
    const errors = inputCheck(body, 'title', 'author', 'genre');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
const sql = `INSERT INTO mybooks ( title, author, genre)
VALUES (?,?,?)`;
const params = [body.title, body.author, body.genre];
db.query(sql, params, (err, result) =>{
    if (err){
        res.status(400).json({ error: err.message });
    return;
    }
    res.json({
        message: 'success',
        data: body
});
});
});

//SELECT book OPERATION
db.query(`SELECT * FROM mybooks`, (err, rows)=>{
    console.log(rows);
});
//GET ROUTE TO RETRIVE RECORDS FROM DATABASE (users used for testing bs its populated but must do with mybooks) SUCCESS
app.get('/api/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
    });

//mybooks route 
app.get('/api/mybooks', (req, res) => {
const sql = `SELECT * FROM mybooks`;
db.query(sql, (err, rows) =>{
    if(err){
        res.status(500).json({error: err.message});
        return;
    }
    res.json({
        message: "success",
        data: rows
    });
});
});

//single book search route
app.get('/api/mybooks/:id', (req, res) =>{
    const sql = `SELECT * FROM mybooks WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//single user route
app.get('/api/users/:id', (req, res) =>{
    const sql = `SELECT * FROM users WHERE email = ? and passwords = ?`;
    const params = [req.params.email,passwords];

    db.query(sql, params, (err, row) =>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


//route to handle user req not supported by app
app.use((req, res)=>{
res.status(404).end();
});

//init express
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/Public/login.html'));
  });