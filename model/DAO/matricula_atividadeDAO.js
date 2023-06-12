/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos registros de matriculas e atividades no banco de dados
 * Data: 12/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 *********************************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertMatriculaAtividade = async function (dadosMatriculaAtividade) {
    let sql = `insert into tbl_matricula_atividade (
                id_matricula,
                id_status_atividade,
                id_matricula_aluno
            ) values (
                ${dadosMatriculaAtividade.id_matricula},
                ${dadosMatriculaAtividade.id_status_atividade},
                ${dadosMatriculaAtividade.id_matricula_aluno}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateMatriculaAtividade = async function (dadosMatriculaAtividade) {
    let sql = `update tbl_matricula_atividade set 
        id_matricula = ${dadosMatriculaAtividade.id_matricula},
        id_status_atividade = ${dadosMatriculaAtividade.id_status_atividade},
        id_matricula_aluno = ${dadosMatriculaAtividade.id_matricula_aluno}
   
        where id = ${dadosMatriculaAtividade.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    } else {
        return false
    }
}

const deleteMatriculaAtividade = async function (id) {
    let sql = `delete from tbl_matricula_atividade where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllResultadosDesejadosCriterios = async function () { //parei aqui
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
    insertMatriculaAtividade,
    updateMatriculaAtividade,
    deleteMatriculaAtividade
}