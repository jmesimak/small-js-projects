var stateArray = [];
var sortAction = 0;

function quicksort(numbers, low, high) {
    if (low < high) {
        pivotLocation = partition(numbers, low, high);
        quicksort(numbers, low, pivotLocation-1);
        quicksort(numbers, pivotLocation+1, high);
    }
}

function partition(numbers, low, high) {
    var pivot = numbers[low];
    var left = low;

    for (var i = low+1; i <= high; i++) {
        if (numbers[i] < pivot) {
            stateArray.push({numbers: numbers.slice(), low: i, high: left});
            left = left + 1;
            var temp = numbers[i];
            numbers[i] = numbers[left];
            numbers[left] = temp;
        }
    }
    stateArray.push({numbers: numbers.slice(), low: i, high: left});
    var temp = numbers[low];
    numbers[low] = numbers[left];
    numbers[left] = temp;

    return left;
}

function QuicksortHandler(numbers) {
    function sort() {
        stateArray = [];
        sortAction = 0;
        quicksort(numbers, 0, numbers.length-1);
    }

    function getStateArray() {
        return stateArray;
    }

    return {
        sort: sort,
        getStateArray: getStateArray
    }
}
