/*****************************************************************************
 * Objetivo: Responsável pela regra de negócio de referente ao CRUD de Professores
 * Autor: Daniela 
 * Data: 25/05/2023
 * Versão: 1.0
 *****************************************************************************/

//Import do arquivo para acessar dados do professor
var atividadeDAO = require('../model/DAO/atividadeDAO.js')

//Import do arquivo de configuração das variáveis, constantes e funções globais
var message = require('./modulo/config.js');

//Inserir uma nova tarefa
const inserirTarefa = async (dadosTarefa) => {
    console.log(dadosTarefa);

    //Validação para campos obrigatórios e numero de caracteres
    if (
        dadosTarefa.tempoPrevisto == '' || dadosTarefa.tempoPrevisto == undefined || dadosTarefa.tempoPrevisto.length > 8 || 
        dadosTarefa.foto == '' || dadosTarefa.foto == undefined || dadosTarefa.foto.length > 200 ||
        dadosTarefa.nome == '' || dadosTarefa.nome == undefined || dadosTarefa.nome.length > 200  || !isNaN(dadosTarefa.nome) ||
        dadosTarefa.idTipo == '' || dadosTarefa.idTipo == undefined || isNaN(dadosTarefa.idTipo) ||
        dadosTarefa.idUnidadeCurricular == '' || dadosTarefa.idUnidadeCurricular == undefined || isNaN(dadosTarefa.idUnidadeCurricular)
    ) {
        return message.ERROR_REQUIRED_FIELDS;
    } else {

        let resultadoDadosAtividade = atividadeDAO.insertAtividade(dadosTarefa)

        console.log(resultadoDadosAtividade);

        //Valida pra se o DB inseriu os dados corretamente
        if (resultadoDadosAtividade) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novaAtividade = await atividadeDAO.selectLastId();
            let dadosAtividadeJSON = {};

            dadosAtividadeJSON.status = message.SUCCESS_CREATED_ITEM.status;
            dadosAtividadeJSON.professor = novoProfessor;


            return dadosAtividadeJSON; //status code 201
        } else {
            return message.ERROR_INTERNAL_SERVER;
        }

    }

}


