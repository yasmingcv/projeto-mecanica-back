/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos tipos de critérios banco de dados
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertTipoCriterio = async function (dadosTipo) {
    let sql = `insert into tbl_tipo_criterio (
                        criterio
                    ) values (
                        "${dadosTipo.criterio}"
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateTipoCriterio = async function (dadosTipo) {
    let sql = `update tbl_tipo_criterio set 
                    criterio = "${dadosTipo.criterio}"
                    
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

const selectByIdTipoCriterio = async function (id) {
    let sql = `select * from tbl_tipo_criterio where id = ${id}`

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0) {
        return rsTipo
    } else {
        return false
    }
}

const deleteTipoCriterio = async function (id) {
    let sql = `delete from tbl_tipo_criterio where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllTiposCriterios = async function () {
    let sql = `select * from tbl_tipo_criterio`

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0) {
        return rsTipo
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_tipo_criterio order by id desc limit 1;'

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if(rsTipo.length > 0){
        return rsTipo
    } else {
        return false
    }

}

module.exports = {
    insertTipoCriterio,
    updateTipoCriterio,
    selectByIdTipoCriterio,
    deleteTipoCriterio,
    selectAllTiposCriterios,
    selectLastId
}