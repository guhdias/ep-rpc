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

/**
 * Inicia o servidor RPC que recebe as requisicoes para o servico Teste na porta selecionada
*/
function main() {
  var server = new grpc.Server();
  server.addService(ep_proto.Teste.service, {Teste0: Teste0, Teste1: Teste1, Teste2: Teste2});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
