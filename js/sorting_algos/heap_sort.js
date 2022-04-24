function Heap() {
    c_delay = 0;
    highlightLine({ 1: "#e67e22", 2: "red" })
    heap_sort();

    enable_buttons();
}

function swap(i, j) {
    div_update(divs[i], div_sizes[i], "red");//Color update
    div_update(divs[j], div_sizes[j], "red");//Color update

    var temp = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    div_update(divs[i], div_sizes[i], "red");//Height update
    div_update(divs[j], div_sizes[j], "red");//Height update

    div_update(divs[i], div_sizes[i], "#e67e22");//Color update
    div_update(divs[j], div_sizes[j], "#e67e22");//Color update
}

function max_heapify(n, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < n && div_sizes[l] > div_sizes[largest]) {
        if (largest != i) {
            div_update(divs[largest], div_sizes[largest], "#e67e22");//Color update
        }

        largest = l;

        div_update(divs[largest], div_sizes[largest], "red");//Color update
    }

    if (r < n && div_sizes[r] > div_sizes[largest]) {
        if (largest != i) {
            div_update(divs[largest], div_sizes[largest], "#e67e22");//Color update
        }

        largest = r;

        div_update(divs[largest], div_sizes[largest], "red");//Color update
    }

    if (largest != i) {
        swap(i, largest);

        max_heapify(n, largest);
    }
}

function heap_sort() {
    div_update(divs[0], div_sizes[0], "#e67e22", { 9: "red" })
    for (var i = Math.floor(array_size / 2) - 1; i >= 0; i--) {
        div_update(divs[i], div_sizes[i], "#e67e22", { 10: "#e67e22", 11: "red" })
        max_heapify(array_size, i);
        div_update(divs[i], div_sizes[i], "#e67e22", { 10: "#e67e22" })
    }
    div_update(divs[0], div_sizes[0], "#e67e22", { 3: "red" })

    for (var i = array_size - 1; i > 0; i--) {
        swap(0, i);
        div_update(divs[i], div_sizes[i], "green", { 3: "#e67e22", 4: "red" });//Color update
        div_update(divs[i], div_sizes[i], "#8e44ad");//Color update

        max_heapify(i, 0);

        div_update(divs[i], div_sizes[i], "#e67e22", { 3: "#e67e22", 5: "red", 6: "red" });//Color update
        div_update(divs[i], div_sizes[i], "green", { 3: "#e67e22", 6: "green" });//Color update
    }
    div_update(divs[i], div_sizes[i], "green", { 7: "green" });//Color update
}