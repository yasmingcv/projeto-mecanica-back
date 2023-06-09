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

//Import do arquivo da controller que irá solicitar a model os dados do BD
var controllerAluno = require('./controller/controller_aluno.js');
var controllerProfessor = require('./controller/controller_professor.js');
var controllerAdministrador = require('./controller/controller_administrador.js');
var controllerTurma = require('./controller/controller_turma.js');
var controllerAtividade = require('./controller/controller_atividade.js');
var controllerUnidadeCurricular = require('./controller/controller_unidade_curricular.js');
var controllerDesempenhoMatricula = require('./controller/controller_desempenho_matricula.js');
var controllerSubTurmas = require('./controller/controller_sub_turma.js');
var controllerCursos = require('./controller/controller_curso.js');

/**************************************************** ALUNOS *****************************************************/

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

//Endpoint: Insere um professor 
app.post('/v1/mecanica/professor', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição 
        let dadosBody = request.body;
        console.log(dadosBody);
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

//EndPoint: atualiza uma turma filtrando pelo ID
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

//EndPoint: retorna todas as turmas 
app.get('/v1/mecanica/turma', cors(), async function (request, response){
    let dadosTurmas = await controllerTurma.getTurmas()

    response.json(dadosTurmas)
    response.status(dadosTurmas.status)
})

//EndPoint: retorna uma turma filtrando pelo ID
app.get('/v1/mecanica/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTurma = await controllerTurma.getBuscarTurmaId(id)

    response.json(dadosTurma)
    response.status(dadosTurma.status)
})

//EndPoint: apaga uma turma filtrando pelo ID
app.delete('/v1/mecanica/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTurma = await controllerTurma.deletarTurma(id)

    response.status(resultDadosTurma.status)
    response.json(resultDadosTurma)
})

/**************************************************** ATIVIDADE *****************************************************/

//EndPoint: retorna todas as atividades
app.get('/v1/mecanica/atividade', cors(), async function (request, response){
    let dadosAtividades = await controllerAtividade.getAllAtividades()
    console.log(dadosAtividades);

    response.json(dadosAtividades)
    response.status(dadosAtividades.status)
})

//EndPoint: retorna uma atividade filtrando pelo ID 
app.get('/v1/mecanica/atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosAtividade = await controllerAtividade.getBuscarAtividadeID(id)

    response.json(dadosAtividade)
    response.status(dadosAtividade.status)
})

//EndPoint: insere uma nova atividade
app.post('/v1/mecanica/atividade', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAtividade = await controllerAtividade.inserirAtividade(dadosBody)

        response.status(resultDadosAtividade.status)
        response.json(resultDadosAtividade)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: atualiza uma atividade, filtrando pelo ID
app.put('/v1/mecanica/atividade/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosAtividade = await controllerAtividade.atualizarAtividade(dadosBody, id)

        response.status(resultDadosAtividade.status)
        response.json(resultDadosAtividade)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: apaga uma atividade filtrando pelo ID
app.delete('/v1/mecanica/atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosAtividade = await controllerAtividade.deletarAtividade(id)

    response.status(resultDadosAtividade.status)
    response.json(resultDadosAtividade)
})

//Endpoint: Retorna uma atividade pelo Nome
app.get('/v1/mecanica/atividade/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeAtividade = request.params.nome;

    let dadosAtividadeByName = await controllerAtividade.getBuscarAtividadeNome(nomeAtividade);

    response.status(dadosAtividadeByName.status);
    response.json(dadosAtividadeByName);

});

//Endpoint: Retorna uma atividade pelo Nome da unidade curricular
app.get('/v1/mecanica/atividade/unidade-curricular/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeUnidadeCurricular = request.params.nome;

    let dadosAtividadeByNameUnidadeCurricular = await controllerAtividade.getBuscarAtividadeByNameUnidadeCurricular(nomeUnidadeCurricular);

    response.status(dadosAtividadeByNameUnidadeCurricular.status);
    response.json(dadosAtividadeByNameUnidadeCurricular);

});

/**************************************************** UNIDADE CURRICULAR *****************************************************/

