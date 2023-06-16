/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD do administrador
 * Data: 29/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

// :)

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var administradorDAO = require('../model/DAO/administradorDAO.js')


//Insere um administrador
const inserirAdministrador = async function (dadosAdministrador) {

    if (dadosAdministrador.email == '' || dadosAdministrador.email == undefined || dadosAdministrador.length > 255 ||
        dadosAdministrador.senha == '' || dadosAdministrador.senha == undefined || dadosAdministrador.senha > 513) {

        return message.ERROR_REQUIRED_FIELDS // 400
    } else {
        let resultDadosAdm = await administradorDAO.insertAdministrador(dadosAdministrador)

        if (resultDadosAdm) {
            let dadosAdmJSON = {}
            let novoAdm = await administradorDAO.selectLastId()

            dadosAdmJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosAdmJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosAdmJSON.administrador = novoAdm

            return dadosAdmJSON
        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }

    }
}

//Atualiza um administrador
const atualizarAdministrador = async function (dadosAdministrador, idAdministrador) {
    if (dadosAdministrador.email == '' || dadosAdministrador.email == undefined || dadosAdministrador.length > 255 ||
        dadosAdministrador.senha == '' || dadosAdministrador.senha == undefined || dadosAdministrador.senha > 513) {

        return message.ERROR_REQUIRED_FIELDS // 400
    } else if (idAdministrador == '' || idAdministrador == undefined || isNaN(idAdministrador)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosAdministrador.id = idAdministrador
        dadosAdmJSON = {}

        let statusId = await administradorDAO.selectByIdAdministrador(idAdministrador)

        if(statusId) {
            let resultDadosAdm = await administradorDAO.updateAdministrador(dadosAdministrador)

            let admId = await administradorDAO.selectByIdAdministrador(idAdministrador)

            if(resultDadosAdm) {
                dadosAdmJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosAdmJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosAdmJSON.administrador = admId

                return dadosAdmJSON
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }

        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Deleta um administrador
const deletarAdministrador = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await administradorDAO.selectByIdAdministrador(id)

        //Verificar se o adm selecionado existe
        if(buscarById){
            let resultDadosAdm = await administradorDAO.deleteAdministrador(id)

            if(resultDadosAdm) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }

        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Busca um administrador, filtrando pelo ID
const getBuscarAdministradorID = async function (id) {

    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosAdmJSON = {}

        let dadosAdm = await administradorDAO.selectByIdAdministrador(id)

        if(dadosAdm) {
            dadosAdmJSON.message = message.SUCCESS_REQUEST.message
            dadosAdmJSON.status = message.SUCCESS_REQUEST.status //200
            dadosAdmJSON.administrador = dadosAdm

            return dadosAdmJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Busca todos os administradores
const getAdministradores = async function () {
    let dadosAdmJSON = {}

    let dadosAdm = await administradorDAO.selectAllAdministradores()

    if(dadosAdm) {
        dadosAdmJSON.message = message.SUCCESS_REQUEST.message
        dadosAdmJSON.status = message.SUCCESS_REQUEST.status //200
        dadosAdmJSON.quantidade = dadosAdm.length
        dadosAdmJSON.alunos = dadosAdm

        return dadosAdmJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

const autenticarAdministrador = async function (email, senha) {
    const jwt = require('../middleware/middlewareJWT.js')

    const dadosAdministrador = await administradorDAO.selectAdministradorAuthentication(email, senha)

    let dadosAdministradorJSON = {}

    if (dadosAdministrador) {
        //Gera o token pelo jwt
        let tokenUser = await jwt.createJWT(dadosAdministrador.id)

        dadosAdministradorJSON.status = message.SUCCESS_REQUEST.status
        dadosAdministradorJSON.administrador = dadosAdministrador
        dadosAdministradorJSON.token = tokenUser

        return dadosAdministradorJSON
    } else {
        return message.ERROR_UNAUTHORIZED //401
    }

}



module.exports = {
    inserirAdministrador,
    atualizarAdministrador,
    deletarAdministrador,
    getBuscarAdministradorID,
    getAdministradores,
    autenticarAdministrador
}