const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Proposta = require('../models/Proposta');
const Aluno = require('../models/Aluno'); 

// OBTER PROPOSTAS
router.get('/me', auth, async (req, res) => {
    try {
        const propostas = await Proposta.find({ docente: req.user.id })
            .populate('alunos', 'nome numero_aluno')
            .sort({ dataCriacao: -1 });
        res.json(propostas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// CRIAR PROPOSTA
router.post('/', auth, async (req, res) => {
    try {
       
        const { titulo, descricao, palavrasChave, numerosAlunos } = req.body;

        let listaIdsAlunos = [];
        let status = 'Disponível';

        // SE HOUVER ALUNOS PARA ADICIONAR
        if (numerosAlunos && numerosAlunos.length > 0) {
            // Procura por todos os alunos que tenham esses números
            const alunosEncontrados = await Aluno.find({ 
                numero_aluno: { $in: numerosAlunos } 
            });

            if (alunosEncontrados.length !== numerosAlunos.length) {
                return res.status(400).json({ msg: "Um ou mais números de aluno não existem na BD." });
            }

            // Extração dos IDs dos alunos encontrados
            listaIdsAlunos = alunosEncontrados.map(a => a._id);
            status = 'Atribuída';
        }

        // Tratamento das Palavras-Chave
        let listaTags = [];
        if (palavrasChave) {
            listaTags = palavrasChave.split(',').map(tag => tag.trim()).filter(tag => tag);
        }

        const novaProposta = new Proposta({
            titulo,
            descricao,
            docente: req.user.id,
            alunos: listaIdsAlunos,
            status,
            palavrasChave: listaTags
        });

        const proposta = await novaProposta.save();
        

        await proposta.populate('alunos', 'nome numero_aluno');

        res.json(proposta);

    } catch (err) {
        res.status(500).send('Erro no servidor: ' + err.message);
    }
});

//ELIMINAR PROPOSTA
router.delete('/:id', auth, async (req, res) => {
    try {
        // Tenta encontrar e remover. Garante que só o dono (docente) pode apagar.
        const proposta = await Proposta.findOneAndDelete({ 
            _id: req.params.id, 
            docente: req.user.id 
        });

        if (!proposta) {
            return res.status(404).json({ msg: 'Proposta não encontrada ou não tem permissão' });
        }

        res.json({ msg: 'Proposta removida com sucesso' });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;