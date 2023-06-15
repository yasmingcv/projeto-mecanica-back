/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Cursos
 * Autor: Daniela 
 * Data: 08/06/2023
 * Versão: 1.0
 *****************************************************************************/
//Import do arquivo para acessar dados do Curso
var cursoDAO = require('../model/DAO/cursoDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

//Inserir um novo Curso
const inserirCurso = async (dadosCurso) => {
    console.log(dadosCurso);

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 100 ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined || dadosCurso.carga_horaria.length > 20 ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 4
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let resultadoDadosCurso = cursoDAO.insertCurso(dadosCurso)

        console.log(resultadoDadosCurso);

        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosCurso) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novoCurso = await cursoDAO.selectLastId();
            let dadosCursoJSON = {};

            dadosCursoJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosCursoJSON.curso = novoCurso;


            return dadosCursoJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }

    }

}

//Atualizar um Curso existente
const atualizarCurso = async (dadosCurso, idCurso) => {

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 100 ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined || dadosCurso.carga_horaria.length > 20 ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 4
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        //Adiciona o id do curso no json
        dadosCurso.id = idCurso;
        let statusID = await cursoDAO.selectByIdCurso(idCurso);


        if (statusID) {
            //Encaminha os dados para a model do curso
            let resultDadosCurso = await cursoDAO.updateCurso(dadosCurso);

            if (resultDadosCurso) {
                let dadosCursoJSON = {};

                dadosCursoJSON.status = message.SUCCESS_UPDATED_ITEM.status;
                dadosCursoJSON.cursos = dadosCurso;

                return dadosCursoJSON; //status code 201
            } else {
                return message.ERROR_INTERNAL_SERVER; //500

            }

        } else {
            return message.ERROR_NOT_FOUND; //404
        }

    }
}

//Deletar um Curso existente
const deletarCurso = async (idCurso) => {

    //validação de ID incorreto ou não informado
    if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID; //status code 400 
    } else {
        
        let statusID = await cursoDAO.selectByIdCurso(idCurso);


        if (statusID) {
            //Encaminha os dados para a model do curso
            let resultDadosCurso = await cursoDAO.deleteCurso(idCurso)

            if (resultDadosCurso) {
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
const getAllCursos = async () => {

    let dadosCursosJSON = {}


    //chama a função do arquivo DAO que irá retornar todos os registros do DB
    let dadosCursos = await cursoDAO.selectAllCursos();


    if (dadosCursos) {
        //Criando um JSON com o atributo cursos, para encaminhar um array de cursos
        dadosCursosJSON.status = message.SUCCESS_REQUEST.status;
        dadosCursosJSON.quantidade = dadosCursos.length;
        dadosCursosJSON.cursos = dadosCursos;
        return dadosCursosJSON;
    } else {
        return message.ERROR_NOT_FOUND;
    }

};

//Retorna um curso pelo nome
const getBuscarCursosNome = async (nome) => {

    let nomeCurso = nome

    let dadosByNomeCursoJSON = {}

    if (isNaN(nomeCurso) || nomeCurso !== undefined || nomeCurso !== '') {

        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByNomeCurso = await cursoDAO.selectByNameCurso(nomeCurso);

        if (dadosByNomeCurso) {
            //Criando um JSON com o atrbuto cursos, para encaminhar um array de cursos
            dadosByNomeCursoJSON.status = message.SUCCESS_REQUEST.status;
            dadosByNomeCursoJSON.quantidade = dadosByNomeCurso.length;
            dadosByNomeCursoJSON.Cursos = dadosByNomeCurso;

            console.log(dadosByNomeCursoJSON);
            return dadosByNomeCursoJSON;
        } else {
            return false;
        }
    } else {

        return false;
    }

};

//Retorna um curso pelo ID
const getBuscarCursoByID = async (id) => {

    let idCurso = id;

    let dadosByIdCursoJSON = {}


    if (isNaN(idCurso) || idCurso == undefined || idCurso == '') {
        return message.ERROR_INVALID_ID;

    } else {
        //chama a função do arquivo DAO que irá retornar todos os registros do DB
        let dadosByIdCurso = await cursoDAO.selectByIdCurso(idCurso);


        if (dadosByIdCurso) {
            //Criando um JSON com o atrbuto curso, para encaminhar um array de cursos
            dadosByIdCursoJSON.status = message.SUCCESS_REQUEST.status
            dadosByIdCursoJSON.curso = dadosByIdCurso;

            return dadosByIdCursoJSON;

        } else {
            return message.ERROR_NOT_FOUND;
        }
    }

};

module.exports = {
    inserirCurso,
    atualizarCurso,
    deletarCurso,
    getAllCursos,
    getBuscarCursosNome,
    getBuscarCursoByID
}








