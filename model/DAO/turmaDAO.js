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
                ano
            ) values (
                '${dadosTurma.nome}',
                '${dadosTurma.ano}'
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
    let sql = 'select * from tbl_turma'

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        return false
    }
}

const selectByIdTurma = async function (id) {
    let sql = 'select * from tbl_turma where id = ' + id

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