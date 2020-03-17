// const express =require('express');
// const router =express.Router();
const router = require('express').Router();
const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs')
router.get('/', (req, res) => {
    User.findAll().then(users => res.send(users))
})
router.post('/register', (req, res) => {
    const textPassword = req.body.password;//'Alfredo27'
    const hash = bcrypt.hashSync(textPassword,9);
    //$2a$09$Ch7RTDqD8LZpDu.um2oObuLAx6hIdsOmtuKsdI0yZgNleMDpalFIO
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
                username: req.body.username
            }
        })
        .then(user =>{
            if(!user){
                return res.status(400).send({message:'Usuario o contraseña incorrectas'});
            }
            const hash = user.password;//$2a$09$Ch7RTDqD8LZpDu.um2oObuLAx6hIdsOmtuKsdI0yZgNleMDpalFIO
            const textPassword = req.body.password;//'Alfredo27'
            const isMatch = bcrypt.compareSync(textPassword,hash);
            if(!isMatch){
                 return res.status(400).send({message:'Usuario o contraseña incorrectas'});
            }
            res.send({user,message:'Bienvenid@ '+user.username})})
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
})
module.exports = router;