/*****************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados da turma no banco de dados
 * Data: 29/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertTurma = async function (dadosTurma) {

    let sql = `insert into tbl_turma (
                nome,
                ano,
                id_curso
            ) values (
                '${dadosTurma.nome}',
                '${dadosTurma.ano}',
                ${dadosTurma.id_curso}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateTurma = async function (dadosTurma) {

    let sql = `update tbl_turma set
                nome = '${dadosTurma.nome}',
                ano = '${dadosTurma.ano}'

                where id = ${dadosTurma.id}
                `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
        
    } else {
        return false
    }
}

const deleteTurma = async function (id) {
    let sql = `delete from tbl_turma where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllTurmas = async function () {
    let sql = `select tbl_turma.id as id_turma, tbl_turma.nome as turma, tbl_turma.ano, tbl_turma.id_curso,
                tbl_curso.nome as curso, tbl_curso.carga_horaria, tbl_curso.sigla as sigla_curso
    
                from tbl_turma
                    inner join tbl_curso
                        on tbl_curso.id = tbl_turma.id_curso 
                    order by tbl_turma.ano desc`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        return false
    }
}

const selectByIdTurma = async function (id) {
    let sql = `select tbl_turma.id as id_turma, tbl_turma.nome as turma, tbl_turma.ano, tbl_turma.id_curso,
                    tbl_curso.nome as curso, tbl_curso.carga_horaria, tbl_curso.sigla as sigla_curso

                    from tbl_turma
                        inner join tbl_curso
                            on tbl_curso.id = tbl_turma.id_curso 
                        
                        where tbl_turma.id = ${id}`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        return false
    }
}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_turma order by id desc limit 1;'

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if(rsTurma.length > 0){
        return rsTurma
    } else {
        return false
    }

}

module.exports = {
    insertTurma,
    updateTurma,
    deleteTurma,
    selectAllTurmas,
    selectByIdTurma,
    selectLastId
}