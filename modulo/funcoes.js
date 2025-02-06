const listaContatos = require('./contatos.js')
const usuarios = listaContatos.contatos['whats-users']

function obterDadosPessoaisDoUsuario(numeroTelefone) {
    const numberUsuario = numeroTelefone
    const dadosUsuario = { id: 0, account: "", dateStart: "", dateEnd: "", number: numberUsuario }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            encontrado = true;
            dadosUsuario.id = user.id
            dadosUsuario.account = user.account
            dadosUsuario.dateStart = user['created-since'].start
            dadosUsuario.dateEnd = user['created-since'].end
        }
    })

    return encontrado ? dadosUsuario : encontrado
}


//console.log(obterDadosPessoaisDoUsuario("11987876567"));


function obterDadosPerfilUsuario(numeroTelefone) {
    const numberUsuario = numeroTelefone
    const dadosUsuario = { nickname: "", profileImage: "", background: "" }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            encontrado = true
            dadosUsuario.nickname = user.nickname
            dadosUsuario.profileImage = user['profile-image']
            dadosUsuario.background = user.background;
        }
    })

    return encontrado ? dadosUsuario : encontrado
}


//console.log(obterDadosPerfilUsuario("11987876567"))

function obterDetalhesContatosUsuario(numeroTelefone) {
    const numberUsuario = numeroTelefone
    const dadosUsuario = { number: numberUsuario, contacts: [] }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            encontrado = true
            user.contacts.forEach(function(contact) {
                const detalhesContato = { name: "", description: "", image: "" }
                detalhesContato.name = contact.name
                detalhesContato.description = contact.description
                detalhesContato.image = contact.image
                dadosUsuario.contacts.push(detalhesContato)
            })
        }
    })

    return encontrado ? dadosUsuario : encontrado
}


//console.log(obterDetalhesContatosUsuario("11987876567"))

function obterConversasDoUsuario(numeroTelefone) {
    const numberUsuario = numeroTelefone
    const dadosUsuario = { number: numberUsuario, contacts: [] }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            encontrado = true
            dadosUsuario.contacts = user.contacts
        }
    })

    return encontrado ? dadosUsuario : encontrado
}


//console.log(obterConversasDoUsuario("11987876567"))


function filtrarPorUsuarioENomeContato(numeroTelefone, nomeContato) {
    const numberUsuario = numeroTelefone
    const nameContato = nomeContato
    const dadosUsuario = { number: numberUsuario, messages: [] }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            user.contacts.forEach(function(contact) {
                if (nameContato === contact.name) {
                    encontrado = true
                    dadosUsuario.messages = contact.messages
                }
            })
        }
    })

    return encontrado ? dadosUsuario : encontrado
}

// Testando a função
//console.log(filtrarPorUsuarioENomeContato("11987876567", "Ana Maria"))


function filtrarMensagensPorPalavraChave(numeroTelefone, nomeContato, palavraChave) {
    const numberUsuario = numeroTelefone
    const nameContato = nomeContato
    const conversationWord = palavraChave.toLowerCase()
    const dadosUsuario = { number: numberUsuario, contact: nameContato, messages: [] }
    let encontrado = false

    usuarios.forEach(function(user) {
        if (user.number === numberUsuario) {
            user.contacts.forEach(function(contact) {
                if (nameContato === contact.name) {
                    contact.messages.forEach(function(message) {
                        if (message.content.toLowerCase().includes(conversationWord)) {
                            encontrado = true
                            dadosUsuario.messages.push(message)
                        }
                    })
                }
            })
        }
    })

    return encontrado ? dadosUsuario : encontrado
}


//console.log(filtrarMensagensPorPalavraChave("11987876567", "Ana Maria", "You"));


function filtrarConversas(numeroTelefone, nomeContato, palavraChave) {
    let retorno = false;
    if (numeroTelefone && nomeContato && palavraChave) {
        retorno = filtrarMensagensPorPalavraChave(numeroTelefone, nomeContato, palavraChave);
    } else if (numeroTelefone && nomeContato && !palavraChave) {
        retorno = filtrarPorUsuarioENomeContato(numeroTelefone, nomeContato);
    } else if (numeroTelefone && !nomeContato && !palavraChave) {
        retorno = obterConversasDoUsuario(numeroTelefone);
    }
    return retorno;
}



module.exports = {
    obterDadosPessoaisDoUsuario,
    obterDetalhesContatosUsuario,
    obterDadosPerfilUsuario,
    filtrarConversas
}