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

module.exports = router;
