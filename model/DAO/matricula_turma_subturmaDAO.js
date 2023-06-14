/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos registros de matriculas, turmas e subturmas no banco de dados
 * Data: 14/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertMatriculaTurmaSubturma = async function (dadosMatriculaTurmaSubturma) {
    let sql = `insert into tbl_matricula_turma_subturma (
                id_matricula_aluno,
                id_subturma,
                id_turma
            ) values (
                ${dadosMatriculaTurmaSubturma.id_matricula_aluno},
                ${dadosMatriculaTurmaSubturma.id_subturma},
                ${dadosMatriculaTurmaSubturma.id_turma}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateMatriculaTurmaSubturma = async function (dadosMatriculaTurmaSubturma) {
    let sql = `update tbl_matricula_turma_subturma set 
        id_matricula_aluno = ${dadosMatriculaTurmaSubturma.id_matricula_aluno},
        id_subturma = ${dadosMatriculaTurmaSubturma.id_subturma},
        id_turma = ${dadosMatriculaTurmaSubturma.id_turma}
   
        where id = ${dadosMatriculaTurmaSubturma.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteMatriculaTurmaSubturma = async function (id) {
    let sql = `delete from tbl_matricula_turma_subturma where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllMatriculasTurmasSubturmas = async function () { 
    let sql = `select tbl_matricula_turma_subturma.id,
                    tbl_matricula_turma_subturma.id_matricula_aluno, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno,
                    tbl_matricula_turma_subturma.id_turma, tbl_turma.nome as nome_turma,
                    tbl_matricula_turma_subturma.id_subturma, tbl_subturma.nome as nome_subturma
                    
                from tbl_matricula_turma_subturma
                inner join tbl_matricula_aluno
                    on tbl_matricula_aluno.id = tbl_matricula_turma_subturma.id_matricula_aluno
                inner join tbl_turma
                    on tbl_turma.id = tbl_matricula_turma_subturma.id_turma
                inner join tbl_subturma
                    on tbl_subturma.id = tbl_matricula_turma_subturma.id_subturma
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

const selectByIdMatriculaTurmaSubturma = async function (id) {
    let sql = `select tbl_matricula_turma_subturma.id,
                    tbl_matricula_turma_subturma.id_matricula_aluno, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno,
                    tbl_matricula_turma_subturma.id_turma, tbl_turma.nome as nome_turma,
                    tbl_matricula_turma_subturma.id_subturma, tbl_subturma.nome as nome_subturma
                    
                from tbl_matricula_turma_subturma
                inner join tbl_matricula_aluno
                    on tbl_matricula_aluno.id = tbl_matricula_turma_subturma.id_matricula_aluno
                inner join tbl_turma
                    on tbl_turma.id = tbl_matricula_turma_subturma.id_turma
                inner join tbl_subturma
                    on tbl_subturma.id = tbl_matricula_turma_subturma.id_subturma
                inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                    
                where tbl_matricula_turma_subturma.id = ${id} `

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_matricula_turma_subturma order by id desc limit 1'

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus.length > 0){
        return resultStatus
    } else {
        return false
    }

}

module.exports = {
    insertMatriculaTurmaSubturma,
    updateMatriculaTurmaSubturma,
    deleteMatriculaTurmaSubturma,
    selectAllMatriculasTurmasSubturmas,
    selectByIdMatriculaTurmaSubturma,
    selectLastId
}