function makeArray(num) {
    var numero = num;
    var numOfElements = 7;
    var arr = [];
    var arrSum = 0;
    var ints;
    var lastInt;
    if (numero > 100) {

        for (var i = 0; i < numOfElements - 1; i++) {

            ints = Math.round(Math.random() * (numero - arrSum) / 2) + 1;
            if (arr.indexOf(ints) == -1) {
                arr.push(ints);
            } else {
                i--;
            }
            arrSum = arr.reduce((a, b) => a + b, 0);

        }

        lastInt = numero - arrSum;
        arr.push(lastInt);
        arr.sort((a, b) => b - a);


        console.log(arr);
    } else {
        console.log("Enter Number Larger then 100")
    }

    function check(arr) {
        return arr.every(x => arr.indexOf(x) === arr.lastIndexOf(x));
    }
    if (check(arr)) {
        console.log(arr)
    } else {
        makeArray(num);
    }
}
makeArray(101);
