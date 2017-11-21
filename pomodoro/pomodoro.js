var sesTime = 25;
var breakTime = 5;
var time;
var paused = false;


document.getElementById("break-time").innerHTML = breakTime;
document.getElementById("ses-time").innerHTML = sesTime;
document.getElementById("time").innerHTML = sesTime;

function increase() {
    sesTime++;
    document.getElementById("ses-time").innerHTML = sesTime;
    document.getElementById("time").innerHTML = sesTime;
}

function decrease() {
    if (sesTime > 1)
        sesTime--;
    document.getElementById("ses-time").innerHTML = sesTime;
    document.getElementById("time").innerHTML = sesTime;
}

function brincrease() {
    breakTime++;
    document.getElementById("break-time").innerHTML = breakTime;
    //document.getElementById("time").innerHTML=breakTime;
}

function brdecrease() {
    if (breakTime > 1)
        breakTime--;
    document.getElementById("break-time").innerHTML = breakTime;
    //document.getElementById("time").innerHTML=breakTime;
}

function brTime() {
    if (breakTime > 0) {
        var breDuration = breakTime * 60;
        var disBreak = document.getElementById("time");
        breakCount(breDuration, disBreak);
    }
}

function sTime() {
    if (sesTime > 0) {
        var sesDuration = sesTime * 60;
        var disSession = document.querySelector("#time");
        startCount(sesDuration, disSession);
    }
}

function startCount(duration, display) {
    var timer = duration,
        min, sec;

    time = setInterval(function () {
        if (!paused) {
            min = parseInt(timer / 60, 10);
            sec = parseInt(timer % 60, 10);

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            display.textContent = "Session Time" + "\n" + min + ":" + sec;

            if (--timer < 0) {
                audiomsg();
                window.clearInterval(time);
                brTime();
            }
        }
    }, 1000);
}

function breakCount(duration1, display1) {
    var timer1 = duration1,
        min1, sec1;

    time = setInterval(function () {
        if (!paused) {
            min1 = parseInt(timer1 / 60, 10);
            sec1 = parseInt(timer1 % 60, 10);

            min1 = min1 < 10 ? "0" + min1 : min1;
            sec1 = sec1 < 10 ? "0" + sec1 : sec1;

            display1.textContent = "Break Time" + "\n" + min1 + ":" + sec1;

            if (--timer1 < 0) {
                audiomsg();
                window.clearInterval(time);
                sTime();
            }
        }
    }, 1000);
}

function countdown() {
    var ses = sesTime * 60;
    var display = document.querySelector('#time');
    startCount(ses, display);
    document.getElementById('start').disabled = true;
    if (document.getElementById('start').disabled = true) {
        document.getElementById('sesincrease').disabled = true;
        document.getElementById('sesdecrease').disabled = true;
        document.getElementById('brincrease').disabled = true;
        document.getElementById('brdecrease').disabled = true;
    }
}
$("#pause").click(function () {
    paused = !paused;
});

function pause() {
    if (!paused) {
        document.getElementById("pause").value = "Resume";
        document.getElementById("pause").innerHTML = "Resume";
    } else {
        document.getElementById("pause").value = "Pause";
        document.getElementById("pause").innerHTML = "Pause";
    }
}

function reset() {
    document.getElementById('start').disabled = false;
    document.getElementById('sesincrease').disabled = false;
    document.getElementById('sesdecrease').disabled = false;
    document.getElementById('brincrease').disabled = false;
    document.getElementById('brdecrease').disabled = false;
    document.getElementById("break-time").innerHTML = 5;
    document.getElementById("ses-time").innerHTML = 25;
    document.getElementById("time").innerHTML = 25;
    window.clearInterval(time);
    paused = false;
    document.getElementById("pause").innerHTML = "Pause";
    sesTime = 25;
    breakTime = 5;
}

function audiomsg() {
    var audio = new Audio("http://onlineclock.net/audio/options/cuckoo-clock.mp3");
    audio.play();
}
