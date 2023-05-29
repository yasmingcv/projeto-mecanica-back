/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Professores
 * Autor: Daniela 
 * Data: 25/05/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados do professor
var professorDAO = require('../model/DAO/professorDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');


//Inserir um novo Professor
const inserirProfessor = async (dadosProfessor) => {
    console.log(dadosProfessor);

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 200 || !isNaN(dadosProfessor.nome) ||
        dadosProfessor.email == '' || dadosProfessor.email == undefined || dadosProfessor.email.length > 255 ||
        dadosProfessor.senha == '' || dadosProfessor.senha == undefined || dadosProfessor.senha.length > 513
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let resultadoDadosProfessor = professorDAO.insertProfessor(dadosProfessor)

        console.log(resultadoDadosProfessor);

        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosProfessor) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novoProfessor = await professorDAO.selectLastId();
            let dadosProfessorJSON = {};

            dadosProfessorJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosProfessorJSON.professor = novoProfessor;


            return dadosProfessorJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }

    }

}

//Atualizar um Professor existente
const atualizarProfessor = async (dadosProfessor, idProfessor) => {

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 200 || !isNaN(dadosProfessor.nome) ||
        dadosProfessor.email == '' || dadosProfessor.email == undefined || dadosProfessor.email.length > 255 ||
        dadosProfessor.senha == '' || dadosProfessor.senha == undefined || dadosProfessor.senha.length > 513
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        //Adiciona o id do professor no json
        dadosProfessor.id = idProfessor;
        let statusID = await professorDAO.selectByIdProfessor(idProfessor);


        if (statusID) {
            //Encaminha os dados para a model do professor
            let resultDadosProfessor = await professorDAO.updateProfessor(dadosProfessor);

            if (resultDadosProfessor) {
                let dadosProfessorJSON = {};

                dadosProfessorJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                dadosProfessorJSON.professor = dadosProfessor;

                return dadosProfessorJSON; //status code 201
            } else {
                return message.ERROR_INTERNAL_SERVER; //500

            }

        } else {
            return message.ERROR_NOT_FOUND; //404
        }

    }
}

//Deletar um Professor existente
const deletarProfessor = async (idProfessor) => {

    //validação de ID incorreto ou não informado
    if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {

        //Encaminha os dados para a model do professor
        let resultDadosProfessor = await professorDAO.deleteProfessor(idProfessor)

        if (resultDadosProfessor) {
            return message.SUCCESS_DELETED_ITEM; //200
        } else {
            return message.ERROR_INTERNAL_SERVER; //500
        }
    }


}

//Retorna a lista de todos os professor
const getProfessores = async () => {

    let dadosProfessorJSON = {}

    //Import do arquivo DAO para acessar dados do professor do BD
    let professorDAO = require('../model/DAO/professorDAO.js');

    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosProfessor = await professorDAO.selectAllProfessores();


    if (dadosProfessor) {
        //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
        dadosProfessorJSON.status = message.SUCCESS_REQUEST.status;
        dadosProfessorJSON.quantidade = dadosProfessor.length;
        dadosProfessorJSON.professores = dadosProfessor;
        return dadosProfessorJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna um professor pelo nome
const getBuscarProfessorNome = async (nome) => {

    let nomeProfessor = nome


    let dadosByNomeProfessorJSON = {}

    //Import do arquivo DAO para acessar dados do professor do BD
    let professorDAO = require('../model/DAO/professorDAO.js');

    if (isNaN(nomeProfessor) && nomeProfessor !== undefined && nomeProfessor !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeProfessor = await professorDAO.selectByNameProfessor(nomeProfessor);


        if (dadosByNomeProfessor) {
            //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
            dadosByNomeProfessorJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeProfessorJSON.professores = dadosByNomeProfessor;

            console.log(dadosByNomeProfessorJSON);
            return dadosByNomeProfessorJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um professor pelo ID
const getBuscarProfessorID = async (id) => {

    let idProfessor = id;

    let dadosByIdProfessorJSON = {}


    if (isNaN(idProfessor) && idProfessor == undefined && idProfessor == '') {

        return message.ERROR_INVALID_ID;

    } else {
        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByIdProfessor = await professorDAO.selectByIdProfessor(idProfessor);


        if (dadosByIdProfessor) {
            //Criando um JSON com o atrbuto professores, para encaminhar um array de professores
            dadosByIdProfessorJSON.status = message.SUCCESS_REQUEST.status
            dadosByIdProfessorJSON.professor = dadosByIdProfessor;

            return dadosByIdProfessorJSON;

        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

module.exports = {
    inserirProfessor,
    atualizarProfessor,
    deletarProfessor,
    getProfessores,
    getBuscarProfessorID,
    getBuscarProfessorNome
}

