/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de matriculas
 * Data: 14/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ********************************************************************************************************************/

// Import do arquivo de mensagens
var message = require('./modulo/config.js')

// Import dos arquivos DAO 
var matriculaTurmaSubturmaDAO = require('../model/DAO/matricula_turma_subturmaDAO.js')
var matriculaDAO = require('../model/DAO/matriculaDAO.js')
var turmaDAO = require('../model/DAO/turmaDAO.js')
var subturmaDAO = require('../model/DAO/sub_turmaDAO.js')

const inserirMatriculaTurmaSubturma = async function (dadosMatriculaTurmaSubturma) {
    if (
        dadosMatriculaTurmaSubturma.id_subturma == undefined ||
        dadosMatriculaTurmaSubturma.id_subturma == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_subturma) ||
        dadosMatriculaTurmaSubturma.id_subturma == null ||

        dadosMatriculaTurmaSubturma.id_matricula_aluno == undefined ||
        dadosMatriculaTurmaSubturma.id_matricula_aluno == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_matricula_aluno) ||
        dadosMatriculaTurmaSubturma.id_matricula_aluno == null ||

        dadosMatriculaTurmaSubturma.id_turma == undefined ||
        dadosMatriculaTurmaSubturma.id_turma == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_turma) ||
        dadosMatriculaTurmaSubturma.id_turma == null
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else {
        // Verifica se a matricula, a turma e a subturma existem
        let resultDadosMatricula = await matriculaDAO.selectByIdMatricula(dadosMatriculaTurmaSubturma.id_matricula_aluno)
        let resultDadosSubturma = await subturmaDAO.selectByIdSubTurma(dadosMatriculaTurmaSubturma.id_subturma)
        let resultDadosTurma = await turmaDAO.selectByIdTurma(dadosMatriculaTurmaSubturma.id_turma)

        if (resultDadosMatricula && resultDadosSubturma && resultDadosTurma) {
            let resultDadosMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.insertMatriculaTurmaSubturma(dadosMatriculaTurmaSubturma)

            // Verifica se o banco inseriu corretamente
            if (resultDadosMatriculaTurmaSubturma) {
                let dadosMatriculaTurmaSubturmaJSON = {}
                let novaMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.selectLastId()

                dadosMatriculaTurmaSubturmaJSON.status = message.SUCCESS_CREATED_ITEM.status // 201
                dadosMatriculaTurmaSubturmaJSON.message = message.SUCCESS_CREATED_ITEM.message
                dadosMatriculaTurmaSubturmaJSON.matricula = novaMatriculaTurmaSubturma

                return dadosMatriculaTurmaSubturmaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER // 500
            }
        } else {
            return message.ERROR_NOT_FOUND // 404

        }
    }


}


