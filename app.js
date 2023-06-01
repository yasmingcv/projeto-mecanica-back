/**********************************************************************************************************************
 * Objetivo: Arquivo com EndPoints para um website para o curso de mecânica 
 * Data: 22/05/2023
 * Versão: 1.0
 * Autora: Yasmin Gonçalves
 **********************************************************************************************************************/

//Import das bibliotecas para API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Define que os dados que irão chegar no body da requisição serão no padrão JSON
const bodyParserJSON = bodyParser.json()

var message = require('./controller/modulo/config.js')

//Cria o objeto app conforme a classe do express
const app = express()

//Permissões do cors
app.use((request, response, next) => {
    //Define quem poderá acessar a API (* - Todos)
    response.header('Access-Control-Allow-Origin', '*')
    //Define quais métodos serão utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Atribui as permissões ao cors
    app.use(cors())

    next()
})

/**************************************************** ALUNOS *****************************************************/

//Import do arquivo da controller que irá solicitar a model os dados do BD
var controllerAluno = require('./controller/controller_aluno.js');
var controllerProfessor = require('./controller/controller_professor.js');
var controllerAdministrador = require('./controller/controller_administrador.js')
var controllerTurma = require('./controller/controller_turma.js')


//EndPoint para inserir um novo aluno
app.post('/v1/mecanica/aluno', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


//EndPoint para atualizar um aluno filtrando pelo ID
app.put('/v1/mecanica/aluno/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do aluno pelo parametro
        let idAluno = request.params.id
        //Recebe os dados do aluno encaminhados no corpo da requisição
        let dadosBody = request.body

        //Encaminha os dados para a controlller
        let resultDadosAluno = await controllerAluno.atualizarAluno(dadosBody, idAluno)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint que retorna um aluno filtrando pelo ID
app.get('/v1/mecanica/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getBuscarAlunoID(idAluno)

    response.json(dadosAluno)
    response.status(dadosAluno.status)
})

//EndPoint que retorna todos os alunos
app.get('/v1/mecanica/aluno', cors(), async function (request, response) {
    let dadosAluno = await controllerAluno.getAlunos()

    response.json(dadosAluno)
    response.status(dadosAluno.status)
})

app.delete('/v1/mecanica/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let resultDadosAluno = await controllerAluno.deletarAluno(idAluno)

    response.status(resultDadosAluno.status)
    response.json(resultDadosAluno)
})

/**************************************************** PROFESSOR *****************************************************/

// Endpoint: Retorna todos os professores
app.get('/v1/mecanica/professor', cors(), async function (request, response) {

    let dadosProfessor = await controllerProfessor.getProfessores();

    response.status(dadosProfessor.status);
    response.json(dadosProfessor)

});

//Endpoint: Retorna um professor pelo ID
app.get('/v1/mecanica/professor/:id', cors(), async function (request, response) {

    //Recebe p
    let idProfessor = request.params.id;

    let dadosProfessorByID = await controllerProfessor.getBuscarProfessorID(idProfessor);

    response.status(dadosProfessorByID.status);
    response.json(dadosProfessorByID);

});

//Endpoint: Retorna um professor pelo Nome
app.get('/v1/mecanica/professor/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeProfessor = request.params.nome;

    let dadosProfessorByName = await controllerProfessor.getBuscarProfessorNome(nomeProfessor);

    response.status(dadosProfessorByName.status);
    response.json(dadosProfessorByName);

});

//Endpoint: Atualiza um Professor filtrando pelo id
app.post('/v1/mecanica/professor', cors(), async function (request, response) {

    let contentType = request.headers['content-type'];

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição 
        let dadosBody = request.body;

        let resultDadosProfessor = await controllerProfessor.inserirProfessor(dadosBody);

        response.status(resultDadosProfessor.status);
        response.json(resultDadosProfessor);

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }


});

