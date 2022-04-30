function Bubble() {
    c_delay = 0;
    highlightLine({ 1: "#8e44ad" })
    for (var i = 0; i < array_size - 1; i++) {
        for (var j = 0; j < array_size - i - 1; j++) {
            div_update(divs[j], div_sizes[j], "#8e44ad", { 2: "#8e44ad", 3: "red" });//Color update

            if (div_sizes[j] > div_sizes[j + 1]) {
                div_update(divs[j], div_sizes[j], "red", { 3: "red" });//Color update
                div_update(divs[j + 1], div_sizes[j + 1], "red");//Color update

                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                div_update(divs[j], div_sizes[j], "red", { 4: "red" });//Height update
                div_update(divs[j + 1], div_sizes[j + 1], "red");//Height update
            }
            div_update(divs[j], div_sizes[j], "#e67e22", { 2: "#e67e22" });//Color update
        }
        div_update(divs[j], div_sizes[j], "green", { 5: "green" });//Color update
    }
    div_update(divs[0], div_sizes[0], "green");//Color update

    enable_buttons();
}