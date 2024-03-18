var express = require('express');
var router = express.Router();

/* GET cool page. */
router.get('/', function(req, res, next) {
  res.render('cool', { title: 'Express' });
});

module.exports = router;
