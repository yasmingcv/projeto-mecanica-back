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

const insertTempoAtividade = async (dadosTempo) => {

    let sql = `
    insert into tbl_tempo(
        inicio,
        termino,
        desconto,
        total_geral,
        tempo_liquido,
        observacao
                )values(
    '${dadosTempo.inicio}',
    '${dadosTempo.termino}',
    ${dadosTempo.desconto},
    TIMEDIFF(termino, inicio),
    DATE_SUB(total_geral, INTERVAL desconto MINUTE),
    '${dadosTempo.observacao}'
,;

    )`;

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const updateTempoAtividade = async (dadosTime) => {

    //scriptSQL para atualizar os dados no BD 
    let sql = `
                update tbl_tempo set
                        inicio = '${dadosTime.inicio}',
                        termino = '${dadosTime.termino}',
                        desconto = ${dadosTempo.desconto},
                        total_geral = TIMEDIFF(termino, inicio),
                        tempo_liquido = DATE_SUB(total_geral, INTERVAL desconto MINUTE),
                        observacao = '${dadosTime.observacao}'
                where id = ${dadosTime.id}
                `;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }


};

const deleteTempoAtividade = async (id) => {

    let idTempo = id;
    console.log(idTempo);

    //ScriptSQL para buscar todos os itens no BD
    let sql = `delete from tbl_tempo where id = ${idTempo}`;


    //Executa o script no DB
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro 
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
};

const selectAllTempoAtividade = async () => {

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_tempo.id, tbl_tempo.inicio, tbl_tempo.termino, tbl_tempo.desconto, tbl_tempo.total_geral, tbl_tempo.tempo_liquido, tbl_tempo.observacao from tbl_tempo;
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

const selectByIdTempoAtividade = async (id) => {


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_tempo.id, tbl_tempo.inicio, tbl_tempo.termino, tbl_tempo.desconto, tbl_tempo.total_geral, tbl_tempo.tempo_liquido, tbl_tempo.observacao from tbl_tempo where id = ${idProfessor};
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

const selectByInicioAtividade = async (inicio) => {

    let inicioTempo = inicio;
    console.log(inicioTempo);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_tempo.id, tbl_tempo.inicio, tbl_tempo.termino, tbl_tempo.desconto, tbl_tempo.total_geral, tbl_tempo.tempo_liquido, tbl_tempo.observacao from tbl_tempo where tbl_tempo.inicio like '%${inicioTempo}%'
    `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsInicioTempo = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsInicioTempo.length > 0) {
        return rsInicioTempo;
    } else {
        return false;
    }

};

const selectByTerminoAtividade = async (termino) => {

    let terminoTempo = inicio;
    console.log(terminoTempo);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_tempo.id, tbl_tempo.inicio, tbl_tempo.termino, tbl_tempo.desconto, tbl_tempo.total_geral, tbl_tempo.tempo_liquido, tbl_tempo.observacao from tbl_tempo where tbl_tempo.termino like '%${terminoTempo}%'
    `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsTerminoTempo = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsTerminoTempo.length > 0) {
        return rsTerminoTempo;
    } else {
        return false;
    }

};

const selectLastId = async () => {

    let sql = '     select tbl_tempo.id, tbl_tempo.inicio, tbl_tempo.termino, tbl_tempo.desconto, tbl_tempo.total_geral, tbl_tempo.tempo_liquido, tbl_tempo.observacao from tbl_tempo order by id desc limit 1;'

    let rsProfessor = await prisma.$queryRawUnsafe(sql);

    if (rsProfessor.length > 0) {
        return rsProfessor;
    } else {
        return false;
    }


};

module.exports = {
    insertTempoAtividade,
    updateTempoAtividade,
    deleteTempoAtividade,
    selectAllTempoAtividade,
    selectByIdTempoAtividade,
    selectByInicioAtividade,
    selectByTerminoAtividade,
    selectLastId
};








