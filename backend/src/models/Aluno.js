const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true 
    },
    numero_aluno: { 
        type: String, 
        required: true, 
        unique: true 
    },
    curso: { 
        type: String, 
        default: 'Engenharia Informática'
    }
});

module.exports = mongoose.model('Aluno', AlunoSchema);