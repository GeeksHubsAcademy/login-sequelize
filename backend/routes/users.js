// const express =require('express');
// const router =express.Router();
const router = require('express').Router();
const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
router.get('/', (req, res) => {
    User.findAll().then(users => res.send(users))
})
router.post('/register', async (req, res) => {
    try {
        const textPassword = req.body.password; //'Alfredo27'
        const hash = await bcrypt.hash(textPassword, 9);
        //$2a$09$Ch7RTDqD8LZpDu.um2oObuLAx6hIdsOmtuKsdI0yZgNleMDpalFIO
        await User.create({
            ...req.body,
            password: hash
        })
        res.status(201).send('Usuario creado satisfactoriamente')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            return res.status(400).send({
                message: 'Usuario o contraseña incorrectas'
            });
        }
        const hash = user.password; //$2a$09$Ch7RTDqD8LZpDu.um2oObuLAx6hIdsOmtuKsdI0yZgNleMDpalFIO
        const textPassword = req.body.password; //'Alfredo27'
        const isMatch = await bcrypt.compare(textPassword, hash);
        if (!isMatch) {
            return res.status(400).send({
                message: 'Usuario o contraseña incorrectas'
            });
        }
        const token = jwt.sign({id:user.id}, jwt_secret,{expiresIn:'1d'} );
        res.send({
            user,
            token,
            message: 'Bienvenid@ ' + user.username
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
module.exports = router;