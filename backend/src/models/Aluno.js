const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    numero: { type: String, required: true, unique: true },
    curso: String
});

module.exports = mongoose.model('Aluno', AlunoSchema);