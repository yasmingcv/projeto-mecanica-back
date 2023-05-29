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
                id_tipo,
                id_unidade_curricular
                ) values (
                        '${dadosAtividade.tempoPrevisto}',
                        '${dadosAtividade.foto}',
                        '${dadosAtividade.nome}',
                        ${dadosAtividade.idTipo},
                        ${dadosAtividade.idUnidadeCurricular}
                        );`


    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateAtividade = async (dadosAtividade) => {

    const sql = `
    update tbl_professor set
                        tempo_previsto = '${dadosAtividade.nome}',
                        foto = '${dadosAtividade.email}',
                        nome = '${dadosAtividade.email}',
                        id_tipo = '${dadosAtividade.email}',
                        id_unidade_curricular = '${dadosProfessor.senha}'
                where id = ${dadosProfessor.id}
    `
    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    insertAtividade,
    updateAtividade
}


