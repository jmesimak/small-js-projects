function parent(i) {
	return Math.floor(i/2);
}

function left(i) {
	return 2*i;
}

function right(i) {
	return 2*i+1;
}

function heapSize(heap) {
	var counter = 0;
	for (number in heap) {
		if (heap[number] !== undefined) {
			counter++;
		}
	}
	return counter;
}

function swapInArray(arr, a, b) {
	var temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function heapify(arr, i) {
	l = left(i);
	r = right(i);
	var largest;
	if (r <= heapSize(arr)) {
		if (arr[l] > arr[r]) {
			largest = l;
		} else {
			largest = r;
		}

		if (arr[i] < arr[largest]) {
			swapInArray(arr, i, largest);
			heapify(arr, largest);
		}
	} else if (l === heapSize(arr) && arr[i] < arr[l]) {
		swapInArray(arr, i, l);
	}
}

console.log("unheaped: ");
var numbers = [1, 5, 7, 2, 9, 8, 6];
heapify(numbers, 0);
console.log("heap: ");
console.log(numbers);