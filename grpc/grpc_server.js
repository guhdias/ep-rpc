var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

// Implementacao do metodo
function Teste0(call, callback) {
  callback(null, {valorReplyInt: 0});
}

function Teste1(call, callback) {
  callback(null, {valorReplyInt: gerarAleatorio(1,10)});
}

function Teste2(call, callback) {
  callback(null, {valorReplyInt: gerarAleatorio(2000000000,2147483647)});
}

function Teste3(call, callback) {
  callback(null, {valorReplyString: stringAleatoria(1)});
}

/**
 * Inicia o servidor RPC que recebe as requisicoes para o servico Teste na porta selecionada
*/
function main() {
  var server = new grpc.Server();
  server.addService(ep_proto.Teste.service, {Teste0: Teste0, Teste1: Teste1, Teste2: Teste2, Teste3: Teste3});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

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

main();
