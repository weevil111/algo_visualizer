function Bubble() {
    c_delay = 0;
    highlightLine({ 1: "#8e44ad", 2: "#8e44ad" })
    for (var i = 0; i < array_size - 1; i++) {
        for (var j = 0; j < array_size - i - 1; j++) {
            div_update(divs[j], div_sizes[j], "#8e44ad", { 3: "#8e44ad", 4: "red" });//Color update

            if (div_sizes[j] > div_sizes[j + 1]) {
                div_update(divs[j], div_sizes[j], "red", { 4: "red" });//Color update
                div_update(divs[j + 1], div_sizes[j + 1], "red");//Color update

                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                div_update(divs[j], div_sizes[j], "red", { 5: "red" });//Height update
                div_update(divs[j + 1], div_sizes[j + 1], "red", { 6: "red" });//Height update
            }
            div_update(divs[j], div_sizes[j], "#e67e22", { 3: "#e67e22" });//Color update
        }
        div_update(divs[j], div_sizes[j], "green", { 2: "#8e44ad", 7: "green" });//Color update
    }
    div_update(divs[0], div_sizes[0], "green");//Color update

    enable_buttons();
}