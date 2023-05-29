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
                        '2:00:00',
                        'endereço do link',
                        'Construindo uma peça',
                        2,
                        1
                        );`

}



