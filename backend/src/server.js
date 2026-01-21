const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/alunos', require('./routes/alunos'));
app.use('/api/propostas', require('./routes/propostas'));

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));