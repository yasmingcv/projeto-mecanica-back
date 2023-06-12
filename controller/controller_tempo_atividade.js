/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Tempo
 * Autor: Daniela 
 * Data: 09/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados da SubTurmas
var tempoAtividadeDAO = require('../model/DAO/tempo_atividadeDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

const inserirTempoAtividade = async function (dadosTempo) {
    
    if(dadosTempo.inicio == '' || dadosTempo.inicio == undefined || dadosTempo.inicio > 100 ||
       dadosTempo.termino == '' || dadosTempo.termino == undefined || dadosTempo.termino > 100 ||
       dadosTempo.tempo_liquido == '' || dadosTempo.tempo_liquido == undefined || dadosTempo.tempo_liquido > 100 ||
       dadosTempo.desconto == '' || dadosTempo.desconto == undefined || isNaN(dadosTempo.desconto) ||
       dadosTempo.observacao == '' || dadosTempo.observacao == undefined || isNaN(dadosTempo.observacao) 
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400
    } else {
        let resultDadosTempoAtividade = await tempoAtividadeDAO.insertTempo(dadosTempo)

        //Verificar se o banco inseriu corretamente
        if(resultDadosTempoAtividade) {
            let dadosTempoAtividadeJSON = {};
            let novaTurma = await turmaDAO.selectLastId();

            dadosTempoAtividadeJSON.status = message.SUCCESS_CREATED_ITEM.status; //201
            dadosTempoAtividadeJSON.mensagem = message.SUCCESS_CREATED_ITEM.message;
            dadosTempoAtividadeJSON.tempo_atividade = novaTurma;

            return dadosTempoAtividadeJSON;

        } else {
            return message.ERROR_INTERNAL_SERVER; //500

        }
    }
}

const atualizarTempoAtividade = async function (dadosTempo, idTempo) {

    if(
        dadosTempo.inicio == '' || dadosTempo.inicio == undefined || dadosTempo.inicio > 100 ||
        dadosTempo.termino == '' || dadosTempo.termino == undefined || dadosTempo.termino > 100 ||
        dadosTempo.tempo_liquido == '' || dadosTempo.tempo_liquido == undefined || dadosTempo.tempo_liquido > 100 ||
        dadosTempo.desconto == '' || dadosTempo.desconto == undefined || isNaN(dadosTempo.desconto) ||
        dadosTempo.observacao == '' || dadosTempo.observacao == undefined || isNaN(dadosTempo.observacao) 
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (idTempo == '' || idTempo == undefined || isNaN(idTempo)){
        return message.ERROR_INVALID_ID //400

    } else {
        dadosTempo.id = idTempo
        let dadosTempoAtividadeJSON = {}

        let statusId = await tempoDAO.selectByIdTempo(idTempo)

        if(statusId) {
            let resultDadosTempo = await turmaDAO.updateTurma(dadosTurma)

            if(resultDadosTempo) {
                dadosTempoAtividadeJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                dadosTempoAtividadeJSON.status = message.SUCCESS_UPDATED_ITEM.status; // 200
                dadosTempoAtividadeJSON.tempo_atividade = dadosTempo;

                return dadosTurmaJSON;

            } else {
                return message.ERROR_INTERNAL_SERVER; //500
            }
        } else {
            return message.ERROR_NOT_FOUND; //404
        }
    }
}

const deletarTempoAtividade= async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let statusId = await tempoAtividadeDAO.selectByIdTempoAtividade(id)

        //Verificar se a turma selecionado existe
        if(statusId){
            let resultDadosTempoAtividade = await tempoAtividadeDAO.deleteTempoAtividade(id)

            if(resultDadosTempoAtividade){
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getBuscarTempoAtividade = async function (id) {
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosTurmaJSON = {}
        let dadosTurma = await turmaDAO.selectByIdTurma(id)

        if(dadosTurma) {
            dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
            dadosTurmaJSON.status = message.SUCCESS_REQUEST.status //200
            dadosTurmaJSON.turma = dadosTurma

            return dadosTurmaJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

const getTempoAtividade = async function () {
    let dadosTempoAtividadeJSON = {}

    let dadosTempoAtividade = await tempoAtividadeDAO.selectAllTempoAtividade()

    if(dadosTurma) {
        dadosTempoAtividadeJSON.message = message.SUCCESS_REQUEST.message
        dadosTempoAtividadeJSON.status = message.SUCCESS_REQUEST.status //200
        dadosTempoAtividadeJSON.quantidade = dadosTempoAtividade.length
        dadosTempoAtividadeJSON.turmas = dadosTempoAtividade

        return dadosTempoAtividadeJSON;
    } else {
        return message.ERROR_INTERNAL_SERVER //500
    }
}


module.exports = {
    inserirTempoAtividade,
    atualizarTempoAtividade,
    deletarTempoAtividade,
    getBuscarTempoAtividade,
    getTempoAtividade
}























