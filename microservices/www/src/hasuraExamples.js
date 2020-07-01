var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');
var alex = require('alex')
var Dictionary = require("oxford-dictionary-api");
var app_id = "89386bcd"; 
var app_key = "cd6a4fc2437aa2b93b47c24ca32de8c7";

var dict = new Dictionary(app_id,app_key);

router.route("/").get(function (req, res) {
  res.render('./static/index.html');
})

router.route("/alex-text").post(function (req, res) {
  console.log(req.body.text);
    res.json(alex(req.body.text).messages)
})

router.route("/alex-text-replace").post(function (req, res){
  var replacements = {};
  replaced = "";
  replacement = "";
  output = req.body.text;
  errorMsgs = []
  errors = alex(req.body.text).messages
   for (i = 0; i < errors.length; i++){
       errorMsgs.push(errors[i].message)
       console.log(errors[i].message)
        if ((errors[i].message).includes("may be insensitive")){
          replaced = replaceParse(errors[i].message)[0]
          console.log(replaced)
          replacement = replaceParse(errors[i].message)[1]
          console.log(replacement)
          output = output.replace(replaced, replacement)
          console.log(output)
          replacements[replaced] = replacement
      } else {
      //   if ((errors[i].message).includes("it's profane")){
      //     var profanity = errors[i].message.replace("Don’t use", "").replace(", it’s profane", "").replace(/"/g, "").trim()
      //     console.log(profanity)
      //     dict.find(profanity, function(error,data){ 
      //       if(error){
      //         return console.log(error);
      //       } else {
      //       console.log(data); 
      //       }
      //     });          
      //   }
      }
    }
  res.header("Access-Control-Allow-Origin", "*");
  res.json([{
    "replacement_string" : output,
    "replacements" : replacements,
    "comments" : errorMsgs

  }])
})



function replaceParse(str) {
  str = str.replace(/`/g, '');
  var replaced = str.split(" may be insensitive, use ")[0];
  var replacement = str.split(" may be insensitive, use ")[1].split(",")[0].replace(" instead", "");
  return [replaced, replacement];
}

module.exports = router;
