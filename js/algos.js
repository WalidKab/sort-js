// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    const GrenobleLat = 45.166667;
    const GrenobleLong = 5.716667;

    const R = 6371; // kilometres
    const φ1 = city.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = GrenobleLat * Math.PI / 180;
    const Δφ = (GrenobleLat - city.latitude) * Math.PI / 180;
    const Δλ = (GrenobleLong - city.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in kilometres
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    const tmp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = tmp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    return csvData[i].dist < csvData[j].dist;
}


function insertsort() {
    for (let i = 0; i <= csvData.length - 1; i++) {
        for (let j = i + 1; j > 0 && j <= csvData.length - 1; j--) {
            if (isLess([j], j - 1)) {
                swap([j], [j - 1])
            } else {
                break;
            }
        }
    }
}

function selectionsort() {
    for (let i = 0; i <= csvData.length - 1; i++) {
        for (let j = i + 1; j <= csvData.length - 1; j++) {
            if (isLess(j, i)) {
                swap(i, j);
            }
        }
    }
}

function bubblesort() {
    let swapped = false;

    for (let i = 0; i < csvData.length; i++) {
        swapped = false;

        for (let j = 0; j < (csvData.length - i - 1); j++) {
            if (isLess(j + 1, j)) {
                swap(j, j + 1)
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}

function shellsort() {
    let espacements = [301, 132, 57, 23, 10, 4, 1]

    let gap = 701;

    while (gap < csvData.length) {
        gap = gap * 2.3;
    }

    for (let e = 0; e <= espacements.length; e++) {
        let gap = espacements[e];

        for (let i = 0; i + gap < csvData.length; i++) {
            for (let j = i; j >= 0 && j < csvData.length && !isLess(j, j + gap); j = j - gap) {
                swap(j, j + gap);
            }
        }
    }
}

// function mergesort() {
//
// }
//
// function merge(){
//
// }

function merge (/*mid, nleft, nright*/) {
    // if (arrayA.length===0){
    //     return arrayB;
    // }else if (arrayB.length===0){
    //     return arrayA;
    // } else if (isLess(arrayA[0],arrayB[0])){
    //     swap(arrayA[0], arrayB[0])
    //     return arrayA[0]+merge(arrayA[1],arrayB)
    // } else {
    //     swap(arrayB[1], arrayA)
    //     return arrayB[0]+merge(arrayA,arrayB[1])
    // }
}

function mergesort (unsortedArr) {
    // if(unsortedArr.length<=1){
    //     return unsortedArr
    // }else{
    //     return mergesort(merge(unsortedArr.length/2), merge(unsortedArr.length/2+1))
    // }
}

// function organize(unsortedArr){
//     for (let i = 0; i <= unsortedArr.length-1; i++){
//         toTop(unsortedArr, i);
//     }
// }
//
// function toTop(unsortedArr, index){
//     if (index !== 0){
//         swap(index, index/2)
//         toTop(unsortedArr, index/2)
//     }
// }
//
// function toBottom(unsortedArr, item, index){
//     let f = 2*index+1;
//     let max = 0
//     if (isLess(f, item)){
//         if (unsortedArr[f].dist>unsortedArr[2*index].dist){
//             max = f;
//         }else {
//             max = 2*index;
//         }
//     }
//     else if (unsortedArr[max].dist>unsortedArr[index].dist){
//         swap(max, index)
//     }
// }
//
// function heapsort(unsortedArr) {
//     organize(unsortedArr)
//     for (let l = 0; l<=unsortedArr.length-1; l--){
//         swap(0,l)
//         toBottom(unsortedArr, l,0)
//     }
// }

function heapify(arr, n, i)
{
    let smallest = i; // Initialize smallest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is smaller than root
    if (isLess(l,n) && isLess(arr[l], arr[smallest]))
        smallest = l;

    // If right child is smaller than smallest so far
    if (isLess(r,n) && isLess(arr[r], arr[smallest]))
        smallest = r;

    // If smallest is not root
    if (smallest !== i) {
        swap(arr, i, smallest);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, smallest);
    }
}

// main function to do heap sort
function heapsort(arr, n)
{
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2 - 1); i >= 0; i--)
        heapify(arr, n, i);

    // One by one extract an element from heap
    for (let i = n - 1; i >= 0; i--) {
        // Move current root to end
        swap(arr, 0, i);

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

function quicksort(arr, first, last) {

    if (arr.length === 1) return;

    if (first < last) {
        let pi = partition(arr, first, last)
        quicksort(arr, first, pi - 1)
        quicksort(arr, pi + 1, last)
    }
}

function partition(arr, first, last) {
    let i = first - 1;

    for (let j = first; j <= last - 1; j++) {
        if (isLess(j, last)) {
            i++;
            swap(i, j);
        }
    }
    swap(last, i + 1);
    return i + 1;
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            console.log(mergesort(csvData.length));

            break;
        case 'heap':
            heapsort(csvData, csvData.length-1);
            break;
        case 'quick':
            quicksort(csvData, 0, csvData.length - 1);
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
