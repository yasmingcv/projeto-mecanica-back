/*****************************************************************************************
 * Objetivo: Arquivo responsável pelas mensagens de respostas das requisições na controller
 * Data: 22/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

/*********************************************ERRO*******************************************/
const ERROR_REQUIRED_FIELDS = {status: 400, message: 'Campos obrigatórios não foram preenchidos ou não estão preenchidos conforme o necessário.'}
const ERROR_INTERNAL_SERVER = {status: 500, message: 'Devido a um erro interno no servidor, não foi possível processar a requisição.'}
const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de mídia Content-type da solicitação não é compativel com o servidor. Tipo aceito: [applcation/json]'}
const ERROR_INVALID_ID = {status: 400, message: 'O ID informado na requisição não é válido ou não foi encaminhado.'}

/*********************************************SUCESSO*******************************************/
const SUCCESS_CREATED_ITEM = {status: 201, message: 'Item criado com sucesso.'}
const SUCCESS_UPDATED_ITEM = {status: 200, message: 'Item atualizado com sucesso.'}



module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_INVALID_ID,
    SUCCESS_UPDATED_ITEM
}