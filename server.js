var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
require('dotenv').config()
const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');
var login = require('./Public/src/js/login');

const sequelize = require("./config/connection");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require("./routes");

//PORT designation and the app expression
const PORT = process.env.PORT || 3002;
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
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

app.get("/H", (req, res)=>{
    res.json(
       "Server is running"
   )
})


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
// app.post('/api/users', ({body}, res) => {
//     const errors = inputCheck(body, 'first_name', 'last_name', 'email', 'passwords');
//     if(errors){
//         res.status(400).json({error: errors});
//         return;
//     }
//     const sql = `INSERT INTO users (first_name, last_name, email, passwords) VALUES (?,?,?,?)`;
//     const params = [body.first_name, body.last_name, body.email, body.passwords];

//     db.query(sql, params, (err, result) => {
//         console.log(err);
//         console.log(result);
//         if(err){
//             res.status(400).json({error: err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: result
//         });
//     });
// });

app.post('/add', function(req, res){
  
    const sql = `INSERT INTO users (first_name, last_name, email, passwords)
    VALUES (?,?,?,?)`;
    const params = [req.body.first_name, req.body.last_name, req.body.email, req.body.passwords];

    db.query(sql, params, (err, result) =>{
            if (err) {
                return console.log(err.message);
              }
              
              return res.redirect('login.html');
    });
});
app.post('/login', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let passwords = request.body.passwords;
	// Ensure the input fields exists and are not empty
	if (email && passwords) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		var loginTest = new login(db);
        loginTest.auth(email,passwords, function (error, result)
        {
            if (result){
                // Authenticate the user
                //request.session.loggedin = true;
                //request.session.email = email;
                    // Redirect to home page
                    response.redirect('search.html');
            }  else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
        });
        
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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
// app.get('/api/users/:id', (req, res) =>{
//     const sql = `SELECT * FROM users WHERE email = ? and passwords = ?`;
//     const params = [req.params.email,passwords];

//     db.query(sql, params, (err, row) =>{
//         if(err){
//             res.status(400).json({error:err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });



app.use(routes);

//route to handle user req not supported by app
app.use((req, res)=>{
  res.status(404).end();
});

//init express
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});