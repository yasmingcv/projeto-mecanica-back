/**********************************************************************************************************************
 * Objetivo: Arquivo com EndPoints para um projeto para os cursos de usinagem do SENAI Jandira 
 * Data de início: 22/05/2023
 * Data de término: --/--/----
 * Versão: 1.0
 * Autores: Yasmin Gonçalves e Daniela Lino
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

//Import do JWT
const jwt = require('./middleware/middlewareJWT.js')

//Import das controllers
var controllerAluno = require('./controller/controller_aluno.js');
var controllerProfessor = require('./controller/controller_professor.js');
var controllerAdministrador = require('./controller/controller_administrador.js');
var controllerTurma = require('./controller/controller_turma.js');
var controllerAtividade = require('./controller/controller_atividade.js');
var controllerUnidadeCurricular = require('./controller/controller_unidade_curricular.js');
var controllerDesempenhoMatricula = require('./controller/controller_desempenho_matricula.js');
var controllerSubTurmas = require('./controller/controller_sub_turma.js');
var controllerCursos = require('./controller/controller_curso.js');
var controllerMatricula = require('./controller/controller_matricula.js')
var controllerCriterio = require('./controller/controller_criterio.js')
var controllerTipoCriterio = require('./controller/controller_tipo_criterio.js')
var controllerTipoAtividade = require('./controller/controller_tipo_atividade.js')
var controllerStatusAtividade = require('./controller/controller_status_atividade.js')
var controllerStatusMatricula = require('./controller/controller_status_matricula.js')
var controllerResultadoDesejado = require('./controller/controller_resultado_desejado.js')
var controllerResultadoDesejadoCriterio = require('./controller/controller_resultado_desejado_criterio.js')
var controllerMatriculaAtividade = require('./controller/controller_matricula_atividade.js')
var controllerMatriculaTurmaSubturma = require('./controller/controller_matricula_turma_subturma.js')
var controllerTempoAtividade = require('./controller/controller_tempo_atividade.js')
var controllerUnidadeCurricularProfessor  = require('./controller/controller_unidade_curricular_professor.js')
var controllerAvaliacao  = require('./controller/controller_avaliacao.js')

/**************************************************** ALUNOS *****************************************************/

//Receber o token encaminhado nas requisições e solicitar a validação
const verifyJWT = async function (request, response, next) {

    //Recebe o token encaminhado no header
    let token = request.headers['x-acces-token']

    //Valida a autenticidade do token
    const autenticidadeToken = await jwt.validateJWT(token)

    //Verifica se a aplicação irá continuar ou irá parar 
    if (autenticidadeToken) {
        next()
    } else {
        return response.status(401).end()
    }

}

//Autenticar aluno com email e senha
app.post('/v1/senai/usinagem/aluno/autenticar', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body

    let resultDadosAluno = await controllerAluno.autenticarAluno(dadosBody.email, dadosBody.senha)

    response.status(resultDadosAluno.status)
    response.json(resultDadosAluno)
})


//EndPoint para inserir um novo aluno
app.post('/v1/senai/usinagem/aluno', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/senai/usinagem/aluno/:id', cors(), bodyParserJSON, async function (request, response) {
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
app.get('/v1/senai/usinagem/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getBuscarAlunoID(idAluno)

    response.json(dadosAluno)
    response.status(dadosAluno.status)
})

//EndPoint que retorna todos os alunos
app.get('/v1/senai/usinagem/aluno', cors(), async function (request, response) {
    let dadosAluno = await controllerAluno.getAlunos()

    response.json(dadosAluno)
    response.status(dadosAluno.status)
})

app.delete('/v1/senai/usinagem/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let resultDadosAluno = await controllerAluno.deletarAluno(idAluno)

    response.status(resultDadosAluno.status)
    response.json(resultDadosAluno)
})

/**************************************************** PROFESSOR *****************************************************/

//Autenticar professor com email e senha
app.post('/v1/senai/usinagem/professor/autenticar', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body

    let resultDadosProfessor = await controllerProfessor.autenticarProfessor(dadosBody.email, dadosBody.senha)

    response.status(resultDadosProfessor.status)
    response.json(resultDadosProfessor)
})

// Endpoint: Retorna todos os professores
app.get('/v1/senai/usinagem/professor', cors(), async function (request, response) {

    let dadosProfessor = await controllerProfessor.getProfessores();

    response.status(dadosProfessor.status);
    response.json(dadosProfessor)

});

//Endpoint: Retorna um professor pelo ID
app.get('/v1/senai/usinagem/professor/:id', cors(), async function (request, response) {

    //Recebe p
    let idProfessor = request.params.id;

    let dadosProfessorByID = await controllerProfessor.getBuscarProfessorID(idProfessor);

    response.status(dadosProfessorByID.status);
    response.json(dadosProfessorByID);

});

//Endpoint: Retorna um professor pelo Nome
app.get('/v1/senai/usinagem/professor/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeProfessor = request.params.nome;

    let dadosProfessorByName = await controllerProfessor.getBuscarProfessorNome(nomeProfessor);

    response.status(dadosProfessorByName.status);
    response.json(dadosProfessorByName);

});

