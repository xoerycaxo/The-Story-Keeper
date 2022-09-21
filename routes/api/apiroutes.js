const { Router } = require("express");

//test connection (successful)
app.get("/", (req, res)=>{
    res.json({
        message: "Hello there"
    });
});

//CREATE user
app.post('/api/users', ({body}, res) => {
    console.log(body)
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


//CREATE mybooks
app.post('/api/mybooks', ({body}, res) => {
   console.log(body)
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

    
