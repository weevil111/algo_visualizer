const progressContainer = document.querySelectorAll(".progress-container")
const algoInputs = Array.from(document.querySelectorAll(".algo-label input"));

async function setProgress() {
  if (!firebaseAuth.currentUser) return;

  const TOTAL_QUESTIONS = 10
  const doc = await firestore.doc(`progress/${firebaseAuth.currentUser.uid}`).get()
  const progress = doc.data() || {};
  for (let i = 0; i < progressContainer.length; i++) {
    const algoName = algoInputs[i].id;
    let questionsSolved = 0
    if (progress[algoName]) {
      questionsSolved = progress[algoName].length;
    }
    progressContainer[i].classList.remove("hidden")
    progressContainer[i].querySelector(".progress").innerText = `${questionsSolved}/${TOTAL_QUESTIONS}`;
    if (questionsSolved === TOTAL_QUESTIONS) {
      progressContainer[i].querySelector(".checked-svg").classList.remove("hidden");
      progressContainer[i].querySelector(".unchecked-svg").classList.add("hidden");
    }
  }
}

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
  localStorage.removeItem("review")
  localStorage.removeItem("quizResponse")
  window.location.href = '/quiz.html'
}

let checkTime = 4;
const intervalRef = setInterval(() => {
  if (checkTime && firebaseAuth.currentUser) {
    setProgress();
    clearInterval(intervalRef)
  }
  checkTime -= 1;
}, 2000)