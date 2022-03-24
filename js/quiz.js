const quesNumberEl = document.querySelector(".question-no");
const questionStatementEl = document.querySelector(".quiz-title");
const answerOptionsArray = Array.from(document.querySelectorAll(".quiz-answer"));

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
  nextQuestion()
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
  if (currentQuestionNumber === TOTAL_QUESTIONS) return;

  currentQuestionNumber += 1;
  const currentQuestion = quizList[currentQuestionNumber];
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

fetchQuiz()