const atualizarMatriculaTurmaSubturma = async function (dadosMatriculaTurmaSubturma, id) {
    if (
        dadosMatriculaTurmaSubturma.id_subturma == undefined ||
        dadosMatriculaTurmaSubturma.id_subturma == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_subturma) ||
        dadosMatriculaTurmaSubturma.id_subturma == null ||

        dadosMatriculaTurmaSubturma.id_matricula_aluno == undefined ||
        dadosMatriculaTurmaSubturma.id_matricula_aluno == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_matricula_aluno) ||
        dadosMatriculaTurmaSubturma.id_matricula_aluno == null ||

        dadosMatriculaTurmaSubturma.id_turma == undefined ||
        dadosMatriculaTurmaSubturma.id_turma == '' ||
        isNaN(dadosMatriculaTurmaSubturma.id_turma) ||
        dadosMatriculaTurmaSubturma.id_turma == null
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID // 400
    } else {

        // Verifica se a matricula, a turma e a subturma existem
        let resultDadosMatricula = await matriculaDAO.selectByIdMatricula(dadosMatriculaTurmaSubturma.id_matricula_aluno)
        let resultDadosSubturma = await subturmaDAO.selectByIdSubTurma(dadosMatriculaTurmaSubturma.id_subturma)
        let resultDadosTurma = await turmaDAO.selectByIdTurma(dadosMatriculaTurmaSubturma.id_turma)

        if (resultDadosMatricula && resultDadosSubturma && resultDadosTurma) {
            dadosMatriculaTurmaSubturma.id = id
            let dadosMatriculaTurmaSubturmaJSON = {}

            let matriculaTurmaSubturmaId = await matriculaTurmaSubturmaDAO.selectByIdMatriculaTurmaSubturma(id)

            if (matriculaTurmaSubturmaId) {
                let resultDadosMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.updateMatriculaTurmaSubturma(dadosMatriculaTurmaSubturma)

                let matriculaId = await matriculaTurmaSubturmaDAO.selectByIdMatriculaTurmaSubturma(id)

                if (resultDadosMatriculaTurmaSubturma) {
                    dadosMatriculaTurmaSubturmaJSON.status = message.SUCCESS_UPDATED_ITEM.status // 200
                    dadosMatriculaTurmaSubturmaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    dadosMatriculaTurmaSubturmaJSON.matricula_turma_subturma = matriculaId

                    return dadosMatriculaTurmaSubturmaJSON

                } else {
                    return message.ERROR_INTERNAL_SERVER // 500
                }
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }


    }
}

const getBuscarMatriculaTurmaSubturmaID = async function (id) {
    // Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosMatriculaTurmaSubturmaJSON = {}
        let dadosMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.selectByIdMatriculaTurmaSubturma(id)

        if (dadosMatriculaTurmaSubturma) {
            dadosMatriculaTurmaSubturmaJSON.status = message.SUCCESS_REQUEST.status //200
            dadosMatriculaTurmaSubturmaJSON.message = message.SUCCESS_REQUEST.message

            dadosMatriculaTurmaSubturmaJSON.matricula_turma_subturma = dadosMatriculaTurmaSubturma

            return dadosMatriculaTurmaSubturmaJSON

        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
};

const getMatriculasTurmasSubturmas = async function () {
    let dadosMatriculasTurmasSubturmasJSON = {}

    // Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.selectAllMatriculasTurmasSubturmas()

    if (dadosMatriculaTurmaSubturma) {
        dadosMatriculasTurmasSubturmasJSON.status = message.SUCCESS_REQUEST.status
        dadosMatriculasTurmasSubturmasJSON.message = message.SUCCESS_REQUEST.message
        dadosMatriculasTurmasSubturmasJSON.quantidade = dadosMatriculaTurmaSubturma.length
        dadosMatriculasTurmasSubturmasJSON.matriculas_turmas_subturmas = dadosMatriculaTurmaSubturma

        return dadosMatriculasTurmasSubturmasJSON
    } else {
        return message.ERROR_NOT_FOUND // 404
    }
}

const deletarMatriculaTurmaSubturma = async function (id) {
    if (id == '' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID; // 400
    } else {
        let buscarById = await getBuscarMatriculaTurmaSubturmaID(id)

        // Verifica se a matricula existe, se não existir, envia o retorno da função (getBuscarMatriculaTurmaSubturmaID)
        if (buscarById.status == 404) {
            return buscarById
        } else {
            let resultDadosMatriculaTurmaSubturma = await matriculaTurmaSubturmaDAO.deleteMatriculaTurmaSubturma(id)

            if (resultDadosMatriculaTurmaSubturma) {
                return message.SUCCESS_DELETED_ITEM // 200
            } else {
                return message.ERROR_INTERNAL_SERVER // 500
            }
        }
    }
};


module.exports = {
    inserirMatriculaTurmaSubturma,
    atualizarMatriculaTurmaSubturma,
    getBuscarMatriculaTurmaSubturmaID,
    getMatriculasTurmasSubturmas,
    deletarMatriculaTurmaSubturma
}
