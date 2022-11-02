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

// Classes definition
class QuizBox{
    constructor(){
        this.titulo = "";
        this.tiempo = 0;
        this.opciones = ["","","",""];
        this.haSeleccionado = false;
    }
}

