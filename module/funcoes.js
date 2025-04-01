/************************************************
 * Objetivo: Revisão -> API manipulação de dados 
 * estatico para uma rede social.
 * Autor: Giovanna Coelho
 * Data: 28/01/2025
************************************************/

const funcoesContatos = require ("./contatos")
// console.log(funcoesContatos)

//1
const getDadosPessoais = function(numero){
    let status = false
    let user = String(numero)
    let dadosPessoais = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
            if(String(item.number) == user){
                whatsUsers.push({
                    id: item.id,
                    account: item.account,
                    createSince: item["created-since"],
                    number: item.number
                })
                status = true
            }
        })

        dadosPessoais.dados = whatsUsers

        if(status == true){
            return dadosPessoais
        }else{
            return status
        }
}

//console.log(getDadosPessoais('11987876567'))

//2
const getDadosPerfil = function(numero){
    let status = false
    let user = String(numero)
    let dadosPessoais = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
            if(String(item.number) == user){
                whatsUsers.push({
                    nickname: item.nickname,
                    profileImage: item["profile-image"],
                    background: item.background
                })
                status = true
            }
        })

        dadosPessoais.dados_perfil = whatsUsers

        if(status == true){
            return dadosPessoais
        }else{
            return status
        }
}

//console.log(getDadosPerfil('11987876567'))

//3
const getDadosContatos = function(numero){
    let status = false
    let user = String(numero)
    let dadosDeContato = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
        item.contacts.forEach(function(item2){
            if(String(item.number) == user){
                whatsUsers.push({
                    name: item2.name,
                    profile: item2["image"],
                    description: item2.description
                })
                status = true
            }
        })
    })
    dadosDeContato.dados_contato = whatsUsers

    if(status == true){
        return dadosDeContato
    }else{
        return status
    }
}

//console.log(getDadosContatos("11987876567"))

//4
const getConversasContatos = function(numero){
    let status = false
    let user = String(numero)
    let conversasContatos = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
        item.contacts.forEach(function(item2){
            if(String(item.number) == user){
                whatsUsers.push({
                    name: item2.name,
                    profile: item2["image"],
                    description: item2.description,
                    convensas: item2.messages
                })
                status = true
            }
        })
    })
    conversasContatos.conversas = whatsUsers

    if(status == true){
        return conversasContatos
    }else{
        return status
    }
}

//console.log(getConversasContatos("11987876567"))

//5
 const getListarConversas = function(numero, nome){
    let status = false
    let user = String(numero)
    let conversante = String(nome).toUpperCase()
    let conversasContatos = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
        item.contacts.forEach(function(item2){
            if(String(item.number) == user && String(item2.name).toUpperCase() == conversante){
                whatsUsers.push({
                    name: item2.name,
                    profile: item2["image"],
                    description: item2.description,
                    conversas: item2.messages
                })
                status = true
            }
        })
    })
    conversasContatos.conversas = whatsUsers

    if(status == true){
        return conversasContatos
    }else{
        return status
    }
 }

//console.log(getListarConversas("11987876567", "Julia Smith"))

//6
const getFiltrarPalavra = function(numero, palavra, nome){
    let status = false
    let conversante = String(nome).toUpperCase()
    let user = String(numero)
    let palavraChave = String(palavra).toUpperCase()
    let conversasContatos = {}
    let whatsUsers = []

    funcoesContatos.contatos.whatsUsers.forEach(function(item){
        item.contacts.forEach(function(item2){
            item2.messages.forEach(function(item3){
                if(String(item.number) == user && String(item3.content).toUpperCase().includes(palavraChave) && String(item2.name).toUpperCase() == conversante){
                    whatsUsers.push({
                        name: item2.name,
                        profile: item2["image"],
                        description: item2.description,
                        conversas: item2.messages
                    })
                    status = true
                }
            })
        })
    })
    conversasContatos.conversas = whatsUsers

    if(status == true){
        return conversasContatos
    }else{
        return status
    }
 }

//console.log(getFiltrarPalavra("11987876567", "Leonid", "Ana Maria"))

module.exports = {
    getConversasContatos,
    getDadosContatos,
    getDadosPerfil,
    getDadosPessoais,
    getFiltrarPalavra,
    getListarConversas,
}