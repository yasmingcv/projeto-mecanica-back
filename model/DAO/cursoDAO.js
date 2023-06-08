/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados dos CURSOS no Banco de Dados
 * Autor: Daniela
 * Data: 08/06/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const insertCurso = async (dadosCurso) => {

    const sql = `insert into tbl_curso (
						nome,
                        carga_horaria,
                        descricao,
                        sigla
						)
                        values(
                        '${dadosCurso.nome}',
                        '${dadosCurso.carga_horaria}',
                        '${dadosCurso.descricao}',
                        '${dadosCurso.sigla}'
                        );`

    console.log(sql);
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}



const updateCurso = async (dadosCurso) => {

    const sql = `
    update tbl_curso set
                        nome = '${dadosCurso.nome}',
                        carga_horaria = '${dadosCurso.carga_horaria}',
                        descricao = '${dadosCurso.descricao}',
                        sigla = ${dadosCurso.sigla}
                where id = ${dadosCurso.id};
    `
    //Executa o scriptSQL no BD
    console.log(sql);
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const deleteCurso = async (id) => {
    const idCurso = id;

    const sql = `delete from tbl_curso where id = ${idCurso};`
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectAllCursos = async () => {

    const sql = `
    select tbl_curso.id, tbl_curso.nome, tbl_curso.sigla, tbl_curso.carga_horaria, tbl_curso.descricao from tbl_curso;
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectByIdCurso = async (id) => {

    let idAtividade = id;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_curso.id, tbl_curso.nome, tbl_curso.sigla, tbl_curso.carga_horaria, tbl_curso.descricao from tbl_curso
    where tbl_curso.id = ${idAtividade};
    `;

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsIdAtividade = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsIdAtividade.length > 0) {
        return rsIdAtividade;
    } else {
        return false;
    }


};

const selectByNameCurso = async (name) => {

    let nomeCurso = name;
    console.log(nomeCurso);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_curso.id, tbl_curso.nome, tbl_curso.sigla, tbl_curso.carga_horaria, tbl_curso.descricao from tbl_curso
                             where tbl_curso.nome like '%${nomeCurso}%'`;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    //$queryRaw('select * from tbl_professor') - Permite interpretar o scriptSQL direto no método
    let rsNomeCurso = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeCurso.length > 0) {
        return rsNomeCurso;
    } else {
        return false;
    }

};

//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = `
    select * from tbl_curso order by id desc limit 1;
    `

    let rsCurso = await prisma.$queryRawUnsafe(sql)

    if(rsCurso.length > 0){
        return rsCurso
    } else {
        return false
    }

}

module.exports = {
    deleteCurso,
    insertCurso,
    selectAllCursos,
    updateCurso,
    selectByIdCurso,
    selectByNameCurso,
    selectLastId
}