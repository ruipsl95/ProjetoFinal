const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Aluno = require('../models/Aluno');

// GET /api/alunos/pesquisa?q=
router.get('/pesquisa', auth, async (req, res) => {
    try {
        const { q } = req.query; // O termo que o utilizador escreveu

        if (!q) return res.json([]);

        // Procura alunos onde o NOME ou o NÚMERO contenham o texto
        const alunos = await Aluno.find({
            $or: [
                { nome: { $regex: q, $options: 'i' } },
                { numero_aluno: { $regex: q, $options: 'i' } }
            ]
        }).limit(5).select('nome numero_aluno'); //Limite de 5 alunos para pesquisa rápida

        res.json(alunos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;