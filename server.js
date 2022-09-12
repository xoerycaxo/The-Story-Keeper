const express = require('express');
const {books} = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(express.static('Public'))


// function findAll(query, booksArray) {
//     let filteredResults = booksArray
//     if (query.title) {
//         filteredResults = filteredResults.filter(
//             (book) => book.title === query.title
//         )
//     } return filteredResults
// }

// function newBook(body, booksArray) {
//     const book = body
//     booksArray.push(note)
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({books: booksArray}, null, 2),
//     ); return note
// }



// app.get('/api/books', (req, res) => {
//     let results = books
//     if (req.query) {
//         results = findAll(req.query, results)
//     } res.json(results)
// })
// app.get('/api/books/:id', (req, res) => {
//     const result = findById(req.params.id, notes)
//     if (result) {
//         res.json(result)
//     } else {
//         res.send(404)
//     }
// })

// app.post('/api/books', (req, res) => {
//     req.body.id = notes.length.toString()
//     const note = newNote(req.body, notes)
//     res.json(note)
// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/mybooks.html'))
// })


app.listen(PORT, () => {  console.log(`API server now on port ${PORT}!`)});