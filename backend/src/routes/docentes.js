
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin'); 
const Docente = require('../models/Docente');
const Proposta = require('../models/Proposta'); 

// LISTAR DOCENTES
router.get('/', [auth, admin], async (req, res) => {
    try {
        const docentes = await Docente.find().select('-password').sort({ nome: 1 });
        res.json(docentes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro Servidor');
    }
});

// CRIAR DOCENTE
router.post('/', [auth, admin], async (req, res) => {
    const { nome, email, password, area_cientifica } = req.body;

    try {
   
        let docente = await Docente.findOne({ email });
        if (docente) {
            return res.status(400).json({ msg: 'Esse email já está registado.' });
        }
        docente = new Docente({
            nome,
            email,
            password,
            area_cientifica
        });

        const salt = await bcrypt.genSalt(10);
        docente.password = await bcrypt.hash(password, salt);

        await docente.save();
        res.json(docente);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao criar docente');
    }
});

//APAGAR DOCENTE
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
       
        await Proposta.deleteMany({ docente: req.params.id });

        await Docente.findByIdAndDelete(req.params.id);
        
        res.json({ msg: 'Docente e respetivas propostas eliminados.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao apagar');
    }
});

module.exports = router;