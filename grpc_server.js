var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

// Implementacao do metodo
function Teste1(call, callback) {
  callback(null, {valorReply1: gerarAleatorio(0,100000)});
}

/**
 * Inicia o servidor RPC que recebe as requisicoes para o servico Teste na porta selecionada
*/
function main() {
  var server = new grpc.Server();
  server.addService(ep_proto.Teste.service, {Teste1: Teste1});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
