var instrucciones = ["Primera Instrucción", "Segunda Instrucción", "Tercera Instrucción"];


function mostrarInstrucciones(instrucciones) {
    idLista = "lista";
    for (i = 0; i < instrucciones.length; i++) {
        instruccion = instrucciones[i];
        mostrarInstruccionEnLista(instruccion, idLista);
    }
    //COMPLETAR
}

function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}


mostrarInstrucciones(instrucciones);