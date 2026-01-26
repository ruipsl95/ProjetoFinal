```markdown
# Plataforma de Gestão de Propostas de Projeto

Este projeto é uma aplicação Web para a gestão académica de propostas de projeto. Permite aos docentes lançar temas, e inclui um painel de administração para gestão de utilizadores.

---

## Estrutura do Projeto

O projeto está organizado em duas pastas principais dentro da raiz. Certifica-te de que estás na pasta correta ao executar os comandos.

```text
projetofinal/
│
├── backend/    # Servidor API (Node.js + Express + MongoDB)
│   ├── .env            # Configurações de ambiente
|   |── admin.js        # Script de criação do admin e docente
│   └── src/            # Código fonte do servidor  
│   └── src/            # Código fonte do servidor
│
└── frontend/   # Interface do Utilizador (Vue.js 3)
    ├── src/            # Vistas, Componentes e Router
    └── package.json

```

---

## Pré-requisitos

Para rodar este projeto, precisas de ter instalado:

1. **Node.js** (v16 ou superior).
2. **MongoDB** (A correr localmente ou acesso a um cluster Atlas).
3. **Vue CLI** (Necessário para usar o comando `vue ui`).
* *Para instalar:* `npm install -g @vue/cli`



---

## 🚀 Passo 1: Configurar o Backend

O servidor deve ser o primeiro a ser configurado e iniciado.

1. **Abrir o terminal** na raiz do projeto e entrar na pasta do backend:
```bash
cd backend

```


2. **Instalar as dependências:**
```bash
npm install

```


3. **Configurar Variáveis de Ambiente:**
Crira um ficheiro chamado `.env` dentro da pasta `backend/` e colar o seguinte conteúdo:
```env
MONGO_URI=mongodb://localhost:27017/gestao-propostas
JWT_SECRET=segredo_super_secreto
PORT=5001

```


4. **Criar o Administrador e docente Inicial:**
Correr este script uma única vez para criar a conta de gestão na base de dados e uma conta de docente:
```bash
node seed.js

```


*(Deve aparecer a mensagem: "Admin criado com sucesso!")*
5. **Iniciar o Servidor:**
```bash
npm run dev

```


*O Backend ficará a correr em: `http://localhost:5001*`

---

## 💻 Passo 2: Configurar o Frontend

Podemos utilizar a interface usando o **Vue UI** ou o **Terminal**.

### Opção A: Usando o Vue UI (Recomendado)

1. Abre um **novo terminal** (não feches o do backend) e escreve:
```bash
vue ui

```


2. O navegador abrirá automaticamente em `http://localhost:8000`.
3. **Importar o Projeto:**
* Clicar em **"Gestor de Projetos"**.
* Clicar no botão **"Importar"**.
* Navegar até à pasta `projetofinal` e entra na pasta `frontend`.
* Clicar no botão **"Importar esta pasta"** .


4. **Iniciar o Servidor de Desenvolvimento:**
* No menu lateral esquerdo, clicar em **"Tarefas"**.
* Selecionar a tarefa **"serve"** (ou `dev`).
* Clicar no botão **"Executar tarefa"**.
* Quando a compilação terminar, clicar em **"Abrir aplicação"**.



### Opção B: Via Terminal (Alternativa Rápida)

1. Abrir um novo terminal e entrar na pasta frontend:
```bash
cd frontend

```


2. Instalar as bibliotecas:
```bash
npm install

```


3. Iniciar o projeto:
```bash
npm run dev

```


*Aceda no browser ao link indicado (geralmente `http://localhost:5173` ou `8080`).*

---

## 🔑 Credenciais de Acesso

### 1. Administrador (Painel de Gestão)

Utilizar esta conta para criar e apagar contas de professores.

* **Email:** `admin@uab.pt`
* **Password:** `123456`

Conta de docente criada para testes:
* **Email:** `docente@uab.pt`
* **Password:** `123456`

### 2. Docentes

* As contas de docentes **não se registam sozinhas**.
* Deves entrar como Admin, ir a "Gestão Docentes" e criar um novo docente.
* Depois, faz Logout e entra com os dados desse novo docente.

### 3. Alunos (Portal Público)

* Não necessitam de login.
* Acedem diretamente à página pública para ver propostas e candidatar-se usando o número de estudante.

