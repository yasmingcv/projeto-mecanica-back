/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de registros de matriculas e atividades
 * Data: 13/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

// Import do arquivo de mensagens
var message = require('./modulo/config.js')

// Import dos arquivos DAO
var matriculaAtividadeDAO = require('../model/DAO/matricula_atividadeDAO.js')
var matriculaDAO = require('../model/DAO/matriculaDAO.js')
var atividadeDAO = require('../model/DAO/atividadeDAO.js')

const inserirMatriculaAtividade = async function (dadosMatriculaAtividade) {
    if (
        dadosMatriculaAtividade.id_atividade == undefined ||
        dadosMatriculaAtividade.id_atividade == '' ||
        isNaN(dadosMatriculaAtividade.id_atividade) ||
        dadosMatriculaAtividade.id_atividade == null ||

        dadosMatriculaAtividade.id_status_atividade == undefined ||
        dadosMatriculaAtividade.id_status_atividade == '' ||
        isNaN(dadosMatriculaAtividade.id_status_atividade) ||
        dadosMatriculaAtividade.id_status_atividade == null ||

        dadosMatriculaAtividade.id_matricula_aluno == undefined ||
        dadosMatriculaAtividade.id_matricula_aluno == '' ||
        isNaN(dadosMatriculaAtividade.id_matricula_aluno) ||
        dadosMatriculaAtividade.id_matricula_aluno == null
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400


    } else {
        // Verifica se a matricula e a atividade existem
        let resultDadosMatricula = await matriculaDAO.selectByIdMatricula(dadosMatriculaAtividade.id_matricula_aluno)
        let resultDadosAtividade = await atividadeDAO.selectByIdAtividade(dadosMatriculaAtividade.id_atividade)

        if (resultDadosMatricula && resultDadosAtividade) {
            let resultDadosMatriculaAtividade = await matriculaAtividadeDAO.insertMatriculaAtividade(dadosMatriculaAtividade)

            // Verifica se o banco inseriu corretamente
            if (resultDadosMatriculaAtividade) {
                let dadosMatriculaAtividadeJSON = {}
                let novaMatriculaAtividade = await matriculaAtividadeDAO.selectLastId()

                dadosMatriculaAtividadeJSON.status = message.SUCCESS_CREATED_ITEM.status // 201
                dadosMatriculaAtividadeJSON.message = message.SUCCESS_CREATED_ITEM.message
                dadosMatriculaAtividadeJSON.matricula_atividade = novaMatriculaAtividade

                return dadosMatriculaAtividadeJSON

            } else {
                return message.ERROR_INTERNAL_SERVER // 500
            }
        } else {
            return message.ERROR_NOT_FOUND // 404
        }

    }
}

const atualizarMatriculaAtividade = async function (dadosMatriculaAtividade, id) {
    if (
        dadosMatriculaAtividade.id_atividade == undefined ||
        dadosMatriculaAtividade.id_atividade == '' ||
        isNaN(dadosMatriculaAtividade.id_atividade) ||
        dadosMatriculaAtividade.id_atividade == null ||
        dadosMatriculaAtividade.id_status_atividade == undefined ||
        dadosMatriculaAtividade.id_status_atividade == '' ||
        isNaN(dadosMatriculaAtividade.id_status_atividade) ||
        dadosMatriculaAtividade.id_status_atividade == null ||
        dadosMatriculaAtividade.id_matricula_aluno == undefined ||
        dadosMatriculaAtividade.id_matricula_aluno == '' ||
        isNaN(dadosMatriculaAtividade.id_matricula_aluno) ||
        dadosMatriculaAtividade.id_matricula_aluno == null
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID // 400

    } else {

        // Verifica se a matricula e a atividade existem
        let resultDadosMatricula = await matriculaDAO.selectByIdMatricula(dadosMatriculaAtividade.id_matricula_aluno)
        let resultDadosAtividade = await atividadeDAO.selectByIdAtividade(dadosMatriculaAtividade.id_atividade)

        if (resultDadosMatricula && resultDadosAtividade) {
            dadosMatriculaAtividade.id = id
            let dadosMatriculaAtividadeJSON = {}

            //Verificar se o ID existe
            let statusId = await matriculaAtividadeDAO.selectByIdMatriculaAtividade(id)

            if (statusId) {
                let resultDadosMatriculaAtividade = await matriculaAtividadeDAO.updateMatriculaAtividade(dadosMatriculaAtividade)

                let matriculaAtividadeId = await matriculaAtividadeDAO.selectByIdMatriculaAtividade(id)

                if (resultDadosMatriculaAtividade) {
                    dadosMatriculaAtividadeJSON.status = message.SUCCESS_UPDATED_ITEM.status // 200
                    dadosMatriculaAtividadeJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    dadosMatriculaAtividadeJSON.matricula_atividade = matriculaAtividadeId

                    return dadosMatriculaAtividadeJSON

                } else {
                    return message.ERROR_INTERNAL_SERVER // 500
                }
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
};

const getBuscarMatriculaAtividadeID = async function (id) {
    // Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID //400

    } else {
        let dadosMatriculaAtividadeJSON = {}
        let dadosMatriculaAtividade = await matriculaAtividadeDAO.selectByIdMatriculaAtividade(id)

        if (dadosMatriculaAtividade) {
            // Criando um JSON com o atributo matriculas_atividades, para encaminhar um array de matriculas_atividades
            dadosMatriculaAtividadeJSON.status = message.SUCCESS_REQUEST.status //200
            dadosMatriculaAtividadeJSON.message = message.SUCCESS_REQUEST.message

            dadosMatriculaAtividadeJSON.matricula_atividade = dadosMatriculaAtividade

            return dadosMatriculaAtividadeJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getMatriculasAtividades = async function () {
    let dadosMatriculasAtividadesJSON = {}

    // Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosMatriculaAtividade = await matriculaAtividadeDAO.selectAllMatriculasAtividades()

    if (dadosMatriculaAtividade) {
        dadosMatriculasAtividadesJSON.status = message.SUCCESS_REQUEST.status
        dadosMatriculasAtividadesJSON.message = message.SUCCESS_REQUEST.message
        dadosMatriculasAtividadesJSON.quantidade = dadosMatriculaAtividade.length
        dadosMatriculasAtividadesJSON.matriculas_atividades = dadosMatriculaAtividade

        return dadosMatriculasAtividadesJSON

    } else {
        return message.ERROR_NOT_FOUND // 404
    }
};

const deletarMatriculaAtividade = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID // 400
    } else {
        let buscarById = await getBuscarMatriculaAtividadeID(id)

        // Verifica se a matricula_atividade existe, se não existir, envia o retorno da função (getBuscarMatriculaAtividadeID)
        if (buscarById.status == 404) {
            return buscarById
        } else {
            let resultDadosMatriculaAtividade = await matriculaAtividadeDAO.deleteMatriculaAtividade(id)

            if (resultDadosMatriculaAtividade) {
                return message.SUCCESS_DELETED_ITEM // 200
            } else {
                return message.ERROR_INTERNAL_SERVER // 500
            }
        }
    }
}


module.exports = {
    inserirMatriculaAtividade,
    atualizarMatriculaAtividade,
    getBuscarMatriculaAtividadeID,
    deletarMatriculaAtividade,
    getMatriculasAtividades
}
