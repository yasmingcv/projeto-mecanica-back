/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de resultados desejados e critérios
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO
var resultadoDesejadoCriterioDAO = require('../model/DAO/resultado_desejado_criterioDAO.js')

var criterioDAO = require('../model/DAO/criterioDAO.js')
var resultadoDesejadoDAO = require('../model/DAO/resultado_desejadoDAO.js')

//Insere um novo resultado desejado criterio 
const inserirResultadoDesejadoCriterio = async function (dados) {
    if (dados.id_resultado_desejado == '' || dados.id_resultado_desejado == undefined || isNaN(dados.id_resultado_desejado) || dados.id_resultado_desejado == null ||
        dados.id_criterio == '' || dados.id_criterio == undefined || isNaN(dados.id_criterio) || dados.id_criterio == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400 

    } else {
        let resultDadosCriterio = await criterioDAO.selectByIdCriterio(dados.id_criterio)
        let resultDadosResultadoDesejado = await resultadoDesejadoDAO.selectByIdResultadoDesejado(dados.id_resultado_desejado)

        //Verificar se o id do resultado desejado e o id do criterio existem
        if (!resultDadosCriterio || !resultDadosResultadoDesejado) {
            return message.ERROR_NOT_FOUND //404

        } else {
            let resultDadosResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.insertResultadoDesejadoCriterio(dados)

            //Tratamento para ver se o banco inseriu corretamente os dados
            if (resultDadosResultadoDesejadoCriterio) {
                let dadosResultadoDesejadoCriterioJSON = {}
                let novoResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.selectLastId()

                dadosResultadoDesejadoCriterioJSON.status = message.SUCCESS_CREATED_ITEM.status //201
                dadosResultadoDesejadoCriterioJSON.message = message.SUCCESS_CREATED_ITEM.message
                dadosResultadoDesejadoCriterioJSON.resultado_desejado_criterio = novoResultadoDesejadoCriterio

                return dadosResultadoDesejadoCriterioJSON


            } else {
                return message.ERROR_INTERNAL_SERVER //500

            }
        }



    }
}

// Atualiza um registro de resultado desejado e critério
const atualizarResultadoDesejadoCriterio = async function (dados, id) {
    if (dados.id_resultado_desejado == '' || dados.id_resultado_desejado == undefined || isNaN(dados.id_resultado_desejado) || dados.id_resultado_desejado == null ||
        dados.id_criterio == '' || dados.id_criterio == undefined || isNaN(dados.id_criterio) || dados.id_criterio == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID //400

    } else {
        let resultDadosCriterio = await criterioDAO.selectByIdCriterio(dados.id_criterio)
        let resultDadosResultadoDesejado = await resultadoDesejadoDAO.selectByIdResultadoDesejado(dados.id_resultado_desejado)

        //Verificar se o id do resultado desejado e o id do criterio existem
        if (!resultDadosCriterio || !resultDadosResultadoDesejado) {
            return message.ERROR_NOT_FOUND //404
        } else {
            dados.id = id
            let dadosResultadoDesejadoCriterioJSON = {}

            //Verificar se o registro existe
            let statusId = await resultadoDesejadoCriterioDAO.selectByIdResultadoDesejadoCriterio(id)

            if (statusId) {

                let resultDadosResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.updateResultadoDesejadoCriterio(dados)

                let resultadoDesejadoCriterioAtualizado = await resultadoDesejadoCriterioDAO.selectByIdResultadoDesejadoCriterio(id)

                if (resultDadosResultadoDesejadoCriterio) {
                    dadosResultadoDesejadoCriterioJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                    dadosResultadoDesejadoCriterioJSON.message = message.SUCCESS_UPDATED_ITEM.message
                    dadosResultadoDesejadoCriterioJSON.resultado_desejado_criterio = resultadoDesejadoCriterioAtualizado

                    return dadosResultadoDesejadoCriterioJSON

                } else {
                    return message.ERROR_INTERNAL_SERVER //500
                }


            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }




    }
}

//Retorna o registro de resultado desejado e criterio filtrando pelo ID
const getBuscarResultadoDesejadoCriterioID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosResultadoDesejadoCriterioJSON = {}
        let dadosResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.selectByIdResultadoDesejadoCriterio(id)

        if (dadosResultadoDesejadoCriterio) {
            dadosResultadoDesejadoCriterioJSON.status = message.SUCCESS_REQUEST.status
            dadosResultadoDesejadoCriterioJSON.message = message.SUCCESS_REQUEST.message

            dadosResultadoDesejadoCriterioJSON.resultado_desejado_criterio = dadosResultadoDesejadoCriterio

            return dadosResultadoDesejadoCriterioJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os registros de resultado desejado e critérios
const getBuscarResultadosDesejadosCriterios = async function () {
    let dadosResultadoDesejadoCriterioJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.selectAllResultadosDesejadosCriterios()

    if (dadosResultadoDesejadoCriterio) {
        dadosResultadoDesejadoCriterioJSON.status = message.SUCCESS_REQUEST.status
        dadosResultadoDesejadoCriterioJSON.message = message.SUCCESS_REQUEST.message
        dadosResultadoDesejadoCriterioJSON.quantidade = dadosResultadoDesejadoCriterio.length
        dadosResultadoDesejadoCriterioJSON.resultado_desejado_criterio = dadosResultadoDesejadoCriterio
        return dadosResultadoDesejadoCriterioJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarResultadoDesejadoCriterio = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarResultadoDesejadoCriterioID(id)

        if (buscarById.status == 404) {
            return buscarById

        } else {
            let resultDadosResultadoDesejadoCriterio = await resultadoDesejadoCriterioDAO.deleteResultadoDesejadoCriterio(id)

            if (resultDadosResultadoDesejadoCriterio) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}


module.exports = {
    inserirResultadoDesejadoCriterio,
    atualizarResultadoDesejadoCriterio,
    getBuscarResultadoDesejadoCriterioID,
    getBuscarResultadosDesejadosCriterios,
    deletarResultadoDesejadoCriterio
}