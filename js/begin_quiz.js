const algoInputs = Array.from(document.querySelectorAll(".algo-label input"));
function beginQuiz() {
  const selectedAlgoInputs = algoInputs.filter(el => el.checked);
  if (selectedAlgoInputs.length < 1) {
    alert("You must select at least one algorithm !")
    return;
  }

  const selectedAlgos = selectedAlgoInputs.reduce((acc, val) => {
    acc.push(val.id);
    return acc
  }, [])
  localStorage.setItem("selectedAlgos", JSON.stringify(selectedAlgos));
  window.location.href = '/quiz.html'
}