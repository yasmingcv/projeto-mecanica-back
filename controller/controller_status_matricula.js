/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de status referente às matriculas
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do status das matriculas no BD
var statusMatriculaDAO = require('../model/DAO/status_matriculaDAO.js')

//Insere um novo status
const inserirStatusMatricula = async function (dadosStatus) {
    if (dadosStatus.status == '' || dadosStatus.status == undefined || dadosStatus.status.length > 100 || dadosStatus.status == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosStatus = await statusMatriculaDAO.insertStatusMatricula(dadosStatus)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosStatus) {
            let dadosStatusJSON = {}
            let novoStatusMatricula = await statusMatriculaDAO.selectLastId()

            dadosStatusJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosStatusJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosStatusJSON.status = novoStatusMatricula[0]

            return dadosStatusJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

// Atualiza um status
const atualizarStatusMatricula = async function (dadosStatus, idStatus) {
    if (dadosStatus.status == '' || dadosStatus.status == undefined || dadosStatus.status.length > 100 || dadosStatus.status == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idStatus == '' || idStatus == undefined || isNaN(idStatus)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosStatus.id = idStatus
        let dadosStatusJSON = {}

        let statusId = await statusMatriculaDAO.selectByIdStatusMatricula(idStatus)

        if (statusId) {

            let resultDadosStatus = await statusMatriculaDAO.updateStatusMatricula(dadosStatus)

            let statusId = await statusMatriculaDAO.selectByIdStatusMatricula(idStatus)

            if (resultDadosStatus) {
                dadosStatusJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosStatusJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosStatusJSON.status_matricula = statusId[0]
                
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
const getBuscarStatusMatriculaID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosStatusJSON = {}
        let dadosStatus = await statusMatriculaDAO.selectByIdStatusMatricula(id)

        if (dadosStatus) {
            //Criando um JSON com o atributo status, para encaminhar um array de status
            dadosStatusJSON.status = message.SUCCESS_REQUEST.status
            dadosStatusJSON.message = message.SUCCESS_REQUEST.message

            dadosStatusJSON.status_matricula = dadosStatus

            return dadosStatusJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os status matricula
const getTodosStatusMatricula = async function () {
    let dadosStatusJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosStatus = await statusMatriculaDAO.selectAllStatusMatriculas()

    if (dadosStatus) {
        dadosStatusJSON.status = message.SUCCESS_REQUEST.status
        dadosStatusJSON.message = message.SUCCESS_REQUEST.message
        dadosStatusJSON.quantidade = dadosStatus.length
        dadosStatusJSON.status_matricula = dadosStatus
        return dadosStatusJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarStatusMatricula = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarStatusMatriculaID(id)

        //Verifica se o status existe, se não existir, envia o retorno da função (getBuscarStatusMatriculaID)
        if (buscarById.status == 404) {
            return buscarById

        //Se o status existir, prossegue e deleta o status
        } else {
            let resultDadosStatus = await statusMatriculaDAO.deleteStatusMatricula(id)

            if (resultDadosStatus) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirStatusMatricula,
    atualizarStatusMatricula,
    getBuscarStatusMatriculaID,
    getTodosStatusMatricula,
    deletarStatusMatricula
}