const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Importar os Modelos (Verifica se os caminhos estão corretos)
const Admin = require('./src/models/Admin');
const Docente = require('./src/models/Docente');

dotenv.config();

// Ligar à BD
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Conectado... A preparar contas...'))
  .catch(err => {
    console.error('Erro na ligação:', err);
    process.exit(1);
  });

const criarContas = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordPadrao = '123456'; 
        const passwordHash = await bcrypt.hash(passwordPadrao, salt);

        // --- CRIAR ADMINISTRADOR ---
        const emailAdmin = 'admin@uab.pt';
        let admin = await Admin.findOne({ email: emailAdmin });

        if (admin) {
            console.log('Admin já existe.');
        } else {
            admin = new Admin({
                nome: 'Administrador Principal',
                email: emailAdmin,
                password: passwordHash
            });
            await admin.save();
            console.log('Admin criado com sucesso!');
        }

        // --- CRIAR DOCENTE ---
        const emailDocente = 'docente@uab.pt';
        let docente = await Docente.findOne({ email: emailDocente });

        if (docente) {
            console.log('Docente já existe.');
        } else {
            docente = new Docente({
                nome: 'Professor Exemplo',
                email: emailDocente,
                password: passwordHash,
                area_cientifica: 'Engenharia Informática',
                role: 'docente'
            });
            await docente.save();
            console.log('Docente criado com sucesso!');
        }

        process.exit();
    } catch (err) {
       
        process.exit(1);
    }
};

criarContas();