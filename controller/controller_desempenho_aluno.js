/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de desempenho de alunos
 * Data: 02/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var desempenho_alunoDAO = require('../model/DAO/desempenho_alunoDAO.js')

const inserirDesempenhoAluno = async function (dadosDesempenhoAluno) {
    if (dadosDesempenhoAluno.id_aluno == '' || dadosDesempenhoAluno.id_aluno == undefined || isNaN(dadosDesempenhoAluno.id_aluno) ||
        dadosDesempenhoAluno.id_unidade_curricular == '' || dadosDesempenhoAluno.id_unidade_curricular == undefined || isNaN(dadosDesempenhoAluno.id_unidade_curricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosDesempenhoAluno = await desempenho_alunoDAO.insertDesempenhoAluno(dadosDesempenhoAluno)

        if (resultDadosDesempenhoAluno) {
            let dadosDesempenhoAlunoJSON = {}
            let novoDesempenhoAluno = await desempenho_alunoDAO.selectLastId()

            dadosDesempenhoAlunoJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosDesempenhoAlunoJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosDesempenhoAlunoJSON.desempenho = novoDesempenhoAluno

            return dadosDesempenhoAlunoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

const updateDesempenhoAluno = async function (dadosDesempenhoAluno, idDesempenhoAluno) {
    if (dadosDesempenhoAluno.id_aluno == '' || dadosDesempenhoAluno.id_aluno == undefined || isNaN(dadosDesempenhoAluno.id_aluno) ||
        dadosDesempenhoAluno.id_unidade_curricular == '' || dadosDesempenhoAluno.id_unidade_curricular == undefined || isNaN(dadosDesempenhoAluno.id_unidade_curricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idDesempenhoAluno == '' || idDesempenhoAluno == undefined || isNaN(idDesempenhoAluno)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosDesempenhoAluno.id = idDesempenhoAluno
        dadosDesempenhoAlunoJSON = {}

        let statusId = await desempenho_alunoDAO.selectByIdAlunoDesempenho(idDesempenhoAluno)

        if(statusId) {
            let resultDadosDesempenhoAluno = await desempenho_alunoDAO.updateDesempenhoAluno(dadosDesempenhoAluno)
            let desempenhoAlunoId = await desempenho_alunoDAO.selectLastId()

            if(resultDadosDesempenhoAluno) {
                dadosDesempenhoAlunoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosDesempenhoAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status // 200
                dadosDesempenhoAlunoJSON.desempenho = desempenhoAlunoId

                return dadosDesempenhoAlunoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }

        

    }
}


const deletarDesempenhoAluno = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await desempenho_alunoDAO.selectByIdDesempenhoAluno(id)

        //Verificar se o desempenho selecionado existe
        if(buscarById){
            let resultDadosDesempenhoAluno = await desempenho_alunoDAO.deleteDesempenhoAluno(id)

            if(resultDadosDesempenhoAluno){
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Buscar desempenhos do aluno
const getBuscarAlunoDesempenhoId = async function (idAluno) {
    if (idAluno == '' || isNaN(idAluno) || idAluno == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosDesempenhoAlunoJSON = {}
        let dadosDesempenhoAluno = await desempenho_alunoDAO.selectByIdAlunoDesempenho(idAluno)

        if(dadosDesempenhoAluno) {
            dadosDesempenhoAlunoJSON.message = message.SUCCESS_REQUEST.message
            dadosDesempenhoAlunoJSON.status = message.SUCCESS_REQUEST.status //200
            dadosDesempenhoAlunoJSON.desempenhos = dadosDesempenhoAluno

            return dadosDesempenhoAlunoJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getDesempenhosAlunos = async function () {
    let dadosDesempenhoAlunoJSON = {}

    let dadosDesempenhoAluno = await desempenho_alunoDAO.selectAllDesempenhosAlunos()

    if(dadosDesempenhoAluno) {
        dadosDesempenhoAlunoJSON.message = message.SUCCESS_REQUEST.message
        dadosDesempenhoAlunoJSON.status = message.SUCCESS_REQUEST.status //200
        dadosDesempenhoAlunoJSON.quantidade = dadosTurma.length
        dadosDesempenhoAlunoJSON.desempenhos = dadosDesempenhoAluno

        return dadosDesempenhoAlunoJSON
    } else {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

module.exports = {
    inserirDesempenhoAluno,
    updateDesempenhoAluno,
    deletarDesempenhoAluno,
    getBuscarAlunoDesempenhoId,
    getDesempenhosAlunos
}