/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Cursos
 * Autor: Daniela 
 * Data: 14/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados do Curso
var avaliacaoDAO = require('../model/DAO/avaliacaoDAO.js');
var criterioDAO = require('../model/DAO/criterioDAO.js');
var professorDAO = require('../model/DAO/professorDAO.js');
var tempoDAO = require('../model/DAO/tempo_atividadeDAO.js');
var atividadeDAO = require('../model/DAO/atividadeDAO.js');
var matriculaDAO = require('../model/DAO/matricula_atividadeDAO.js');

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

//Insere uma nova Avaliação
const inserirAvaliacao = async (dadosAvaliacao) => {
    console.log(dadosAvaliacao);
    let idCriterioStatus = criterioDAO.selectByIdCriterio(dadosAvaliacao.id_criterio);
    let idProfessorStatus = professorDAO.selectByIdProfessor(dadosAvaliacao.id_professor);
    let idTempoStatus = tempoDAO.selectByIdTempoAtividade(dadosAvaliacao.id_tempo);
    let idAtividadeStatus = atividadeDAO.selectByIdAtividade(dadosAvaliacao.id_atividade);
    let idMatriculaAlunoStatus = matriculaDAO.selectByIdMatriculaAtividade(dadosAvaliacao.id_matricula_aluno);



    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAvaliacao.avaliacao_aluno == ''     || dadosAvaliacao.avaliacao_aluno == undefined     || typeof dadosAvaliacao.avaliacao_aluno == Boolean     ||
        dadosAvaliacao.avaliacao_professor == '' || dadosAvaliacao.avaliacao_professor == undefined || typeof dadosAvaliacao.avaliacao_professor == Boolean ||
        dadosAvaliacao.observacao == ''          || dadosAvaliacao.observacao == undefined          ||
        dadosAvaliacao.id_criterio == ''         || dadosAvaliacao.id_criterio == undefined         || isNaN(dadosAvaliacao.id_criterio)                    ||
        dadosAvaliacao.id_professor == ''        || dadosAvaliacao.id_professor == undefined        || isNaN(dadosAvaliacao.id_professor)                   ||
        dadosAvaliacao.id_tempo == ''            || dadosAvaliacao.id_tempo == undefined            || isNaN(dadosAvaliacao.id_tempo)                       ||
        dadosAvaliacao.id_atividade == ''        || dadosAvaliacao.id_atividade == undefined        || isNaN(dadosAvaliacao.id_atividade)                   ||
        dadosAvaliacao.id_matricula_aluno == ''  || dadosAvaliacao.id_matricula_aluno == undefined  || isNaN(dadosAvaliacao.id_matricula_aluno)
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {
        
        if ( idAtividadeStatus && idCriterioStatus && idMatriculaAlunoStatus && idProfessorStatus && idTempoStatus && idMatriculaAlunoStatus) {

        let resultadoDadosAvaliacao = avaliacaoDAO.insertAvaliacao(dadosAvaliacao)

        console.log(resultadoDadosAvaliacao);

        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosAvaliacao) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novoAvaliacao = await avaliacaoDAO.selectLastId();
            let dadosAvaliacaoJSON = {};

            dadosAvaliacaoJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosAvaliacaoJSON.avaliacao = novoAvaliacao;


            return dadosAvaliacaoJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
        } else {
            return message.ERROR_NOT_FOUND; //404
        }
    }

}

