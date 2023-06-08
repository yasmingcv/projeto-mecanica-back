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
                data_nascimento,
                cpf
            ) values (
                '${dadosAluno.nome}',
                '${dadosAluno.email}',
                '${dadosAluno.senha}',
                ${dadosAluno.data_nascimento},
                ${dadosAluno.cpf}
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
                data_nascimento = ${dadosAluno.data_nascimento},
                cpf = ${dadosAluno.cpf}

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
    let sql = `delete from tbl_aluno where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllAlunos = async function () { // ******
    let sql = `select * from tbl_aluno`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

const selectByIdAluno = async function (id) { // *******
    let sql = `select * from tbl_aluno where id = ${id}`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

const selectByNameAluno = async function (nome) {

}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_aluno order by id desc limit 1;'

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    } else {
        return false
    }

}

module.exports = {
    insertAluno,
    updateAluno,
    selectByIdAluno,
    selectAllAlunos,
    selectLastId,
    deleteAluno
}