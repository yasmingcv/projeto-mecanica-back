/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados do Tempo das atividades no Banco de Dados
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
        observacao)values(
    '${dadosTempo.inicio}',
    '${dadosTempo.termino}',
    ${dadosTempo.desconto},
    TIMEDIFF(termino, inicio),
    DATE_SUB(total_geral, INTERVAL desconto MINUTE),
    '${dadosTempo.observacao}')
    `;

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
                        desconto = ${dadosTime.desconto},
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
    select tbl_tempo.id, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format(  tbl_tempo.termino,'%d/%m/%Y') as data_termino, time_format( tbl_tempo.termino, '%H:%i:%s') as hora_termino, tbl_tempo.desconto, time_format(tbl_tempo.total_geral, '%H:%i:%s') as total_geral, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido, tbl_tempo.observacao from tbl_tempo;               
    `;

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
    select tbl_tempo.id, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inico, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format(  tbl_tempo.termino,'%d/%m/%Y') as data_termino, time_format( tbl_tempo.termino, '%H:%i:%s') as hora_termino, tbl_tempo.desconto, time_format(tbl_tempo.total_geral, '%H:%i:%s') as total_geral, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido, tbl_tempo.observacao from tbl_tempo where id = ${id};
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
    select tbl_tempo.id, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inico, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format(  tbl_tempo.termino,'%d/%m/%Y') as data_termino, time_format( tbl_tempo.termino, '%H:%i:%s') as hora_termino, tbl_tempo.desconto, time_format(tbl_tempo.total_geral, '%H:%i:%s') as total_geral, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido, tbl_tempo.observacao from tbl_tempo order by id desc limit 1;`

    let rsTempo = await prisma.$queryRawUnsafe(sql);

    if (rsTempo.length > 0) {
        return rsTempo;
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
    selectLastId
};








