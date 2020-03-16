// const express =require('express');
// const router =express.Router();
const router = require('express').Router();
const {
    User
} = require('../models/index.js');
router.get('/', (req, res) => {
    User.findAll().then(users => res.send(users))
})
router.post('/register', (req, res) => {
    User.create({
            ...req.body
        })
        .then(() => res.status(201).send('Usuario creado satisfactoriamente'))
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
})
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username,
                password:req.body.password
            }
        })
        .then(user =>{
            if(!user){
                return res.status(400).send({message:'Usuario o contraseña incorrectas'})
            }
            res.send({user,message:'Bienvenid@ '+user.username})})
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
})
module.exports = router;