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

db.query(`SELECT * FROM users`, (err, rows)=>{
    console.log(rows);
});

//route to handle user req not supported by app
app.use((req, res)=>{
res.status(404).end();
});

//init express
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});