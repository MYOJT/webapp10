const router = require("express").Router();

// フロントエンドからのリクエストを受付け
/*
router.get('/',function(req,res,next){
  axios.get('title')
  .then(function(response){
    res.render('index',response.data);
  })
  .catch(function(error){
    console.log('ERROR!! occurred in Backend.')
  });
});


router.post('/', function (req, res, next) {
  Pool.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  res.redirect('/');
});
*/
module.exports = router;