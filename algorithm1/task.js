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
    var min;
    var secondMin;
    if (numero > 100) {

        for (var i = 0; i < numOfElements - 1; i++) {
            ints = Math.round(Math.random() * ((numero - arrSum) / 2)) + 1;
            arr.push(ints);
            arrSum = arr.reduce((a, b) => a + b, 0);
        }

        lastInt = numero - arrSum;
        arr.push(lastInt);
        //arr.sort((a, b) => b - a);

        //smallest two number of array pushed to the end of array
        min = Math.min.apply(null, arr);
        secondMin = arr.reduce((pre, cur) => (cur < pre && cur !== min) ? cur : pre, Infinity);
        arr.pop(min);
        arr.pop(secondMin);
        arr.push(min);
        arr.push(secondMin);



    } else {
        console.log("Enter Number Larger then 100")
    }
    // check for duplicates(if there are no duplicates two numbers has to be smallest)
    function check(arr) {
        return arr.every(x => arr.indexOf(x) === arr.lastIndexOf(x));
    }
    if (check(arr)) return (arr);
    return makeArray(num);
}
makeArray(101);
