/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de resultados desejados
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ***********************************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do status das matriculas no BD
var resultadoDesejadoDAO = require('../model/DAO/resultado_desejadoDAO.js')

//Insere um novo resultado
const inserirResultadoDesejado = async function (dadosResultado) {
    if (dadosResultado.resultado_desejado == '' || dadosResultado.resultado_desejado == undefined || dadosResultado.resultado_desejado.length > 30 || dadosResultado.resultado_desejado == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosResultadoDesejado = await resultadoDesejadoDAO.insertResultadoDesejado(dadosResultado)

        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosResultadoDesejado) {
            let dadosResultadoJSON = {}
            let novoResultadoDesejado = await resultadoDesejadoDAO.selectLastId()

            dadosResultadoJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosResultadoJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosResultadoJSON.resultado_desejado = novoResultadoDesejado

            return dadosResultadoJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

// Atualiza um resultado desejado
const atualizarResultadoDesejado = async function (dadosResultado, idResultado) {
    if (dadosResultado.resultado_desejado == '' || dadosResultado.resultado_desejado == undefined || dadosResultado.resultado_desejado.length > 30 || dadosResultado.resultado_desejado == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idResultado == '' || idResultado == undefined || isNaN(idResultado)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosResultado.id = idResultado
        let dadosResultadoDesejadoJSON = {}

        let statusId = await resultadoDesejadoDAO.selectByIdResultadoDesejado(idResultado)

        if (statusId) {

            let resultDadosResultado = await resultadoDesejadoDAO.updateResultadoDesejado(dadosResultado)

            let statusId = await resultadoDesejadoDAO.selectByIdResultadoDesejado(idResultado)

            if (resultDadosResultado) {
                dadosResultadoDesejadoJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosResultadoDesejadoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosResultadoDesejadoJSON.resultado_desejado = statusId[0]
                
                return dadosResultadoDesejadoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }


        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
}

//Retorna um resultado desejado filtrando pelo ID
const getBuscarResultadoDesejadoID = async function (id) { // parei aqui

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
    inserirResultadoDesejado
}