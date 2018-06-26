var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

var client = new ep_proto.Teste('localhost:50051',grpc.credentials.createInsecure());
  
var numTeste = 0;
var totalTestes = 100;
var tempos = [];

function main() {

  teste0();
  teste1();
  teste2();

}


/**
 * Teste 0 - argumento e retorno inteiros igual a 0
*/
function teste0() {
// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste0({valorRequestInt: 0}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste0({valorRequestInt: 0}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 0: argumento e retorno inteiros igual a 0 -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 1 - argumento e retorno inteiros (aleatório de 1 a 10)
*/

function teste1(){
// criar o array de parametros aleatorios que serao enviados
  var parametros = []
   for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    parametros[numTeste] = gerarAleatorio(1,10);
  }

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste1({valorRequestInt: parametros[0]}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste1({valorRequestInt: parametros[numTeste]}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 1: argumento e retorno inteiros aleatórios de 1 a 10 -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 2 - argumento e retorno inteiros (aleatório de 2.000.000.000 a 2.147.483.647)
*/

function teste2(){
// criar o array de parametros aleatorios que serao enviados
  var parametros = []
   for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    parametros[numTeste] = gerarAleatorio(2000000000,2147483647);
  }

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste2({valorRequestInt: parametros[0]}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes + 1; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste2({valorRequestInt: parametros[numTeste]}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 2: argumento e retorno inteiros aleatórios de 2.000.000.000 a 2.147.483.647 -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Funcoes de apoio
*/

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
