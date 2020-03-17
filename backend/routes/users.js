// const express =require('express');
// const router =express.Router();
const router = require('express').Router();
const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs')
router.get('/', (req, res) => {
    User.findAll().then(users => res.send(users))
})
router.post('/register', (req, res) => {
    const textPassword=req.body.password;//'123'
    const hash =bcrypt.hashSync(textPassword,9);
    User.create({
            ...req.body,
            password:hash
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