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

const insertDesempenhoMatriculaAluno = async function (dadosDesempenhoAluno) {
    let sql = `insert into tbl_desempenho_aluno (
                nota,
                id_matricula_aluno,
                id_unidade_curricular
            ) values (
                ${dadosDesempenhoAluno.nota},
                ${dadosDesempenhoAluno.id_matricula_aluno},
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

const updateDesempenhoMatriculaAluno = async function (dadosDesempenhoAluno) {

    let sql = `update tbl_desempenho_aluno set
                            nota = ${dadosDesempenhoAluno.nota},
                            id_matricula_aluno = ${dadosDesempenhoAluno.id_matricula_aluno},
                            id_unidade_curricular = ${dadosDesempenhoAluno.id_unidade_curricular}
                        
                where id = ${dadosDesempenhoAluno.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
        
    } else {
        return false
    }
}

const deleteDesempenhoMatriculaAluno = async function (id) {
    let sql = `delete from tbl_desempenho_aluno where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllDesempenhosMatriculasAlunos = async function () {
    let sql = `select tbl_desempenho_aluno.id,  tbl_desempenho_aluno.nota, 
                    tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno,
                    tbl_unidade_curricular.nome as unidade_curricular
                    
                from tbl_matricula_aluno
                    inner join tbl_desempenho_aluno
                        on tbl_matricula_aluno.id = tbl_desempenho_aluno.id_matricula_aluno
                    inner join tbl_aluno
                        on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                    inner join tbl_unidade_curricular
                        on tbl_unidade_curricular.id = tbl_desempenho_aluno.id_unidade_curricular
                `

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsDesempenhoAluno.length > 0) {
        return rsDesempenhoAluno
    } else {
        return false
    }
}

//Seleciona os desempenhos de determinado aluno filtrando pelo ID da matricula
const selectByIdAlunoDesempenho = async function (idAluno) {
    let sql = `select tbl_desempenho_aluno.id, tbl_desempenho_aluno.nota, 
                    tbl_matricula_aluno.numero_matricula,
                    tbl_aluno.nome as nome_aluno,
                    tbl_unidade_curricular.nome as unidade_curricular
                    
                from tbl_matricula_aluno
                    inner join tbl_desempenho_aluno
                        on tbl_matricula_aluno.id = tbl_desempenho_aluno.id_matricula_aluno
                    inner join tbl_aluno
                        on tbl_aluno.id = tbl_matricula_aluno.id_aluno
                    inner join tbl_unidade_curricular
                        on tbl_unidade_curricular.id = tbl_desempenho_aluno.id_unidade_curricular

            where tbl_aluno.id =${idAluno} 
`

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsDesempenhoAluno.length > 0) {
        return rsDesempenhoAluno
    } else {
        return false
    }
}

//Busca um desempenho pelo ID
const selectByIdDesempenhoMatriculaAluno = async function (id) {
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
    let sql = 'select * from tbl_desempenho_aluno order by id desc limit 1;'

    let rsDesempenhoAluno = await prisma.$queryRawUnsafe(sql)

    if(rsDesempenhoAluno.length > 0){
        return rsDesempenhoAluno
    } else {
        return false
    }

}



module.exports = {
    insertDesempenhoMatriculaAluno,
    updateDesempenhoMatriculaAluno,
    deleteDesempenhoMatriculaAluno,
    selectAllDesempenhosMatriculasAlunos,
    selectByIdAlunoDesempenho,
    selectLastId,
    selectByIdDesempenhoMatriculaAluno
}