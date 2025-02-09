function merge(left, right, leftLength, rightLength) {
    //establish indexes for left, right, and new array
    let i = 0;
    let j = 0;
    let k = 0;

    const sorted = [];
    //while the indexes are less than the length of the array
    while (i <= (leftLength - 1) && j <= (rightLength - 1)) {
        //compare left side to right side, if it is smaller then put that in array
        //and change index of new array and left
        if (left[i] < right[j]) {
            sorted[k++] = left[i++];
        //if not, put right side in array and change index of new array and right
        } else {
            sorted[k++] = right[j++];
        }
    }
    //goes through after to check left and right for any stragglers and add them to the end
    for (;i < leftLength; i++) {
        sorted[k++] = left[i];
    }
    for (;j < rightLength; j++) {
        sorted[k++] = right[j];
    }
    return sorted;
}

function mergeSort(array) {
    //if we reach base case of an array of 1 we return
    if (array.length <= 1) {
        return array;
    }
    //if not, find midpoint of array
    let mid = array.length / 2;
    //left side of array
    let left =  mergeSort(array.slice(0, mid));
    //right side of array
    let right = mergeSort(array.slice(mid));
    //merge them together when done splitting
    return merge(left, right, left.length, right.length);
}

export { mergeSort }