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

    var audioError = new Audio("../audio/error.mp3");
    audioError.volume = 0.2;

    var audioFail = new Audio("../audio/fail.mp3");
    audioFail.volume = 0.5;

    // Classes definition
    class QuizBox {
        constructor(titulo, opcion1, opcion2, opcion3, opcion4, respuestaCorrecta) {
            this.titulo = titulo;
            this.tiempo = 0;
            this.opciones = ["", "", "", ""];
            this.opcionElegida = "";
            this.respuestaCorrecta = "Opcion 1";
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
            $.map(this.opciones, function (elementOrValue, indexOrKey) {
                $(`.opcion${indexOrKey + 1} p`).text(elementOrValue);
            });
        }
        getOpcionCorrecta() {
            var opciones = document.querySelectorAll(".opcion");
            let i = 0;
            while (i < opciones.length - 1 && opciones[i].innerHTML.trim() != "<p>" + this.respuestaCorrecta + "</p>") {
                console.log(opciones[i].value);
                i++;
            }
            return opciones[i];
        }
    }

    // Events
    $(".quizBox").addClass('animate__animated animate__bounceInRight');
    $(".quizBox").css("display", "block");
    audioBack.play();

    var quiz = new QuizBox();

    $(".opcion").click(function (e) {
        e.preventDefault();
        $(".opcion").css("transition", "none");
        quiz.haSeleccionado = true;
        quiz.opcionElegida = $(this).text().trim();
        $(".opcion").css("border", "2px solid white");
        $(this).css("border", "2px solid yellow");
    });

    $(".enviar").click(function (e) {
        e.preventDefault();
        $(".enviar").prop("disabled", "true");
        if (quiz.haSeleccionado && quiz.opcionElegida == quiz.respuestaCorrecta) {
            jugador.puntos += 500;
            $(".puntos").html(jugador.puntos);
        } else {
            if (!quiz.haSeleccionado) {
                audioError.play();
                document.querySelector(".enviar").disabled = false;
                $(".opcion").css("transition", "border 1s");
                $(".opcion").css("border", "2px solid red");
                $(".opcion").addClass('animate__animated animate__shakeX');
                setTimeout(() => {
                    $(".opcion").css("border", "2px solid white");
                    $(".opcion").removeClass('animate__animated animate__shakeX');
                }, 1000);
            } else {
                audioFail.play();
                $(".quizBox").removeClass('animate__animated animate__bounceInRight');
                $(".quizBox").css("transition", "border 1s");
                $(".quizBox").css("border", "2px solid red");
                $(".quizBox").addClass('animate__animated animate__shakeX');
                $(".verCorrecto").addClass('animate__animated animate__tada');
                $(".verCorrecto").css("display", "inline");
            }
        }
    });
});
