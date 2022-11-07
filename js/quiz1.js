// Wait until the Document is ready (DOM)
$(document).ready(function () {
    // LocalStorage import
    var jugador = JSON.parse(localStorage.getItem("jugador"));
    $(".nombre").html(jugador.nombre);
    $(".puntos").html(jugador.puntos + " pts");
    var quizNumero = parseInt(localStorage.getItem("quiz"));

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
            this.respuestaCorrecta = respuestaCorrecta;
            this.haSeleccionado = false;
            this.setTitulo(titulo);
            this.setOpciones(opcion1, opcion2, opcion3, opcion4);
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
                i++;
            }
            return opciones[i];
        }
    }

    // Events
    $(".quizBox").addClass('animate__animated animate__bounceInRight');
    $(".quizBox").css("display", "block");
    audioBack.play();

    // Checks what quiz question goes next
    switch (quizNumero) {
        case 0:
            var quiz = new QuizBox("¿Cuál es el animal preferido de Samuel?", "Perro", "Capibara", "Gato", "Periquito", "Gato");
            break;
        case 1:
            break;
        default:
            break;
    }

    // Player clicks one option logic button
    var opcionElegida = null;
    $(".opcion").click(function (e) {
        e.preventDefault();
        opcionElegida = this;
        $(".opcion").css("transition", "none");
        quiz.haSeleccionado = true;
        quiz.opcionElegida = $(this).text().trim();
        $(".opcion").css("border", "2px solid white");
        $(this).css("border", "2px solid yellow");
    });

    // Player clicks send button
    $(".enviar").click(function (e) {
        e.preventDefault();
        $(".enviar").prop("disabled", "true");
        if (quiz.haSeleccionado) {
            $(".siguiente").addClass('animate__animated animate__tada');
            $(".siguiente").css("display", "inline");
            if (quiz.opcionElegida == quiz.respuestaCorrecta) {
                jugador.puntos += 500;
                $(".puntos").html(jugador.puntos);
                audioAlert.play();
                opcionElegida.style.border = "2px solid lightgreen";
                $(".quizBox").removeClass('animate__animated animate__bounceInRight');
                $(".quizBox").css("transition", "border 1s");
                $(".quizBox").css("border", "2px solid lightgreen");
                $(".quizBox").addClass('animate__animated animate__bounce');
            } else {
                audioFail.play();
                opcionElegida.style.border = "2px solid red";
                $(".quizBox").removeClass('animate__animated animate__bounceInRight');
                $(".quizBox").css("transition", "border 1s");
                $(".quizBox").css("border", "2px solid red");
                $(".quizBox").addClass('animate__animated animate__shakeX');
                $(".verCorrecto").addClass('animate__animated animate__tada');
                $(".verCorrecto").css("display", "inline");
            }
        } else { // Player hasn't selected any option
            audioError.play();
            document.querySelector(".enviar").disabled = false;
            $(".opcion").css("transition", "border 1s");
            $(".opcion").css("border", "2px solid red");
            $(".opcion").addClass('animate__animated animate__shakeX');
            setTimeout(() => {
                $(".opcion").css("border", "2px solid white");
                $(".opcion").removeClass('animate__animated animate__shakeX');
            }, 1000);
        }
    });

    // Watch solution button logic
    $(".verCorrecto").click(function (e) {
        e.preventDefault();
        quiz.getOpcionCorrecta().style.border = "2px solid lightgreen";
        quiz.getOpcionCorrecta().style.transition = "background-color 1s";
        quiz.getOpcionCorrecta().style.backgroundColor = "lightgreen";
        setTimeout(() => {
            quiz.getOpcionCorrecta().style.backgroundColor = "";
        }, 1000);
    });

    // Move on to the next question button logic
    $(".siguiente").click(function (e) {
        e.preventDefault();
        audioPopUp2.play();
        localStorage.setItem("jugador", JSON.stringify(jugador));
        localStorage.setItem("quiz", (quizNumero++).toString);
        $(".quizBox").removeClass('animate__animated animate__bounceInRight');
        $(".quizBox").addClass('animate__animated animate__bounceOutLeft');
        setTimeout(() => {
            document.location.href = "./quiz1.html";
        }, 1000);
    });
});
