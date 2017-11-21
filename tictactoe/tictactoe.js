var human;
var computer;
var table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var me = [];
var comp = [];
var humWin;
var compWin;
/*var win = [
  ["0","1","2"],
  ["3","4","5"],
  ["6","7","8"],
  ["0","3","6"],
  ["1","4","7"],
  ["2","5","8"],
  ["2","4","6"],
  ["0","4","8"]
];*/
var win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];


document.getElementById("x").onclick = function () {
    human = "X";
    computer = "O";
    document.getElementById("modal").style.display = "none";

}
document.getElementById("o").onclick = function () {
    human = "O";
    computer = "X";
    document.getElementById("modal").style.display = "none";
}

var box = document.querySelectorAll(".cells");
restart();

function restart() {
    for (var i = 0; i < box.length; i++) {
        box[i].innerHTML = "";
        box[i].addEventListener("click", turnClick, false);
    }
    me = [];
    comp = [];
    table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    document.getElementById("modal").style.display = "table";
    document.querySelector(".end").style.display = "none";
}

function turnClick(spot) {
    if (typeof table[spot.target.id] == "number") {
        turn(spot.target.id, human)
        me.push(Number(spot.target.id));
        //console.log(me);
        isItTie();
        isGameOver();
        if (!isGameOver() && !isItTie()) {
            turn(moveComp(), computer)
        }
        isItTie();
        isGameOver();
    }
}

function turn(spotId, player) {
    table[spotId] = player;
    document.getElementById(spotId).innerHTML = player;
}

function freeSpots(table) {
    return table.filter(function (val) {
        return val != "O" && val != "X";
    });
}

function moveComp() {
    comp.push(minmax(table, computer).index);
    //console.log(comp);
    return minmax(table, computer).index;

}

function isGameOver() {
    for (var i = 0; i < win.length; i++) {
        if (humWin = win[i].every(function (val) {
                return me.indexOf(val) >= 0;
            })) {
            //alert ("Human Wins!!!");
            document.querySelector(".end").style.display = "table";
            document.querySelector(".declare").innerHTML = "Human Wins!!!";
            for (var i = 0; i < box.length; i++) {
                box[i].removeEventListener("click", turnClick, false);
            }
        }

        if (compWin = win[i].every(function (val) {
                return comp.indexOf(val) >= 0;
            })) {
            //alert ("Computer Wins!!!");
            document.querySelector(".end").style.display = "table";
            document.querySelector(".declare").innerHTML = "Computer Wins!!!";
            for (var i = 0; i < box.length; i++) {
                box[i].removeEventListener("click", turnClick, false);
            }
        }
    }
}

function isItTie() {
    if (!isGameOver() && me.concat(comp).length === 9) {
        //alert ("It Is A Tie!!!");
        document.querySelector(".end").style.display = "table";
        document.querySelector(".declare").innerHTML = "It Is A Tie Game!!!";
        for (var i = 0; i < box.length; i++) {
            box[i].removeEventListener("click", turnClick, false);
        }
    }
}

function winner(table, player) {
    if (
        (table[0] == player && table[1] == player && table[2] == player) ||
        (table[3] == player && table[4] == player && table[5] == player) ||
        (table[6] == player && table[7] == player && table[8] == player) ||
        (table[0] == player && table[3] == player && table[6] == player) ||
        (table[1] == player && table[4] == player && table[7] == player) ||
        (table[2] == player && table[5] == player && table[8] == player) ||
        (table[0] == player && table[4] == player && table[8] == player) ||
        (table[2] == player && table[4] == player && table[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function minmax(newTable, player) {
    var emptySpots = freeSpots(newTable);

    if (winner(newTable, human)) {
        return {
            score: -10
        };
    } else if (winner(newTable, computer)) {
        return {
            score: 10
        };
    } else if (emptySpots.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < emptySpots.length; i++) {
        var move = {};
        move.index = newTable[emptySpots[i]];
        newTable[emptySpots[i]] = player;

        if (player == computer) {
            var result = minmax(newTable, human);
            move.score = result.score;
        } else {
            var result = minmax(newTable, computer);
            move.score = result.score;
        }

        newTable[emptySpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === computer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];

}
