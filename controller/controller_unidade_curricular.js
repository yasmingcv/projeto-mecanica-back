/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de unidades curriculares
 * Data: 01/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

var unidade_curricularDAO = require('../model/DAO/unidade_curricularDAO.js')

const inserirUnidadeCurricular = async function (dadosUnidadeCurricular) {

    if (dadosUnidadeCurricular.nome == '' || dadosUnidadeCurricular.nome == undefined || dadosUnidadeCurricular.nome.length > 200 ||
        dadosUnidadeCurricular.descricao == '' || dadosUnidadeCurricular.descricao == undefined || dadosUnidadeCurricular.descricao.length > 200
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



module.exports = {
    inserirUnidadeCurricular
}