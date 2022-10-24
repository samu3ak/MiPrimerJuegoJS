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

    if ($("input[name=username]").value == "") {
        $(".errorMsg").style.display = "block";
    } else {
        $(".errorMsg").remove();
        var player = new Player($("input[name=username]").value);
        player.test();
        $(".loginBox").remove();
    }
});
