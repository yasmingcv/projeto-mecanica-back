/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de alunos
 * Data: 22/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de configurações das variáveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no BD
var alunoDAO = require('../model/DAO/alunoDAO.js')

//Insere um novo aluno
const inserirAluno = async function (dadosAluno) {

    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 200 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 16 ||
        dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula.length > 45 ||
        dadosAluno.id_status_aluno == '' || isNaN(dadosAluno.id_status_aluno) || dadosAluno.id_status_aluno == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosAluno = await alunoDAO.insertAluno(dadosAluno)
        
        //Tratamento para ver se o banco inseriu corretamente os dados
        if (resultDadosAluno) {
            let dadosAlunoJSON = {}
            let novoAluno = await alunoDAO.selectLastId()

            dadosAlunoJSON.status = message.SUCCESS_CREATED_ITEM.status //201
            dadosAlunoJSON.message = message.SUCCESS_CREATED_ITEM.message
            dadosAlunoJSON.aluno = novoAluno

            return dadosAlunoJSON


        } else {
            return message.ERROR_INTERNAL_SERVER //500
        }
    }
}

const atualizarAluno = async function (dadosAluno, idAluno) {
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 200 ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 16 ||
        dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula.length > 45 ||
        dadosAluno.id_status_aluno == '' || isNaN(dadosAluno.id_status_aluno) || dadosAluno.id_status_aluno == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosAluno.id = idAluno
        let dadosAlunoJSON = {}

        let statusId = await alunoDAO.selectByIdAluno(idAluno)

        if (statusId) {

            let resultDadosAluno = await alunoDAO.updateAluno(dadosAluno)

            let alunoId = await alunoDAO.selectByIdAluno(idAluno)

            if (resultDadosAluno) {
                dadosAlunoJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosAlunoJSON.aluno = alunoId[0]

                return dadosAlunoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }

           
        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
}

//Retorna o aluno filtrando pelo ID
const getBuscarAlunoID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAlunoJSON = {}
        let dadosAluno = await alunoDAO.selectByIdAluno(id)

        if (dadosAluno) {
            //Criando um JSON com o atributo alunos, para encaminhar um array de alunos
            dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoJSON.message = message.SUCCESS_REQUEST.message

            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON
            
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna a lista de todos os alunos
const getAlunos = async function () {
    let dadosAlunosJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosAluno = await alunoDAO.selectAllAlunos()

    if (dadosAluno) {
        dadosAlunosJSON.status = message.SUCCESS_REQUEST.status
        dadosAlunosJSON.message = message.SUCCESS_REQUEST.message
        dadosAlunosJSON.quantidade = dadosAluno.length
        dadosAlunosJSON.alunos = dadosAluno
        return dadosAlunosJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const deletarAluno = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID

    } else {
        let buscarById = await getBuscarAlunoID(id)

        //Verifica se o aluno existe, se não existir, envia o retorno da função (getBuscarAlunoID)
        if (buscarById.status == 404) {
            return buscarById

            //Se o aluno existir, prossegue e deleta o aluno
        } else {
            let resultDadosAluno = await alunoDAO.deleteAluno(id)

            if (resultDadosAluno) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

module.exports = {
    inserirAluno,
    atualizarAluno,
    getBuscarAlunoID,
    getAlunos,
    deletarAluno
}