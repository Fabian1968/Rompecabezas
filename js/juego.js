// Arreglo que contiene las intrucciones del juego 
var instrucciones = ["Utiliza las flechas de tu teclado para mover las piezas.", "Ordénalas hasta lograr las posiciones de la imagen objetivo."];

// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

//Variable que acumula los movimientos realizados por el judagor.
var contador = document.getElementById("contador");
var contadorMovimientos = 0;

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía.
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

// codigosDireccion es un objeto creado para mejorar la lectura del código.
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

function mostrarInstrucciones(instrucciones) {
    //COMPLETADO!!!
    idLista = "listaInstrucciones";
    for (i = 0; i < instrucciones.length; i++) {
        instruccion = instrucciones[i];
        mostrarInstruccionEnLista(instruccion, idLista);
    }
}

function chequearSiGano() {
    //COMPLETADO!!!
    var posicionPieza = 1;
    for (var i = 0; i < grilla.length; i++) {
        for (var j = 0; j < grilla.length; j++) {
            if (grilla[i][j] === posicionPieza) {
                posicionPieza++;
            } else {
                return false;
            }
        }
    }
    return true;
}

function mostrarCartelGanador() {
    //COMPLETADO!!!
    alert("¡FELICITACIONES!\n\nHas completado el juego.");
}

// Función que intercambia dos posiciones en la grilla.
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    //COMPLETADO!!!
    anterior = grilla[filaPos1][columnaPos1];
    grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2]
    grilla[filaPos2][columnaPos2] = anterior;
}

// Actualiza la posición de la pieza vacía.
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    //COMPLETADO!!!
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

// Para chequear si la posición está dentro de la grilla.
function posicionValida(fila, columna) {
    //COMPLETADO!!!
    if (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2) {
        contador.style.color = "black";
        return true
    } else {
        contador.style.color = "red";
        contador.textContent = "Movimiento incorrecto";
        return false;
    }
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Mueve pieza hacia abajo, reemplazándola con la blanca
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    // Mueve pieza hacia arriba, reemplazándola con la blanca
    else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    // Mueve pieza hacia la derecha, reemplazándola con la blanca
    else if (direccion === codigosDireccion.DERECHA) {
        //COMPLETADO!!!
        nuevaColumnaPiezaVacia = columnaVacia + 1;
        nuevaFilaPiezaVacia = filaVacia;

    }

    // Mueve pieza hacia la izquierda, reemplazándola con la blanca
    else if (direccion === codigosDireccion.IZQUIERDA) {
        //COMPLETADO!!!
        nuevaColumnaPiezaVacia = columnaVacia - 1;
        nuevaFilaPiezaVacia = filaVacia;
    }

    // A continuación se chequea si la nueva posición es válida.
    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        //COMPLETADO!!! Agregar la dirección del movimiento al arreglo de movimientos
        guardarUltimoMovimiento(direccion);
    }
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var pieza1 = grilla[fila1][columna1];
    var pieza2 = grilla[fila2][columna2];

    intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */
function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    // Intercambio posiciones en el DOM
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

/*Función agregada que guarda el último movimiento en el array movimientos*/
function guardarUltimoMovimiento(direccion) {
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            var movimiento = '↑';
            break;
        case codigosDireccion.ABAJO:
            movimiento = '↓';
            break;
        case codigosDireccion.DERECHA:
            movimiento = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            movimiento = '←';
            break;
    }
    movimientos.push(movimiento);
    contadorMovimientos++;
    actualizarUltimoMovimiento(direccion);
    contador.textContent = contadorMovimientos;
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
    ultimoMov = document.getElementById('flecha');
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */
function mezclarPiezas(veces) {
    if (veces <= 0) {
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
        codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(direccion);
    contadorMovimientos = 0;
    contador.textContent = "";

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);

}

/* capturarTeclas: Esta función captura "el evento  que se produce 
cuando el usuario presiona una flecha y realiza un movimiento.*/
function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
        if (evento.which === codigosDireccion.ABAJO ||
            evento.which === codigosDireccion.ARRIBA ||
            evento.which === codigosDireccion.DERECHA ||
            evento.which === codigosDireccion.IZQUIERDA) {

            moverEnDireccion(evento.which);

            var gano = chequearSiGano();
            if (gano) {
                setTimeout(function() {
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault();
        }
    })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();