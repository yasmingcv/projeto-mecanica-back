/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das unidades curriculares no banco de dados
 * Data: 01/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertUnidadeCurricular = async function (dadosUnidadeCurricular) {

    let sql = `insert into tbl_unidade_curricular (
                                                    nome, 
                                                    descricao
                                                ) values (
                                                    '${dadosUnidadeCurricular.nome}', 
                                                    '${dadosUnidadeCurricular.descricao}'
                                                )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateUnidadeCurricular = async function (dadosUnidadeCurricular) {
    let sql = `update tbl_unidade_curricular set 
                                                    nome = '${dadosUnidadeCurricular.nome}', 
                                                    descricao = '${dadosUnidadeCurricular.descricao}'
                                                
                                                where id = ${dadosUnidadeCurricular.id}
                                                `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
        
    } else {
        return false
    }
}

const deleteUnidadeCurricular = async function (id) {
    let sql = `delete from tbl_unidade_curricular where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllUnidadesCurriculares = async function () {
    let sql = 'select * from tbl_unidade_curricular'

    let rsUnidadeCurricular = await prisma.$queryRawUnsafe(sql)

    if (rsUnidadeCurricular.length > 0) {
        return rsUnidadeCurricular
    } else {
        return false
    }
}

const selectByIdUnidadeCurricular = async function (id) {
    let sql = 'select * from tbl_unidade_curricular where id = ' + id

    let rsUnidadeCurricular = await prisma.$queryRawUnsafe(sql)

    if (rsUnidadeCurricular.length > 0) {
        return rsUnidadeCurricular
    } else {
        return false
    }
}

const selectLastId = async function (){
    let sql = 'select * from tbl_unidade_curricular order by id desc limit 1;'

    let rsUnidadeCurricular = await prisma.$queryRawUnsafe(sql)

    if(rsUnidadeCurricular.length > 0){
        return rsUnidadeCurricular
    } else {
        return false
    }

}

module.exports = {
    insertUnidadeCurricular,
    updateUnidadeCurricular,
    deleteUnidadeCurricular,
    selectAllUnidadesCurriculares,
    selectByIdUnidadeCurricular,
    selectLastId
}