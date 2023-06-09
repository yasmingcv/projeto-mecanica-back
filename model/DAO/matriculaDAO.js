/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados das matriculas no banco de dados
 * Data: 09/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertMatricula = async function (dadosMatricula) {
    let sql = `insert into tbl_matricula_aluno (
                numero_matricula,
                id_aluno,
                id_status_matricula
            ) values (
                ${dadosMatricula.numero_matricula},
                ${dadosMatricula.id_aluno},
                ${dadosMatricula.id_status_matricula}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateMatricula = async function (dadosMatricula) {
    let sql = `update tbl_matricula_aluno set 
                numero_matricula = ${dadosMatricula.numero_matricula},
                id_aluno = ${dadosMatricula.id_aluno},
                id_status_matricula = ${dadosMatricula.id_status_matricula}

                where id = ${dadosMatricula.id}
             `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdMatricula = async function (id) {
    let sql = `select tbl_matricula_aluno.id, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome, tbl_aluno.email,
                    tbl_status_matricula.status

                from tbl_matricula_aluno
                inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                inner join tbl_status_matricula
                    on tbl_status_matricula.id = tbl_matricula_aluno.id_status_matricula
                where tbl_matricula_aluno.id = ${id}`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

const deleteMatricula = async function (id) {
    let sql = `delete from tbl_matricula_aluno where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllMatriculas = async function () {
    let sql = `select tbl_matricula_aluno.id, tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome, tbl_aluno.email,
                    tbl_status_matricula.status

                from tbl_matricula_aluno
                inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                inner join tbl_status_matricula
                    on tbl_status_matricula.id = tbl_matricula_aluno.id_status_matricula`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_matricula_aluno order by id desc limit 1;'

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if(rsMatricula.length > 0){
        return rsMatricula
    } else {
        return false
    }

}

module.exports = {
    insertMatricula,
    selectLastId,
    updateMatricula,
    selectByIdMatricula,
    deleteMatricula,
    selectAllMatriculas
}