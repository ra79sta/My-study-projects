//Given an integer larger then 100
//make an array of 7 random integer slices of the given integer
// where last two are smaller then all the others.
//Sum of all array items should be the given integer.

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
            arr.push(ints);
            arrSum = arr.reduce((a, b) => a + b, 0);
        }

        lastInt = numero - arrSum;
        arr.push(lastInt);
        arr.sort((a, b) => b - a);

    } else {
        console.log("Enter Number Larger then 100")
    }

    function check(arr) {
        return arr.every(x => arr.indexOf(x) === arr.lastIndexOf(x));
    }
    if (check(arr)) {
        //console.log(arr)
        return(arr);
    } else {
       return makeArray(num);
    }
}
makeArray(101);
