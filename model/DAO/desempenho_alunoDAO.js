/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos desempenhos dos alunos no banco de dados
 * Data: 02/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertDesempenhoAluno = async function (dadosDesempenhoAluno) {
    let sql = `insert into tbl_desempenho_aluno (
                nota,
                id_aluno,
                id_unidade_curricular
            ) values (
                ${dadosDesempenhoAluno.nota},
                ${dadosDesempenhoAluno.id_aluno},
                ${dadosDesempenhoAluno.id_unidade_curricular}
            )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const updateDesempenhoAluno = async function (dadosDesempenhoAluno) {

    let sql = `update tbl_desempenho_aluno set
                            nota = ${dadosDesempenhoAluno.nota},
                            id_aluno = ${dadosDesempenhoAluno.id_aluno},
                            id_unidade_curricular = ${dadosDesempenhoAluno.id_unidade_curricular}
                        
                where id = ${dadosDesempenhoAluno.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
        
    } else {
        return false
    }
}

const deleteDesempenhoAluno = async function (id) {
    let sql = `delete from tbl_desempenho_aluno where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllDesempenhosAlunos = async function () {
    let sql = `select tbl_desempenho_aluno.nota,
                      tbl_aluno.nome as nome_aluno, tbl_aluno.numero_matricula as matricula_aluno,
                      tbl_unidade_curricular.nome as unidade_curricular

               from tbl_desempenho_aluno
                      inner join tbl_aluno
                        on tbl_aluno.id = tbl_desempenho_aluno.id_aluno
                      inner join tbl_unidade_curricular
                        on tbl_unidade_curricular.id = tbl_desempenho_aluno.id_unidade_curricular

                order by tbl_aluno.nome asc`

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsDesempenhoAluno.length > 0) {
        return rsDesempenhoAluno
    } else {
        return false
    }
}

//Seleciona os desempenhos de determinado aluno filtrando pelo ID do aluno
const selectByIdAlunoDesempenho = async function (idAluno) {
    let sql = `select tbl_desempenho_aluno.nota,
                      tbl_aluno.nome as nome_aluno, tbl_aluno.numero_matricula as matricula_aluno,
                      tbl_unidade_curricular.nome as unidade_curricular

                from tbl_desempenho_aluno
                    inner join tbl_aluno
                        on tbl_aluno.id = tbl_desempenho_aluno.id_aluno
                    inner join tbl_unidade_curricular
                        on tbl_unidade_curricular.id = tbl_desempenho_aluno.id_unidade_curricular

            where tbl_aluno.id =${idAluno} 

            order by tbl_desempenho_aluno.nota asc`

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsDesempenhoAluno.length > 0) {
        return rsDesempenhoAluno
    } else {
        return false
    }
}

//Busca um desempenho pelo ID
const selectByIdDesempenhoAluno = async function (id) {
    let sql = 'select * from tbl_desempenho_aluno where id = ' + id

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsDesempenhoAluno.length > 0) {
        return rsDesempenhoAluno
    } else {
        return false
    }
}

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_desempenho_aluno.nota order by id desc limit 1;'

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if(rsDesempenhoAluno.length > 0){
        return rsDesempenhoAluno
    } else {
        return false
    }

}



module.exports = {
    insertDesempenhoAluno,
    updateDesempenhoAluno,
    deleteDesempenhoAluno,
    selectAllDesempenhosAlunos,
    selectByIdAlunoDesempenho,
    selectLastId,
    selectByIdDesempenhoAluno
}