//Atualiza um Avaliacao existente
const atualizarAvaliacao = async (dadosAvaliacao, idAvaliacao) => {

    //Validação para campos obrigatórios e numero de caracteres




    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAvaliacao.avaliacao_aluno == ''     || dadosAvaliacao.avaliacao_aluno == undefined     || typeof dadosAvaliacao.avaliacao_aluno == Boolean     ||
        dadosAvaliacao.avaliacao_professor == '' || dadosAvaliacao.avaliacao_professor == undefined || typeof dadosAvaliacao.avaliacao_professor == Boolean ||
        dadosAvaliacao.observacao == ''          || dadosAvaliacao.observacao == undefined          ||
        dadosAvaliacao.id_criterio == ''         || dadosAvaliacao.id_criterio == undefined         || isNaN(dadosAvaliacao.id_criterio)                    ||
        dadosAvaliacao.id_professor == ''        || dadosAvaliacao.id_professor == undefined        || isNaN(dadosAvaliacao.id_professor)                   ||
        dadosAvaliacao.id_tempo == ''            || dadosAvaliacao.id_tempo == undefined            || isNaN(dadosAvaliacao.id_tempo)                       ||
        dadosAvaliacao.id_atividade == ''        || dadosAvaliacao.id_atividade == undefined        || isNaN(dadosAvaliacao.id_atividade)                   ||
        dadosAvaliacao.id_matricula_aluno == ''  || dadosAvaliacao.id_matricula_aluno == undefined  || isNaN(dadosAvaliacao.id_matricula_aluno)
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    }  else if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {

        //Adiciona o id do avaliacao no json
        dadosAvaliacao.id = idAvaliacao;
        let statusID = await avaliacaoDAO.selectByIdAvaliacao(idAvaliacao);
        let idCriterioStatus = criterioDAO.selectByIdCriterio(dadosAvaliacao.id_criterio);
        let idProfessorStatus = professorDAO.selectByIdProfessor(dadosAvaliacao.id_professor);
        let idTempoStatus = tempoDAO.selectByIdTempoAtividade(dadosAvaliacao.id_tempo);
        let idAtividadeStatus = atividadeDAO.selectByIdAtividade(dadosAvaliacao.id_atividade);
        let idMatriculaAlunoStatus = matriculaDAO.selectByIdMatriculaAtividade(dadosAvaliacao.id_matricula_aluno);


        if (statusID && idAtividadeStatus && idCriterioStatus && idMatriculaAlunoStatus && idProfessorStatus && idTempoStatus && idMatriculaAlunoStatus) {
            //Encaminha os dados para a model do curso
            let resultDadosAvaliacao = await avaliacaoDAO.updateAvaliacao(dadosAvaliacao);

            if (resultDadosAvaliacao) {
                let dadosAvaliacaoJSON = {};

                dadosAvaliacaoJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                dadosAvaliacaoJSON.avaliacao = dadosAvaliacao;

                return dadosAvaliacaoJSON; //status code 201
            } else {
                return message.ERROR_INTERNAL_SERVER; //500

            }

        } else {
            return message.ERROR_NOT_FOUND; //404
        }

    }
}

//Deleta um Avaliacao existente
const deletarAvaliacao = async (idAvaliacao) => {

    //validação de ID incorreto ou não informado
    if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        
        let statusID = await avaliacaoDAO.selectByIdAvaliacao(idAvaliacao);


        if (statusID) {
            //Encaminha os dados para a model do curso
            let resultDadosAvaliacao = await avaliacaoDAO.deleteAvaliacao(idAvaliacao)

            if (resultDadosAvaliacao) {
                return message.SUCCESS_DELETED_ITEM; //200
            } else {
                return message.ERROR_INTERNAL_SERVER; //500
            }

        }else {
            return message.ERROR_NOT_FOUND; //404
        }
    }
}

