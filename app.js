const express = require('express');
const cors = require('cors');
const functionsContatos = require('./modulo/funcoes.js');

const app = express();
app.use(cors());

app.get('/v1/whatsapp/data/user/unalterable/', async function(request, response) {
    let number = request.query.nu;
    let dados = functionsContatos.obterDadosPessoaisDoUsuario(number);

    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': "Not found" });
    }
});

app.get('/v1/whatsapp/data/user/editable/', async function(request, response) {
    let number = request.query.nu;
    let dados = functionsContatos.obterDadosPerfilUsuario(number);

    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': "Not found" });
    }
});

app.get('/v1/whatsapp/data/contact/user/', async function(request, response) {
    let number = request.query.nu;
    let dados = functionsContatos.obterDetalhesContatosUsuario(number);

    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': "Not found" });
    }
});

app.get('/v1/whatsapp/filter/', async function(request, response) {
    let number = request.query.nu;
    let name = request.query.na;
    let word = request.query.wo;
    let dados = functionsContatos.filtrarConversas(number, name, word);

    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': "Not found" });
    }
});

app.listen(8080, function() {
    console.log('API aguardando requisição ...');
});
