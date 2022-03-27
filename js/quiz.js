const review = window.localStorage.getItem("review") === "true";
const loader = document.querySelector(".loader")
const quesNumberEl = document.querySelector(".question-no");
const questionStatementEl = document.querySelector(".quiz-title");
const quizBody = document.querySelector(".quiz-body")
const quizSubtitle = document.querySelector(".quiz-subtitle")
const inputElements = Array.from(quizBody.querySelectorAll("input"));
const answerOptionsArray = Array.from(document.querySelectorAll(".quiz-answer"));

const tooltip = document.querySelector(".tooltiptext")
const progressbar = document.querySelector(".quiz-progress")

const saveBtn = document.querySelector(".btn-save");
const clearBtn = document.querySelector(".btn-clear");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const submitBtn = document.querySelector("#submit-btn");

const TOTAL_QUESTIONS = 10;
let quizList = [];
let currentQuestionNumber = 0;

async function fetchQuiz() {
  const selectedAlgos = JSON.parse(localStorage.getItem("selectedAlgos"));
  if (!selectedAlgos) {
    alert("No Algo selected ! Please select one");
    window.location.href = '/begin-quiz.html'
  }
  await fillQuizList(selectedAlgos);

  // Shuffle the quiz list:
  quizList.sort(() => Math.random() > 0.5 ? 1 : -1)
  quizList = quizList.slice(0, TOTAL_QUESTIONS)

  // Set the first question:
  nextQuestion();
  loader.classList.add("hidden")
}

async function fillQuizList(selectedAlgos) {
  try {
    for (const algo of selectedAlgos) {
      const snapshot = await firestore.collection(`questions/sorting/${algo}`).get()
      snapshot.forEach((doc) => {
        quizList.push({
          category: algo,
          ...doc.data()
        })
      });
    }
  } catch (err) {
    console.log("Couldn't fetch questions ", err);
  }
}


function nextQuestion() {
  if (currentQuestionNumber === TOTAL_QUESTIONS - 1) {
    if (review) {
      nextBtn.disabled = true
    } else {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    }
  } else if (currentQuestionNumber === 1) {
    prevBtn.disabled = false
  }

  currentQuestionNumber += 1;
  const currentQuestion = quizList[currentQuestionNumber - 1];
  quesNumberEl.innerText = `Question ${currentQuestionNumber}/${TOTAL_QUESTIONS}`;
  questionStatementEl.innerText = currentQuestion.question;
  answerOptionsArray.forEach((el, index) => {
    const option = currentQuestion.options[index];
    if (review) {
      if (option.id == currentQuestion.answer) {

        el.classList.add("bg-green");
        el.classList.remove("bg-red");
      } else if (option.id == currentQuestion.selectedAnswer) {
        el.classList.add("bg-red");
        el.classList.remove("bg-green")
      } else {
        el.classList.remove("bg-red");
        el.classList.remove("bg-green")
      }
      el.classList.add('option-disabled')
    }
    el.innerHTML = `
    <input type="radio" name="option" 
    ${option.id == currentQuestion.selectedAnswer ? 'checked' : ''} 
    id="${option.id}"
    ${review ? 'disabled' : ''}
    >
    ${option.value}
    `
  })
  if (currentQuestion.selectedAnswer == currentQuestion.answer) {
    quizSubtitle.innerText = "Hurray! You answered it correctly."
  } else if (!currentQuestion.selectedAnswer) {
    quizSubtitle.innerText = "Oops! You forgot to answer this question."
  } else {
    quizSubtitle.innerText = "Ouch! The selected answer is incorrect."
  }
}

