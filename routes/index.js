const router = require("express").Router();
const apiRoutes = require("./api");
const viewRoutes = require("./htmlroutes");

router.use('/', apiRoutes);

module.exports = router;