//EndPoint: retorna todas as unidades curriculares
app.get('/v1/mecanica/unidade-curricular', cors(), async function (request, response){
    let dadosUnidadesCurriculares = await controllerUnidadeCurricular.getUnidadesCurriculares()
    console.log(dadosUnidadesCurriculares);

    response.json(dadosUnidadesCurriculares)
    response.status(dadosUnidadesCurriculares.status)
})

//EndPoint: retorna uma unidade curricular filtrando pelo ID 
app.get('/v1/mecanica/unidade-curricular/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosUnidadeCurricular = await controllerUnidadeCurricular.getBuscarUnidadeCurricularID(id)

    response.json(dadosUnidadeCurricular)
    response.status(dadosUnidadeCurricular.status)
})

//EndPoint: insere uma nova unidade curricular
app.post('/v1/mecanica/unidade-curricular', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosUnidadeCurricular = await controllerUnidadeCurricular.inserirUnidadeCurricular(dadosBody)

        response.status(resultDadosUnidadeCurricular.status)
        response.json(resultDadosUnidadeCurricular)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: atualiza uma unidade curricular, filtrando pelo ID
app.put('/v1/mecanica/unidade-curricular/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da unidade curricular pelo parametro
        let id = request.params.id
        //Recebe os dados da unidade curricular encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosUnidadeCurricular = await controllerUnidadeCurricular.atualizarUnidadeCurricular(dadosBody, id)

        response.status(resultDadosUnidadeCurricular.status)
        response.json(resultDadosUnidadeCurricular)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: apaga uma unidade curricular, filtrando pelo ID
app.delete('/v1/mecanica/unidade-curricular/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosUnidadeCurricular = await controllerUnidadeCurricular.deletarUnidadeCurricular(id)

    response.status(resultDadosUnidadeCurricular.status)
    response.json(resultDadosUnidadeCurricular)
})

/**************************************************** DESEMPENHO MATRICULA *****************************************************/

//Endpoint: retorna todos os desempenhos de todos os alunos
app.get('/v1/mecanica/desempenho', cors(), async function (request, response){
    let dadosDesempenhosMatriculas = await controllerDesempenhoMatricula.getDesempenhosMatriculasAlunos()

    response.json(dadosDesempenhosMatriculas)
    response.status(dadosDesempenhosMatriculas.status)
})

//Endpoint: retorna desempenhos do aluno filtrando pelo ID do ***aluno***
app.get('/v1/mecanica/desempenho/aluno/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosDesempenhoAluno = await controllerDesempenhoMatricula.getBuscarDesempenhosPelaMatriculaAluno(id)

    response.json(dadosDesempenhoAluno)
    response.status(dadosDesempenhoAluno.status)
})

//EndPoint: insere um novo desempenho
app.post('/v1/mecanica/desempenho', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosDesempenhoAluno = await controllerDesempenhoMatricula.inserirDesempenhoMatriculaAluno(dadosBody)

        response.status(resultDadosDesempenhoAluno.status)
        response.json(resultDadosDesempenhoAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: atualiza um desempenho, filtrando pelo ID
app.put('/v1/mecanica/desempenho/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID pelo parametro
        let id = request.params.id
        //Recebe os dados da unidade curricular encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosDesempenhoAluno = await controllerDesempenhoMatricula.updateDesempenhoMatriculaAluno(dadosBody, id)

        response.status(resultDadosDesempenhoAluno.status)
        response.json(resultDadosDesempenhoAluno)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: apaga um desempenho, filtrando pelo ID do desempenho
app.delete('/v1/mecanica/desempenho/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosDesempenhoAluno = await controllerDesempenhoMatricula.deletarDesempenhoMatriculaAluno(id)

    response.status(resultDadosDesempenhoAluno.status)
    response.json(resultDadosDesempenhoAluno)
})

/******************************************************* SUB-TURMAS ***********************************************************/

//EndPoint: retorna todas as sub-turmas
app.get('/v1/mecanica/sub-turmas', cors(), async function (request, response){

    let dadosSubTurmas = await controllerSubTurmas.getAllSubTurmas();

    response.json(dadosSubTurmas)
    response.status(dadosSubTurmas.status)
});

//EndPoint: retorna uma sub-turma filtrando pelo ID 
app.get('/v1/mecanica/sub-turmas/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosSubTurmas = await controllerSubTurmas.getBuscarSubTurmaID(id)

    response.json(dadosSubTurmas)
    response.status(dadosSubTurmas.status)
});

//Endpoint: Retorna uma Sub-Turma pelo Nome
app.get('/v1/mecanica/sub-turma/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeSubTurma = request.params.nome;

    let dadosSubTurmaByName = await controllerSubTurmas.getBuscarSubTurmaNome(nomeSubTurma);

    response.status(dadosSubTurmaByName.status);
    response.json(dadosSubTurmaByName);

});

