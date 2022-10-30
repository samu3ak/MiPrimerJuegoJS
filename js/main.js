// Auxiliar functions
function $(selector) {
    return document.querySelector(selector);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Classes definition
class Player {
    constructor(name) {
        this.name = name;
        this.pts = 0;
    }
    test() {
        console.log(this.name);
    }
}

// Text boxes

// Audio variables declaration & Volume adjustment
var audioError = new Audio("audio/error.mp3");
audioError.volume = 0.2;

var audioPopUp = new Audio("audio/alert.mp3");
audioPopUp.volume = 1;

// Events

// Player clicks submit button in name select screen
$("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let campoUsuario = $("input[name=username]");

    // User left the username field empty
    if (campoUsuario.value == "") {
        $(".errorMsg").style.display = "inline";
        $(".catGif").style.display = "inline";
        $(".errorMsg").classList.add('animate__animated', 'animate__heartBeat');
        $(".catGif").classList.add('animate__animated', 'animate__swing');
        $(".loginBox").style.animation = "shake 0.8s 1";
        campoUsuario.style.transition = "background-color 1s";
        campoUsuario.style.backgroundColor = "#ff3737";
        setTimeout(() => {
            campoUsuario.style.backgroundColor = "#ffffff";
        }, 1000);
        audioError.play();
    } else {
        $(".loginBox").style.animation = "";
        $(".loginBox").classList.add('animate__animated', 'animate__backOutLeft');
        audioPopUp.play();
        setTimeout(() => {
            $(".loginBox").remove();
            setTimeout(() => {
                document.location.href = "html/welcome.html";
            }, 200);
        }, 500);
    }
});
