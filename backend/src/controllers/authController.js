exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const docente = await Docente.findOne({ email });

        if (!docente) {
            return res.status(400).json({ msg: 'Credenciais inválidas (Email não existe)' });
        }

        const isMatch = await bcrypt.compare(password, docente.password);
        
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas (Password errada)' });
        }

        // Gerar Token
        const payload = { user: { id: docente.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};