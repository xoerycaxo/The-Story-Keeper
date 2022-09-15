const mysql = require('mysql2');
const express = require('express');

//PORT designation and the app expression
const PORT = process.env.PORT || 3002;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect app to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "assyen74",
        database: 'mystories'
    },
    console.log(`Connected to mystories database.`)
);

// //test connection (successful)
// app.get("/", (req, res)=>{
//     res.json({
//         message: "Hello there"
//     });
// });


//DELETE books OPERATION
db.query(`DELETE FROM mybooks WHERE id = 4`, (err, result)=>{
    if (err){
        console.log(err);
    }
   console.log(err);
});
//CREATE mybooks
const sql = `INSERT INTO mybooks (id, title, author, genre)
VALUES (?,?,?,?)`;
const params = [4, 'La Odisea', 'Homer', 'Classics'];
db.query(sql, params, (err, result) =>{
    if (err){
        console.log(err);
    }
    console.log(result);
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

//mybooks route SUCCESS
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

//route to handle user req not supported by app
app.use((req, res)=>{
res.status(404).end();
});

//init express
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});