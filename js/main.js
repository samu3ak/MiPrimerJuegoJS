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

var audioMessage = new Audio("audio/message.mp3");
audioMessage.volume = 0.2;

// Events

// Player clicks submit button in name select screen
$("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let campoUsuario = $("input[name=username]");

    if (campoUsuario.value == "") {
        $(".errorMsg").style.display = "inline";
        $(".catGif").style.display = "inline";
        $(".loginBox").style.animation = "shake 0.8s 1";
        campoUsuario.style.transition = "background-color 1s";
        campoUsuario.style.backgroundColor = "#ff3737";
        setInterval(() => {
            campoUsuario.style.backgroundColor = "#ffffff";
            $(".loginBox").style.animation = "";
        }, 1000);
        audioError.play();
    } else {
        $(".loginBox").classList.add('animate__animated', 'animate__backOutLeft');
        audioMessage.play();
    }
});
