//We only have to change background-color and height of the sorting element.

var speed = 1000;
var delay_time = 10000 / (Math.floor(array_size / 10) * speed);        //Decrease numerator to increase speed.
var c_delay = 0 //This is updated ov every div change so that visualization is visible.
var clearTimeoutArray = []

inp_aspeed.addEventListener("input", changeSpeed);

function changeSpeed() {
    let array_speed = inp_aspeed.value;
    array_speed = parseInt(array_speed, 10)
    switch (array_speed) {
        case 1:
            speed = 1;
            break;
        case 2:
            speed = 10;
            break;
        case 3:
            speed = 100;
            break;
        case 4:
            speed = 1000;
            break;
        case 5:
            speed = 10000;
            break;
    }

    delay_time = 10000 / (Math.floor(array_size / 10) * speed);        //Decrease numerator to increase speed.
}


function div_update(cont, height, color) {
    const clearFunction = setTimeout(function () {
        cont.style = " margin:0% " + margin_size + "%; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
    }, c_delay += delay_time);
    clearTimeoutArray.push(clearFunction)
}

function enable_buttons(now = false) {
    const enableButtonFunction = function () {
        for (var i = 0; i < butts_algos.length; i++) {
            butts_algos[i].classList = [];
            butts_algos[i].disabled = false;
        }
        inp_as.disabled = false;
        inp_gen.innerText = "Generate New Array";
        inp_aspeed.disabled = false;
        isSorting = false;
    }
    if (now) {
        enableButtonFunction();
    } else {
        const clearFn = setTimeout(enableButtonFunction, c_delay += delay_time);
        clearTimeoutArray.push(clearFn)
    }
}
