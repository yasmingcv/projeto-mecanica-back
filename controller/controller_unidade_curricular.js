/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de unidades curriculares
 * Data: 01/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

var unidade_curricularDAO = require('../model/DAO/unidade_curricularDAO.js')

//Insere uma nova unidade curricular
const inserirUnidadeCurricular = async function (dadosUnidadeCurricular) {

    if (dadosUnidadeCurricular.nome == '' || dadosUnidadeCurricular.nome == undefined || dadosUnidadeCurricular.nome.length > 200 ||
        dadosUnidadeCurricular.descricao.length > 200
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosUnidadeCurricular = await unidade_curricularDAO.insertUnidadeCurricular(dadosUnidadeCurricular)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosUnidadeCurricular) {
            let dadosUnidadeCurricularJSON = {}
            let novaUnidadeCurricular = await unidade_curricularDAO.selectLastId()

            dadosUnidadeCurricularJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosUnidadeCurricularJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosUnidadeCurricularJSON.unidade_curricular = novaUnidadeCurricular

            return dadosUnidadeCurricularJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

//Atualiza uma unidade curricular
const atualizarUnidadeCurricular = async function (dadosUnidadeCurricular, idUnidadeCurricular) {
    if (dadosUnidadeCurricular.nome == '' || dadosUnidadeCurricular.nome == undefined || dadosUnidadeCurricular.nome.length > 200 ||
        dadosUnidadeCurricular.descricao.length > 200
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (idUnidadeCurricular == '' || idUnidadeCurricular == undefined || isNaN(idUnidadeCurricular)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosUnidadeCurricular.id = idUnidadeCurricular
        let dadosUnidadeCurricularJSON = {}

        let statusId = await unidade_curricularDAO.selectByIdUnidadeCurricular(idUnidadeCurricular)

        if (statusId) {
            let resultDadosUnidadeCurricular = await unidade_curricularDAO.updateUnidadeCurricular(dadosUnidadeCurricular)

            let unidadeCurricularId = await unidade_curricularDAO.selectByIdUnidadeCurricular(idUnidadeCurricular)

            if (resultDadosUnidadeCurricular) {
                dadosUnidadeCurricularJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosUnidadeCurricularJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosUnidadeCurricularJSON.unidade_curricular = unidadeCurricularId

                return dadosUnidadeCurricularJSON
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }

        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Retorna a unidade curricular filtrando pelo ID
const getBuscarUnidadeCurricularID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosUnidadeCurricularJSON = {}
        let dadosUnidadeCurricular = await unidade_curricularDAO.selectByIdUnidadeCurricular(id)

        if (dadosUnidadeCurricular) {
            //Criando um JSON com o atributo unidade curricular, para encaminhar um array de unidades curriculares
            dadosUnidadeCurricularJSON.status = message.SUCCESS_REQUEST.status
            dadosUnidadeCurricularJSON.message = message.SUCCESS_REQUEST.messages
            dadosUnidadeCurricularJSON.unidade_curricular = dadosUnidadeCurricular

            return dadosUnidadeCurricularJSON
            
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos as unidades curriculares
const getUnidadesCurriculares = async function () {
    let dadosUnidadesCurricularesJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosUnidadeCurricular = await unidade_curricularDAO.selectAllUnidadesCurriculares()

    if (dadosUnidadeCurricular) {
        dadosUnidadesCurricularesJSON.status = message.SUCCESS_REQUEST.status
        dadosUnidadesCurricularesJSON.message = message.SUCCESS_REQUEST.message
        dadosUnidadesCurricularesJSON.quantidade = dadosUnidadeCurricular.length
        dadosUnidadesCurricularesJSON.unidades_curriculares = dadosUnidadeCurricular

        return dadosUnidadesCurricularesJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}


const deletarUnidadeCurricular = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarUnidadeCurricularID(id)

        //Verifica se a unidade curricular existe, se não existir, envia o retorno da função (getBuscarUnidadeCurricularID)
        if (buscarById.status == 404) {
            return buscarById

        //Se a unidade curricular existir, prossegue e deleta
        } else {
            let resultDadosUnidadeCurricular = await unidade_curricularDAO.deleteUnidadeCurricular(id)

            if (resultDadosUnidadeCurricular) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirUnidadeCurricular,
    atualizarUnidadeCurricular,
    getBuscarUnidadeCurricularID,
    getUnidadesCurriculares,
    deletarUnidadeCurricular
}