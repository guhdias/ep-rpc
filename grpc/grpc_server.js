var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

// Implementacao do metodo
function Teste0(call, callback) {
  //console.log(call.request);
  callback(null, {valorReplyInt: 0});
}

function Teste1(call, callback) {
  //console.log(call.request);
  var min =  -2147483647;
  var max = 2147483647;
  callback(null, {valorReplyInt: gerarAleatorio(min,max)});
}

function Teste2(call, callback) {
  //console.log(call.request);
  var min =  -2147483647;
  var max = 2147483647;
  callback(null, {valorReplyInt0: gerarAleatorio(min,max), valorReplyInt1: gerarAleatorio(min,max), valorReplyInt2: gerarAleatorio(min,max), valorReplyInt3: gerarAleatorio(min,max), valorReplyInt4: gerarAleatorio(min,max), valorReplyInt5: gerarAleatorio(min,max), valorReplyInt6: gerarAleatorio(min,max), valorReplyInt7: gerarAleatorio(min,max)});
}

function Teste3(call, callback) {
  //console.log(call.request);
  callback(null, {valorReplyString: stringAleatoria(call.request.tamanho), tamanho: call.request.tamanho});
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
