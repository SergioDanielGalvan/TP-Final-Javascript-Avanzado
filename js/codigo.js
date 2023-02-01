let maximo, mmedio, reproducir, pausa, barra, progreso, silenciar, volumen, bucle;
let tituloPrincipal, tituloHistoria, tituloJuego;
let seccionPrincipal, seccionHistoria, seccionJuego;

function iniciarPrincipal( event ) {
    // Cargo los elementos en las variables.
    tituloPrincipal =  document.getElementById("HeaderTitulo1");
    seccionPrincipal =  document.getElementById("Principal");
    seccionHistoria =  document.getElementById("CardHistoria");
    seccionJuego =  document.getElementById("CardJuego");
    maximo = 300;
    mmedio = document.getElementById("medio");
    imagen_video = document.getElementById("imagen-video");
    reproducir = document.getElementById("reproducir");
    pausa = document.getElementById("pausar");
    barra = document.getElementById("barra");
    progreso = document.getElementById("progreso");
    silenciar = document.getElementById("silenciar");
    volumen = document.getElementById("volumen");
    duracion = document.getElementById("tiempototal");
    reproducir.addEventListener("click", presionar);
    pausa.addEventListener("click", pausar);
    silenciar.addEventListener("click", sonido);
    barra.addEventListener("click", mover);
    volumen.addEventListener("change", nivel);

    // Activar Sección Principal
    tituloPrincipal.innerText = "PROGRAMACION E HISTORIA";
    seccionPrincipal.style.display = "block";
    // Desactivar Sección Historia
    seccionHistoria.style.display = "none";
    mmedio.pause();
    mmedio.currentTime = 0;
    // Desactivar Sección Juego
    seccionJuego.style.display = "none";
}

function iniciarHistoria( event ) {
    // Desactivar Sección Principal
    seccionPrincipal.style.display = "none";
    // Activar Sección Historia
    tituloPrincipal.innerText = "HISTORIA DE LA PROGRAMACION";
    seccionHistoria.style.display = "block";
    // Desactivar Sección Juego
    seccionJuego.style.display = "none";
    iniciarvideo();
}

function iniciarJuego( event ) {
    // Desactivar Sección Principal
    seccionPrincipal.style.display = "none";
    // Desactivar Sección Historia
    seccionHistoria.style.display = "none";
    mmedio.pause();
    mmedio.currentTime = 0;
    // Activar Sección Juego
    seccionJuego.style.display = "block";
    tituloPrincipal.innerText = "JUGUEMOS UN POCO";
}

function iniciarvideo() {
    //duracion.innerText = "Duracion: " + mmedio.duration
    duracion.innerText = "Duracion: " + tiempoTotal(mmedio.duration)
    imagen_video.style.display = "flex";
    mmedio.style.display = "none"
    mmedio.pause();
    mmedio.currentTime = 0;
}

function presionar() {
    if (!mmedio.paused && !mmedio.ended) {
        mmedio.pause();
        clearInterval(bucle);
    }
    else {
        imagen_video.style.display = "none";
        mmedio.style.display = "block"
        mmedio.play();
        bucle = setInterval(estado, 1000);
        duracion.value = mmedio.duration;
    }
    // Falta el disabled del elemento button
}

function pausar() {
    mmedio.pause();
}

function estado() {
    if (!mmedio.ended) {
        let largo = parseInt(mmedio.currentTime * maximo / mmedio.duration);
        progreso.style.width = largo + "px";
    } 
    else {
        progreso.style.width = "0px";
        reproducir.value = ">";
        clearInterval(bucle);
    }
}

function mover(evento) {
    if (!mmedio.paused && !medio.ended) {
    let ratonX = evento.offsetX - 2;
    if (ratonX < 0) {
        ratonX = 0;
    } else if (ratonX > maximo) {
        ratonX = maximo;
    }
    let tiempo = ratonX * mmedio.duration / maximo;
    mmedio.currentTime = tiempo;
    progreso.style.width = ratonX + "px";
    }
}

function sonido() {
    if ( silenciar.innerText == "Silencio" ) {
        mmedio.muted = true;
        silenciar.innerText = "Sonido";
    } 
    else {
        mmedio.muted = false;
        silenciar.innerText = "Silencio";
    }
}

function nivel() {
    mmedio.volume = volumen.value;
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // siempre devuelve tipo cadena
}

function tiempoTotal( tiempo ) {
    let m = "00", s = "00";
    if (!mmedio.ended) {
        m = parseInt(mmedio.duration, 10);
        s = parseInt( (parseFloat(mmedio.duration) - parseInt(mmedio.duration) ) * 60 ) 
        s = zeroFill( s, 2)
        //return mmedio.duration;
    }
    return m + ":" + s;
}

function reiniciarRompecabezas( event ) {
    /*
    window.location.reload();
    iniciarJuego();
    */
    iniciarRompecabezas();
}

