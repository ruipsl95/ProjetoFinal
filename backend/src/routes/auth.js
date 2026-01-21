const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Docente = require('../models/Docente');
const dotenv = require('dotenv');

dotenv.config();


// POST api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o utilizador existe
        let docente = await Docente.findOne({ email });
        if (!docente) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // Compara a password
        const isMatch = await bcrypt.compare(password, docente.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // Gera o token
        const payload = {
            user: { id: docente.id }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // O login dura 5 horas
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Envia o token para o Frontend
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});


// GET api/auth/me
router.get('/me', auth, async (req, res) => {
    try {
        // Vai buscar o docente pelo ID (que veio do Token), mas não evia a password
        const docente = await Docente.findById(req.user.id).select('-password');
        res.json(docente);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;