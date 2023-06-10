/*****************************************************************************************
 * Objetivo: Arquivo responsável pela regra de negócios referente ao CRUD de matriculas
 * Data: 09/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import do arquivo de mensagens
var message = require('./modulo/config.js')

//Import dos arquivos DAO 
var matriculaDAO = require('../model/DAO/matriculaDAO.js')
var alunoDAO = require('../model/DAO/alunoDAO.js')

const inserirMatricula = async function (dadosMatricula) {  //******************** */
    if (dadosMatricula.numero_matricula == undefined || dadosMatricula.numero_matricula == '' || dadosMatricula.numero_matricula.length > 50 || dadosMatricula.numero_matricula == null ||
        dadosMatricula.id_aluno == undefined || dadosMatricula.id_aluno == '' || isNaN(dadosMatricula.id_aluno) || dadosMatricula.id_aluno == null ||
        dadosMatricula.id_status_matricula == undefined || dadosMatricula.id_status_matricula == '' || isNaN(dadosMatricula.id_status_matricula) || dadosMatricula.id_status_matricula == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let resultDadosMatricula = await matriculaDAO.selectMatriculaByNumero(dadosMatricula.numero_matricula)

        //Verifica se já existe uma matrícula com aquele número
        if (resultDadosMatricula) {
            return message.ERROR_DATA_CONFLICT //409

        } else {
            //Verifica se o aluno existe
            let resultDadosAluno = await alunoDAO.selectByIdAluno(dadosMatricula.id_aluno)
            if (resultDadosAluno) {
                let resultDadosMatricula = await matriculaDAO.insertMatricula(dadosMatricula)

                //Verifica se o banco inseriu corretamente
                if (resultDadosMatricula) {
                    let dadosMatriculaJSON = {}
                    let novaMatricula = await matriculaDAO.selectLastId()


                    dadosMatriculaJSON.status = message.SUCCESS_CREATED_ITEM.status //201
                    dadosMatriculaJSON.message = message.SUCCESS_CREATED_ITEM.message
                    dadosMatriculaJSON.matricula = novaMatricula[0]

                    return dadosMatriculaJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER //500
                }
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }


    }
}

const atualizarMatricula = async function (dadosMatricula, id) {
    if (dadosMatricula.numero_matricula == undefined || dadosMatricula.numero_matricula == '' || dadosMatricula.numero_matricula.length > 50 || dadosMatricula.numero_matricula == null ||
        dadosMatricula.id_aluno == undefined || dadosMatricula.id_aluno == '' || isNaN(dadosMatricula.id_aluno) || dadosMatricula.id_aluno == null ||
        dadosMatricula.id_status_matricula == undefined || dadosMatricula.id_status_matricula == '' || isNaN(dadosMatricula.id_status_matricula) || dadosMatricula.id_status_matricula == null
    ) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID //400

    } else {
        dadosMatricula.id = id
        let dadosMatriculaJSON = {}

        let statusId = await matriculaDAO.selectByIdMatricula(id)

        if (statusId) {

            let resultDadosMatricula = await matriculaDAO.updateMatricula(dadosMatricula)

            let matriculaId = await await matriculaDAO.selectByIdMatricula(id)

            if (resultDadosMatricula) {
                dadosMatriculaJSON.status = message.SUCCESS_UPDATED_ITEM.status //200
                dadosMatriculaJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosMatriculaJSON.matricula = matriculaId[0]

                return dadosMatriculaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }


        } else {
            return message.ERROR_NOT_FOUND //404
        }

    }
}

const getBuscarMatriculaID = async function (id) {

    //Verifica se o usuário digitou corretamente
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosMatriculaJSON = {}
        let dadosMatricula = await matriculaDAO.selectByIdMatricula(id)

        if (dadosMatricula) {
            //Criando um JSON com o atributo matriculas, para encaminhar um array de matriculas
            dadosMatriculaJSON.status = message.SUCCESS_REQUEST.status
            dadosMatriculaJSON.message = message.SUCCESS_REQUEST.message

            dadosMatriculaJSON.matricula = dadosMatricula

            return dadosMatriculaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getMatriculas = async function () {
    let dadosMatriculasJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosMatricula = await matriculaDAO.selectAllMatriculas()

    if (dadosMatricula) {
        dadosMatriculasJSON.status = message.SUCCESS_REQUEST.status
        dadosMatriculasJSON.message = message.SUCCESS_REQUEST.message
        dadosMatriculasJSON.quantidade = dadosMatricula.length
        dadosMatriculasJSON.matriculas = dadosMatricula
        return dadosMatriculasJSON

    } else {
        return message.ERROR_NOT_FOUND //404
    }

}

const deletarMatricula = async function (id) {
    if (id == ' ' || id == undefined || isNaN(id) || id == null) {
        return message.ERROR_INVALID_ID //400

    } else {
        let buscarById = await getBuscarMatriculaID(id)

        //Verifica se a matricula existe, se não existir, envia o retorno da função (getBuscarMatriculaID)
        if (buscarById.status == 404) {
            return buscarById

            //Se a matricula existir, prossegue e deleta a matricula
        } else {
            let resultDadosMatricula = await matriculaDAO.deleteMatricula(id)

            if (resultDadosMatricula) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }
        }
    }
}

const getBuscarMatriculaPeloNumero = async function (numeroMatricula) {
    //Verifica se o usuário digitou corretamente
    if (numeroMatricula == '' || numeroMatricula == undefined || numeroMatricula == null) {
        return message.ERROR_REQUIRED_FIELDS //400

    } else {
        let dadosMatriculaJSON = {}
        let dadosMatricula = await matriculaDAO.selectMatriculaByNumero(numeroMatricula)

        if (dadosMatricula) {
            //Criando um JSON com o atributo matriculas, para encaminhar um array de matriculas
            dadosMatriculaJSON.status = message.SUCCESS_REQUEST.status
            dadosMatriculaJSON.message = message.SUCCESS_REQUEST.message

            dadosMatriculaJSON.matricula = dadosMatricula

            return dadosMatriculaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirMatricula,
    atualizarMatricula,
    getBuscarMatriculaID,
    deletarMatricula,
    getMatriculas,
    getBuscarMatriculaPeloNumero
}