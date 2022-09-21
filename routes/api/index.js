const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookroutes");
router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;