function prevQuestion() {
  if (currentQuestionNumber === 2) {
    prevBtn.disabled = true;
  } else if (currentQuestionNumber === TOTAL_QUESTIONS) {
    nextBtn.classList.remove("hidden");
    nextBtn.disabled = false;
    submitBtn.classList.add("hidden")
  }

  currentQuestionNumber -= 1;
  const currentQuestion = quizList[currentQuestionNumber - 1];
  quesNumberEl.innerText = `Question ${currentQuestionNumber}/${TOTAL_QUESTIONS}`;
  questionStatementEl.innerText = currentQuestion.question;
  answerOptionsArray.forEach((el, index) => {
    const option = currentQuestion.options[index];
    if (review) {
      if (option.id == currentQuestion.answer) {

        el.classList.add("bg-green");
        el.classList.remove("bg-red");
      } else if (option.id == currentQuestion.selectedAnswer) {
        el.classList.add("bg-red");
        el.classList.remove("bg-green")
      } else {
        el.classList.remove("bg-red");
        el.classList.remove("bg-green")
      }
      el.classList.add('option-disabled')
    }
    el.innerHTML = `
    <input type="radio" name="option" 
    ${option.id == currentQuestion.selectedAnswer ? 'checked' : ''} 
    id="${option.id}"
    ${review ? 'disabled' : ''}
    >
    ${option.value}
    `
  })
  if (currentQuestion.selectedAnswer == currentQuestion.answer) {
    quizSubtitle.innerText = "Hurray! You answered it correctly."
  } else if (!currentQuestion.selectedAnswer) {
    quizSubtitle.innerText = "Oops! You forgot to answer this question."
  } else {
    quizSubtitle.innerText = "Ouch! The selected answer is incorrect."
  }
}

function getAttemptedQuestions() {
  return quizList.filter(question => question.hasOwnProperty("selectedAnswer") && question.selectedAnswer)
}

function getScore() {
  const attemptedQuestions = getAttemptedQuestions()
  const correctlyAnsweredQuestions = attemptedQuestions.filter(question => question.answer == question.selectedAnswer)
  const score = correctlyAnsweredQuestions.length / quizList.length * 100;
  return score
}

function updateProgressBar() {
  let percentageValue = 0;
  if (review) {
    const score = "Score: " + Math.round(getScore()) + "%"
    percentageValue = score;
    progressbar.style.backgroundColor = "#27ae60";
    progressbar.parentElement.style.backgroundColor = "#d63031";
  } else {
    const numberOfAttemptedQuestions = getAttemptedQuestions().length;
    percentageValue = Math.floor(numberOfAttemptedQuestions / TOTAL_QUESTIONS * 100) + "%";
  }
  progressbar.style.width = percentageValue;
  tooltip.style.left = percentageValue;
  tooltip.innerText = percentageValue
}

async function saveProgress() {
  try {
    saveBtn.disabled = true;
    submitBtn.disabled = true;
    const doc = await firestore.doc(`progress/${firebaseAuth.currentUser.uid}`).get()
    const progress = doc.data() || {};
    for (question of quizList) {
      const { id, category, answer, selectedAnswer } = question;
      if (!selectedAnswer || selectedAnswer != answer) continue;

      if (!progress.hasOwnProperty(category)) {
        progress[category] = [id];
      } else if (!progress[category].includes(id)) {
        progress[category].push(id)
      }
    }
    await firestore.doc(`progress/${firebaseAuth.currentUser.uid}`).set(progress)
    console.log(progress)
  } catch (err) {
    console.log("An error occured while saving progres ", err);
  } finally {
    saveBtn.disabled = false;
    submitBtn.disabled = false;
  }
}
async function submit() {
  if (!firebaseAuth.currentUser) {
    alert("You will be redirected to login page")
    window.open("./login.html?autoclose=true")
    return
  }
  await saveProgress()
  window.localStorage.setItem("quizResponse", JSON.stringify(quizList))
  window.location.href = "/result.html"
}


quizBody.addEventListener("input", function (e) {
  const currentQuestion = quizList[currentQuestionNumber - 1];
  currentQuestion.selectedAnswer = e.target.id
  updateProgressBar()
})

clearBtn.addEventListener("click", function (e) {
  inputElements.forEach(el => el.checked = false);
  delete quizList[currentQuestionNumber - 1].selectedAnswer
  updateProgressBar()

})

function showReview() {
  quizList = JSON.parse(window.localStorage.getItem("quizResponse"))
  updateProgressBar()
  nextQuestion()
  loader.classList.add("hidden")
}

if (review) {
  saveBtn.style.visibility = "hidden";
  clearBtn.style.visibility = "hidden";
  document.querySelector("title").innerText = "Quiz Review - Algo Visualizer"
  showReview()
} else {
  fetchQuiz()
  updateProgressBar(); // set it to 0
}