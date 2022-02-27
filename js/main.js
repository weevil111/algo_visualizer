const margin_size = 0.1

var cont = document.getElementById("array_container")
var inp_as = document.getElementById("a_size")
var inp_gen = document.getElementById("a_generate")
var inp_reset = document.getElementById("a_reset")
var inp_aspeed = document.getElementById("a_speed")
var butts_algos = document.querySelectorAll(".algos button");

inp_gen.addEventListener("click", generate_array)
inp_as.addEventListener("input", update_array_size)

var div_sizes = []
var divs = []
var array_size = Number(inp_as.value)
var isSorting = false

function generate_array() {
  if (isSorting) {
    enable_buttons(true);
    clearTimeoutArray.forEach(el => clearTimeout(el)) // clear further updates
  }
  cont.innerHTML = "";
  for (var i = 0; i < array_size; i++) {
    div_sizes[i] = Math.floor(Math.random() * (100 - 10)) + 10;
    divs[i] = document.createElement("div");
    divs[i].innerText = div_sizes[i]
    divs[i].classList.add("div_block")
    if (array_size > 35) {
      divs[i].classList.add("smaller_font")
    } else if (array_size < 20) {
      divs[i].classList.add("larger_font")
    }
    cont.appendChild(divs[i]);
    divs[i].style = " margin: 0 " + margin_size + "%; background-color: #e67e22; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
  }
}

function update_array_size() {
  array_size = Number(inp_as.value)
  generate_array()
}

window.onload = () => {
  update_array_size()
}

for (let i = 0; i < butts_algos.length; i++) {
  butts_algos[i].addEventListener("click", runalgo);
}

function runalgo() {
  disable_buttons();
  isSorting = true

  this.classList.add("algo_selected");
  switch (this.innerHTML) {
    case "Bubble":
      Bubble();
      break;
    case "Selection":
      Selection_sort();
      break;
    case "Insertion":
      Insertion();
      break;
    case "Merge":
      Merge();
      break;
    case "Quick":
      Quick();
      break;
    case "Heap":
      Heap();
      break;
  }
}

function disable_buttons() {
  for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].classList = [];
    butts_algos[i].disabled = true;
    inp_as.disabled = true;
    inp_gen.innerText = "Reset";
    inp_aspeed.disabled = true;
  }
}
