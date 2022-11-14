$(document).ready(function () {

    // LocalStorage import
    var jugador = JSON.parse(localStorage.getItem("jugador"));
    var acertadas = jugador.puntos / 500;
    var color = "";
    var mensaje = "";
    var quizMax = localStorage.getItem("quizMax");
    $(".nombre").html(jugador.nombre);
    $(".puntos").html("Puntaje: " + jugador.puntos + " pts");
    $(".acertadas").html("Acertadas: " + acertadas + "/" + quizMax);

    // Message function
    function setMensaje() {
        if (acertadas < 3) {
            mensaje = "Conoces a Samuel muy poco";
            color = "red";
        } else {
            if (acertadas < 6) {
                mensaje = "Conoces a Samuel un poco";
                color = "orange";
            } else {
                if (acertadas < 9) {
                    mensaje = "Conoces a Samuel más o menos";
                    color = "yellow";
                } else {
                    if (acertadas < 12) {
                        mensaje = "Conoces a Samuel bien";
                        color = "lightgreen";
                    } else {
                        mensaje = "Conoces a Samuel perfectamente crack";
                        color = "green";
                    }
                }
            }
        }
    }

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

    // Events
    $(".quizBox").addClass('animate__animated animate__bounceInUp');
    $(".quizBox").css("display", "block");
    setMensaje();
    setTimeout(() => {
        audioMessage.play();
        setTimeout(() => {
            $(".nombre").addClass('animate__animated animate__bounceInRight');
            $(".nombre").css("display", "block");
            audioBack.play();
            setTimeout(() => {
                $(".resultado").addClass('animate__animated animate__bounceInRight');
                $(".resultado").css("display", "block");
                audioBack.play();
                setTimeout(() => {
                    $(".puntos").addClass('animate__animated animate__bounceInRight');
                    $(".puntos").css("display", "block");
                    audioBack.play();
                    setTimeout(() => {
                        $(".acertadas").addClass('animate__animated animate__bounceInRight');
                        $(".acertadas").css("display", "block");
                        audioBack.play();
                        setTimeout(() => {
                            $(".medidor").addClass('animate__animated animate__bounceInRight');
                            $(".medidor").css("display", "block");
                            $(".medidor").css("transition", "color 1s");
                            $(".medidor").text(mensaje);
                            $(".medidor").css("color", color);
                            audioBack.play();
                            setTimeout(() => {
                                $("button").addClass('animate__animated animate__bounceInRight');
                                $("button").css("display", "block");
                                audioBack.play();
                            }, 800);
                        }, 700);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 200);

    $("button").click(function (e) {
        e.preventDefault();
        $(".quizBox").remove('animate__animated animate__bounceInUp');
        $(".quizBox").addClass('animate__animated animate__bounceOutLeft');
        setTimeout(() => {
            location.href = "../index.html";
        }, 1200);
    });
});