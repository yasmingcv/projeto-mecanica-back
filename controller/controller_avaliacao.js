/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Cursos
 * Autor: Daniela 
 * Data: 14/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados do Curso
var avaliacaoDAO = require('../model/DAO/avaliacaoDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

//Inserir um novo Curso
const inserirAvaliacao = async (dadosAvaliacao) => {
    console.log(dadosAvaliacao);

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAvaliacao.nome == '' || dadosAvaliacao.nome == undefined || dadosAvaliacao.nome.length > 100 ||
        dadosAvaliacao.carga_horaria == '' || dadosAvaliacao.carga_horaria == undefined || dadosAvaliacao.carga_horaria.length > 20 ||
        dadosAvaliacao.descricao == '' || dadosAvaliacao.descricao == undefined ||
        dadosAvaliacao.sigla == '' || dadosAvaliacao.sigla == undefined || dadosAvaliacao.sigla.length > 4
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

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

    }

}

//Atualizar um Avaliacao existente
const atualizarAvaliacao = async (dadosAvaliacao, idAvaliacao) => {

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAvaliacao.nome == '' || dadosAvaliacao.nome == undefined || dadosAvaliacao.nome.length > 100 ||
        dadosAvaliacao.carga_horaria == '' || dadosAvaliacao.carga_horaria == undefined || dadosAvaliacao.carga_horaria.length > 20 ||
        dadosAvaliacao.descricao == '' || dadosAvaliacao.descricao == undefined ||
        dadosAvaliacao.sigla == '' || dadosAvaliacao.sigla == undefined || dadosAvaliacao.sigla.length > 4
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        //Adiciona o id do avaliacao no json
        dadosAvaliacao.id = idAvaliacao;
        let statusID = await avaliacaoDAO.selectByIdAvaliacao(idAvaliacao);


        if (statusID) {
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

//Deletar um Avaliacao existente
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

//Retorna a lista de todos os cursos
const getAllAvaliacoes = async () => {

    let dadosAvaliacaosJSON = {}


    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosAvaliacaos = await avaliacaoDAO.selectAllAvaliacao();


    if (dadosAvaliacaos) {
        //Criando um JSON com o atributo avaliacao, para encaminhar um array de avaliacao
        dadosAvaliacaosJSON.status = message.SUCCESS_REQUEST.status;
        dadosAvaliacaosJSON.quantidade = dadosAvaliacaos.length;
        dadosAvaliacaosJSON.avaliacao = dadosAvaliacaos;
        return dadosAvaliacaosJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna um Avaliacao pelo nome
const getBuscarAvaliacaoByMatricula = async (numero) => {

    let numeroAvaliacao = numero

    let dadosByNomeAvaliacaoJSON = {}

    if (isNaN(numeroAvaliacao) || numeroAvaliacao !== undefined || numeroAvaliacao !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeAvaliacao = await avaliacaoDAO.selectByMatriculaAlunoAvaliacao(nomeAvaliacao);

        if (dadosByNomeAvaliacao) {
            //Criando um JSON com o atrbuto avaliacao, para encaminhar um array de avaliacao
            dadosByNomeAvaliacaoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeAvaliacaoJSON.quantidade = dadosByNomeAvaliacao.length;
            dadosByNomeAvaliacaoJSON.Avaliacaos = dadosByNomeAvaliacao;

            console.log(dadosByNomeAvaliacaoJSON);
            return dadosByNomeAvaliacaoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

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
    getBuscarAvaliacaoByMatricula
}








