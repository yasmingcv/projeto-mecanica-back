/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das AVALIAÇÕES no Banco de Dados
 * Autor: Daniela
 * Data: 14/06/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const insertAvaliacao = async (dadosAvaliacao) => {

    const sql = `
    insert into tbl_avaliacao(
        avaliacao_aluno, 
        avaliacao_professor, 
        observacao, 
        id_criterio, 
        id_professor, 
        id_tempo, 
        id_atividade, 
        id_matricula_aluno
        )values(
                '${dadosAvaliacao.avaliacao_aluno}',
                '${dadosAvaliacao.avaliacao_professor}',
                '${dadosAvaliacao.observacao}',
                '${dadosAvaliacao.id_criterio}',
                '${dadosAvaliacao.id_professor}',
                '${dadosAvaliacao.id_tempo}',
                '${dadosAvaliacao.id_atividade}',
                '${dadosAvaliacao.id_matricula_aluno}'
                );
        `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateAvaliacao = async (dadosAvaliacao) => {

    const sql = `
    update tbl_avaliacao set
                        avaliacao_aluno = '${dadosAvaliacao.avaliacao_aluno}',
                        avaliacao_professor = '${dadosAvaliacao.avaliacao_professor}',
                        observacao = '${dadosAvaliacao.observacao}',
                        id_criterio = '${dadosAvaliacao.id_criterio}'
                        id_professor = '${dadosAvaliacao.id_professor}'
                        id_tempo = '${dadosAvaliacao.id_tempo}'
                        id_atividade = '${dadosAvaliacao.id_atividade}'
                        id_matricula_aluno = '${dadosAvaliacao.id_matricula_aluno}'
                where id = ${dadosAvaliacao.id};
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const deleteAvaliacao = async (id) => {
    const idAvaliacao = id;

    const sql = `delete from tbl_avaliacao where id = ${idAvaliacao};`
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectAllAvaliacao = async () => {

    const sql = `
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno;
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectByIdAvaliacao = async (id) => {

    let idAvaliacao = id;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno;
    where tbl_avaliacao.id = ${idAvaliacao};
    `;

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsIdAvaliacao = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsIdAvaliacao.length > 0) {
        return rsIdAvaliacao;
    } else {
        return false;
    }


};

const selectByMatriculaAlunoAvaliacao = async (matricula) => {

    let matriculaAluno = matricula;
    console.log(matriculaAluno);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
                             where tbl_matricula_aluno.numero_matricula like '%${matriculaAluno}%'
                             `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    console.log(sql);
    let rsMatriculaAluno = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsMatriculaAluno.length > 0) {
        return rsMatriculaAluno;
    } else {
        return false;
    }

};

const selectByNomeProfessorAvaliacao = async (nome) => {

    let nomeProfessor = nome;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
                             where tbl_professor.nome like '%${nomeProfessor}%';
                             `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeProfessor = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeProfessor.length > 0) {
        return rsNomeProfessor;
    } else {
        return false;
    }

};

const selectByNomeAtividadeAvaliacao = async (nome) => {

    let nomeAtividade = nome;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
                             where tbl_atividade.nome like  '%${nomeAtividade}%';
                             `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeAtividade = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeAtividade.length > 0) {
        return rsNomeAtividade;
    } else {
        return false;
    }

};

const selectByCriterioAvaliacao = async (criterio) => {

    let nomeCriterio = criterio;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
                             where tbl_criterio.criterio like '%${nomeCriterio}%';
                             `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeCriterio = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeCriterio.length > 0) {
        return rsNomeCriterio;
    } else {
        return false;
    }

};

const selectByTempoPrevistoAvaliacao = async (tempo) => {

    let tempoPrevisto = tempo;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `    
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
                             where tbl_atividade.tempo_previsto like  '%${tempoPrevisto}%';
                             `;


    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsTempoPrevisto = await prisma.$queryRawUnsafe(sql)

    //Valida se o banco de dados retornou algum registro 
    if (rsTempoPrevisto.length > 0) {
        return rsTempoPrevisto;
    } else {
        return false;
    }

};


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = `
    select tbl_avaliacao.avaliacao_aluno, tbl_avaliacao.avaliacao_professor, tbl_avaliacao.observacao, tbl_avaliacao.id_criterio, tbl_avaliacao.id_professor, tbl_avaliacao.id_tempo, tbl_avaliacao.id_atividade, tbl_avaliacao.id_matricula_aluno,
    tbl_criterio.id as id_criterio, tbl_criterio.criterio as criterio,
    tbl_professor.id as id_professor, tbl_professor.nome as nome_professor,
    tbl_tempo.id as id_tempo, date_format( tbl_tempo.inicio,'%d/%m/%Y') as data_inicio, time_format(tbl_tempo.inicio, '%H:%i:%s') as hora_inicio,date_format( tbl_tempo.termino,'%d/%m/%Y') as data_termino , time_format(tbl_tempo.termino, '%H:%i:%s') as hora_termino, time_format(tbl_tempo.tempo_liquido, '%H:%i:%s') as tempo_liquido,
    tbl_atividade.nome as nome_atividade, tbl_atividade.tempo_previsto as tempo_previsto_atividade,
    tbl_matricula_aluno.id as id_matricula_aluno, tbl_matricula_aluno.numero_matricula as matricula_aluno
from tbl_avaliacao
     inner join tbl_criterio
        on tbl_criterio.id = tbl_avaliacao.id_criterio
    inner join tbl_professor
        on tbl_professor.id = tbl_avaliacao.id_professor
    inner join tbl_tempo
        on tbl_tempo.id = tbl_avaliacao.id_tempo
    inner join tbl_atividade
        on tbl_atividade.id = tbl_avaliacao.id_atividade
    inner join tbl_matricula_aluno
        on tbl_matricula_aluno.id = tbl_avaliacao.id_matricula_aluno
         order by tbl_avaliacao.id desc limit 1;

    `

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(rsAvaliacao.length > 0){
        return rsAvaliacao
    } else {
        return false
    }

}

module.exports = {
    insertAvaliacao,
    selectByMatriculaAlunoAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao,
    deleteAvaliacao,
    updateAvaliacao,
    selectByCriterioAvaliacao,
    selectByNomeProfessorAvaliacao,
    selectByNomeAtividadeAvaliacao,
    selectByTempoPrevistoAvaliacao,
    selectLastId
}