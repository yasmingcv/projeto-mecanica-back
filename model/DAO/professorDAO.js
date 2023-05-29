/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados dos PROFESSORES no Banco de Dados
 * Autor: Daniela
 * Data: 25/05/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();


const insertProfessor = async (dadosProfessor) => {
    console.log(1 + 'dadosProfessor');

    let sql = `insert into tbl_professor (
        nome,
        email,
        senha

    ) values (
    '${dadosProfessor.nome}',
    '${dadosProfessor.email}',
    '${dadosProfessor.senha}'

    )`;


    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }


};

const updateProfessor = async (dadosProfessor) => {

    //scriptSQL para atualizar os dados no BD 
    let sql = `update tbl_professor set
                        nome = '${dadosProfessor.nome}',
                        email = '${dadosProfessor.email}',
                        senha = '${dadosProfessor.senha}'
                where id = ${dadosProfessor.id}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }



};

const deleteProfessor = async (id) => {

    let idProfessor = id;
    console.log(idProfessor);

    //ScriptSQL para buscar todos os itens no BD
    let sql = `delete from tbl_professor where id = ${idProfessor}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro 
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const selectAllProfessores = async () => {

    //ScriptSQL para buscar todos os itens no BD
    let sql = 'select * from tbl_professor';
    console.log(sql);

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    //$queryRaw('select * from tbl_professor') - Permite interpretar o scriptSQL direto no método
    let rsProfessor = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsProfessor.length > 0) {
        return rsProfessor;
    } else {
        return false;
    }

};

const selectByIdProfessor = async (id) => {

    let idProfessor = id;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `select * from tbl_professor where id = ${idProfessor}`;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    //$queryRaw('select * from tbl_professor') - Permite interpretar o scriptSQL direto no método
    let rsIdProfessor = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsIdProfessor.length > 0) {
        return rsIdProfessor;
    } else {
        return false;
    }


};

const selectByNameProfessor = async (name) => {

    let nomeProfessor = name;
    console.log(nomeProfessor);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `select * from tbl_professor where nome like '%${nomeProfessor}%'`;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    //$queryRaw('select * from tbl_professor') - Permite interpretar o scriptSQL direto no método
    let rsNomeProfessor = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeProfessor.length > 0) {
        return rsNomeProfessor;
    } else {
        return false;
    }


};

const selectLastId = async (id) => {

    let sql = 'select * from tbl_professor order by id desc limit 1;'

    let rsProfessor = await prisma.$queryRawUnsafe(sql);

    if (rsProfessor.length > 0) {
        return rsProfessor;
    } else {
        return false;
    }


};


module.exports = {
    insertProfessor,
    updateProfessor,
    deleteProfessor,
    selectAllProfessores,
    selectByIdProfessor,
    selectByNameProfessor,
    selectLastId
};