/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de turmas
 * Data: 29/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var turmaDAO = require('../model/DAO/turmaDAO.js')

var cursoDAO = require('../model/DAO/cursoDAO.js')

const inserirTurma = async function (dadosTurma) {

    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 100 ||
        dadosTurma.ano == '' || dadosTurma.ano == undefined || isNaN(dadosTurma.ano)
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)) {
        return message.ERROR_INVALID_ID
    }

    else {
        let resultDadosCurso = await cursoDAO.selectByIdCurso(dadosTurma.id_curso)

        if (resultDadosCurso) {
            let resultDadosTurma = await turmaDAO.insertTurma(dadosTurma)

            //Verificar se o banco inseriu corretamente
            if (resultDadosTurma) {
                let dadosTurmaJSON = {}
                let novaTurma = await turmaDAO.selectLastId()

                dadosTurmaJSON.mensagem = message.SUCCESS_CREATED_ITEM.message
                dadosTurmaJSON.status = message.SUCCESS_CREATED_ITEM.status //201
                dadosTurmaJSON.turma = novaTurma

                return dadosTurmaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500

            }
        } else {
            return message.ERROR_NOT_FOUND
        }


    }
}

const atualizarTurma = async function (dadosTurma, idTurma) {

    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 100 ||
        dadosTurma.ano == '' || dadosTurma.ano == undefined || isNaN(dadosTurma.ano)
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (idTurma == '' || idTurma == undefined || isNaN(idTurma) || dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosTurma.id = idTurma
        let dadosTurmaJSON = {}

        let statusId = await turmaDAO.selectByIdTurma(idTurma)
        let resultDadosCurso = await cursoDAO.selectByIdCurso(dadosTurma.id_curso)

        if (statusId && resultDadosCurso) {
            let resultDadosTurma = await turmaDAO.updateTurma(dadosTurma)
            let turmaId = await turmaDAO.selectByIdTurma(idTurma)

            if (resultDadosTurma) {
                dadosTurmaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosTurmaJSON.status = message.SUCCESS_UPDATED_ITEM.status // 200
                dadosTurmaJSON.turma = turmaId

                return dadosTurmaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const deletarTurma = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await turmaDAO.selectByIdTurma(id)

        //Verificar se a turma selecionado existe
        if (buscarById) {
            let resultDadosTurma = await turmaDAO.deleteTurma(id)

            if (resultDadosTurma) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getBuscarTurmaId = async function (id) {
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosTurmaJSON = {}
        let dadosTurma = await turmaDAO.selectByIdTurma(id)

        if (dadosTurma) {
            dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
            dadosTurmaJSON.status = message.SUCCESS_REQUEST.status //200
            dadosTurmaJSON.turma = dadosTurma

            return dadosTurmaJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getTurmas = async function () {
    let dadosTurmaJSON = {}

    let dadosTurma = await turmaDAO.selectAllTurmas()

    if (dadosTurma) {
        dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaJSON.status = message.SUCCESS_REQUEST.status //200
        dadosTurmaJSON.quantidade = dadosTurma.length
        dadosTurmaJSON.turmas = dadosTurma

        return dadosTurmaJSON
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

module.exports = {
    inserirTurma,
    atualizarTurma,
    deletarTurma,
    getBuscarTurmaId,
    getTurmas
}