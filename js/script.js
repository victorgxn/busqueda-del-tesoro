const filas = 4; //Numero filas
const columnas = 5; //Numero columnas

function numAleatorio(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

function crearMatriz() {
  let matriz = [];
  for (let i = 0; i < filas; i++) {
    matriz.push([]);
    for (let j = 0; j < columnas; j++) {
      matriz[i].push('*');
    }
  }
  return matriz;
}

function colocarMinasTesoro(matriz) {
  // Crear una matriz de seguimiento para rastrear ubicaciones ocupadas
  const ubicacionesOcupadas = new Array(filas);
  for (let i = 0; i < filas; i++) {
    ubicacionesOcupadas[i] = new Array(columnas).fill(false);
  }

  // Colocar 3 minas
  for (let i = 0; i < 3; i++) {
    let fila, columna;
    do {
      fila = numAleatorio(0, filas - 1);
      columna = numAleatorio(0, columnas - 1);
    } while (ubicacionesOcupadas[fila][columna]);

    matriz[fila][columna] = 1; // Mina
    ubicacionesOcupadas[fila][columna] = true;
  }

  // Colocar el tesoro
  let fila, columna;
  do {
    fila = numAleatorio(0, filas - 1);
    columna = numAleatorio(0, columnas - 1);
  } while (ubicacionesOcupadas[fila][columna]);

  matriz[fila][columna] = 0; //Tesoro
  return matriz;
}

function pintarTablero(matriz) {
  let str = '';

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      str += matriz[i][j] + (j === columnas - 1 ? '' : ' ');
    }
    str += '\n';
  }
  console.log(str);
}
function comprobarValores(str) {
  const box = str.split(',');
  const num1 = parseInt(box[0]);
  const num2 = parseInt(box[1]);

  if (isNaN(num1) || isNaN(num2) || num1 < 1 || num1 > 4 || num2 < 1 || num2 > 5) {
    alert('Escribe coordenadas correcta');
    return false;
  } else {
    return box;
  }
}
//Parametros : Matriz a comparar, retorno (coordenada x, coordenada y).
function comprobarMatriz(matriz, n1, n2) {
  if (matriz[n1][n2] == '*') {
    return 'vacio';
  } else if (matriz[n1][n2] == 1) {
    return 'mina';
  } else {
    return 'premio';
  }
}
function advertirMinaCercana(matriz, n1, n2) {
  //Verificar las casillas de izq,derecha,arriba,abajo y diagonales
  //Verificar que la casilla en la que quiero mirar esta dentro de los limites
  //console.log('Cuidado mina cerca bla bla') return;
}
function busquedaDelTesoro() {
  let matriz = crearMatriz(); //Matriz con minas y tesoro para comparar
  let matrizJugador = crearMatriz(); //Matriz que enseñaremos al jugador
  matriz = colocarMinasTesoro(matriz);
  console.log('MATRIZ ADMIN MODE');
  pintarTablero(matriz);
  console.log('Empieza la busqueda del tesoro perdido');
  pintarTablero(matrizJugador);
  let finalizarJuego = false;
  let retorno;
  do {
    while (true) {
      let str = prompt('Introduce coordenadas (x,y)', 'Los valores máximos son (4,5)');
      retorno = comprobarValores(str);
      if (retorno !== false) {
        console.log('Coordenadas ->', retorno);
        break;
      }
    }
    let n1 = retorno[0] - 1;
    let n2 = retorno[1] - 1;
    let resultado = comprobarMatriz(matriz, n1, n2);
    switch (resultado) {
      case 'vacio':
        matrizJugador[n1][n2] = '_';
        console.log('Ups, no encontraste nada.')
        pintarTablero(matrizJugador);
        break;
      case 'premio':
        matrizJugador[n1][n2] = '$';
        console.log('HAS ENCONTRADO EL TESORO')
        pintarTablero(matrizJugador);
        finalizarJuego = true;
        break;
      default:
        matrizJugador[n1][n2] = 'X';
        console.log('Te has zampao una MINA PRINGAO, GAME OVER!!')
        pintarTablero(matrizJugador);
        finalizarJuego = true;
    }

  } while (!finalizarJuego)
}
