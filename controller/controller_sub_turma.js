/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Sub-Turmas
 * Autor: Daniela 
 * Data: 08/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados da SubTurmas
var subTurmaDAO = require('../model/DAO/sub_turmaDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');


//Inserir uma nova subturma
const inserirSubTurma = async (dadosSubTurma) => {
    
    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosSubTurma.nome == '' || dadosSubTurma.nome == undefined ||  dadosSubTurma.nome.lenght > 45 ||
        dadosSubTurma.numero_integrantes == '' || dadosSubTurma.numero_integrantes == undefined || isNaN(dadosSubTurma.numero_integrantes) ||
        dadosSubTurma.id_turma == '' || dadosSubTurma.id_turma == undefined || isNaN(dadosSubTurma.id_turma)
        ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let resultadoDadosSubTurma = await subTurmaDAO.insertSubTurma(dadosSubTurma)


        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosSubTurma) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novaSubTurma = await subTurmaDAO.selectLastId();
            let dadosSubTurmaJSON = {};

            dadosSubTurmaJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosSubTurmaJSON.sub_turma = novaSubTurma;


            return dadosSubTurmaJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }
    }
}
//Atualizar uma SubTurma existente
const atualizarSubTurma = async (dadosSubTurma, idSubTurma) => {

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosSubTurma.nome == '' || dadosSubTurma.nome == undefined ||  dadosSubTurma.nome.lenght > 45 ||
        dadosSubTurma.numero_integrantes == '' || dadosSubTurma.numero_integrantes == undefined || isNaN(dadosSubTurma.numero_integrantes) ||
        dadosSubTurma.id_turma == '' || dadosSubTurma.id_turma == undefined || isNaN(dadosSubTurma.id_turma)
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else if (idSubTurma == '' || idSubTurma == undefined || isNaN(idSubTurma)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        //Adiciona o id do SubTurma no json
        dadosSubTurma.id = idSubTurma;
        let statusID = await subTurmaDAO.selectByIdSubTurma(idSubTurma);


        if (statusID) {
            //Encaminha os dados para a model do SubTurma
            console.log(subTurmaDAO.updateSubTurma(dadosSubTurma));
            let resultDadosSubTurma = await subTurmaDAO.updateSubTurma(dadosSubTurma);

            if (resultDadosSubTurma) {
                let dadosSubTurmaJSON = {};

                dadosSubTurmaJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                dadosSubTurmaJSON.sub_turma = dadosSubTurma;

                return dadosSubTurmaJSON; //status code 201
            } else {
                return message.ERROR_INTERNAL_SERVER; //500

            }

        } else {
            return message.ERROR_NOT_FOUND; //404
        }

    }
}

//Deletar uma SubTurma existente
const deletarSubTurma = async (id) => {
    const idSubTurma = id;

    //validação de ID incorreto ou não informado
    if (idSubTurma == '' || idSubTurma == undefined || isNaN(idSubTurma)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {

        const idSubTurmaValidacao = await subTurmaDAO.selectByIdSubTurma(id)

        if (idSubTurmaValidacao) {
            
            //Encaminha os dados para a model da SubTurmas
            let resultDadosSubTurma = await subTurmaDAO.deleteSubTurma(idSubTurma)
    
            if (resultDadosSubTurma) {
                return message.SUCCESS_DELETED_ITEM; //200
            } else {
                return message.ERROR_INTERNAL_SERVER; //500
            }
        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

}

//Retorna a lista de todos as SubTurmas
const getAllSubTurmas = async () => {

    let dadosSubTurmasJSON = {}


    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosSubTurmas = await subTurmaDAO.selectAllSubTurmas();

    if (dadosSubTurmas) {
        //Criando um JSON com o atrbuto SubTurmas, para encaminhar um array de SubTurmas
        dadosSubTurmasJSON.status = message.SUCCESS_REQUEST.status;
        dadosSubTurmasJSON.quantidade = dadosSubTurmas.length;
        dadosSubTurmasJSON.sub_turmas = dadosSubTurmas;
        console.log(dadosSubTurmasJSON);
        return dadosSubTurmasJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna uma SubTurmas pelo nome
const getBuscarSubTurmaNome = async (nome) => {

    let nomeSubTurma = nome

    let dadosByNomeSubTurmaJSON = {}

    if (isNaN(nomeSubTurma) && nomeSubTurma !== undefined && nomeSubTurma !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeSubTurma = await subTurmaDAO.selectByNameSubTurma(nomeSubTurma);


        if (dadosByNomeSubTurma) {
            //Criando um JSON com o atrbuto SubTurma, para encaminhar um array de SubTurma
            dadosByNomeSubTurmaJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeSubTurmaJSON.sub_turma = dadosByNomeSubTurma;

            return dadosByNomeSubTurmaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } else {

        return message.ERROR_INVALID_NAME;
    }

};

//Retorna uma SubTurma pelo ID
const getBuscarSubTurmaID = async (id) => {

    let idSubTurma = id;

    let dadosByIdSubTurmaJSON = {}


    if (isNaN(idSubTurma) && idSubTurma == undefined && idSubTurma == '') {

        return message.ERROR_INVALID_ID;

    } else {
        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByIdSubTurma = await subTurmaDAO.selectByIdSubTurma(idSubTurma);


        if (dadosByIdSubTurma) {
            //Criando um JSON com o atrbuto SubTurma, para encaminhar um array de SubTurma
            dadosByIdSubTurmaJSON.status = message.SUCCESS_REQUEST.status
            dadosByIdSubTurmaJSON.SubTurma = dadosByIdSubTurma;

            return dadosByIdSubTurmaJSON;

        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

//Retorna uma SubTurma pelo ID
const getBuscarSubTurmaByNameTurma = async (name) => {

    let nameTurma = name;

    let dadosByTurmaSubTurmaJSON = {}

    if (isNaN(nameTurma) && nameTurma !== undefined && nameTurma !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNameTurma = await subTurmaDAO.selectByNameTurma(nameTurma);


        if (dadosByNameTurma) {
            dadosByTurmaSubTurmaJSON.status = message.SUCCESS_REQUEST.status;
            dadosByTurmaSubTurmaJSON.sub_turmas = dadosByNameTurma;

            console.log(dadosByTurmaSubTurmaJSON);
            return dadosByTurmaSubTurmaJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } else {

        return message.ERROR_INVALID_NAME;
    }

};
module.exports = {
    atualizarSubTurma,
    deletarSubTurma,
    getAllSubTurmas,
    getBuscarSubTurmaNome,
    getBuscarSubTurmaID,
    getBuscarSubTurmaByNameTurma,
    atualizarSubTurma,
    inserirSubTurma
};




