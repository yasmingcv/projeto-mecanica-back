/***************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de desempenho de alunos
 * Data: 02/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ***************************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var desempenho_matricula_alunoDAO = require('../model/DAO/desempenho_matricula_alunoDAO.js')

const inserirDesempenhoMatriculaAluno = async function (dadosDesempenhoMatriculaAluno) {
    if (dadosDesempenhoMatriculaAluno.id_aluno == '' || dadosDesempenhoMatriculaAluno.id_aluno == undefined || isNaN(dadosDesempenhoMatriculaAluno.id_aluno) ||
    dadosDesempenhoMatriculaAluno.id_unidade_curricular == '' || dadosDesempenhoMatriculaAluno.id_unidade_curricular == undefined || isNaN(dadosDesempenhoMatriculaAluno.id_unidade_curricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosDesempenhoMatriculaAluno = await desempenho_matricula_alunoDAO.insertDesempenhoMatriculaAluno(dadosDesempenhoMatriculaAluno)

        if (resultDadosDesempenhoMatriculaAluno) {
            let resultDadosDesempenhoMatriculaAlunoJSON = {}
            let novoDesempenhoAluno = await desempenho_matricula_alunoDAO.selectLastId()

            resultDadosDesempenhoMatriculaAlunoJSON.message = message.SUCCESS_CREATED_ITEM.message
            resultDadosDesempenhoMatriculaAlunoJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            resultDadosDesempenhoMatriculaAlunoJSON.desempenho = novoDesempenhoAluno

            return resultDadosDesempenhoMatriculaAlunoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

const updateDesempenhoMatriculaAluno = async function (dadosDesempenhoMatriculaAluno, idDesempenhoAluno) {
    if (dadosDesempenhoMatriculaAluno.id_aluno == '' || dadosDesempenhoMatriculaAluno.id_aluno == undefined || isNaN(dadosDesempenhoMatriculaAluno.id_aluno) ||
    dadosDesempenhoMatriculaAluno.id_unidade_curricular == '' || dadosDesempenhoMatriculaAluno.id_unidade_curricular == undefined || isNaN(dadosDesempenhoMatriculaAluno.id_unidade_curricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idDesempenhoAluno == '' || idDesempenhoAluno == undefined || isNaN(idDesempenhoAluno)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosDesempenhoMatriculaAluno.id = idDesempenhoAluno
        let dadosDesempenhoMatriculaAlunoJSON = {}

        let statusId = await desempenho_matricula_alunoDAO.selectByIdAlunoDesempenho(idDesempenhoAluno)

        if(statusId) {
            let resultDadosDesempenhoMatriculaAluno = await desempenho_matricula_alunoDAO.updateDesempenhoMatriculaAluno(dadosDesempenhoMatriculaAluno)
            let desempenhoAlunoId = await desempenho_matricula_alunoDAO.selectLastId() //************************************************************** */

            if(resultDadosDesempenhoMatriculaAluno) {
                dadosDesempenhoMatriculaAlunoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosDesempenhoMatriculaAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status // 200
                dadosDesempenhoMatriculaAlunoJSON.desempenho = desempenhoAlunoId

                return dadosDesempenhoMatriculaAlunoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }

        

    }
}


const deletarDesempenhoMatriculaAluno = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await desempenho_matricula_alunoDAO.selectByIdDesempenhoMatriculaAluno(id)

        //Verificar se o desempenho selecionado existe
        if(buscarById){
            let resultDadosDesempenhoMatriculaAluno = await desempenho_matricula_alunoDAO.deleteDesempenhoMatriculaAluno(id)

            if(resultDadosDesempenhoMatriculaAluno){
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Buscar desempenhos da matricula (aluno) pelo ID da matricula
const getBuscarDesempenhosPelaMatriculaAluno = async function (idMatricula) {
    if (idMatricula == '' || isNaN(idMatricula) || idMatricula == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosDesempenhoMatriculaAlunoJSON = {}
        let dadosDesempenhoMatriculaAluno = await desempenho_matricula_alunoDAO.selectByIdAlunoDesempenho(idMatricula)

        if(dadosDesempenhoMatriculaAluno) {
            dadosDesempenhoMatriculaAlunoJSON.message = message.SUCCESS_REQUEST.message
            dadosDesempenhoMatriculaAlunoJSON.status = message.SUCCESS_REQUEST.status //200
            dadosDesempenhoMatriculaAlunoJSON.desempenhos = dadosDesempenhoMatriculaAluno

            return dadosDesempenhoMatriculaAlunoJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getDesempenhosMatriculasAlunos = async function () {
    let dadosDesempenhoMatriculaAlunoJSON = {}

    let dadosDesempenhoMatriculaAluno = await desempenho_matricula_alunoDAO.selectAllDesempenhosMatriculasAlunos()

    if(dadosDesempenhoMatriculaAluno) {
        dadosDesempenhoMatriculaAlunoJSON.message = message.SUCCESS_REQUEST.message
        dadosDesempenhoMatriculaAlunoJSON.status = message.SUCCESS_REQUEST.status //200
        dadosDesempenhoMatriculaAlunoJSON.quantidade = dadosTurma.length
        dadosDesempenhoMatriculaAlunoJSON.desempenhos = dadosDesempenhoMatriculaAluno

        return dadosDesempenhoMatriculaAlunoJSON
    } else {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

module.exports = {
    inserirDesempenhoMatriculaAluno,
    updateDesempenhoMatriculaAluno,
    deletarDesempenhoMatriculaAluno,
    getBuscarDesempenhosPelaMatriculaAluno,
    getDesempenhosMatriculasAlunos
}