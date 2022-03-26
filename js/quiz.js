const loader = document.querySelector(".loader")
const quesNumberEl = document.querySelector(".question-no");
const questionStatementEl = document.querySelector(".quiz-title");
const quizBody = document.querySelector(".quiz-body")
const answerOptionsArray = Array.from(document.querySelectorAll(".quiz-answer"));

const tooltip = document.querySelector(".tooltiptext")
const progressbar = document.querySelector(".quiz-progress")

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
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else if (currentQuestionNumber === 1) {
    prevBtn.disabled = false
  }

  currentQuestionNumber += 1;
  const currentQuestion = quizList[currentQuestionNumber - 1];
  quesNumberEl.innerText = `Question ${currentQuestionNumber}/${TOTAL_QUESTIONS}`;
  questionStatementEl.innerText = currentQuestion.question;
  answerOptionsArray.forEach((el, index) => {
    const option = currentQuestion.options[index];
    el.innerHTML = `
    <input type="radio" name="option" ${option.id == currentQuestion.selectedAnswer ? 'checked' : ''} id="${option.id}">
    ${option.value}
    `
  })

}

function prevQuestion() {
  if (currentQuestionNumber === 2) {
    prevBtn.disabled = true;
  } else if (currentQuestionNumber === TOTAL_QUESTIONS) {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden")
  }

  currentQuestionNumber -= 1;
  const currentQuestion = quizList[currentQuestionNumber - 1];
  quesNumberEl.innerText = `Question ${currentQuestionNumber}/${TOTAL_QUESTIONS}`;
  questionStatementEl.innerText = currentQuestion.question;
  answerOptionsArray.forEach((el, index) => {
    const option = currentQuestion.options[index];
    el.innerHTML = `
    <input type="radio" name="option" ${option.id == currentQuestion.selectedAnswer ? 'checked' : ''} id="${option.id}">
    ${option.value}
    `
  })
}

function getCorrectlyAnsweredQuestions() {
  return quizList.filter(question => question.hasOwnProperty("selectedAnswer") && question.selectedAnswer)
}

function updateProgressBar() {
  const numberOfAnsweredQuestions = getCorrectlyAnsweredQuestions().length;
  const progressPercentage = Math.floor(numberOfAnsweredQuestions / TOTAL_QUESTIONS * 100) + "%";
  progressbar.style.width = progressPercentage;
  tooltip.style.left = progressPercentage;
  tooltip.innerText = progressPercentage

}

function submit() {
  if (!firebaseAuth.currentUser) {
    alert("You will be redirected to login page")
    window.open("./login.html?autoclose=true")
    return
  }

  const correctlyAnsweredQuestions = getCorrectlyAnsweredQuestions()
  window.localStorage.setItem("quizResponse", JSON.stringify(quizList))
  window.location.href = "/result.html"
}


quizBody.addEventListener("input", function (e) {
  const currentQuestion = quizList[currentQuestionNumber - 1];
  currentQuestion.selectedAnswer = e.target.id
  updateProgressBar()
})

clearBtn.addEventListener("click", function (e) {
  const inputElements = Array.from(quizBody.querySelectorAll("input"));
  inputElements.forEach(el => el.checked = false);
  delete quizList[currentQuestionNumber - 1].selectedAnswer
  updateProgressBar()

})

fetchQuiz()
updateProgressBar(); // set it to 0