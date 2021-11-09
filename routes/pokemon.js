var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('All pokemon...');
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  console.log(id);
  
  res.send(`Special pokemon with id [${id}]`);
});

router.get('/:id/:info', function(req, res, next) {
  const id = req.params.id;
  const info = req.params.info;
  console.log('Id ${id}');
  console.log('Info ${info}');
  
  res.send(`Special pokemon with id [${id}] and info [${info}]`);
});

module.exports = router;
