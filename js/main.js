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


// Events

// Cuando el jugador designa su nombre
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
        }, 1000);
    } else {
        var player = new Player(campoUsuario.value);
        player.test();
        $(".errorMsg").remove();
        $(".loginBox").remove();
    }
});
