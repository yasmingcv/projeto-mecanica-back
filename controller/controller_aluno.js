/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de alunos
 * Data: 22/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquio DAO para acessar dados do aluno no BD
var alunoDAO = require('../model/DAO/alunoDAO.js')

//Insere um novo aluno
const inserirAluno = async function (dadosAluno) { // refazer *
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 200 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 16 ||
        dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula.length > 45
    ) {
        return message.ERROR_REQUIRED_FIELDS //400
    } else {
        let resultDadosAluno = await alunoDAO.insertAluno(dadosAluno)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosAluno) {
            //Fazer o tratamento que retorna o aluno criado :)
            return message.SUCCESS_CREATED_ITEM //201
        } else {
            return message.ERROR_INTERNAL_SERVER //500 
        }
    }
}

const atualizarAluno = async function (dadosAluno, idAluno) { // refazer *
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 200 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 16 ||
        dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula.length > 45
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosAluno.id = idAluno
        let resultDadosAluno = await alunoDAO.updateAluno(dadosAluno)
        let dadosAlunoJSON = {}

        dadosAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status //200

        //Fazer o tratamento para ver se o aluno existe
    }
}

//Retorna o aluno filtrando pelo ID
const getBuscarAlunoID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAlunoJSON = {}
        let dadosAluno = await alunoDAO.selectByIdAluno(id)

        if (dadosAluno) {
            //Criando um JSON com o atributo alunos, para encaminhar um array de alunos
            dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoJSON.message = message.SUCCESS_REQUEST
            dadosAlunoJSON.aluno = dadosAluno
            return dadosAlunoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAluno,
    atualizarAluno,
    getBuscarAlunoID
}