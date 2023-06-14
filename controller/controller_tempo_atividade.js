/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Tempo
 * Autor: Daniela 
 * Data: 09/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados do Tempo das atividades
var tempoAtividadeDAO = require('../model/DAO/tempo_atividadeDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

const inserirTempoAtividade = async function (dadosTempo) {
    
    if(dadosTempo.inicio == '' || dadosTempo.inicio == undefined || dadosTempo.inicio > 100 ||
       dadosTempo.termino == '' || dadosTempo.termino == undefined || dadosTempo.termino > 100 ||
       dadosTempo.desconto == '' || dadosTempo.desconto == undefined || isNaN(dadosTempo.desconto) ||
       dadosTempo.observacao == '' || dadosTempo.observacao == undefined 
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400
    } else {
        let resultDadosTempoAtividade = await tempoAtividadeDAO.insertTempo(dadosTempo)

        //Verificar se o banco inseriu corretamente
        if(resultDadosTempoAtividade) {
            let dadosTempoAtividadeJSON = {};
            let novoTempo = await tempoAtividadeDAO.selectLastId();

            dadosTempoAtividadeJSON.status = message.SUCCESS_CREATED_ITEM.status; //201
            dadosTempoAtividadeJSON.mensagem = message.SUCCESS_CREATED_ITEM.message;
            dadosTempoAtividadeJSON.tempo_atividade = novoTempo;

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
        dadosTempo.desconto == '' || dadosTempo.desconto == undefined || isNaN(dadosTempo.desconto) ||
        dadosTempo.observacao == '' || dadosTempo.observacao == undefined  
    ) {
        return message.ERROR_REQUIRED_FIELDS // 400

    } else if (idTempo == '' || idTempo == undefined || isNaN(idTempo)){
        return message.ERROR_INVALID_ID //400

    } else {
        dadosTempo.id = idTempo
        let dadosTempoAtividadeJSON = {}

        let statusId = await tempoDAO.selectByIdTempo(idTempo)

        if(statusId) {
            let resultDadosTempo = await tempoAtividadeDAO.updateTempoAtividade(dadosTempo)

            if(resultDadosTempo) {
                dadosTempoAtividadeJSON.message = message.SUCCESS_UPDATED_ITEM.message;
                dadosTempoAtividadeJSON.status = message.SUCCESS_UPDATED_ITEM.status; // 200
                dadosTempoAtividadeJSON.tempo_atividade = dadosTempo;

                return dadosTempoAtividadeJSON;

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

        //Verificar se o tempo selecionado existe
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
        let dadosTempoJSON = {}
        let dadosTempo = await tempoAtividadeDAO.selectByIdTempoAtividade(id)

        if(dadosTempo) {
            dadosTempoJSON.message = message.SUCCESS_REQUEST.message
            dadosTempoJSON.status = message.SUCCESS_REQUEST.status //200
            dadosTempoJSON.tempo_atividade = dadosTempo

            return dadosTempoJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    }
}

//Retorna um tempo de atividade pelo inicio
const getBuscarTempoByInicio = async (inicio) => {

    let inicioTempo = inicio

    let dadosByInicioTempoJSON = {}

    if (!isNaN(inicioTempo) || inicioTempo !== undefined || inicioTempo !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByInicioTempo = await tempoAtividadeDAO.selectByInicioAtividade(inicioTempo);

        if (dadosByInicioTempo) {
            //Criando um JSON com o atrbuto tempo_atividade, para encaminhar um array de tempo
            dadosByInicioTempoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByInicioTempoJSON.quantidade = dadosByNomeCurso.length;
            dadosByInicioTempoJSON.tempo_atividade = dadosByInicioTempo;

            return dadosByInicioTempoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um tempo de atividade pelo termino
const getBuscarTempoByTermino = async (termino) => {

    let terminoTempo = termino

    let dadosByTerminoTempoJSON = {}

    if (!isNaN(terminoTempo) || terminoTempo !== undefined || terminoTempo !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByTerminoTempo = await tempoAtividadeDAO.selectByInicioAtividade(inicioTempo);

        if (dadosByTerminoTempo) {
            //Criando um JSON com o atrbuto tempo_atividade, para encaminhar um array de tempo
            dadosByTerminoTempoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByTerminoTempoJSON.quantidade = dadosByNomeCurso.length;
            dadosByTerminoTempoJSON.tempo_atividade = dadosByTerminoTempo;

            return dadosByTerminoTempoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

const getTempoAtividade = async function () {
    let dadosTempoAtividadeJSON = {}

    let dadosTempoAtividade = await tempoAtividadeDAO.selectAllTempoAtividade()

    if(dadosTempoAtividade) {
        dadosTempoAtividadeJSON.message = message.SUCCESS_REQUEST.message
        dadosTempoAtividadeJSON.status = message.SUCCESS_REQUEST.status //200
        dadosTempoAtividadeJSON.quantidade = dadosTempoAtividade.length
        dadosTempoAtividadeJSON.tempo_atividade = dadosTempoAtividade

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
    getTempoAtividade,
    getBuscarTempoByInicio
}























