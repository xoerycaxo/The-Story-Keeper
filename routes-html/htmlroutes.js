const router = require('express').Router();

const homeroute = require('./server.js')

router.use('/', homeroute);
router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;