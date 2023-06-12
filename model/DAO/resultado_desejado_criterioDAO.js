/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos resultados desejados e criterios no banco de dados
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertResultadoDesejadoCriterio = async function (dados) {
    let sql = `insert into tbl_resultado_desejado_criterio (
                id_resultado_desejado,
                id_criterio
            ) values (
                ${dados.id_resultado_desejado},
                ${dados.id_criterio}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateResultadoDesejadoCriterio = async function (dados) {
    let sql = `update tbl_resultado_desejado_criterio set
                    id_resultado_desejado = ${dados.id_resultado_desejado},
                    id_criterio = ${dados.id_criterio}

                where id = ${dados.id}
                `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteResultadoDesejadoCriterio = async function (id) {
    let sql = `delete from tbl_resultado_desejado_criterio where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllResultadosDesejadosCriterios = async function () {
    let sql = `select tbl_resultado_desejado_criterio.id, 
                        tbl_resultado_desejado_criterio.id_resultado_desejado, tbl_resultado_desejado.resultado_desejado,
                        tbl_resultado_desejado_criterio.id_criterio, tbl_criterio.criterio
                        
                    from tbl_resultado_desejado_criterio

                    inner join tbl_resultado_desejado
                        on tbl_resultado_desejado.id = tbl_resultado_desejado_criterio.id_resultado_desejado
                    inner join tbl_criterio
                        on tbl_criterio.id = tbl_resultado_desejado_criterio.id_criterio`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

const selectByIdResultadoDesejadoCriterio = async function (id) {
    let sql = `select tbl_resultado_desejado_criterio.id, 
                        tbl_resultado_desejado_criterio.id_resultado_desejado, tbl_resultado_desejado.resultado_desejado,
                        tbl_resultado_desejado_criterio.id_criterio, tbl_criterio.criterio
                        
                    from tbl_resultado_desejado_criterio

                    inner join tbl_resultado_desejado
                        on tbl_resultado_desejado.id = tbl_resultado_desejado_criterio.id_resultado_desejado
                    inner join tbl_criterio
                        on tbl_criterio.id = tbl_resultado_desejado_criterio.id_criterio
                        
                    where tbl_resultado_desejado_criterio.id = ${id}`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_resultado_desejado_criterio order by id desc limit 1;'

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus.length > 0){
        return resultStatus
    } else {
        return false
    }

}

module.exports = {
    insertResultadoDesejadoCriterio,
    updateResultadoDesejadoCriterio,
    deleteResultadoDesejadoCriterio,
    selectByIdResultadoDesejadoCriterio,
    selectLastId,
    selectAllResultadosDesejadosCriterios
}