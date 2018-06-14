var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

function main() {
  var client = new ep_proto.Teste('localhost:50051',
                                       grpc.credentials.createInsecure());
  
  var numTeste = 0;
  var totalTestes = 10;
  var tempos = [];

/**
 * Teste 1 - operacao com argumento inteiro e com valor de retorno inteiro (de 0 a 100000)
*/

// criar o array de parametros aleatorios que serao enviados
  var parametros = []
   for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    parametros[numTeste] = gerarAleatorio(0,100000);
  }

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste1({valorRequest1: parametros[0]}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste1({valorRequest1: parametros[numTeste]}, function(err, response) {
    if (err) {console.log(err)};
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao da media e desvio padrao
  console.log("Estatisticas de tempos para o Teste 1:");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));

}

function desvioPadrao(values){
  var avg = media(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = media(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function media(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function gerarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
