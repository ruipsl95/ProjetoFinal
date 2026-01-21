const Proposta = require('../models/Proposta');
const Aluno = require('../models/Aluno');

// Criação de Proposta
exports.criarProposta = async (req, res) => {
    const { titulo, descricao, palavras_chave, alunos_ids } = req.body;

    try {
        // Validação: Verificar se os alunos existem mesmo
        if (alunos_ids && alunos_ids.length > 0) {
            const count = await Aluno.countDocuments({ '_id': { $in: alunos_ids } });
            if (count !== alunos_ids.length) {
                return res.status(400).json({ msg: 'Um ou mais alunos não existem na BD.' });
            }
        }

        const novaProposta = new Proposta({
            titulo,
            descricao,
            palavras_chave,
            orientador: req.user.id, // ID vem do Token (Docente autenticado)
            alunos: alunos_ids || []
        });

        const proposta = await novaProposta.save();
        res.json(proposta);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

exports.obterMinhasPropostas = async (req, res) => {
    try {
        // Find onde orientador == ID do utilizador logado
        const propostas = await Proposta.find({ orientador: req.user.id })
            .populate('alunos', ['nome', 'numero']); 
            
        res.json(propostas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
};