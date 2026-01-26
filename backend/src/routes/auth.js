const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Docente = require('../models/Docente');
const Admin = require('../models/Admin'); 

// ROTA DE LOGIN (POST /api/auth)
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;
        let role = '';

        // Tentar encontrar como Docente
        user = await Docente.findOne({ email });
        if (user) {
            role = 'docente';
        } else {
            // Se não for docente, tentar encontrar como Admin
            user = await Admin.findOne({ email });
            if (user) {
                role = 'admin';
            }
        }

        // Se não encontrou em lado nenhum
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais Inválidas' });
        }

        // Verificar a Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais Inválidas' });
        }

        // Gerar Token 
        const payload = {
            user: {
                id: user.id,
                role: role 
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'segredo',
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role }); // Envia o role para o frontend guardar
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;