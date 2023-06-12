/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos tipos de atividades banco de dados
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertTipoAtividade = async function (dadosTipo) {
    let sql = `insert into tbl_tipo_atividade (
                        nome,
                        sigla
                    ) values (
                        "${dadosTipo.nome}",
                        "${dadosTipo.sigla}"
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateTipoAtividade = async function (dadosTipo) {
    let sql = `update tbl_tipo_atividade set 
                    nome = "${dadosTipo.nome}",
                    sigla = "${dadosTipo.sigla}"
                    
                    where id = ${dadosTipo.id}
                            `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdTipoAtividade = async function (id) {
    let sql = `select * from tbl_tipo_atividade where id = ${id}`

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0) {
        return rsTipo
    } else {
        return false
    }
}

const deleteTipoAtividade = async function (id) {
    let sql = `delete from tbl_tipo_atividade where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllTiposAtividades = async function () {
    let sql = `select * from tbl_tipo_atividade`

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0) {
        return rsTipo
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_tipo_atividade order by id desc limit 1;'

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if(rsTipo.length > 0){
        return rsTipo
    } else {
        return false
    }

}

module.exports = {
    insertTipoAtividade,
    updateTipoAtividade,
    selectByIdTipoAtividade,
    deleteTipoAtividade,
    selectAllTiposAtividades,
    selectLastId
}