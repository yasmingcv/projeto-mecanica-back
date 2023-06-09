/****************************************************************************************
 * Objetivo: Responsável pela manipulação de dados das ATIVIDADES no Banco de Dados
 * Autor: Daniela
 * Data: 25/05/2023
 * Versão: 1.0
 ****************************************************************************************/

//Import da biblioteca do prisma client 
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

const insertAtividade = async (dadosAtividade) => {

    const sql = `insert into tbl_atividade(
                tempo_previsto,
                foto,
                nome,
                id_tipo_atividade,
                id_unidade_curricular
                ) values (
                        '${dadosAtividade.tempo_previsto}',
                        '${dadosAtividade.foto}',
                        '${dadosAtividade.nome}',
                        ${dadosAtividade.id_tipo_atividade},
                        ${dadosAtividade.id_unidade_curricular}
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

const updateAtividade = async (dadosAtividade) => {

    const sql = `
    update tbl_atividade set
                        tempo_previsto = '${dadosAtividade.tempo_previsto}',
                        foto = '${dadosAtividade.foto}',
                        nome = '${dadosAtividade.nome}',
                        id_tipo_atividade = ${dadosAtividade.id_tipo_atividade},
                        id_unidade_curricular = ${dadosAtividade.id_unidade_curricular}
                where id = ${dadosAtividade.id};
    `
    //Executa o scriptSQL no BD
    console.log(dadosAtividade.id_tipo);
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const deleteAtividade = async (id) => {
    const idAtividade = id;

    const sql = `delete from tbl_atividade where id = ${idAtividade};`
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectAllAtividades = async () => {

    const sql = `
    select tbl_atividade.id as id_atividade,tbl_atividade.nome as nome_atividade, tbl_atividade.foto as foto_atividade, tbl_atividade.tempo_previsto, tbl_atividade.id_tipo_atividade, tbl_atividade.id_unidade_curricular, 
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_tipo_atividade.nome as tipo_atividade
    from tbl_atividade 
            inner join tbl_unidade_curricular 
                on tbl_unidade_curricular.id = tbl_atividade.id_unidade_curricular
            inner join tbl_tipo_atividade
                on tbl_tipo_atividade.id = tbl_atividade.id_tipo_atividade;
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$queryRawUnsafe(sql);

    if (resultStatus) {
        return resultStatus;
    } else {
        return false;
    }

}

const selectByIdAtividade = async (id) => {

    let idAtividade = id;

    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_atividade.nome as nome_atividade, tbl_atividade.foto as foto_atividade, tbl_atividade.tempo_previsto, tbl_atividade.id_tipo_atividade, tbl_atividade.id_unidade_curricular, 
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_tipo_atividade.nome as tipo_atividade
from tbl_atividade 
         inner join tbl_unidade_curricular 
			on tbl_unidade_curricular.id = tbl_atividade.id_unidade_curricular
		inner join tbl_tipo_atividade
			on tbl_tipo_atividade.id = tbl_atividade.id_tipo_atividade
	where tbl_atividade.id = ${idAtividade};
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

const selectByNameAtividade = async (name) => {

    let nomeAtividade = name;
    console.log(nomeAtividade);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_atividade.nome as nome_atividade, tbl_atividade.foto as foto_atividade, tbl_atividade.tempo_previsto, tbl_atividade.id_tipo_atividade, tbl_atividade.id_unidade_curricular, 
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_tipo_atividade.nome as tipo_atividade
from tbl_atividade 
        inner join tbl_unidade_curricular 
			on tbl_unidade_curricular.id = tbl_atividade.id_unidade_curricular
		inner join tbl_tipo_atividade
			on tbl_tipo_atividade.id = tbl_atividade.id_tipo_atividade
	where tbl_atividade.nome like '%${nomeAtividade}%'; 
    `;

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeAtividade = await prisma.$queryRawUnsafe(sql)
    console.log(rsNomeAtividade);

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeAtividade.length > 0) {
        return rsNomeAtividade;
    } else {
        return false;
    }
};

const selectByNameUnidadeCurricular = async (name) => {

    let nomeUnidadeCurricular = name;
    console.log('nome- ' + nomeUnidadeCurricular);


    //ScriptSQL para buscar todos os itens no BD
    let sql = `
    select tbl_atividade.nome as nome_atividade, tbl_atividade.foto as foto_atividade, tbl_atividade.tempo_previsto, tbl_atividade.id_tipo_atividade, tbl_atividade.id_unidade_curricular, 
    tbl_unidade_curricular.nome as nome_unidade_curricular,
    tbl_tipo_atividade.nome as tipo_atividade
from tbl_atividade 
     inner join tbl_unidade_curricular 
        on tbl_unidade_curricular.id = tbl_atividade.id_unidade_curricular
    inner join tbl_tipo_atividade
        on tbl_tipo_atividade.id = tbl_atividade.id_unidade_curricular
where tbl_unidade_curricular.nome like '%${nomeUnidadeCurricular}%';
    `;

    //$queryRawUnsafe() - Permite interpretar uma variável como sendo um scriptSQL
    let rsNomeAtividade = await prisma.$queryRawUnsafe(sql)
    console.log('prisma - ' + prisma);

    //Valida se o banco de dados retornou algum registro 
    if (rsNomeAtividade.length > 0) {
        return rsNomeAtividade;
    } else {
        return false;
    }
};

const selectLastId = async () => {

    let sql = 'select * from tbl_atividade order by id desc limit 1;'

    let rsAtividade = await prisma.$queryRawUnsafe(sql);

    if (rsAtividade.length > 0) {
        return rsAtividade;
    } else {
        return false;
    }


};

module.exports = {
    insertAtividade,
    updateAtividade,
    deleteAtividade,
    selectAllAtividades,
    selectByIdAtividade,
    selectByNameAtividade,
    selectByNameUnidadeCurricular,
    selectLastId
}