function allowDropImg( event ) {
    event.preventDefault();
  }

function dragImg( event ) {
    event.dataTransfer.setData("text", event.target.id);
}

function dropImg( event ) {
    let nodoD, nodoP;
    event.preventDefault();
    let data = event.dataTransfer.getData("text");

    nodoD = document.getElementById( data );
    nodoD.parentNode.style.display = "none";
    nodoP = event.target;
    if ( nodoP.localName == "p" || nodoP.localName == "P"){
        // El drop fue sobre el elemento child
        // Cambio al nodo padre
        nodoP = nodoP.parentNode;
    }
    for ( let i = 0; i < nodoP.childNodes.length; i++ ) {
        if ( nodoP.childNodes[i].nodeName == "P" ) {
            nodoP.childNodes[i].remove();
            break;
        }
    }
    //event.target.appendChild( document.getElementById( data ) );
    nodoP.appendChild( nodoD );
}

let CajaOrigen1, CajaOrigen2, CajaOrigen3;
let CajaDestino1, CajaDestino2, CajaDestino3;

function iniciarRompecabezas() {
    let nodop, nodoi, nodoj;
    CajaDestino1 = document.getElementById("caja1");
    CajaDestino2 = document.getElementById("caja2");
    CajaDestino3 = document.getElementById("caja3");
    nodoj = CajaDestino1.querySelector("P");
    //if ( CajaDestino1.childNodes.length == 1 ) {
    if ( nodoj == null ) {
        nodop = document.createElement("p");
        nodop.textContent = "Arrastre y suelte la imagen aquí";
        CajaDestino1.appendChild(nodop);
    }
    nodoj = CajaDestino1.querySelector("img");
    if ( nodoj != null ) {
        nodoj.remove();
    }

    nodoj = CajaDestino2.querySelector("P");
    //if ( CajaDestino2.childNodes.length == 1 ) {
    if ( nodoj == null ) {
        nodop = document.createElement("p");
        nodop.textContent = "Arrastre y suelte la imagen aquí";
        CajaDestino2.appendChild(nodop);
    }
    nodoj = CajaDestino2.querySelector("img");
    if ( nodoj != null ) {
        nodoj.remove();
    }

    // if ( CajaDestino3.childNodes.length == 1 ) {
    nodoj = CajaDestino3.querySelector("P");
    if ( nodoj == null ) {
        nodop = document.createElement("p");
        nodop.textContent = "Arrastre y suelte la imagen aquí";
        CajaDestino3.appendChild(nodop);
    }
    nodoj = CajaDestino3.querySelector("img");
    if ( nodoj != null ) {
        nodoj.remove();
    }

    CajaOrigen1 = document.getElementById("img1");
    CajaOrigen2 = document.getElementById("img2");
    CajaOrigen3 = document.getElementById("img3");

    CajaOrigen1.style.display = "";
    nodoj = CajaOrigen1.querySelector("img");
    //if ( CajaOrigen1.childNodes.length == 0 ) {
    if ( nodoj == null ) {
        nodoi = document.createElement("img");
        nodoi.setAttribute("id", "imagen1");
        nodoi.setAttribute("src", "./imagenes/rompe2.png");
        nodoi.setAttribute("alt", "imagen-rompecabezas");
        nodoi.setAttribute("draggable", "true");
        nodoi.setAttribute("ondragstart", "dragImg( event )");
        CajaOrigen1.appendChild(nodoi);
    }

    CajaOrigen2.style.display = "";
    nodoj = CajaOrigen2.querySelector("img");
    //if ( CajaOrigen2.childNodes.length == 0 ) {
    if ( nodoj == null ) {
        nodoi = document.createElement("img");
        nodoi.setAttribute("id", "imagen2");
        nodoi.setAttribute("src", "./imagenes/rompe1.png");
        nodoi.setAttribute("alt", "imagen-rompecabezas");
        nodoi.setAttribute("draggable", "true");
        nodoi.setAttribute("ondragstart", "dragImg( event )");
        CajaOrigen2.appendChild(nodoi);
    }
    
    CajaOrigen3.style.display = "";
    nodoj = CajaOrigen3.querySelector("img");
    //if ( CajaOrigen3.childNodes.length == 0 ) {
    if ( nodoj == null ) {
        nodoi = document.createElement("img");
        nodoi.setAttribute("id", "imagen3");
        nodoi.setAttribute("src", "./imagenes/rompe3.png");
        nodoi.setAttribute("alt", "imagen-rompecabezas");
        nodoi.setAttribute("draggable", "true");
        nodoi.setAttribute("ondragstart", "dragImg( event )");
        CajaOrigen3.appendChild(nodoi);
    }

}

iniciarRompecabezas();

window.addEventListener("load", iniciarPrincipal);
