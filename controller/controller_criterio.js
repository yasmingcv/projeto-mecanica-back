/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de alunos
 * Data: 10/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do critério no BD
var criterioDAO = require('../model/DAO/criterioDAO.js')

var tipoCriterioDAO = require('../model/DAO/tipo_criterioDAO.js')
var atividadeDAO = require('../model/DAO/atividadeDAO.js')

//Insere um novo criterio
const inserirCriterio = async function (dadosCriterio) {
    if (dadosCriterio.criterio == '' || dadosCriterio.criterio == undefined || dadosCriterio.criterio.length > 115 || dadosCriterio.criterio == null ||
        dadosCriterio.id_tipo_criterio == '' || dadosCriterio.id_tipo_criterio == undefined || isNaN(dadosCriterio.id_tipo_criterio) || dadosCriterio.id_tipo_criterio == null ||
        dadosCriterio.id_atividade == '' || dadosCriterio.id_atividade == undefined || isNaN(dadosCriterio.id_atividade) || dadosCriterio.id_atividade == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosTipoCriterio = await tipoCriterioDAO.selectByIdTipoCriterio(dadosCriterio.id_tipo_criterio)
        let resultDadosAtividade = await atividadeDAO.selectByIdAtividade(dadosCriterio.id_atividade)

        if (resultDadosAtividade && resultDadosTipoCriterio) {
            let resultDadosCriterio = await criterioDAO.insertCriterio(dadosCriterio)

            //Tratamento para ver se o banco inseriu corretamente os dados
            if (resultDadosCriterio) {
                let dadosCriterioJSON = {}
                let novoCriterio = await criterioDAO.selectLastId()

                dadosCriterioJSON.status = message.SUCCESS_CREATED_ITEM.status //201
                dadosCriterioJSON.message = message.SUCCESS_CREATED_ITEM.message
                dadosCriterioJSON.criterio = novoCriterio[0]

                return dadosCriterioJSON


            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND
        }


    }
}

// Atualiza um critério
const atualizarCriterio = async function (dadosCriterio, idCriterio) {
    if (dadosCriterio.criterio == '' || dadosCriterio.criterio == undefined || dadosCriterio.criterio.length > 115 || dadosCriterio.criterio == null ||
        dadosCriterio.id_tipo_criterio == '' || dadosCriterio.id_tipo_criterio == undefined || isNaN(dadosCriterio.id_tipo_criterio) || dadosCriterio.id_tipo_criterio == null ||
        dadosCriterio.id_atividade == '' || dadosCriterio.id_atividade == undefined || isNaN(dadosCriterio.id_atividade) || dadosCriterio.id_atividade == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idCriterio == '' || idCriterio == undefined || isNaN(idCriterio)) {
        return message.ERROR_INVALID_ID //400

    } else {

        let resultDadosTipoCriterio = await tipoCriterioDAO.selectByIdTipoCriterio(dadosCriterio.id_tipo_criterio)
        let resultDadosAtividade = await atividadeDAO.selectByIdAtividade(dadosCriterio.id_atividade)

        if (resultDadosAtividade && resultDadosTipoCriterio) {
            dadosCriterio.id = idCriterio
            let dadosCriterioJSON = {}

            let statusId = await criterioDAO.selectByIdCriterio(idCriterio)

            if (statusId) {

                let resultDadosCriterio = await criterioDAO.updateCriterio(dadosCriterio)

                let criterioId = await criterioDAO.selectByIdCriterio(idCriterio)

                if (resultDadosCriterio) {
                    dadosCriterioJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                    dadosCriterioJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    dadosCriterioJSON.criterio = criterioId[0]

                    return dadosCriterioJSON

                } else {
                    return message.ERROR_INTERNAL_SERVER //500
                }


            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_NOT_FOUND
        }



    }
}

//Retorna o criterio filtrando pelo ID
const getBuscarCriterioID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCriterioJSON = {}
        let dadosCriterio = await criterioDAO.selectByIdCriterio(id)

        if (dadosCriterio) {
            //Criando um JSON com o atributo criterios, para encaminhar um array de criterios
            dadosCriterioJSON.status = message.SUCCESS_REQUEST.status
            dadosCriterioJSON.message = message.SUCCESS_REQUEST.message

            dadosCriterioJSON.criterio = dadosCriterio

            return dadosCriterioJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os criterios
const getCriterios = async function () {
    let dadosCriterioJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosCriterio = await criterioDAO.selectAllCriterios()

    if (dadosCriterio) {
        dadosCriterioJSON.status = message.SUCCESS_REQUEST.status
        dadosCriterioJSON.message = message.SUCCESS_REQUEST.message
        dadosCriterioJSON.quantidade = dadosCriterio.length
        dadosCriterioJSON.criterios = dadosCriterio
        return dadosCriterioJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarCriterio = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarCriterioID(id)

        //Verifica se o criterio existe, se não existir, envia o retorno da função (getBuscarCriterioID)
        if (buscarById.status == 404) {
            return buscarById

            //Se o criterio existir, prossegue e deleta o criterio
        } else {
            let resultDadosCriterio = await criterioDAO.deleteCriterio(id)

            if (resultDadosCriterio) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirCriterio,
    atualizarCriterio,
    getBuscarCriterioID,
    getCriterios,
    deletarCriterio
}