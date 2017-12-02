var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');
var alex = require('alex')

router.route("/").get(function (req, res) {
  res.render('./static/index.html');
})

router.route("/alex-text").post(function (req, res) {
  console.log(req.body.text);
    res.json(alex(req.body.text).messages)
})

router.route("/alex-text-replace").post(function (req, res){
  toReplace = "";
  replace = "";
  output = req.body.text;
  errors = alex(req.body.text).messages
   for (i = 0; i < errors.length; i++){
       console.log(errors[i].message)
        if ((errors[i].message).includes("may be insensitive")){
          toReplace = replaceParse(errors[i].message)[0]
          replace = replaceParse(errors[i].message)[1]
          output = output.replace(toReplace, replace)
      }
      if ((errors[i].message).includes("it's profane")){

      }
    }
  res.header("Access-Control-Allow-Origin", "*");
  res.json([{
    "replacement_string" : output
  }])
})

function replaceParse(str) {
  str = str.replace(/`/g, '');
  var res = str.split(" may be insensitive, use ")[0];
  var toReplace = str.split(" may be insensitive, use ")[1].split(",")[0].replace(" instead", "");
  return [res, toReplace];
}

module.exports = router;
