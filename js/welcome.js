// Wait until the Document is ready (DOM)
$(document).ready(function () {


    // Auxiliar functions
    function $(selector) {
        return document.querySelector(selector);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    // LocalStorage import
    var jugador = JSON.parse(localStorage.getItem("jugador"));
    $(".nombre").innerHTML = jugador.nombre;
    $(".puntos").innerHTML = jugador.puntos + " pts";

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

    // Events
    audioPopUp.play();
    $(".dialogBox").classList.add('animate__animated', 'animate__bounceIn');
    $(".dialogBox").style.display = "block";
    $(".buttonNext").classList.add('animate__animated', 'animate__bounceIn');
    $(".buttonBack").classList.add('animate__animated', 'animate__bounceIn');
    $(".currentPage").classList.add('animate__animated', 'animate__bounceIn');
    $(".note").classList.add('animate__animated', 'animate__tada');

    // Note dialog box pop-up
    setTimeout(() => {
        $(".note").style.display = "block";
        audioMessage.play();
    }, 1800);

    // Note dialog close button
    $(".note button").addEventListener("click", () => {
        $(".note").classList.replace('animate__tada', 'animate__fadeOut');
        setTimeout(() => {
            $(".note").remove();
        }, 1000);
    });

    // Player clicks next button or presses right arrow
    var page = 1;
    var esPrimeraVez = true;
    $(".buttonNext").addEventListener("click", nextDialog);
    $("body").addEventListener("keydown", (event) => {
        if (event.key == "ArrowRight") {
            nextDialog();
        }
    });

    // Player clicks back button
    $(".buttonBack").addEventListener("click", prevDialog);
    $("body").addEventListener("keydown", (event) => {
        console.log(event);
        if (event.key == "ArrowLeft") {
            prevDialog();
        }
    });

    // Next dialog logic function
    var numPages = 4;
    $(".currentPage").innerHTML = 1 + "/" + numPages;
    function nextDialog() {
        if (page < numPages) {
            page++;

            if (esPrimeraVez) {
                esPrimeraVez = false;
                $(".buttonBack").style.display = "inline";
                $(".dialogBox").classList.replace('animate__bounceIn', 'animate__backOutLeft');
                audioPopUp2.play();
                setTimeout(() => {
                    $(".dialogBox").classList.replace('animate__backOutLeft', 'animate__backInRight');
                }, 800);
            } else {
                siguienteDialogo();
            }
            dialogoTexto(500);
            if (page == numPages) {
                $(".buttonNext").innerHTML = "Comenzar";
            }
        } else {  // Player clicks confirm button
            $(".wrap").classList.add('animate__animated', 'animate__bounceOut');
            setTimeout(() => {
                audioAlert.play();
                setTimeout(() => {
                    document.location.href = "./quiz1.html";
                }, 800);
            }, 100);
        }
    }

    // Back dialog logic function

    function prevDialog() {
        if (page > 1 && page <= numPages) {
            $(".buttonNext").innerHTML = "Siguiente";
            page--;
            dialogoTexto(50);
            audioBack.play();
        }
    }

    // Dialog Box Animation

    function siguienteDialogo() {
        audioPopUp2.play();
        $(".dialogBox").classList.replace('animate__backInRight', 'animate__backOutLeft');
        setTimeout(() => {
            $(".dialogBox").classList.replace('animate__backOutLeft', 'animate__backInRight');
        }, 800);
    }

    // Dialog Text Change Check
    function dialogoTexto(timout) {
        setTimeout(() => {
            switch (page) {
                case 1:
                    $(".dialogText").innerHTML = "Bienvenido al juego, esta página, realizada y codificada usando exclusivamente HTML, CSS y JavaScript te presentará y guiará por una serie de juegos que le ayudarán a conocer más acerca de quién es Samuel Bolívar Villanueva";
                    break;
                case 2:
                    $(".dialogText").innerHTML = "</br>Se presentarán una serie de preguntas a través de las cuales obtendrás puntos y con los que recibirás un resultado al final del juego";
                    break;

                case 3:
                    $(".dialogText").innerHTML = "</br>Arriba vas a tener la puntuación que tienes actualmente, la cuál irá variando a medida que vayas acertando preguntas";
                    setTimeout(() => {
                        $(".hud").classList.add('animate__animated', 'animate__flash');
                        $(".hud").style.opacity = 1;
                    }, 2000);
                    break;
                case 4:
                    $(".dialogText").innerHTML = "</br>Para empezar, vamos a dirigirnos a un Quiz sobre Samuel, a ver que tan bien lo conoces";
                    break;
                default:
                    break;
            }
            $(".currentPage").innerHTML = page + "/" + numPages;
        }, timout);
    }
});
