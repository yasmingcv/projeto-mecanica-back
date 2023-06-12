/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos resultados desejados
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertResultadoDesejado = async function (dadosResultado) {
    let sql = `insert into tbl_resultado_desejado (
                        resultado_desejado
                    ) values (
                        "${dadosResultado.resultado_desejado}"
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateResultadoDesejado = async function (dadosResultado) {
    let sql = `update tbl_resultado_desejado set 
                    resultado_desejado = "${dadosResultado.resultado_desejado}"
                    
                    where id = ${dadosResultado.id}
                            `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdResultadoDesejado = async function (id) {
    let sql = `select * from tbl_resultado_desejado where id = ${id}`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0) {
        return rsResultado
    } else {
        return false
    }
}

const deleteResultadoDesejado = async function (id) {
    let sql = `delete from tbl_resultado_desejado where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllResultadosDesejados = async function () {
    let sql = `select * from tbl_resultado_desejado`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0) {
        return rsResultado
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_resultado_desejado order by id desc limit 1;'

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if(rsResultado.length > 0){
        return rsResultado
    } else {
        return false
    }

}

module.exports = {
    insertResultadoDesejado,
    updateResultadoDesejado,
    selectByIdResultadoDesejado,
    deleteResultadoDesejado,
    selectAllResultadosDesejados,
    selectLastId
}