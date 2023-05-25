/*****************************************************************************************
 * Objetivo: Arquivo responsável pelas mensagens de respostas das requisições na controller
 * Data: 22/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

/****************************************MENSAGENS DE ERRO****************************************/
const ERROR_REQUIRED_FIELDS = {status: 400, message: 'Campos obrigatórios não foram preenchidos ou não estão preenchidos conforme o necessário.'}
const ERROR_INTERNAL_SERVER = {status: 500, message: 'Devido a um erro interno no servidor, não foi possível processar a requisição.'}
const ERROR_NOT_FOUND = {status: 404, message: 'Nenhum item encontrado na requisição.'}
const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O tipo de mídia Content-type da solicitação não é compativel com o servidor. Tipo aceito: [applcation/json]'}
const ERROR_INVALID_ID = {status: 400, message: 'O ID informado na requisição não é válido ou não foi encaminhado.'}

/***************************************MENSAGENS DE SUCESSO**************************************/
const SUCCESS_CREATED_ITEM = {status: 201, message: 'Item criado com sucesso.'}
const SUCCESS_UPDATED_ITEM = {status: 200, message: 'Item atualizado com sucesso.'}
const SUCCESS_DELETED_ITEM = {status: 200, message: 'Item deletado com sucesso.'}
const SUCCESS_REQUEST = {status: 200, message: 'Requisição bem sucedida.'}



module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER,
    ERROR_NOT_FOUND,
    ERROR_INVALID_ID,
    SUCCESS_UPDATED_ITEM,
    ERROR_INVALID_CONTENT_TYPE,
    SUCCESS_DELETED_ITEM,
    SUCCESS_REQUEST
}