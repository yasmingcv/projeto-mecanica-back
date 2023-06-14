/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Unidade Curricular Professor
 * Autor: Daniela 
 * Data: 14/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados de Unidade Curricular Professor
var unidadeCurricularProfessorDAO = require('../model/DAO/unidade_curricular_professor_DAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

const inserirUnidadeCurricularProfessor = async function (dadosUnidadeCurricularProfessor) {
    
    if(dadosUnidadeCurricularProfessor.id_unidade_curricular == '' || dadosUnidadeCurricularProfessor.id_unidade_curricular == undefined ||  isNaN(dadosUnidadeCurricularProfessor.id_unidade_curricular)  ||
       dadosUnidadeCurricularProfessor.id_professor == '' || dadosUnidadeCurricularProfessor.id_professor == undefined || isNaN(dadosUnidadeCurricularProfessor.id_professor) 
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400
    } else {
        let resultDadosUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.insertUnidadeCurricularProfessor(dadosUnidadeCurricularProfessor)
        console.log(resultDadosUnidadeCurricularProfessor);
        

        //Verificar se o banco inseriu corretamente
        if(resultDadosUnidadeCurricularProfessor) {
            let dadosUnidadeCurricularProfessorJSON = {};
            let novaUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.selectLastId();

            dadosUnidadeCurricularProfessorJSON.status = message.SUCCESS_CREATED_ITEM.status; //201
            dadosUnidadeCurricularProfessorJSON.mensagem = message.SUCCESS_CREATED_ITEM.message;
            dadosUnidadeCurricularProfessorJSON.unidade_curricular_professor = novaUnidadeCurricularProfessor;
            console.log(novaUnidadeCurricularProfessor);
            

            return dadosUnidadeCurricularProfessorJSON;

        } else {
            return message.ERROR_INTERNAL_SERVER; //500

        }
    }
}

const atualizarUnidadeCurricularProfessor = async function (dadosUnidadeCurricularProfessor, idUnidadeCurricularProfessor) {

    if(
        dadosUnidadeCurricularProfessor.id_unidade_curricular == '' || dadosUnidadeCurricularProfessor.id_unidade_curricular == undefined ||  isNaN(dadosUnidadeCurricularProfessor.id_unidade_curricular)  ||
        dadosUnidadeCurricularProfessor.id_professor == '' || dadosUnidadeCurricularProfessor.id_professor == undefined || isNaN(dadosUnidadeCurricularProfessor.id_professor)  
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (idUnidadeCurricularProfessor == '' || idUnidadeCurricularProfessor == undefined || isNaN(idUnidadeCurricularProfessor)){
        return message.ERROR_INVALID_ID //400

    } else {
        dadosUnidadeCurricularProfessor.id = idUnidadeCurricularProfessor;
        let dadosUnidadeCurricularProfessorJSON = {}

        let statusId = await unidadeCurricularProfessorDAO.selectUnidadeCurricularProfessorbyID(idUnidadeCurricularProfessor)

        if(statusId) {
            let resultDadosUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.updateUnidadeCurricularProfessor(dadosUnidadeCurricularProfessor)

            if(resultDadosUnidadeCurricularProfessor) {
                dadosUnidadeCurricularProfessorJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                dadosUnidadeCurricularProfessorJSON.status = message.SUCCESS_UPDATED_ITEM.status; // 200
                dadosUnidadeCurricularProfessorJSON.unidade_curricular_professor = dadosUnidadeCurricularProfessor;

                return dadosUnidadeCurricularProfessorJSON;

            } else {
                return message.ERROR_INTERNAL_SERVER; //500
            }
        } else {
            return message.ERROR_NOT_FOUND; //404
        }
    }
}

const deletarUnidadeCurricularProfessor= async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let statusId = await unidadeCurricularProfessorDAO.selectUnidadeCurricularProfessorbyID(id)

        //Verificar se a unidade curricular professor selecionado existe
        if(statusId){
            let resultDadosUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.deleteUnidadeCurricularProfessor(id)

            if(resultDadosUnidadeCurricularProfessor){
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getBuscarUnidadeCurricularProfessorById = async function (id) {
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosUnidadeCurricularProfessorJSON = {}
        let dadosUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.selectUnidadeCurricularProfessorbyID(id)

        if(dadosUnidadeCurricularProfessor) {
            dadosUnidadeCurricularProfessorJSON.message = message.SUCCESS_REQUEST.message
            dadosUnidadeCurricularProfessorJSON.status = message.SUCCESS_REQUEST.status //200
            dadosUnidadeCurricularProfessorJSON.unidade_curricular_professor = dadosUnidadeCurricularProfessor;

            return dadosUnidadeCurricularProfessorJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getAllUnidadeCurricularProfessor = async function () {
    let dadosUnidadeCurricularProfessorJSON = {}

    let dadosUnidadeCurricularProfessor = await unidadeCurricularProfessorDAO.selectAllUnidadeCurricularProfessor()

    if(dadosUnidadeCurricularProfessor) {
        dadosUnidadeCurricularProfessorJSON.message = message.SUCCESS_REQUEST.message
        dadosUnidadeCurricularProfessorJSON.status = message.SUCCESS_REQUEST.status //200
        dadosUnidadeCurricularProfessorJSON.quantidade = unidadeCurricularProfessorDAO.length
        dadosUnidadeCurricularProfessorJSON.unidade_curricular_professor = dadosUnidadeCurricularProfessor;

        return dadosUnidadeCurricularProfessorJSON;
    } else {
        return message.ERROR_INTERNAL_SERVER //500
    }
}


module.exports = {
    inserirUnidadeCurricularProfessor,
    atualizarUnidadeCurricularProfessor,
    deletarUnidadeCurricularProfessor,
    getBuscarUnidadeCurricularProfessorById,
    getAllUnidadeCurricularProfessor
}























