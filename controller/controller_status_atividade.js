/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de status referente às atividades
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do status das atividades no BD
var statusAtividadeDAO = require('../model/DAO/status_atividadeDAO.js')

//Insere um novo status
const inserirStatusAtividade = async function (dadosStatus) {
    if (dadosStatus.nome == '' || dadosStatus.nome == undefined || dadosStatus.nome.length > 100 || dadosStatus.nome == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosStatus = await statusAtividadeDAO.insertStatusAtividade(dadosStatus)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosStatus) {
            let dadosStatusJSON = {}
            let novoStatusAtividade = await statusAtividadeDAO.selectLastId()

            dadosStatusJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosStatusJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosStatusJSON.status = novoStatusAtividade[0]

            return dadosStatusJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

// Atualiza um status
const atualizarStatusAtividade = async function (dadosStatus, idStatus) {
    if (dadosStatus.nome == '' || dadosStatus.nome == undefined || dadosStatus.nome.length > 100 || dadosStatus.nome == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idStatus == '' || idStatus == undefined || isNaN(idStatus)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosStatus.id = idStatus
        let dadosStatusJSON = {}

        let statusId = await statusAtividadeDAO.selectByIdStatusAtividade(idStatus)

        //Verificar se o status existe
        if (statusId) {

            let resultDadosStatus = await statusAtividadeDAO.updateStatusAtividade(dadosStatus)

            let novoStatusId = await statusAtividadeDAO.selectByIdStatusAtividade(idStatus)

            if (resultDadosStatus) {
                dadosStatusJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosStatusJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosStatusJSON.status = novoStatusId[0]
                
                return dadosStatusJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }


        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
}

//Retorna um status filtrando pelo ID
const getBuscarStatusAtividadeID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosStatusJSON = {}
        let dadosStatus = await statusAtividadeDAO.selectByIdStatusAtividade(id)

        if (dadosStatus) {
            //Criando um JSON com o atributo status, para encaminhar um array de status
            dadosStatusJSON.status = message.SUCCESS_REQUEST.status
            dadosStatusJSON.message = message.SUCCESS_REQUEST.message

            dadosStatusJSON.status = dadosStatus

            return dadosStatusJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os status atividade
const getTodosStatusAtividades = async function () {
    let dadosStatusJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosStatus = await statusAtividadeDAO.selectAllStatusAtividades()

    if (dadosStatus) {
        dadosStatusJSON.status = message.SUCCESS_REQUEST.status
        dadosStatusJSON.message = message.SUCCESS_REQUEST.message
        dadosStatusJSON.quantidade = dadosStatus.length
        dadosStatusJSON.status = dadosStatus
        return dadosStatusJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarStatusAtividade = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarStatusAtividadeID(id)

        //Verifica se o status existe, se não existir, envia o retorno da função (getBuscarStatusAtividadeID)
        if (buscarById.status == 404) {
            return buscarById

        //Se o status existir, prossegue e deleta o status
        } else {
            let resultDadosStatus = await statusAtividadeDAO.deleteStatusAtividade(id)

            if (resultDadosStatus) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirStatusAtividade,
    atualizarStatusAtividade,
    getBuscarStatusAtividadeID,
    getTodosStatusAtividades,
    deletarStatusAtividade
}