//EndPoint: atualiza uma sub-turma, filtrando pelo ID
app.put('/v1/mecanica/sub-turma/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosSubTurma = await controllerSubTurmas.atualizarSubTurma(dadosBody, id)

        response.status(resultDadosSubTurma.status)
        response.json(resultDadosSubTurma)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: insere uma nova sub-turma
app.post('/v1/mecanica/sub-turma', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body
        console.log(dadosBody);

        let resultDadosSubTurma = await controllerSubTurmas.inserirSubTurma(dadosBody)

        response.status(resultDadosSubTurma.status)
        response.json(resultDadosSubTurma)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: apaga uma sub-turma filtrando pelo ID
app.delete('/v1/mecanica/sub-turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosSubTurmas = await controllerSubTurmas.deletarSubTurma(id)

    response.status(resultDadosSubTurmas.status)
    response.json(resultDadosSubTurmas)
});

//Endpoint: Retorna sub-turmas pelo Nome da turma
app.get('/v1/mecanica/sub-turma/turma/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeTurma = request.params.nome;

    let dadosAtividadeByNameTurma = await controllerSubTurmas.getBuscarSubTurmaByNameTurma(nomeTurma);

    response.status(dadosAtividadeByNameTurma.status);
    response.json(dadosAtividadeByNameTurma);

});

/******************************************************* CURSOS ***********************************************************/

//EndPoint: retorna todas as Cursos
app.get('/v1/mecanica/cursos', cors(), async function (request, response){

    let dadosCursos = await controllerCursos.getAllCursos();

    response.json(dadosCursos)
    response.status(dadosCursos.status)
});

//EndPoint: retorna um curso filtrando pelo ID 
app.get('/v1/mecanica/curso/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosCurso = await controllerCursos.getBuscarCursoByID(id)

    response.json(dadosCurso)
    response.status(dadosCurso.status)
});

//Endpoint: Retorna um curso filtrando pelo Nome
app.get('/v1/mecanica/curso/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeCurso = request.params.nome;

    let dadosCursoByName = await controllerCursos.getBuscarCursosNome(nomeCurso);

    response.status(dadosCursoByName.status);
    response.json(dadosCursoByName);

});

//EndPoint: atualiza um curso, filtrando pelo ID
app.put('/v1/mecanica/cursos/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosCursos = await controllerCursos.atualizarCurso(dadosBody, id)

        response.status(resultDadosCursos.status)
        response.json(resultDadosCursos)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: insere uma nova sub-turma
app.post('/v1/mecanica/curso', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body
        console.log(dadosBody);

        let resultDadosCursos = await controllerCursos.inserirCurso(dadosBody)

        response.status(resultDadosCursos.status)
        response.json(resultDadosCursos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: atualiza um curso, filtrando pelo ID
app.put('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosCurso = await controllerCursos.atualizarCurso(dadosBody, id)

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: apaga uma sub-turma filtrando pelo ID
app.delete('/v1/mecanica/curso/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosCurso = await controllerCursos.deletarCurso(id)

    response.status(resultDadosCurso.status)
    response.json(resultDadosCurso)
});


app.listen(8080, function () {
    console.log('Servidor aguardando requisiçõs na porta 8080')
})