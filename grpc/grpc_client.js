var PROTO_PATH = __dirname + '/ep.proto';

var grpc = require('grpc');
var ep_proto = grpc.load(PROTO_PATH).ep;

var client = new ep_proto.Teste('localhost:50051',grpc.credentials.createInsecure()); // se quiser testar com servidor em outra maquina, precisa colocar o ip do servidor aqui
  
var numTeste = 0;
var totalTestes = 10;
var tempos = [];

function main() {

  teste1();
  teste2();
  teste3();
  for (var i = 0; i < 11; i++) {
    teste4(Math.pow(2,i), i);
  }
  teste5();
}


/**
 * Teste 1 - 1 argumento e 1 retorno inteiros iguais a 0
*/
function teste1() {
// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste1({valorRequestInt: 0}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste1({valorRequestInt: 0}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 1: 1 argumento e 1 retorno inteiros iguais a 0 -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 2 - 1 argumento e 1 retorno inteiros aleatorios
*/

function teste2(){
// parametros para geracao dos numeros aleatorios
  var min =  -2147483647;
  var max = 2147483647;

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste2({valorRequestInt: gerarAleatorio(min,max)}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste2({valorRequestInt: gerarAleatorio(min,max)}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 2: 1 argumento e 1 retorno inteiros aleatorios -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 3 - 8 argumentos e 8 retornos inteiros aleatorios
*/

function teste3(){
// parametros para geracao dos numeros aleatorios
  var min =  -2147483647;
  var max = 2147483647;

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste3({valorRequestInt0: gerarAleatorio(min,max), valorRequestInt1: gerarAleatorio(min,max), valorRequestInt2: gerarAleatorio(min,max), valorRequestInt3: gerarAleatorio(min,max), valorRequestInt4: gerarAleatorio(min,max), valorRequestInt5: gerarAleatorio(min,max), valorRequestInt6: gerarAleatorio(min,max), valorRequestInt7: gerarAleatorio(min,max)}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste3({valorRequestInt0: gerarAleatorio(min,max), valorRequestInt1: gerarAleatorio(min,max), valorRequestInt2: gerarAleatorio(min,max), valorRequestInt3: gerarAleatorio(min,max), valorRequestInt4: gerarAleatorio(min,max), valorRequestInt5: gerarAleatorio(min,max), valorRequestInt6: gerarAleatorio(min,max), valorRequestInt7: gerarAleatorio(min,max)}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 3: 8 argumentos e 8 retornos inteiros aleatorios -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 4.x - argumento e retorno strings tamanho n (de 1 a 1024)
*/

function teste4(tamanho, teste){
// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste4({valorRequestString: stringAleatoria(tamanho), tamanho: tamanho}, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    client.Teste4({valorRequestString: stringAleatoria(tamanho), tamanho: tamanho}, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 4." + teste + ": 1 argumento e 1 retorno strings tamanhos " + tamanho + " -------");
  console.log("Execucoes:", totalTestes);
  console.log('Media:', media(tempos));
  console.log('Desvio Padrao:', desvioPadrao(tempos));
  console.log('Maxima:', Math.max.apply(null, tempos));
  console.log('Minima:', Math.min.apply(null, tempos));
}

/**
 * Teste 5 - argumento e retorno complexos (definidos pelo usuario)
*/

function teste5(){
// parametros para geracao dos numeros aleatorios
  var min =  -2147483647;
  var max = 2147483647;

// criacao do objeto coordenadas
  var coordenadas = {
    x: 0,
    y: 0,
    z: 0
  };

// primeira chamada nao eh considerada no teste pois o tempo eh um valor extremo em comparacao as demais
  client.Teste5(coordenadas, function(err, response) {
    if (err) {console.log(err)};
  });

// realizacao dos testes na quantidade de vezes determinada e armazenamento dos tempos no array

  for (numTeste = 0; numTeste < totalTestes; numTeste++) {
    var tempoInicio = process.hrtime(); // registra tempo de inicio
    coordenadas.x = gerarAleatorio(min,max);
    coordenadas.y = gerarAleatorio(min,max);
    coordenadas.z = gerarAleatorio(min,max);
    client.Teste5(coordenadas, function(err, response) {
    if (err) {console.log(err)};
    //console.log(response);
    });
    var tempoFim = process.hrtime(tempoInicio);
    tempos[numTeste] = ((tempoFim[0]*1000) + (tempoFim[1]/1000000)); // converter o tempo para milisegundos
  }

// cálculo e exibicao das estatisticas
  console.log("------- TESTE 5: argumento e retorno complexos -------");
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
