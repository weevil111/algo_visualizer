const loader = document.querySelector(".loader")
const quesNumberEl = document.querySelector(".question-no");
const questionStatementEl = document.querySelector(".quiz-title");
const answerOptionsArray = Array.from(document.querySelectorAll(".quiz-answer"));
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
    <input type="radio" name="option" id="${option.id}">
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
    <input type="radio" name="option" id="${option.id}">
    ${option.value}
    `
  })
}

function submit() {
  if (!firebaseAuth.currentUser) {
    alert("You will be redirected to login page")
    window.open("./login.html?autoclose=true")
  }
}


fetchQuiz()