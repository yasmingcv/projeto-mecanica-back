/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos registros de matriculas e atividades no banco de dados
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertMatriculaAtividade = async function (dadosMatriculaAtividade) {
    let sql = `insert into tbl_matricula_atividade (
                id_atividade,
                id_status_atividade,
                id_matricula_aluno
            ) values (
                ${dadosMatriculaAtividade.id_atividade},
                ${dadosMatriculaAtividade.id_status_atividade},
                ${dadosMatriculaAtividade.id_matricula_aluno}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateMatriculaAtividade = async function (dadosMatriculaAtividade) {
    let sql = `update tbl_matricula_atividade set 
        id_atividade = ${dadosMatriculaAtividade.id_atividade},
        id_status_atividade = ${dadosMatriculaAtividade.id_status_atividade},
        id_matricula_aluno = ${dadosMatriculaAtividade.id_matricula_aluno}
   
        where id = ${dadosMatriculaAtividade.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteMatriculaAtividade = async function (id) {
    let sql = `delete from tbl_matricula_atividade where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllMatriculasAtividades = async function () { 
    let sql = `select tbl_matricula_atividade.id,
                    tbl_matricula_atividade.id_atividade, tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto,
                    tbl_matricula_atividade.id_status_atividade, tbl_status_atividade.nome as status,
                    tbl_matricula_atividade.id_matricula_aluno, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno
                    
                from tbl_matricula_atividade
                inner join tbl_atividade
                    on tbl_atividade.id = tbl_matricula_atividade.id_atividade
                inner join tbl_status_atividade
                    on tbl_status_atividade.id = tbl_matricula_atividade.id_status_atividade
                inner join tbl_matricula_aluno
                    on tbl_matricula_aluno.id = tbl_matricula_atividade.id_matricula_aluno
                inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                    `

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

const selectByIdMatriculaAtividade = async function (id) {
    let sql = `select tbl_matricula_atividade.id,
                    tbl_matricula_atividade.id_atividade, tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto,
                    tbl_matricula_atividade.id_status_atividade, tbl_status_atividade.nome as status,
                    tbl_matricula_atividade.id_matricula_aluno, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno
                    
                from tbl_matricula_atividade
                inner join tbl_atividade
                    on tbl_atividade.id = tbl_matricula_atividade.id_atividade
                inner join tbl_status_atividade
                    on tbl_status_atividade.id = tbl_matricula_atividade.id_status_atividade
                inner join tbl_matricula_aluno
                    on tbl_matricula_aluno.id = tbl_matricula_atividade.id_matricula_aluno
                inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula_aluno.id_aluno

                where tbl_matricula_atividade.id = ${id}
                    `

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_matricula_atividade order by id desc limit 1;'

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus.length > 0){
        return resultStatus
    } else {
        return false
    }

}

module.exports = {
    insertMatriculaAtividade,
    updateMatriculaAtividade,
    deleteMatriculaAtividade,
    selectAllMatriculasAtividades,
    selectByIdMatriculaAtividade,
    selectLastId
}