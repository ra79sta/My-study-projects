var simon = [];
var player = [];
var level = 0;
var numberOfLevels = 20;
var stricted = false;
var error = false;
var id;
var color;
var buttonSounds = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green 
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red 
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
]
var errorSound = "http://freesound.org/data/previews/244/244932_4486188-lq.mp3";

var start = document.querySelector(".startBtn");
var strict = document.querySelector(".strictBtn");
var disPlay = document.querySelector(".dis");
var swiTch = document.getElementById("offOn");
var indicator = document.getElementById("light");
var pads = document.querySelectorAll(".button");
document.getElementById("modal").style.display = "none"
swiTch.addEventListener("click", isOnOrOff, false);

function reset() {
    level = 0;
    simon = [];
    player = [];
    error = false;
}

function startGame() {
    reset();
    level++;
    disPlay.style.color = "red";
    for (var i = 0; i < pads.length; i++) {
        pads[i].addEventListener("click", padsPress, false);
    }
    // setTimeout(function() {
    simonSequence();
    //},1000);  
}

function isOnOrOff() {
    if (swiTch.checked) {
        start.addEventListener("click", startGame, false);
        strict.addEventListener("click", isStrict, false);
        indicator.style.backgroundColor = "rgb(60, 60, 60)";
        disPlay.innerHTML = "--";
        disPlay.style.color = "red";
        error = false;
    } else {
        for (var i = 0; i < pads.length; i++) {
            pads[i].removeEventListener("click", padsPress, false);
        }
        start.removeEventListener("click", startGame, false)
        disPlay.innerHTML = "--";
        disPlay.style.color = "";
        strict.removeEventListener("click", isStrict, false);
        indicator.style.backgroundColor = "rgb(60, 60, 60)";
        stricted = false;
        simon = [];
        player = [];
        level = 0;
        error = true;
    }
}

function isStrict() {
    stricted = !stricted;
    if (!stricted) {
        indicator.style.backgroundColor = "rgb(60, 60, 60)";
        return false;
    } else {
        indicator.style.backgroundColor = "red";
        return true;
    }
}

function sounds(id) {
    var sound = new Audio(buttonSounds[id]);
    sound.play();
}

function soundsAndColors(id, color) {
    document.getElementById(id).classList.add(color + "-active");
    sounds(id);
    setTimeout(function () {
        document.getElementById(id).classList.remove(color + "-active")
    }, 500);
}

function sequence() {
    var randomPads = Math.floor(Math.random() * 4);
    simon.push(randomPads);
}

function simonSequence() {
    if (level < 10) {
        disPlay.innerHTML = "0" + level;
    } else {
        disPlay.innerHTML = level;
    }
    if (!error) {
        sequence();
    }
    var i = 0;
    var interval = setInterval(function () {
        id = simon[i];
        color = document.getElementById(id).classList[2];
        soundsAndColors(id, color);
        i++;
        if (i == simon.length) {
            clearInterval(interval);
        }
    }, 900);
}

function padsPress(spot) {
    id = spot.target.id;
    //console.log(id);
    color = document.getElementById(id).classList[2];
    //console.log(player);
    playerSequence();
}

function playerSequence() {
    player.push(id);
    soundsAndColors(id, color);
    if (!checkArrays()) {
        errorMade();
        error = true;
        player = [];
        setTimeout(function () {
            simonSequence();
        }, 1000);
        if (stricted) {
            errorMade();
            error = true;
            simon = [];
            player = [];
            setTimeout(function () {
                startGame();
            }, 1000);
        }
    } else if (player.length == simon.length && player.length < numberOfLevels) {
        player = [];
        error = false;
        setTimeout(function () {
            level++;
            simonSequence();
        }, 1000);
    }
    if (player.length === numberOfLevels) {
        setTimeout(function () {
            winner();
        }, 300)
        setTimeout(function () {
            startGame();
        }, 2300)

    }
}

function checkArrays() {
    for (var i = 0; i < player.length; i++) {
        if (player[i] != simon[i]) {
            //id = player[i];
            return false;
        }
    }
    return true;
}

function errorMade() {
    var x = 0;
    new Audio(errorSound).play();
    var err = setInterval(function () {
        x++;
        disPlay.innerHTML = "XXX";
        if (x == 5) {
            if (level < 10) {
                disPlay.innerHTML = "0" + level;
            } else {
                disPlay.innerHTML = level;
            }
            clearInterval(err);
            player = [];
            x = 0;
        }
    }, 200);
}

function winner() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("win").innerHTML = "YOU WON!!!"
    setTimeout(function () {
        document.getElementById("modal").style.display = "none";
    }, 2000);
}
