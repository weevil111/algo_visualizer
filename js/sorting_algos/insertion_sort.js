function Insertion() {
    c_delay = 0;
    highlightLine({ 1: "red" })
    for (var j = 0; j < array_size; j++) {
        div_update(divs[j], div_sizes[j], "#8e44ad", { 2: "#8e44ad", 3: "red" });//Color update

        var key = div_sizes[j];
        var i = j - 1;
        while (i >= 0 && div_sizes[i] > key) {
            div_update(divs[i], div_sizes[i], "red", { 4: "red" });//Color update
            div_update(divs[i + 1], div_sizes[i + 1], "red");//Color update

            div_sizes[i + 1] = div_sizes[i];

            div_update(divs[i], div_sizes[i], "red", { 4: "#e67e22" });//Height update
            div_update(divs[i + 1], div_sizes[i + 1], "red");//Height update

            div_update(divs[i], div_sizes[i], "#e67e22", { 5: "red" });//Color update
            if (i == (j - 1)) {
                div_update(divs[i + 1], div_sizes[i + 1], "#8e44ad");//Color update
            }
            else {
                div_update(divs[i + 1], div_sizes[i + 1], "#e67e22");//Color update
            }
            i -= 1;
        }
        div_sizes[i + 1] = key;

        for (var t = 0; t < j; t++) {
            const pseudoCodePayload = { 6: "red" }
            if (t == j - 1) pseudoCodePayload[7] = "green"
            div_update(divs[t], div_sizes[t], "green", pseudoCodePayload);//Color update
        }
    }
    div_update(divs[j - 1], div_sizes[j - 1], "green");//Color update

    enable_buttons();
}