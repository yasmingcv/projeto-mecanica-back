/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Professores
 * Autor: Daniela 
 * Data: 25/05/2023
 * Versão: 1.0
 *****************************************************************************/

//Import do arquivo para acessar dados do atividade
var atividadeDAO = require('../model/DAO/atividadeDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

//Inserir uma nova atividade
const inserirAtividade = async (dadosAtividade) => {
    
    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAtividade.foto == '' || dadosAtividade.foto == undefined || dadosAtividade.foto.length > 200 ||
        dadosAtividade.id_tipo == '' || dadosAtividade.id_tipo == undefined || isNaN(dadosAtividade.id_tipo) ||
        dadosAtividade.id_unidade_curricular == '' || dadosAtividade.id_unidade_curricular == undefined || isNaN(dadosAtividade.id_unidade_curricular)
        ) {
        console.log(1);
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let resultadoDadosAtividade = await atividadeDAO.insertAtividade(dadosAtividade)


        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosAtividade) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novaAtividade = await atividadeDAO.selectLastId();
            let dadosAtividadeJSON = {};

            dadosAtividadeJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosAtividadeJSON.atividade = novaAtividade;


            return dadosAtividadeJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}
//Atualizar uma atividade existente
const atualizarAtividade = async (dadosAtividade, idAtividade) => {

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosAtividade.tempo_previsto == '' || dadosAtividade.tempo_previsto == undefined ||  
        dadosAtividade.foto == '' || dadosAtividade.foto == undefined || dadosAtividade.foto.length > 200 ||
        dadosAtividade.id_tipo == '' || dadosAtividade.id_tipo == undefined || isNaN(dadosAtividade.id_tipo) ||
        dadosAtividade.id_unidade_curricular == '' || dadosAtividade.id_unidade_curricular == undefined || isNaN(dadosAtividade.id_unidade_curricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else if (idAtividade == '' || idAtividade == undefined || isNaN(idAtividade)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        //Adiciona o id do atividade no json
        dadosAtividade.id = idAtividade;
        let statusID = await atividadeDAO.selectByIdAtividade(idAtividade);


        if (statusID) {
            //Encaminha os dados para a model do atividade
            console.log(atividadeDAO.updateAtividade(dadosAtividade));
            let resultDadosAtividade = await atividadeDAO.updateAtividade(dadosAtividade);

            if (resultDadosAtividade) {
                let dadosAtividadeJSON = {};

                dadosAtividadeJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                dadosAtividadeJSON.atividade = dadosAtividade;

                return dadosAtividadeJSON; //status code 201
            } else {
                return message.ERROR_INTERNAL_SERVER; //500

            }

        } else {
            return message.ERROR_NOT_FOUND; //404
        }

    }
}

//Deletar uma Atividade existente
const deletarAtividade = async (id) => {
    const idAtividade = id;

    //validação de ID incorreto ou não informado
    if (idAtividade == '' || idAtividade == undefined || isNaN(idAtividade)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {

        const idAtividade = await atividadeDAO.selectByIdAtividade(id)

        if (idAtividade) {
            
            //Encaminha os dados para a model da atividade
            let resultDadosAtividade = await atividadeDAO.deleteAtividade(idAtividade)
    
            if (resultDadosAtividade) {
                return message.SUCCESS_DELETED_ITEM; //200
            } else {
                return message.ERROR_INTERNAL_SERVER; //500
            }
        } else {
            return message.ERROR_NOT_FOUND;
        }

    }


}

//Retorna a lista de todos as atividades
const getAllAtividades = async () => {

    let dadosAtividadeJSON = {}


    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosAtividades = await atividadeDAO.selectAllAtividades();

    if (dadosAtividades) {
        //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
        dadosAtividadeJSON.status = message.SUCCESS_REQUEST.status;
        dadosAtividadeJSON.quantidade = dadosAtividades.length;
        dadosAtividadeJSON.atividades = dadosAtividades;
        console.log(dadosAtividadeJSON);
        return dadosAtividadeJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna uma atividade pelo nome
const getBuscarAtividadeNome = async (nome) => {

    let nomeAtividade = nome


    let dadosByNomeAtividadeJSON = {}


    if (isNaN(nomeAtividade) && nomeAtividade !== undefined && nomeAtividade !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeAtividade = await atividadeDAO.selectByNameAtividade(nomeAtividade);


        if (dadosByNomeAtividade) {
            //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
            dadosByNomeAtividadeJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeAtividadeJSON.atividade = dadosByNomeAtividade;

            console.log(dadosByNomeAtividadeJSON);
            return dadosByNomeAtividadeJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } else {

        return message.ERROR_INVALID_NAME;
    }

};

//Retorna uma atividade pelo ID
const getBuscarAtividadeID = async (id) => {

    let idAtividade = id;

    let dadosByIdAtividadeJSON = {}


    if (isNaN(idAtividade) && idAtividade == undefined && idAtividade == '') {

        return message.ERROR_INVALID_ID;

    } else {
        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByIdAtividade = await atividadeDAO.selectByIdAtividade(idAtividade);


        if (dadosByIdAtividade) {
            //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
            dadosByIdAtividadeJSON.status = message.SUCCESS_REQUEST.status
            dadosByIdAtividadeJSON.atividade = dadosByIdAtividade;

            return dadosByIdAtividadeJSON;

        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

//Retorna uma atividade pelo ID
const getBuscarAtividadeByNameUnidadeCurricular = async (name) => {

    let nameUnidadeCurricular = name;

    let dadosByNomeUnidadeCurricularAtividadeJSON = {}

    if (isNaN(nameUnidadeCurricular) && nameUnidadeCurricular !== undefined && nameUnidadeCurricular !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNameUnidadeCurricular = await atividadeDAO.selectByNameUnidadeCurricular(nameUnidadeCurricular);
        console.log('1-' + dadosByNameUnidadeCurricular);


        if (dadosByNameUnidadeCurricular) {
            //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
            dadosByNomeUnidadeCurricularAtividadeJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeUnidadeCurricularAtividadeJSON.atividade = dadosByNameUnidadeCurricular;

            console.log(dadosByNomeUnidadeCurricularAtividadeJSON);
            return dadosByNomeUnidadeCurricularAtividadeJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } else {

        return message.ERROR_INVALID_NAME;
    }

};



module.exports = {
    inserirAtividade,
    atualizarAtividade,
    deletarAtividade,
    getAllAtividades,
    getBuscarAtividadeNome,
    getBuscarAtividadeID,
    getBuscarAtividadeByNameUnidadeCurricular


}

