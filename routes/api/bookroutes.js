const { Books } = require("../../models");

const router = require("express").Router();


router.get("/", async (req, res) => {
    const book = await Books.findAll({where:{user_id: req.session.user.id}});
    console.log(book)
    res.json(book)
}) 

router.post("/", async (req, res) => {
    console.log(req.body)
    console.log(req.session)
    try{
        const book = await Books.create({
            bookImg: req.body.bookImg,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            user_id: req.session.user.id
        }) 
        console.log(book)
        res.json(book)
    }catch(err) {
console.log(err)
res.status(500).json(err)
    }
}) 

module.exports = router;