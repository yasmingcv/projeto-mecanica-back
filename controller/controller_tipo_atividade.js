/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de tipos de atividade
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados dos tipos de atividade
var tipoAtividadeDAO = require('../model/DAO/tipo_atividadeDAO.js')

//Insere um novo tipo de atividade
const inserirTipoAtividade = async function (dadosTipo) {
    if (dadosTipo.nome == '' || dadosTipo.nome == undefined || dadosTipo.nome.length > 100 || dadosTipo.nome == null ||
    dadosTipo.sigla == '' || dadosTipo.sigla == undefined || dadosTipo.sigla.length > 10 || dadosTipo.sigla == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosTipo = await tipoAtividadeDAO.insertTipoAtividade(dadosTipo)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosTipo) {
            let dadosTipoJSON = {}
            let novoTipoAtividade = await tipoAtividadeDAO.selectLastId()

            dadosTipoJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosTipoJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosTipoJSON.tipo = novoTipoAtividade[0]

            return dadosTipoJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

// Atualiza um tipo
const atualizarTipoAtividade = async function (dadosTipo, idTipo) {
    if (dadosTipo.nome == '' || dadosTipo.nome == undefined || dadosTipo.nome.length > 100 || dadosTipo.nome == null ||
    dadosTipo.sigla == '' || dadosTipo.sigla == undefined || dadosTipo.sigla.length > 10 || dadosTipo.sigla == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idTipo == '' || idTipo == undefined || isNaN(idTipo)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosTipo.id = idTipo
        let dadosTipoJSON = {}

        let statusId = await tipoAtividadeDAO.selectByIdTipoAtividade(idTipo)

        if (statusId) {

            let resultDadosTipo = await tipoAtividadeDAO.updateTipoAtividade(dadosTipo)

            let statusId = await tipoAtividadeDAO.selectByIdTipoAtividade(idTipo)

            if (resultDadosTipo) {
                dadosTipoJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosTipoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosTipoJSON.tipo = statusId[0]
                
                return dadosTipoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }


        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
}

//Retorna um tipo de atividade filtrando pelo ID
const getBuscarTipoAtividadeID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTipoJSON = {}
        let dadosTipo = await tipoAtividadeDAO.selectByIdTipoAtividade(id)

        if (dadosTipo) {
            //Criando um JSON com o atributo tipo, para encaminhar um array de tipos
            dadosTipoJSON.status = message.SUCCESS_REQUEST.status
            dadosTipoJSON.message = message.SUCCESS_REQUEST.message

            dadosTipoJSON.tipo = dadosTipo[0]

            return dadosTipoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os status matricula
const getTodosTiposAtividades = async function () {
    let dadosTipoJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosTipo = await tipoAtividadeDAO.selectAllTiposAtividades()

    if (dadosTipo) {
        dadosTipoJSON.status = message.SUCCESS_REQUEST.status
        dadosTipoJSON.message = message.SUCCESS_REQUEST.message
        dadosTipoJSON.quantidade = dadosTipo.length
        dadosTipoJSON.tipo = dadosTipo
        return dadosTipoJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarTipoAtividade = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarTipoAtividadeID(id)

        //Verifica se o tipo existe, se não existir, envia o retorno da função (getBuscarTipoAtividadeID)
        if (buscarById.status == 404) {
            return buscarById

        //Se o tipo existir, prossegue e deleta o tipo
        } else {
            let resultDadosTipo = await tipoAtividadeDAO.deleteTipoAtividade(id)

            if (resultDadosTipo) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirTipoAtividade,
    atualizarTipoAtividade,
    getBuscarTipoAtividadeID,
    getTodosTiposAtividades,
    deletarTipoAtividade
}