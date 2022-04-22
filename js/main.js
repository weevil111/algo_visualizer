const margin_size = 0.1

var cont = document.getElementById("array_container")
var inp_as = document.getElementById("a_size")
var btn_gen = document.getElementById("a_generate")
var inp_reset = document.getElementById("a_reset")
var inp_aspeed = document.getElementById("a_speed")
var algo_buttons_container = document.querySelector(".algos")
var psuedo_code_container = document.querySelector(".pseudo_code")
var butts_algos = document.querySelectorAll(".algos button");

btn_gen.addEventListener("click", generate_array)
inp_as.addEventListener("input", update_array_size)

var div_sizes = []
var divs = []
var array_size = Number(inp_as.value)
var isSorting = false

function generate_array(e) {
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
  algo_buttons_container.classList.add("hidden")
  psuedo_code_container.classList.remove("hidden")
  isSorting = true

  this.classList.add("algo_selected");
  switch (this.innerText) {
    case "Bubble":
      addPsuedoCode("bubble_sort")
      Bubble();
      break;
    case "Selection":
      addPsuedoCode("selection_sort")
      Selection_sort();
      break;
    case "Insertion":
      addPsuedoCode("insertion_sort")
      Insertion();
      break;
    case "Merge":
      addPsuedoCode("merge_sort")
      Merge();
      break;
    case "Quick":
      addPsuedoCode("quick_sort")
      Quick();
      break;
    case "Heap":
      addPsuedoCode("heap_sort")
      Heap();
      break;
  }
}

function disable_buttons() {
  for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].classList = [];
    butts_algos[i].disabled = true;
  }
  inp_as.disabled = true;
  btn_gen.innerText = "Reset";
  inp_aspeed.disabled = true;
}
