const express = require('express');
const router = express.Router();
const Docente = require('../models/Docente');

// Obtem todos os docentes (Rota Publica))
router.get('/', async (req, res) => {
    try {
        const docentes = await Docente.find().select('-password -__v');
        res.json(docentes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;