//Retorna a lista de todos as avaliações
const getAllAvaliacoes = async () => {

    let dadosAvaliacaosJSON = {}


    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosAvaliacaos = await avaliacaoDAO.selectAllAvaliacao();


    if (dadosAvaliacaos) {
        //Criando um JSON com o atributo avaliacao, para encaminhar um array de avaliacao
        dadosAvaliacaosJSON.status = message.SUCCESS_REQUEST.status;
        dadosAvaliacaosJSON.quantidade = dadosAvaliacaos.length;
        dadosAvaliacaosJSON.avaliacoes = dadosAvaliacaos;
        return dadosAvaliacaosJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna um Avaliacao pela matricula do aluno
const getBuscarAvaliacaoByMatricula = async (numero) => {

    let numeroMatricula = numero

    let dadosByMatriculaAvaliacaoJSON = {}

    if (isNaN(numeroMatricula) || numeroMatricula !== undefined || numeroMatricula !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByMatriculaAvaliacao = await avaliacaoDAO.selectByMatriculaAlunoAvaliacao(nomeAvaliacao);

        if (dadosByMatriculaAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByMatriculaAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByMatriculaAvaliacaoJSON.quantidade = dadosByMatriculaAvaliacao.length;
            dadosByMatriculaAvaliacaoJSON.avaliacoes = dadosByMatriculaAvaliacao;

            console.log(dadosByNomeAvaliacaoJSON);
            return dadosByNomeAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um Avaliacao pelo nome do criterio
const getBuscarAvaliacaoByNomeCriterio = async (criterio) => {

    let nomeCriterio = criterio;

    let dadosByCriterioAvaliacaoJSON = {}

    if (isNaN(nomeCriterio) || nomeCriterio !== undefined || nomeCriterio !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByCriterioAvaliacao = await avaliacaoDAO.selectByCriterioAvaliacao(nomeCriterio);

        if (dadosByCriterioAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByCriterioAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByCriterioAvaliacaoJSON.quantidade = dadosByCriterioAvaliacao.length;
            dadosByCriterioAvaliacaoJSON.Avaliacaos = dadosByCriterioAvaliacao;

            return dadosByCriterioAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um Avaliacao pelo nome do professor
const getBuscarAvaliacaoByNomeProfessor = async (nome) => {

    let nomeProfessor = nome

    let dadosByNomeProfessorAvaliacaoJSON = {}

    if (!isNaN(nomeProfessor) || nomeProfessor !== undefined || nomeProfessor !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeProfessorAvaliacao = await avaliacaoDAO.selectByNomeProfessorAvaliacao(nomeProfessor);

        if (dadosByNomeProfessorAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByNomeProfessorAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeProfessorAvaliacaoJSON.quantidade = dadosByNomeProfessorAvaliacao.length;
            dadosByNomeProfessorAvaliacaoJSON.Avaliacoes = dadosByNomeProfessorAvaliacao;

            console.log(dadosByNomeProfessorAvaliacaoJSON);
            return dadosByNomeProfessorAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um Avaliacao pelo nome de uma atividade do aluno
const getBuscarAvaliacaoByNomeAtividade = async (nome) => {

    let nomeAtividade = nome

<<<<<<< HEAD
    let dadosByNomeAtividadeAvaliacaoJSON = {}
=======
    let dadosByNomeAvaliacaoJSON = {}
>>>>>>> d4c138067d135ab73beb8f03a87828a5badcf6c5

    if ( nomeAtividade !== undefined || nomeAtividade !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeAtividadeAvaliacao = await avaliacaoDAO.selectByNomeAtividadeAvaliacao(nomeAvaliacao);

        if (dadosByNomeAtividadeAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByNomeAtividadeAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeAtividadeAvaliacaoJSON.quantidade = dadosByNomeAtividadeAvaliacao.length;
            dadosByNomeAtividadeAvaliacaoJSON.Avaliacaos = dadosByNomeAtividadeAvaliacao;

            console.log(dadosByNomeAvaliacaoJSON);
            return dadosByNomeAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

<<<<<<< HEAD
//Retorna um Avaliacao pelo tempo previsto
const getBuscarAvaliacaoByTempoPrevisto = async (tempo) => {

    let tempoPrevisto = tempo 

    let dadosByTempoPrevistoAvaliacaoJSON = {}

    if ( tempoPrevisto !== undefined || tempoPrevisto !== '' || isNaN(tempoPrevisto)) {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByTempoPrevistoAvaliacao = await avaliacaoDAO.selectByTempoPrevistoAvaliacao(tempoPrevisto);

        if (dadosByTempoPrevistoAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByTempoPrevistoAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByTempoPrevistoAvaliacaoJSON.quantidade = dadosByTempoPrevistoAvaliacao.length;
            dadosByTempoPrevistoAvaliacaoJSON.Avaliacaos = dadosByTempoPrevistoAvaliacao;

            return dadosByTempoPrevistoAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

=======
>>>>>>> d4c138067d135ab73beb8f03a87828a5badcf6c5
//Retorna um avaliacao pelo ID
const getBuscarAvaliacaoByID = async (id) => {

    let idAvaliacao = id;

    let dadosByIdAvaliacaoJSON = {}


    if (isNaN(idAvaliacao) || idAvaliacao == undefined || idAvaliacao == '') {
        return message.ERROR_INVALID_ID;

    } else {
        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByIdAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(id);


        if (dadosByIdAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByIdAvaliacaoJSON.status = message.SUCCESS_REQUEST.status
            dadosByIdAvaliacaoJSON.avaliacao = dadosByIdAvaliacao;

            return dadosByIdAvaliacaoJSON;

        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    getAllAvaliacoes,
    getBuscarAvaliacaoByID,
    getBuscarAvaliacaoByNomeAtividade,
    getBuscarAvaliacaoByNomeCriterio,
    getBuscarAvaliacaoByNomeProfessor,
<<<<<<< HEAD
    getBuscarAvaliacaoByTempoPrevisto,
=======
>>>>>>> d4c138067d135ab73beb8f03a87828a5badcf6c5
    getBuscarAvaliacaoByMatricula
}








