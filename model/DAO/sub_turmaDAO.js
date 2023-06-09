/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das SUB-TURMAS no Banco de Dados
 * Autor: Daniela
 * Data: 08/06/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const insertSubTurma = async (dadosSubTurma) => {

    let sql = `
    insert into tbl_subturma(
        nome,
        numero_integrantes,
        id_turma
        )values(
                '${dadosSubTurma.nome}',
                ${dadosSubTurma.numero_integrantes},
                ${dadosSubTurma.id_turma}
                )
    `;


    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const updateSubTurma = async (dadosSubTurma) => {

    //scriptSQL para atualizar os dados no BD 
    let sql = `update tbl_subturma set
                        nome = '${dadosSubTurma.nome}',
                        numero_integrantes = ${dadosSubTurma.numero_integrantes},
                        id_turma = ${dadosSubTurma.id_turma}
                where id = ${dadosSubTurma.id}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }



};

const deleteSubTurma = async (id) => {

    let idSubTurma = id;
    console.log(idSubTurma);

    //ScriptSQL para buscar todos os itens no BD
    let sql = `delete from tbl_subturma where id = ${idSubTurma}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro 
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const selectAllSubTurmas = async () => {

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_subturma.id, tbl_subturma.nome as nome_sub_turma, tbl_subturma.numero_integrantes, tbl_subturma.id_turma,
    tbl_turma.nome as nome_turma, tbl_turma.ano ano_turma
from tbl_subturma
     inner join tbl_turma 
        on tbl_turma.id = tbl_subturma.id_turma
    `;
    console.log(sql);

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsSubTurma = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsSubTurma.length > 0) {
        return rsSubTurma;
    } else {
        return false;
    }

};

const selectByIdSubTurma = async (id) => {

    let idSubTurma = id;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_subturma.id, tbl_subturma.nome as nome_sub_turma, tbl_subturma.numero_integrantes, tbl_subturma.id_turma,
    tbl_turma.nome as nome_turma, tbl_turma.ano ano_turma
from tbl_subturma
     inner join tbl_turma 
        on tbl_turma.id = tbl_subturma.id_turma
                             where id = ${idSubTurma}`;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsIdSubTurma = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsIdSubTurma.length > 0) {
        return rsIdSubTurma;
    } else {
        return false;
    }


};

const selectByNameSubTurma = async (name) => {

    let nomeSubTurma = name;
    console.log(nomeSubTurma);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_subturma.id, tbl_subturma.nome as nome_sub_turma, tbl_subturma.numero_integrantes, tbl_subturma.id_turma,
    tbl_turma.nome as nome_turma, tbl_turma.ano ano_turma
from tbl_subturma
     inner join tbl_turma 
        on tbl_turma.id = tbl_subturma.id_turma
                     where nome like '%${nomeSubTurma}%'`;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeSubTurma = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeSubTurma.length > 0) {
        return rsNomeSubTurma;
    } else {
        return false;
    }

};

const selectByNameTurma = async (name) => {

    let nomeNameTurma = name;


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_subturma.id, tbl_subturma.nome as nome_sub_turma, tbl_subturma.numero_integrantes, tbl_subturma.id_turma,
    tbl_turma.nome as nome_turma, tbl_turma.ano ano_turma
from tbl_subturma
     inner join tbl_turma 
        on tbl_turma.id = tbl_subturma.id_turma
				where tbl_turma.nome like '%${nomeUnidadeCurricular}%';
    `;

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeTurma = await prisma.$queryRawUnsafe(sql)
    console.log('prisma - ' + prisma);

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeTurma.length > 0) {
        return rsNomeTurma;
    } else {
        return false;
    }
};

const selectLastId = async () => {

    let sql = `
    select tbl_subturma.id, tbl_subturma.nome as nome_sub_turma, tbl_subturma.numero_integrantes, tbl_subturma.id_turma,
    tbl_turma.nome as nome_turma, tbl_turma.ano ano_turma
from tbl_subturma
     inner join tbl_turma 
        on tbl_turma.id = tbl_subturma.id_turma
                    order by id desc limit 1`;

    let rsSubTurma = await prisma.$queryRawUnsafe(sql);

    if (rsSubTurma.length > 0) {
        return rsSubTurma;
    } else {
        return false;
    }


};

module.exports = {
    insertSubTurma,
    deleteSubTurma,
    selectAllSubTurmas,
    updateSubTurma,
    selectByNameSubTurma,
    selectByIdSubTurma,
    selectLastId,
    selectByNameTurma
};
