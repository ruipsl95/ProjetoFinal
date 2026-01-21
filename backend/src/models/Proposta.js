const mongoose = require('mongoose');

const PropostaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    docente: { type: mongoose.Schema.Types.ObjectId, ref: 'Docente', required: true },
    
    //Array de alunos para poder guardar 0 ou mais
    alunos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    }],

    status: {
        type: String,
        enum: ['Disponível', 'Atribuída'],
        default: 'Disponível'
    },

    palavrasChave: { type: [String], default: [] },
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposta', PropostaSchema);