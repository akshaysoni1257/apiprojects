const express = require('express');

const routes  = express.Router();

routes.use('/adminapi',require('./adminapi'));

module.exports = routes;