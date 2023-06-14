/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das Unidades Curriculares por Professor
 * Autor: Daniela
 * Data: 14/06/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const insertUnidadeCurricularProfessor = async (dadosUnidadeCurricularProfessor) => {

    let sql = `
    insert into tbl_unidade_curricular_professor(
        id_unidade_curricular,
        id_professor
        )values(
    ${dadosUnidadeCurricularProfessor.id_unidade_curricular},
    ${dadosUnidadeCurricularProfessor.id_professor}
    `;

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const updateUnidadeCurricularProfessor = async (dadosUnidadeCurricularProfessor) => {

    //scriptSQL para atualizar os dados no BD 
    let sql = `
                update tbl_unidade_curricular_professor set
                        id_unidade_curricular = '${dadosUnidadeCurricularProfessor.id_unidade_curricular}',
                        id_professor = '${dadosUnidadeCurricularProfessor.id_professor}'
                where id = ${dadosUnidadeCurricularProfessor.id}
                `;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }


};

const deleteUnidadeCurricularProfessor = async (id) => {

    let idUnidadeCurricularProfessor = id;
    console.log(idTempo);

    //ScriptSQL para buscar todos os itens no BD
    let sql = `delete from tbl_unidade_curricular_professor where id = ${idUnidadeCurricularProfessor}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro 
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const selectAllUnidadeCurricularProfessor = async () => {

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_unidade_curricular_professor.id_unidade_curricular, tbl_unidade_curricular_professor.id_professor,
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_professor.nome as nome_professor
from tbl_unidade_curricular_professor 
     inner join tbl_unidade_curricular 
        on tbl_unidade_curricular.id = tbl_unidade_curricular_professor.id_unidade_curricular
    inner join tbl_professor
        on tbl_professor.id = tbl_unidade_curricular_professor.id_professor;
    `;
    console.log(sql);

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsTempo = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsTempo.length > 0) {
        return rsTempo;
    } else {
        return false;
    }

};

const selectUnidadeCurricularProfessorbyID = async (id) => {


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_unidade_curricular_professor.id_unidade_curricular, tbl_unidade_curricular_professor.id_professor,
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_professor.nome as nome_professor
from tbl_unidade_curricular_professor 
     inner join tbl_unidade_curricular 
        on tbl_unidade_curricular.id = tbl_unidade_curricular_professor.id_unidade_curricular
    inner join tbl_professor
        on tbl_professor.id = tbl_unidade_curricular_professor.id_professor
         where tbl_unidade_curricular_professor.id = ${id};
    `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsIdTempo = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsIdTempo.length > 0) {
        return rsIdTempo;
    } else {
        return false;
    }


};


const selectLastId = async () => {

    let sql = `    
    select tbl_unidade_curricular_professor.id_unidade_curricular, tbl_unidade_curricular_professor.id_professor,
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_professor.nome as nome_professor 
from tbl_unidade_curricular_professor 
     inner join tbl_unidade_curricular 
        on tbl_unidade_curricular.id = tbl_unidade_curricular_professor.id_unidade_curricular
    inner join tbl_professor
        on tbl_professor.id = tbl_unidade_curricular_professor.id_professor
        order by tbl_unidade_curricular_professor.id desc limit 1;
        `

    let rsTempo = await prisma.$queryRawUnsafe(sql);

    if (rsTempo.length > 0) {
        return rsTempo;
    } else {
        return false;
    }


};

module.exports = {
    insertUnidadeCurricularProfessor,
    updateUnidadeCurricularProfessor,
    deleteUnidadeCurricularProfessor,
    selectAllUnidadeCurricularProfessor,
    selectUnidadeCurricularProfessorbyID,
    selectLastId
};








