const mongoose = require('mongoose');

const PropostaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    palavras_chave: [String], 
    
    // Relação 1:1 com o Docente
    orientador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Docente', 
        required: true 
    },

    // Relação N:M com Alunos
    alunos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Aluno' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Proposta', PropostaSchema);