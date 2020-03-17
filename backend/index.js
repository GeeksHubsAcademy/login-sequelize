// import express from 'express';
const express = require('express');
const app = express(); 
const PORT = 3000;
const usersRouter = require('./routes/users.js');
//para que el req.body no sea undefined
app.use(express.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
//  /users es el prefix
app.use('/users', usersRouter)

app.listen(PORT, () => console.log('server running on ' + PORT));