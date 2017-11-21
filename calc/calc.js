var displ = document.getElementById("display");

function toscreen(input) {
    displ.value += input;
    if (input === "ca") {
        displ.value = "";
    }
}

function result() {
    input = displ.value;
    var check = /([-*+/^.])\1{1}/g.test(input);
    if (check === true) {
        input = "ERROR";
        displ.value = input;
    } else {
        input = math.eval(input);
        var check1 = /([.])/g.test(input);
        if (check1 === true) {
            displ.value = input.toPrecision(5);
        } else {
            displ.value = input;
        }
    }
}

function clearlast() {
    var num = displ.value;
    var length = num.length - 1;
    var newNum = num.substring(0, length);
    displ.value = newNum;
}

function sqrt() {
    input = displ.value;
    input = Math.sqrt(input);
    displ.value = input.toPrecision(12);
}
