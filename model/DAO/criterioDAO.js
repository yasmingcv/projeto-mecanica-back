/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos critérios no banco de dados
 * Data: 09/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertCriterio = async function (dadosCriterio) {
    let sql = `insert into tbl_criterio (
                        criterio, 
                        id_tipo_criterio, 
                        id_atividade
                    ) values (
                        "${dadosCriterio.criterio}",
                        ${dadosCriterio.id_tipo_criterio},
                        ${dadosCriterio.id_atividade}
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateCriterio = async function (dadosCriterio) {
    let sql = `update tbl_criterio set 
                    criterio = "${dadosCriterio.criterio}",
                    id_tipo_criterio = ${dadosCriterio.id_tipo_criterio},
                    id_atividade = ${dadosCriterio.id_atividade} 
                    
                    where id = ${dadosCriterio.id}
                            `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdCriterio = async function (id) {
    let sql = `select tbl_criterio.id, tbl_criterio.criterio, tbl_criterio.id_tipo_criterio, tbl_criterio.id_atividade,
                            tbl_tipo_criterio.criterio as tipo_criterio,
                            tbl_atividade.nome as nome_atividade
                            
                        from tbl_criterio 
                        inner join tbl_tipo_criterio
                        on tbl_tipo_criterio.id = tbl_criterio.id_tipo_criterio
                        inner join tbl_atividade
                        on tbl_atividade.id = tbl_criterio.id_atividade
                        
                        where tbl_criterio.id = ${id}`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}

const deleteCriterio = async function (id) {
    let sql = `delete from tbl_criterio where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllCriterios = async function () {
    let sql = `select tbl_criterio.id, tbl_criterio.criterio, tbl_criterio.id_tipo_criterio, tbl_criterio.id_atividade,
                            tbl_tipo_criterio.criterio as tipo_criterio,
                            tbl_atividade.nome as nome_atividade
                            
                        from tbl_criterio 
                        inner join tbl_tipo_criterio
                        on tbl_tipo_criterio.id = tbl_criterio.id_tipo_criterio
                        inner join tbl_atividade
                        on tbl_atividade.id = tbl_criterio.id_atividade`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0) {
        return rsCriterio
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_criterio order by id desc limit 1;'

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if(rsCriterio.length > 0){
        return rsCriterio
    } else {
        return false
    }

}

module.exports = {
    insertCriterio,
    selectLastId,
    updateCriterio,
    selectByIdCriterio,
    deleteCriterio,
    selectAllCriterios
}