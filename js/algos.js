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

function merge(unsortedArray) {
    if (unsortedArray.length > 1) {
        const middle = Math.floor(unsortedArray.length / 2);
        const nleft = unsortedArray.slice(0, middle);
        const nright = unsortedArray.slice(middle);
        let index = 0;
        let ileft = 0;
        let iright = 0;

        merge(nleft);
        merge(nright);

        while (ileft < nleft.length && iright < nright.length) {
            if (isLess(
                csvData.findIndex(e => e.nom_commune === nleft[ileft].nom_commune),
                csvData.findIndex(e => e.nom_commune === nright[iright].nom_commune))) {
                unsortedArray[index] = nleft[ileft];
                ileft++;
            } else {
                unsortedArray[index] = nright[iright];
                iright++;
            }
            index++
        }

        while (ileft < nleft.length) {
            unsortedArray[index] = nleft[ileft]
            ileft++
            index++
        }
        while (iright < nright.length) {
            unsortedArray[index] = nright[iright]
            iright++
            index++
        }
    }
}

function mergesort() {
    let temp = JSON.parse(JSON.stringify(csvData));
    merge(temp);
    for (let i = 0; i <= csvData.length-1; i++) {
        let index = csvData.findIndex(e => e.nom_commune === temp[i].nom_commune);
        swap(index, i);
    }
}

function tas(unsortedArr, n) {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heap(unsortedArr, n, i);
    }
}

function heap(unsortedArr, n, i) {
    let bigger = i;
    let ileft = 2 * i + 1;
    let iright = 2 * i + 2;

    if (ileft < n && isLess(bigger, ileft)) {
        bigger = ileft;
    }

    if (iright < n && isLess(bigger, iright)) {
        bigger = iright;
    }

    if (bigger !== i) {
        swap(bigger, i);
        heap(unsortedArr, n, bigger)
    }
}

function heapsort() {
    let n = csvData.length;
    tas(csvData, n);
    for (let i = n - 1; i >= 0; i--) {
        swap(i, 0);
        heap(csvData, i, 0);
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
            mergesort();
            break;
        case 'heap':
            heapsort(csvData, csvData.length - 1);
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