//Endpoint: Atualiza um Professor filtrando pelo id
app.put('/v1/mecanica/professor/:id', cors(), async function (request, response) {

    let contentType = request.headers['content-type'];

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLocaleLowerCase() == 'application/json') {

        //Recebe o ID do aluno pelo parametro
        let idProfessor = request.params.id;
        //Recebe os dados encaminhados na requisição 
        let dadosBody = request.body;

        
    
        //Encaminha os dados para a controller
        let resultDadosProfessor = await controllerProfessor.atualizarProfessor(dadosBody, idProfessor);
    
        response.status(resultDadosProfessor.status);
        response.json(resultDadosProfessor);

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }


});

//Endpoint: Deleta um professor existente filtrando pelo id
app.delete('/v1/mecanica/professor/:id', cors(), async function (request, response) {

    //Recebe o ID do aluno pelo parametro
    let idProfessor = request.params.id;

    let buscaPeloId = await controllerProfessor.getBuscarProfessorID(idProfessor)

    if (buscaPeloId.status !== 404) {
    
        //Encaminha os dados para a controller
        let resultDadosProfessor = await controllerProfessor.deletarProfessor(idProfessor);
    
        response.status(resultDadosProfessor.status);
        response.json(resultDadosProfessor);
        
    }else{
        response.status(buscaPeloId.status)
        response.json(buscaPeloId)
    }


});


/**************************************************** ADMINISTRADOR *****************************************************/

//EndPoint: lista todos os administradores
app.get('/v1/mecanica/administrador', cors(), async function (request, response){
    let dadosAdministradores = await controllerAdministrador.getAdministradores()

    response.json(dadosAdministradores)
    response.status(dadosAdministradores.status)
})

//EndPoint: busca o administrador pelo id
app.get('/v1/mecanica/administrador/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosAdministrador = await controllerAdministrador.getBuscarAdministradorID(id)

    response.json(dadosAdministrador)
    response.status(dadosAdministrador.status)
})

//EndPoint: insere um novo administrador
app.post('/v1/mecanica/administrador', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição 
        let dadosBody = request.body

        let resultDadosAdm = await controllerAdministrador.inserirAdministrador(dadosBody);

        response.status(resultDadosAdm.status)
        response.json(resultDadosAdm)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: atualiza um administrador
app.put('/v1/mecanica/administrador/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do adm pelo parametro
        let idAdministrador = request.params.id
        //Recebe os dados do adm encaminhados no corpo da requisição
        let dadosBody = request.body

        //Encaminha os dados para a controlller
        let resultDadosAdministrador = await controllerAdministrador.atualizarAdministrador(dadosBody, idAdministrador)

        response.status(resultDadosAdministrador.status)
        response.json(resultDadosAdministrador)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: apaga um administrador
app.delete('/v1/mecanica/administrador/:id', cors(), async function (request, response){
    let idAdministrador = request.params.id

    let resultDadosAdministrador = await controllerAdministrador.deletarAdministrador(idAdministrador)

    response.status(resultDadosAdministrador.status)
    response.json(resultDadosAdministrador)
})

/**************************************************** TURMA *****************************************************/

//EndPoint: insere uma nova turma
app.post('/v1/mecanica/turma', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTurma = await controllerTurma.inserirTurma(dadosBody)

        response.status(resultDadosTurma.status)
        response.json(resultDadosTurma)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint para atualizar uma turma filtrando pelo ID
app.put('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da turma pelo parametro
        let idTurma = request.params.id
        //Recebe os dados da turma encaminhados no corpo da requisição
        let dadosBody = request.body

        //Encaminha os dados para a controlller
        let resultDadosTurma = await controllerTurma.atualizarTurma(dadosBody, idTurma)

        response.status(resultDadosTurma.status)
        response.json(resultDadosTurma)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

app.get('/v1/mecanica/turma', cors(), async function (request, response){
    let dadosTurmas = await controllerTurma.getTurmas()

    response.json(dadosTurmas)
    response.status(dadosTurmas.status)
})

app.get('/v1/mecanica/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTurma = await controllerTurma.getBuscarTurmaId(id)

    response.json(dadosTurma)
    response.status(dadosTurma.status)
})

app.delete('/v1/mecanica/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTurma = await controllerTurma.deletarTurma(id)

    response.status(resultDadosTurma.status)
    response.json(resultDadosTurma)
})

app.listen(8080, function () {
    console.log('Servidor aguardando requisiçõs na porta 8080')
})