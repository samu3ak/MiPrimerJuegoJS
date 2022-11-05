// Wait until the Document is ready (DOM)
$(document).ready(function () {
    // LocalStorage import
    var jugador = JSON.parse(localStorage.getItem("jugador"));
    $(".nombre").html(jugador.nombre);
    $(".puntos").html(jugador.puntos);

    // Audio variables declaration & Volume adjustment
    var audioAlert = new Audio("../audio/alert.mp3");
    audioAlert.volume = 1;

    var audioPopUp = new Audio("../audio/popup.mp3");
    audioPopUp.volume = 1;

    var audioPopUp2 = new Audio("../audio/popup2.mp3");
    audioPopUp2.volume = 0.5;

    var audioBack = new Audio("../audio/back.mp3");
    audioBack.volume = 1;

    var audioMessage = new Audio("../audio/message.mp3");
    audioMessage.volume = 0.4;

    // Classes definition
    class QuizBox {
        constructor(titulo) {
            this.titulo = titulo;
            this.tiempo = 0;
            this.opciones = ["", "", "", ""];
            this.haSeleccionado = false;
            $(".quizBox .titulo").text(this.titulo);
            $(".quizBox .tiempo").text(this.tiempo + "s");
        }
        setTitulo(titulo) {
            $(".quizBox .titulo").text(titulo);
        }
        setOpciones(opcion1, opcion2, opcion3, opcion4) {
            this.opciones[0] = opcion1;
            this.opciones[1] = opcion2;
            this.opciones[2] = opcion3;
            this.opciones[3] = opcion4;
        }
    }
    var quiz = new QuizBox();
});

