const axiosBase = require('axios');
const router = require("express").Router();
var express = require('express');
const pool = require('../db/db');
const selectUser = require('../db/db');
const app = require('../app');


router.get('/', function(req, res, next) {
  console.log('router.get(1)');
  res.header('Content-Type', 'application/json; charset=utf-8')
  console.log('router');
});


router.get('/event', function(req, res, next) {
  console.log('router.get(2)');
  res.header('Content-Type', 'application/json; charset=utf-8')
  //res.send(param);
  console.log('router/event');
});
module.exports = router;

/*
const axios = axiosBase.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});
*/