//Endpoint: Insere um professor 
app.post('/v1/senai/usinagem/professor', cors(), bodyParserJSON, async function (request, response) {

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
app.put('/v1/senai/usinagem/professor/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.delete('/v1/senai/usinagem/professor/:id', cors(), async function (request, response) {

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

//Autenticar administrador com email e senha
app.post('/v1/senai/usinagem/administrador/autenticar', cors(), bodyParserJSON, async function (request, response){
    let dadosBody = request.body

    let resultDadosAdministrador = await controllerAdministrador.autenticarAdministrador(dadosBody.email, dadosBody.senha)

    response.status(resultDadosAdministrador.status)
    response.json(resultDadosAdministrador)
})

//EndPoint: lista todos os administradores
app.get('/v1/senai/usinagem/administrador', cors(), async function (request, response){
    let dadosAdministradores = await controllerAdministrador.getAdministradores()

    response.json(dadosAdministradores)
    response.status(dadosAdministradores.status)
})

//EndPoint: busca o administrador pelo id
app.get('/v1/senai/usinagem/administrador/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosAdministrador = await controllerAdministrador.getBuscarAdministradorID(id)

    response.json(dadosAdministrador)
    response.status(dadosAdministrador.status)
})

//EndPoint: insere um novo administrador
app.post('/v1/senai/usinagem/administrador', cors(), bodyParserJSON, async function (request, response){
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
app.put('/v1/senai/usinagem/administrador/:id', cors(), bodyParserJSON, async function (request, response){
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
app.delete('/v1/senai/usinagem/administrador/:id', cors(), async function (request, response){
    let idAdministrador = request.params.id

    let resultDadosAdministrador = await controllerAdministrador.deletarAdministrador(idAdministrador)

    response.status(resultDadosAdministrador.status)
    response.json(resultDadosAdministrador)
})

/**************************************************** TURMA *****************************************************/

//EndPoint: insere uma nova turma
app.post('/v1/senai/usinagem/turma', cors(), bodyParserJSON, async function (request, response) {
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
app.put('/v1/senai/usinagem/turma/:id', cors(), bodyParserJSON, async function (request, response) {
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
app.get('/v1/senai/usinagem/turma', cors(), async function (request, response){
    let dadosTurmas = await controllerTurma.getTurmas()

    response.json(dadosTurmas)
    response.status(dadosTurmas.status)
})

//EndPoint: retorna uma turma filtrando pelo ID
app.get('/v1/senai/usinagem/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTurma = await controllerTurma.getBuscarTurmaId(id)

    response.json(dadosTurma)
    response.status(dadosTurma.status)
})

//EndPoint: apaga uma turma filtrando pelo ID
app.delete('/v1/senai/usinagem/turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTurma = await controllerTurma.deletarTurma(id)

    response.status(resultDadosTurma.status)
    response.json(resultDadosTurma)
})

/**************************************************** ATIVIDADE *****************************************************/

//EndPoint: retorna todas as atividades
app.get('/v1/senai/usinagem/atividade', cors(), async function (request, response){
    let dadosAtividades = await controllerAtividade.getAllAtividades()
   

    response.json(dadosAtividades)
    response.status(dadosAtividades.status)
})

//EndPoint: retorna uma atividade filtrando pelo ID 
app.get('/v1/senai/usinagem/atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosAtividade = await controllerAtividade.getBuscarAtividadeID(id)

    response.json(dadosAtividade)
    response.status(dadosAtividade.status)
})

//EndPoint: insere uma nova atividade
app.post('/v1/senai/usinagem/atividade', cors(), bodyParserJSON, async function (request, response){
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
app.put('/v1/senai/usinagem/atividade/:id', cors(), bodyParserJSON, async function (request, response){
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
app.delete('/v1/senai/usinagem/atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosAtividade = await controllerAtividade.deletarAtividade(id)

    response.status(resultDadosAtividade.status)
    response.json(resultDadosAtividade)
})

//Endpoint: Retorna uma atividade pelo Nome
app.get('/v1/senai/usinagem/atividade/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeAtividade = request.params.nome;

    let dadosAtividadeByName = await controllerAtividade.getBuscarAtividadeNome(nomeAtividade);

    response.status(dadosAtividadeByName.status);
    response.json(dadosAtividadeByName);

});

//Endpoint: Retorna uma atividade pelo Nome da unidade curricular
app.get('/v1/senai/usinagem/atividade/unidade-curricular/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeUnidadeCurricular = request.params.nome;

    let dadosAtividadeByNameUnidadeCurricular = await controllerAtividade.getBuscarAtividadeByNameUnidadeCurricular(nomeUnidadeCurricular);

    response.status(dadosAtividadeByNameUnidadeCurricular.status);
    response.json(dadosAtividadeByNameUnidadeCurricular);

});

/**************************************************** UNIDADE CURRICULAR *****************************************************/

//EndPoint: retorna todas as unidades curriculares
app.get('/v1/senai/usinagem/unidade-curricular', cors(), async function (request, response){
    let dadosUnidadesCurriculares = await controllerUnidadeCurricular.getUnidadesCurriculares()
    

    response.json(dadosUnidadesCurriculares)
    response.status(dadosUnidadesCurriculares.status)
})

//EndPoint: retorna uma unidade curricular filtrando pelo ID 
app.get('/v1/senai/usinagem/unidade-curricular/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosUnidadeCurricular = await controllerUnidadeCurricular.getBuscarUnidadeCurricularID(id)

    response.json(dadosUnidadeCurricular)
    response.status(dadosUnidadeCurricular.status)
})

//EndPoint: insere uma nova unidade curricular
app.post('/v1/senai/usinagem/unidade-curricular', cors(), bodyParserJSON, async function (request, response){
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
app.put('/v1/senai/usinagem/unidade-curricular/:id', cors(), bodyParserJSON, async function (request, response){
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
app.delete('/v1/senai/usinagem/unidade-curricular/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosUnidadeCurricular = await controllerUnidadeCurricular.deletarUnidadeCurricular(id)

    response.status(resultDadosUnidadeCurricular.status)
    response.json(resultDadosUnidadeCurricular)
})

/**************************************************** DESEMPENHO MATRICULA *****************************************************/

//Endpoint: retorna todos os desempenhos de todos os alunos
app.get('/v1/senai/usinagem/desempenho', cors(), async function (request, response){
    let dadosDesempenhosMatriculas = await controllerDesempenhoMatricula.getDesempenhosMatriculasAlunos()

    response.json(dadosDesempenhosMatriculas)
    response.status(dadosDesempenhosMatriculas.status)
})

//Endpoint: retorna desempenhos do aluno filtrando pelo ID do ***aluno***
app.get('/v1/senai/usinagem/desempenho/aluno/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosDesempenhoAluno = await controllerDesempenhoMatricula.getBuscarDesempenhosPelaMatriculaAluno(id)

    response.json(dadosDesempenhoAluno)
    response.status(dadosDesempenhoAluno.status)
})

//EndPoint: insere um novo desempenho
app.post('/v1/senai/usinagem/desempenho', cors(), bodyParserJSON, async function (request, response){
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
app.put('/v1/senai/usinagem/desempenho/:id', cors(), bodyParserJSON, async function (request, response){
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
app.delete('/v1/senai/usinagem/desempenho/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosDesempenhoAluno = await controllerDesempenhoMatricula.deletarDesempenhoMatriculaAluno(id)

    response.status(resultDadosDesempenhoAluno.status)
    response.json(resultDadosDesempenhoAluno)
})

/******************************************************* SUB-TURMAS ***********************************************************/

//EndPoint: retorna todas as sub-turmas
app.get('/v1/senai/usinagem/sub-turmas', cors(), async function (request, response){

    let dadosSubTurmas = await controllerSubTurmas.getAllSubTurmas();

    response.json(dadosSubTurmas)
    response.status(dadosSubTurmas.status)
});

//EndPoint: retorna uma sub-turma filtrando pelo ID 
app.get('/v1/senai/usinagem/sub-turmas/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosSubTurmas = await controllerSubTurmas.getBuscarSubTurmaID(id)

    response.json(dadosSubTurmas)
    response.status(dadosSubTurmas.status)
});

//Endpoint: Retorna uma Sub-Turma pelo Nome
app.get('/v1/senai/usinagem/sub-turma/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeSubTurma = request.params.nome;

    let dadosSubTurmaByName = await controllerSubTurmas.getBuscarSubTurmaNome(nomeSubTurma);

    response.status(dadosSubTurmaByName.status);
    response.json(dadosSubTurmaByName);

});

//EndPoint: atualiza uma sub-turma, filtrando pelo ID
app.put('/v1/senai/usinagem/sub-turma/:id', cors(), bodyParserJSON, async function (request, response){
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
app.post('/v1/senai/usinagem/sub-turma', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body
      

        let resultDadosSubTurma = await controllerSubTurmas.inserirSubTurma(dadosBody)

        response.status(resultDadosSubTurma.status)
        response.json(resultDadosSubTurma)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: apaga uma sub-turma filtrando pelo ID
app.delete('/v1/senai/usinagem/sub-turma/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosSubTurmas = await controllerSubTurmas.deletarSubTurma(id)

    response.status(resultDadosSubTurmas.status)
    response.json(resultDadosSubTurmas)
});

//Endpoint: Retorna sub-turmas pelo Nome da turma
app.get('/v1/senai/usinagem/sub-turma/turma/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeTurma = request.params.nome;

    let dadosAtividadeByNameTurma = await controllerSubTurmas.getBuscarSubTurmaByNameTurma(nomeTurma);

    response.status(dadosAtividadeByNameTurma.status);
    response.json(dadosAtividadeByNameTurma);

});

/******************************************************* CURSOS ***********************************************************/

//EndPoint: retorna todas as Cursos
app.get('/v1/senai/usinagem/cursos', cors(), async function (request, response){

    let dadosCursos = await controllerCursos.getAllCursos();

    response.json(dadosCursos)
    response.status(dadosCursos.status)
});

//EndPoint: retorna um curso filtrando pelo ID 
app.get('/v1/senai/usinagem/curso/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosCurso = await controllerCursos.getBuscarCursoByID(id)

    response.json(dadosCurso)
    response.status(dadosCurso.status)
});

//Endpoint: Retorna um curso filtrando pelo Nome
app.get('/v1/senai/usinagem/curso/nome/:nome', cors(), async function (request, response) {

    //Recebe 
    let nomeCurso = request.params.nome;

    let dadosCursoByName = await controllerCursos.getBuscarCursosNome(nomeCurso);

    response.status(dadosCursoByName.status);
    response.json(dadosCursoByName);

});

//EndPoint: atualiza um curso, filtrando pelo ID
app.put('/v1/senai/usinagem/cursos/:id', cors(), bodyParserJSON, async function (request, response){
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
app.post('/v1/senai/usinagem/curso', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body
    

        let resultDadosCursos = await controllerCursos.inserirCurso(dadosBody)

        response.status(resultDadosCursos.status)
        response.json(resultDadosCursos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});



//EndPoint: apaga uma sub-turma filtrando pelo ID
app.delete('/v1/senai/usinagem/curso/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosCurso = await controllerCursos.deletarCurso(id)

    response.status(resultDadosCurso.status)
    response.json(resultDadosCurso)
});

/******************************************************* MATRICULA ***********************************************************/

//EndPoint: retorna todas as matriculas
app.get('/v1/senai/usinagem/matricula', cors(), async function (request, response){

    let dadosMatriculas = await controllerMatricula.getMatriculas();

    response.json(dadosMatriculas)
    response.status(dadosMatriculas.status)
})

//EndPoint: retorna uma matricula filtrando pelo ID 
app.get('/v1/senai/usinagem/matricula/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosMatricula = await controllerMatricula.getBuscarMatriculaID(id)

    response.json(dadosMatricula)
    response.status(dadosMatricula.status)
})

//EndPoint: atualiza uma matricula, filtrando pelo ID
app.put('/v1/senai/usinagem/matricula/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da matricula pelo parametro
        let id = request.params.id
        //Recebe os dados da matricula encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosMatricula = await controllerMatricula.atualizarMatricula(dadosBody, id)

        response.status(resultDadosMatricula.status)
        response.json(resultDadosMatricula)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere uma matricula
app.post('/v1/senai/usinagem/matricula', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosMatricula = await controllerMatricula.inserirMatricula(dadosBody)

        response.status(resultDadosMatricula.status)
        response.json(resultDadosMatricula)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga uma matricula filtrando pelo ID
app.delete('/v1/senai/usinagem/matricula/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosMatricula = await controllerMatricula.deletarMatricula(id)

    response.status(resultDadosMatricula.status)
    response.json(resultDadosMatricula)
})

//EndPoint: buscar uma matricula pelo numero
app.get('/v1/senai/usinagem/matricula/numero/:numeromatricula', cors(), async function (request, response){
    let numeroMatricula = request.params.numeromatricula

    let dadosMatricula = await controllerMatricula.getBuscarMatriculaPeloNumero(numeroMatricula)

    response.json(dadosMatricula)
    response.status(dadosMatricula.status)
})

/******************************************************* CRITERIO ***********************************************************/
//EndPoint: retorna todos os criterios
app.get('/v1/senai/usinagem/criterio', cors(), async function (request, response){

    let dadosCriterios = await controllerCriterio.getCriterios();

    response.json(dadosCriterios)
    response.status(dadosCriterios.status)
})

//EndPoint: retorna um criterio filtrando pelo ID 
app.get('/v1/senai/usinagem/criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosCriterio = await controllerCriterio.getBuscarCriterioID(id)

    response.json(dadosCriterio)
    response.status(dadosCriterio.status)
})

//EndPoint: atualiza um criterio, filtrando pelo ID
app.put('/v1/senai/usinagem/criterio/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do criterio pelo parametro
        let id = request.params.id
        //Recebe os dados do criterio encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosCriterio = await controllerCriterio.atualizarCriterio(dadosBody, id)

        response.status(resultDadosCriterio.status)
        response.json(resultDadosCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um criterio
app.post('/v1/senai/usinagem/criterio', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCriterio = await controllerCriterio.inserirCriterio(dadosBody)

        response.status(resultDadosCriterio.status)
        response.json(resultDadosCriterio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um criterio filtrando pelo ID
app.delete('/v1/senai/usinagem/criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosCriterio = await controllerCriterio.deletarCriterio(id)

    response.status(resultDadosCriterio.status)
    response.json(resultDadosCriterio)
})

/******************************************************* TIPO DE CRITERIO ***********************************************************/

//EndPoint: retorna todos os tipos de critérios
app.get('/v1/senai/usinagem/tipo-criterio', cors(), async function (request, response){

    let dadosTiposCriterios = await controllerTipoCriterio.getTodosTiposCriterios();

    response.json(dadosTiposCriterios)
    response.status(dadosTiposCriterios.status)
})

//EndPoint: retorna um tipo de criterio filtrando pelo ID 
app.get('/v1/senai/usinagem/tipo-criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTipoCriterio = await controllerTipoCriterio.getBuscarTipoCriterioID(id)

    response.json(dadosTipoCriterio)
    response.status(dadosTipoCriterio.status)
})

//EndPoint: atualiza um tipo de criterio, filtrando pelo ID
app.put('/v1/senai/usinagem/tipo-criterio/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do tipo de criterio pelo parametro
        let id = request.params.id
        //Recebe os dados do tipo de criterio encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosTipoCriterio = await controllerTipoCriterio.atualizarTipoCriterio(dadosBody, id)

        response.status(resultDadosTipoCriterio.status)
        response.json(resultDadosTipoCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um tipo de criterio
app.post('/v1/senai/usinagem/tipo-criterio', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTipoCriterio = await controllerTipoCriterio.inserirTipoCriterio(dadosBody)

        response.status(resultDadosTipoCriterio.status)
        response.json(resultDadosTipoCriterio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um tipo de criterio filtrando pelo ID
app.delete('/v1/senai/usinagem/tipo-criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTipoCriterio = await controllerTipoCriterio.deletarTipoCriterio(id)

    response.status(resultDadosTipoCriterio.status)
    response.json(resultDadosTipoCriterio)
})

/******************************************************* TIPO DE ATIVIDADE ***********************************************************/
//EndPoint: retorna todos os tipos de atividades
app.get('/v1/senai/usinagem/tipo-atividade', cors(), async function (request, response){

    let dadosTiposAtividades = await controllerTipoAtividade.getTodosTiposAtividades()

    response.json(dadosTiposAtividades)
    response.status(dadosTiposAtividades.status)
})

//EndPoint: retorna um tipo de atividade filtrando pelo ID 
app.get('/v1/senai/usinagem/tipo-atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTipoAtividade = await controllerTipoAtividade.getBuscarTipoAtividadeID(id)

    response.json(dadosTipoAtividade)
    response.status(dadosTipoAtividade.status)
})

//EndPoint: atualiza um tipo de atividade, filtrando pelo ID
app.put('/v1/senai/usinagem/tipo-atividade/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do tipo de atividade pelo parametro
        let id = request.params.id
        //Recebe os dados do tipo de atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosTipoAtividade = await controllerTipoAtividade.atualizarTipoAtividade(dadosBody, id)

        response.status(resultDadosTipoAtividade.status)
        response.json(resultDadosTipoAtividade)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um tipo de atividade
app.post('/v1/senai/usinagem/tipo-atividade', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTipoAtividade = await controllerTipoAtividade.inserirTipoAtividade(dadosBody)

        response.status(resultDadosTipoAtividade.status)
        response.json(resultDadosTipoAtividade)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um tipo de atividade filtrando pelo ID
app.delete('/v1/senai/usinagem/tipo-atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTipoAtividade = await controllerTipoAtividade.deletarTipoAtividade(id)

    response.status(resultDadosTipoAtividade.status)
    response.json(resultDadosTipoAtividade)
})

/******************************************************* STATUS ATIVIDADE ***********************************************************/
//EndPoint: retorna todos os status de atividades
app.get('/v1/senai/usinagem/status-atividade', cors(), async function (request, response){

    let dadosStatusAtividades = await controllerStatusAtividade.getTodosStatusAtividades()

    response.json(dadosStatusAtividades)
    response.status(dadosStatusAtividades.status)
})

//EndPoint: retorna um status de atividade filtrando pelo ID 
app.get('/v1/senai/usinagem/status-atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosStatusAtividades = await controllerStatusAtividade.getBuscarStatusAtividadeID(id)

    response.json(dadosStatusAtividades)
    response.status(dadosStatusAtividades.status)
})

//EndPoint: atualiza um status de atividade, filtrando pelo ID
app.put('/v1/senai/usinagem/status-atividade/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do status de atividade pelo parametro
        let id = request.params.id
        //Recebe os dados do status de atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosStatusAtividades = await controllerStatusAtividade.atualizarStatusAtividade(dadosBody, id)

        response.status(resultDadosStatusAtividades.status)
        response.json(resultDadosStatusAtividades)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um status de atividade
app.post('/v1/senai/usinagem/status-atividade', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosStatusAtividade = await controllerStatusAtividade.inserirStatusAtividade(dadosBody)

        response.status(resultDadosStatusAtividade.status)
        response.json(resultDadosStatusAtividade)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um status de atividade filtrando pelo ID
app.delete('/v1/senai/usinagem/status-atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosStatusAtividade = await controllerStatusAtividade.deletarStatusAtividade(id)

    response.status(resultDadosStatusAtividade.status)
    response.json(resultDadosStatusAtividade)
})

/******************************************************* STATUS MATRICULA ***********************************************************/
//EndPoint: retorna todos os status de matricula
app.get('/v1/senai/usinagem/status-matricula', cors(), async function (request, response){

    let dadosStatusMatriculas = await controllerStatusMatricula.getTodosStatusMatricula()

    response.json(dadosStatusMatriculas)
    response.status(dadosStatusMatriculas.status)
})

//EndPoint: retorna um status de matricula filtrando pelo ID 
app.get('/v1/senai/usinagem/status-matricula/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosStatusMatriculas = await controllerStatusMatricula.getBuscarStatusMatriculaID(id)

    response.json(dadosStatusMatriculas)
    response.status(dadosStatusMatriculas.status)
})

//EndPoint: atualiza um status de matricula, filtrando pelo ID
app.put('/v1/senai/usinagem/status-matricula/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do status de matricula pelo parametro
        let id = request.params.id
        //Recebe os dados do status de matricula encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosStatusMatricula = await controllerStatusMatricula.atualizarStatusMatricula(dadosBody, id)

        response.status(resultDadosStatusMatricula.status)
        response.json(resultDadosStatusMatricula)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um status de matricula
app.post('/v1/senai/usinagem/status-matricula', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosStatusMatricula = await controllerStatusMatricula.inserirStatusMatricula(dadosBody)

        response.status(resultDadosStatusMatricula.status)
        response.json(resultDadosStatusMatricula)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um status de matricula filtrando pelo ID
app.delete('/v1/senai/usinagem/status-matricula/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosStatusMatricula = await controllerStatusMatricula.deletarStatusMatricula(id)

    response.status(resultDadosStatusMatricula.status)
    response.json(resultDadosStatusMatricula)
})

/******************************************************* RESULTADO DESJADO ***********************************************************/

//EndPoint: retorna todos os resultados desejados
app.get('/v1/senai/usinagem/resultado-desejado', cors(), async function (request, response){

    let dadosResultadosDesejados = await controllerResultadoDesejado.getTodosResultadosDesejados()

    response.json(dadosResultadosDesejados)
    response.status(dadosResultadosDesejados.status)
})

//EndPoint: retorna um resultado desejado filtrando pelo ID 
app.get('/v1/senai/usinagem/resultado-desejado/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosResultadoDesejado = await controllerResultadoDesejado.getBuscarResultadoDesejadoID(id)

    response.json(dadosResultadoDesejado)
    response.status(dadosResultadoDesejado.status)
})

//EndPoint: atualiza um resultado desejado, filtrando pelo ID
app.put('/v1/senai/usinagem/resultado-desejado/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let id = request.params.id
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosResultadoDesejado = await controllerResultadoDesejado.atualizarResultadoDesejado(dadosBody, id)

        response.status(resultDadosResultadoDesejado.status)
        response.json(resultDadosResultadoDesejado)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um resultado desejado
app.post('/v1/senai/usinagem/resultado-desejado', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosResultadoDesejado = await controllerResultadoDesejado.inserirResultadoDesejado(dadosBody)

        response.status(resultDadosResultadoDesejado.status)
        response.json(resultDadosResultadoDesejado)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um resultado desejado filtrando pelo ID
app.delete('/v1/senai/usinagem/resultado-desejado/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosResultadoDesejado = await controllerResultadoDesejado.deletarResultadoDesejado(id)

    response.status(resultDadosResultadoDesejado.status)
    response.json(resultDadosResultadoDesejado)
})

/******************************************************* RESULTADO DESJADO CRITÉRIO ***********************************************************/

//EndPoint: retorna todos os registros de resultados desejados e critérios
app.get('/v1/senai/usinagem/resultado-desejado-criterio', cors(), async function (request, response){

    let dadosResultadosDesejadosCriterios = await controllerResultadoDesejadoCriterio.getBuscarResultadosDesejadosCriterios()

    response.json(dadosResultadosDesejadosCriterios)
    response.status(dadosResultadosDesejadosCriterios.status)
})

//EndPoint: retorna um registro de resultado desejado e criterio filtrando pelo ID do REGISTRO 
app.get('/v1/senai/usinagem/resultado-desejado-criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosResultadoDesejadoCriterio = await controllerResultadoDesejadoCriterio.getBuscarResultadoDesejadoCriterioID(id)

    response.json(dadosResultadoDesejadoCriterio)
    response.status(dadosResultadoDesejadoCriterio.status)
})

//EndPoint: atualiza um registro de resultado desejado e criterio, filtrando pelo ID do REGISTRO
app.put('/v1/senai/usinagem/resultado-desejado-criterio/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let id = request.params.id
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosResultadoDesejadoCriterio = await controllerResultadoDesejadoCriterio.atualizarResultadoDesejadoCriterio(dadosBody, id)

        response.status(resultDadosResultadoDesejadoCriterio.status)
        response.json(resultDadosResultadoDesejadoCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//EndPoint: insere um registro de resultado desejado e critério
app.post('/v1/senai/usinagem/resultado-desejado-criterio', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosResultadoDesejadoCriterio = await controllerResultadoDesejadoCriterio.inserirResultadoDesejadoCriterio(dadosBody)

        response.status(resultDadosResultadoDesejadoCriterio.status)
        response.json(resultDadosResultadoDesejadoCriterio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: apaga um registro de resultado desejado e critério filtrando pelo ID do REGISTRO
app.delete('/v1/senai/usinagem/resultado-desejado-criterio/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosResultadoDesejadoCriterio = await controllerResultadoDesejadoCriterio.deletarResultadoDesejadoCriterio(id)

    response.status(resultDadosResultadoDesejadoCriterio.status)
    response.json(resultDadosResultadoDesejadoCriterio)
})

/******************************************************* MATRICULA ATIVIDADE ***********************************************************/

// EndPoint: retorna todos os registros de matricula_atividade
app.get('/v1/senai/usinagem/matricula-atividade', cors(), async function (request, response) {
    let dadosMatriculasAtividades = await controllerMatriculaAtividade.getMatriculasAtividades()

    response.json(dadosMatriculasAtividades)
    response.status(dadosMatriculasAtividades.status)
})

// EndPoint: retorna um registro de matricula_atividade filtrando pelo ID do registro
app.get('/v1/senai/usinagem/matricula-atividade/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosMatriculaAtividade = await controllerMatriculaAtividade.getBuscarMatriculaAtividadeID(id)

    response.json(dadosMatriculaAtividade)
    response.status(dadosMatriculaAtividade.status)
})

// EndPoint: atualiza um registro de matricula_atividade filtrando pelo ID do registro
app.put('/v1/senai/usinagem/matricula-atividade/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    // Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let id = request.params.id
        let dadosBody = request.body
        
        // Encaminha os dados para a controller
        let resultDadosMatriculaAtividade = await controllerMatriculaAtividade.atualizarMatriculaAtividade(dadosBody, id)

        response.status(resultDadosMatriculaAtividade.status)
        response.json(resultDadosMatriculaAtividade)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

// EndPoint: insere um registro de matricula_atividade
app.post('/v1/senai/usinagem/matricula-atividade', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        // Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosMatriculaAtividade = await controllerMatriculaAtividade.inserirMatriculaAtividade(dadosBody)

        response.status(resultDadosMatriculaAtividade.status)
        response.json(resultDadosMatriculaAtividade)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

// EndPoint: apaga um registro de matricula_atividade filtrando pelo ID do registro
app.delete('/v1/senai/usinagem/matricula-atividade/:id', cors(), async function (request, response) {
    let id = request.params.id

    let resultDadosMatriculaAtividade = await controllerMatriculaAtividade.deletarMatriculaAtividade(id)

    response.status(resultDadosMatriculaAtividade.status)
    response.json(resultDadosMatriculaAtividade)
})

/******************************************************* MATRICULA TURMA SUBTURMA ***********************************************************/

// EndPoint: retorna todos os registros de matricula_turma_subturma
app.get('/v1/senai/usinagem/matricula-turma-subturma', cors(), async function (request, response) {
    let dadosMatriculasTurmaSubturma = await controllerMatriculaTurmaSubturma.getMatriculasTurmasSubturmas()
  
    response.status(dadosMatriculasTurmaSubturma.status)
    response.json(dadosMatriculasTurmaSubturma)
  })
  
  // EndPoint: retorna um registro de matricula_turma_subturma filtrando pelo ID do registro
  app.get('/v1/senai/usinagem/matricula-turma-subturma/:id', cors(), async function (request, response) {
    let id = request.params.id
  
    let dadosMatriculaTurmaSubturma = await controllerMatriculaTurmaSubturma.getBuscarMatriculaTurmaSubturmaID(id)
  
    response.status(dadosMatriculaTurmaSubturma.status)
    response.json(dadosMatriculaTurmaSubturma)
  })
  
  // EndPoint: atualiza um registro de matricula_turma_subturma filtrando pelo ID do registro
  app.put('/v1/senai/usinagem/matricula-turma-subturma/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
  
    // Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
      let id = request.params.id
      let dadosBody = request.body
  
      // Encaminha os dados para a controller
      let resultDadosMatriculaTurmaSubturma = await controllerMatriculaTurmaSubturma.atualizarMatriculaTurmaSubturma(dadosBody, id)
  
      response.status(resultDadosMatriculaTurmaSubturma.status)
      response.json(resultDadosMatriculaTurmaSubturma)
    } else {
      response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
  })
  
  // EndPoint: insere um registro de matricula_turma_subturma
  app.post('/v1/senai/usinagem/matricula-turma-subturma', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
  
    if (String(contentType).toLowerCase() == 'application/json') {
      // Recebe os dados encaminhados na requisição
      let dadosBody = request.body
  
      let resultDadosMatriculaTurmaSubturma = await controllerMatriculaTurmaSubturma.inserirMatriculaTurmaSubturma(dadosBody)
  
      response.status(resultDadosMatriculaTurmaSubturma.status)
      response.json(resultDadosMatriculaTurmaSubturma)
    } else {
      response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
      response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
  })
  
  // EndPoint: apaga um registro de matricula_turma_subturma filtrando pelo ID do registro
  app.delete('/v1/senai/usinagem/matricula-turma-subturma/:id', cors(), async function (request, response) {
    let id = request.params.id
  
    let resultDadosMatriculaTurmaSubturma = await controllerMatriculaTurmaSubturma.deletarMatriculaTurmaSubturma(id)
  
    response.status(resultDadosMatriculaTurmaSubturma.status)
    response.json(resultDadosMatriculaTurmaSubturma)
  })
  



/******************************************************* TEMPO ATIVIDADE ***********************************************************/  

//EndPoint: retorna todas os tempos de Atividades
app.get('/v1/senai/usinagem/tempo-atividade', cors(), async function (request, response){

    let dadosTempo = await controllerTempoAtividade.getTempoAtividade();

    response.json(dadosTempo)
    response.status(dadosTempo.status)
});

//EndPoint: retorna um tempo de atividade filtrando pelo ID 
app.get('/v1/senai/usinagem/tempo-atividade/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosTempo = await controllerTempoAtividade.getBuscarTempoAtividadeById(id)

    response.json(dadosTempo)
    response.status(dadosTempo.status)
});

//Endpoint: Retorna um tempo de atividade filtrando pelo inicio
app.get('/v1/senai/usinagem/tempo-atividade/inicio/:inicio', cors(), async function (request, response) {

    //Recebe 
    let inicioTempo = request.params.inicio;

    let dadosTempoByinicio = await controllerTempoAtividade.getBuscarTempoByInicio(inicioTempo);

    response.status(dadosTempoByinicio.status);
    response.json(dadosTempoByinicio);

});

//EndPoint: atualiza um tempo de atividade, filtrando pelo ID
app.put('/v1/senai/usinagem/tempo-atividade/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosTempoAtividade = await controllerTempoAtividade.atualizarTempoAtividade(dadosBody, id)

        response.status(resultDadosTempoAtividade.status)
        response.json(resultDadosTempoAtividade)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: insere um novo tempo de atividade
app.post('/v1/senai/usinagem/tempo-atividade', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTempoAtividade = await controllerTempoAtividade.inserirTempoAtividade(dadosBody)

        response.status(resultDadosTempoAtividade.status)
        response.json(resultDadosTempoAtividade)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: atualiza um tempo de atividade, filtrando pelo ID
app.put('/v1/senai/usinagem/tempo-atividade/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosTempoAtividade = await controllerTempoAtividade.atualizarTempoAtividade(dadosBody, id)

        response.status(resultDadosTempoAtividade.status)
        response.json(resultDadosTempoAtividade)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: apaga um tempo de atividade filtrando pelo ID
app.delete('/v1/senai/usinagem/tempo-atividade/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosTempoAtividade = await controllerTempoAtividade.deletarTempoAtividade(id)

    response.status(resultDadosTempoAtividade.status)
    response.json(resultDadosTempoAtividade)
});

/****************************************************** UNIDADE CURRICULAR PROFESSOR ******************************************************************************/

//EndPoint: retorna todas as UNIDADES CURRICULARES existentes e seus PROFESSORES
app.get('/v1/senai/usinagem/unidade-curricular-professor', cors(), async function (request, response){

    let dadosUnidadeCurricularProfessor = await controllerUnidadeCurricularProfessor.getAllUnidadeCurricularProfessor();

    response.json(dadosUnidadeCurricularProfessor)
    response.status(dadosUnidadeCurricularProfessor.status)
});

//EndPoint: retorna uma coluna de unidade curricular e professor filtrando pelo ID 
app.get('/v1/senai/usinagem/unidade-curricular-professor/id/:id', cors(), async function (request, response){
    let id = request.params.id

    let dadosUnidadeCurricularProfessor = await controllerUnidadeCurricularProfessor.getBuscarUnidadeCurricularProfessorById(id)

    response.json(dadosUnidadeCurricularProfessor)
    response.status(dadosUnidadeCurricularProfessor.status)
});

// //Endpoint: Retorna um curso filtrando pelo Nome
// app.get('/v1/senai/usinagem/unidade-curricular-professor/nome/:nome', cors(), async function (request, response) {

//     //Recebe 
//     let nomeUnidadeCurricularProfessor = request.params.nome;

//     let dadosUnidadeCurricularProfessorByName = await controllerUnidadeCurricularProfessor.getBuscarCursosNome(nomeCurso);

//     response.status(dadosUnidadeCurricularProfessorByName.status);
//     response.json(dadosUnidadeCurricularProfessorByName);

// });

//EndPoint: atualiza uma coluna de unidade curricular professor, filtrando pelo ID
app.put('/v1/senai/usinagem/unidade-curricular-professor/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosUnidadeCurricularProfessor = await controllerUnidadeCurricularProfessor.atualizarUnidadeCurricularProfessor(dadosBody, id)

        response.status(resultDadosUnidadeCurricularProfessor.status)
        response.json(resultDadosUnidadeCurricularProfessor)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: insere uma nova sub-turma
app.post('/v1/senai/usinagem/unidade-curricular-professor', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body
        
        let resultDadosUnidadeCurricularProfessor = await controllerUnidadeCurricularProfessor.inserirUnidadeCurricularProfessor(dadosBody)
        
        
        response.status(resultDadosUnidadeCurricularProfessor.status)
        response.json(resultDadosUnidadeCurricularProfessor)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});


//EndPoint: apaga uma sub-turma filtrando pelo ID
app.delete('/v1/senai/usinagem/unidade-curricular-professor/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosUnidadeCurricularProfessor = await controllerUnidadeCurricularProfessor.deletarUnidadeCurricularProfessor(id)

    response.status(resultDadosUnidadeCurricularProfessor.status)
    response.json(resultDadosUnidadeCurricularProfessor)
});

/****************************************************** AVALIAÇÃO ******************************************************************************/

// getBuscarAvaliacaoByMatricula
// getBuscarAvaliacaoByNomeCriterio
// getBuscarAvaliacaoByNomeProfessor
// getBuscarAvaliacaoByNomeAtividade
// getBuscarAvaliacaoByTempoPrevisto

//EndPoint: retorna todas Avaliações ou somente alguns filtrados por uma matricula, criterio, 
//nome de um professor, nome de uma atividade ou tempo previsto 
app.get('/v1/senai/usinagem/avaliacao', cors(), async function (request, response, next){

    let idAvaliacao = request.query.id;
    let numeroMatricula = request.query.matricula;
    let nomeCriterio = request.query.criterio;
    let nomeProfessor = request.query.nome_professor;
    let nomeAtividade = request.query.nome_atividade;
    let tempoPrevisto = request.query.tempo_previsto;

    if (idAvaliacao !== undefined) {
        let dadosAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByID(idAvaliacao)

        response.json(dadosAvaliacao)
        response.status(dadosAvaliacao.status)
        
    }else if (numeroMatricula !== undefined) {

        let dadosMatriculaAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByMatricula(numeroMatricula)

        response.json(dadosMatriculaAvaliacao)
        response.status(dadosMatriculaAvaliacao.status)
        
    }else if (nomeCriterio !== undefined) {

        let dadosCriterioAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByNomeCriterio(nomeCriterio)

        response.json(dadosCriterioAvaliacao)
        response.status(dadosCriterioAvaliacao.status)
        
    }else if (nomeProfessor !== undefined) {
        let dadosNomeProfessorAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByNomeProfessor(nomeProfessor)

        response.json(dadosNomeProfessorAvaliacao)
        response.status(dadosNomeProfessorAvaliacao.status)
        
    }else if (nomeAtividade !== undefined) {

        let dadosNomeAtividadeAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByNomeAtividade(nomeAtividade)

        response.json(dadosNomeAtividadeAvaliacao)
        response.status(dadosNomeAtividadeAvaliacao.status)
        
    } else if (tempoPrevisto !== undefined) {

        let dadosTempoPrevistoAvaliacao = await controllerAvaliacao.getBuscarAvaliacaoByTempoPrevisto(tempoPrevisto)

        response.json(dadosTempoPrevistoAvaliacao)
        response.status(dadosTempoPrevistoAvaliacao.status)
        
    }else{

        let dadosTempo = await controllerAvaliacao.getAllAvaliacoes();

        response.json(dadosTempo)
        response.status(dadosTempo.status)
    }


});

//EndPoint: atualiza uma Avaliação, filtrando pelo ID
app.put('/v1/senai/usinagem/avaliacao/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosAvaliacao = await controllerAvaliacao.atualizarAvaliacao(dadosBody, id)

        response.status(resultDadosAvaliacao.status)
        response.json(resultDadosAvaliacao)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: insere uma nova Avaliação
app.post('/v1/senai/usinagem/avaliacao', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAvaliacao = await controllerAvaliacao.inserirAvaliacao(dadosBody)

        response.status(resultDadosAvaliacao.status)
        response.json(resultDadosAvaliacao)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: atualiza uma Avaliação, filtrando pelo ID
app.put('/v1/senai/usinagem/avaliacao/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID da atividade pelo parametro
        let id = request.params.id
        //Recebe os dados da atividade encaminhados no corpo da requisição
        let dadosBody = request.body
        
        //Encaminha os dados para a controlller
        let resultDadosAvaliacao = await controllerAvaliacao.atualizarAvaliacao(dadosBody, id)

        response.status(resultDadosAvaliacao.status)
        response.json(resultDadosAvaliacao)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
});

//EndPoint: apaga uma Avaliação filtrando pelo ID
app.delete('/v1/senai/usinagem/avaliacao/:id', cors(), async function (request, response){
    let id = request.params.id

    let resultDadosAvaliacao = await controllerAvaliacao.deletarAvaliacao(id)

    response.status(resultDadosAvaliacao.status)
    response.json(resultDadosAvaliacao)
});











//------------------------------------------------------------------------------------------------------------------------//

const porta = process.env.port || 8080

app.listen(porta, function () {
    console.log(`Servidor aguardando requisiçõs na porta ${porta}`)
})