const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lê o token do header
    const token = req.header('x-auth-token');

    // Se o token não existir, nega o acesso
    if (!token) {
        return res.status(401).json({ msg: 'Sem token, autorização negada' });
    }

    // Verifica se o token é válido
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Guarda o ID do docente no pedido
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};