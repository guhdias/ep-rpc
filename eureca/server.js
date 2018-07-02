var http = require('http');
var fs = require('fs');
var server = http.createServer();

// == Eureca.io code goes here
var Eureca = require('eureca.io');

//Create eureca server
//Autoriza as funções do client descritas dentro de allow a serem chamadas pelo servidor
var eurecaServer = new Eureca.Server({ allow: [] });

//attach it to http server
eurecaServer.attach(server);

eurecaServer.exports.Teste1 = function(call, callback) {
  //console.log(call.valorRequestInt);
  callback(null, {valorReplyInt: 0});
}

eurecaServer.exports.Teste2 = function(call, callback) {
  //console.log(call.valorRequestInt);
  var min =  -2147483647;
  var max = 2147483647;
  callback(null, {valorReplyInt: gerarAleatorio(min,max)});
}

eurecaServer.exports.Teste3 = function(call, callback) {
  //console.log(call.valorRequestInt0 + ", " + call.valorRequestInt1 + ", " + call.valorRequestInt2 + ", " + call.valorRequestInt3 + ", ");
  var min =  -2147483647;
  var max = 2147483647;
  callback(null, {valorReplyInt0: gerarAleatorio(min,max), valorReplyInt1: gerarAleatorio(min,max), valorReplyInt2: gerarAleatorio(min,max), valorReplyInt3: gerarAleatorio(min,max), valorReplyInt4: gerarAleatorio(min,max), valorReplyInt5: gerarAleatorio(min,max), valorReplyInt6: gerarAleatorio(min,max), valorReplyInt7: gerarAleatorio(min,max)});
}

eurecaServer.exports.Teste4 = function(call, callback) {
  //console.log(call.tamanho);
  callback(null, {valorReplyString: stringAleatoria(call.tamanho), tamanho: call.tamanho});
}

eurecaServer.exports.Teste5 = function(call, callback) {
  //console.log(call.request);
  var objeto = {
    nome: stringAleatoria(64),
    coordenadas: call
  };
  callback(null, objeto);
}

//-------------------------------------------------------
//Funcoes de apoio

function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function stringAleatoria(tamanho)
{
    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var aleatoria = '';
    for (var i = 0; i < tamanho; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        aleatoria += letras.substring(rnum, rnum + 1);
    }
    return aleatoria;
}


console.log('\033[96m'+'Listening on localhost:8080 '+'\033[39m');
server.listen(8080);