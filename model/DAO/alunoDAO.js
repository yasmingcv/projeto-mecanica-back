/*****************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos alunos no banco de dados
 * Data: 22/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertAluno = async function (dadosAluno) {
    let sql = `insert into tbl_aluno (
                nome,
                email,
                senha,
                id_status,
                numero_matricula
            ) values (
                '${dadosAluno.nome}',
                '${dadosAluno.email}',
                '${dadosAluno.senha}',
                 ${dadosAluno.id_status},
                '${dadosAluno.numero_matricula}'
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateAluno = async function (dadosAluno) {
    let sql = `update tbl_aluno set
                nome = '${dadosAluno.nome}',
                email = '${dadosAluno.email}',
                senha = '${dadosAluno.senha}',
                id_status = ${dadosAluno.id_status}

                where id = ${dadosAluno.id}
                `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteAluno = async function (id) {

}

const selectAllAlunos = async function () {

}

const selectByIdAluno = async function (id) {
    let sql = 'select * from tbl_aluno where id = ' + id

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

const selectByNameAluno = async function (nome) {

}

module.exports = {
    insertAluno,
    updateAluno
}