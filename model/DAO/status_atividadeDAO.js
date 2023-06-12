/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos status referente às atividades no banco de dados
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertStatusAtividade = async function (dadosStatus) {
    let sql = `insert into tbl_status_Atividade (
                        nome
                    ) values (
                        "${dadosStatus.nome}"
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateStatusAtividade = async function (dadosStatus) {
    let sql = `update tbl_status_atividade set 
                    nome = "${dadosStatus.nome}"
                    
                    where id = ${dadosStatus.id}
                            `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdStatusAtividade = async function (id) {
    let sql = `select * from tbl_status_atividade where id = ${id}`

    let rsStatusAtividade = await prisma.$queryRawUnsafe(sql)

    if (rsStatusAtividade.length > 0) {
        return rsStatusAtividade
    } else {
        return false
    }
}

const deleteStatusAtividade = async function (id) {
    let sql = `delete from tbl_status_atividade where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllStatusAtividades = async function () {
    let sql = `select * from tbl_status_atividade`

    let rsStatusAtividade = await prisma.$queryRawUnsafe(sql)

    if (rsStatusAtividade.length > 0) {
        return rsStatusAtividade
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_status_atividade order by id desc limit 1;'

    let rsStatusAtividade = await prisma.$queryRawUnsafe(sql)

    if(rsStatusAtividade.length > 0){
        return rsStatusAtividade
    } else {
        return false
    }

}

module.exports = {
    insertStatusAtividade,
    updateStatusAtividade,
    selectByIdStatusAtividade,
    selectAllStatusAtividades,
    deleteStatusAtividade,
    selectLastId
}