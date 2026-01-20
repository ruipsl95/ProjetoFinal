const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Importação do Modelo de Docente
const Docente = require('./src/models/Docente'); 

const seedDocente = async () => {
    try {
        // Conectar à BD
        await mongoose.connect(process.env.MONGO_URI);

        await Docente.deleteMany();
        console.log('Dados antigos limpos.');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);

        //Criação do User
        const novoDocente = new Docente({
            nome: "Rui Pedro",
            email: "rui@teste.com",
            password: passwordHash, 
            area_cientifica: "Informática"
        });

        await novoDocente.save();

        process.exit();
    } catch (error) {
        console.error('Erro:', error);
        process.exit(1);
    }
};

seedDocente();