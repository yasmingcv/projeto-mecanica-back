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
    
}

const updateProfessor = async (dadosProfessor) => {
    
}

const deleteProfessor = async (id) => {
    
}

const selectAllProfessores = async () => {
    
}

const selectByIdProfessor = async (id) => {
    
}

const selectByNameProfessor = async (name) => {
    
}

const selectLastId = async (id) => {
    
}


module.exports = {
    insertProfessor,
    updateProfessor, 
    deleteProfessor,
    selectAllProfessores,
    selectByIdProfessor,
    selectByNameProfessor,
    selectLastId
}