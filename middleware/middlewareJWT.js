/*****************************************************************************
 * Objetivo: Implementação do JWT no projeto
 * Autora: Yasmin Gonçalves
 * Data: 15/06/2023
 * Versão: 1.0
 *****************************************************************************/

//Import da dependencia
const jwt = require('jsonwebtoken')
//Chave secreta para criação do JWT
const SECRET = 'p7s5u8'
//Tempo para validar o token em segundos
const EXPIRES = 60

//Criação do JWT (retorna um token)
const createJWT = async function (payload) {

    //Gera o token
    //payload: identificação do usuário autenticado
    //SECRET: chave secreta
    //expiresIn: tempo de expiração
    const token = jwt.sign({ userID: payload }, SECRET, { expiresIn: EXPIRES })

    return token
}

//Validação de autenticidade (recebe e valida o TOKEN)
const validateJWT = async function (token) {

    let status

    //Valida a autenticidade do token
    //Se hover algum erro, ele retorna o erro, se não, ele retorna o token codificado
    jwt.verify(token, SECRET, async function (err, decode) {

        if (err)
            status = false
        else 
            status = true
        
    })

    return status
}

module.exports = {
    createJWT,
    validateJWT
}
