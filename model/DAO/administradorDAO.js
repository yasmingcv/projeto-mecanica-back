/*****************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados do administrador no banco de dados
 * Data: 26/05/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertAdministrador = async function (dadosAdministrador) {

    let sql = `insert into tbl_administrador (
                email,
                senha
            ) values (
                '${dadosAdministrador.email}',
                '${dadosAdministrador.senha}'
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateAdministrador = async function (dadosAdministrador) {
    let sql = `update tbl_administrador set
                email = '${dadosAdministrador.email}',
                senha = '${dadosAdministrador.senha}'

                where id = ${dadosAdministrador.id}
                `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteAdministrador = async function (id) {
    let sql = `delete from tbl_administrador where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllAdministradores = async function () {
    let sql = 'select * from tbl_administrador'

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

const selectByIdAdministrador = async function (id) {
    let sql = 'select * from tbl_administrador where id = ' + id

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_administrador order by id desc limit 1;'

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    } else {
        return false
    }

}

module.exports = {
    insertAdministrador,
    updateAdministrador,
    deleteAdministrador,
    selectAllAdministradores,
    selectByIdAdministrador,
    selectLastId
}