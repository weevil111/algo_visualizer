const scoreEl = document.querySelector(".score")
const reviewBtn = document.querySelector(".btn-review")
let quizResponse = [];
let quizMeta = {}


function getQuizResponse() {
  quizResponse = window.localStorage.getItem("quizResponse");
  try {
    quizResponse = JSON.parse(quizResponse);
    if (!quizResponse) {
      window.location.href = "/begin-quiz.html"
    }
  } catch (err) {
    console.log(err);
    window.location.href = "/begin-quiz.html"
  }
}

function computeQuizMeta() {
  if (!quizResponse || quizResponse.length === 0) return;

  quizMeta = {
    totalCorrect: 0,
    totalWrong: 0,
    totalUnanswered: 0,
    totalQuestionsCount: 0,
    algoNames: [],
    algoPercentages: []
  }
  for (response of quizResponse) {
    // Convert merge_sort to "Merge Sort"
    let algoNameArray = response.category.split("_");
    algoNameArray = algoNameArray.map(el => el[0].toUpperCase() + el.substring(1));
    const algoName = algoNameArray.join(" ");

    if (!quizMeta[algoName]) {
      quizMeta[algoName] = {
        correctCount: 0,
        wrongCount: 0,
        unansweredCount: 0,
        totalCount: 0
      }

      quizMeta.algoNames.push(algoName)
    }
    if (response.answer == response.selectedAnswer) {
      quizMeta[algoName].correctCount += 1
      quizMeta.totalCorrect += 1
    } else {
      if (!response.selectedAnswer) {
        quizMeta.totalUnanswered += 1
        quizMeta[algoName].unansweredCount += 1
      }
      quizMeta[algoName].wrongCount += 1
    }
    quizMeta[algoName].totalCount += 1
  }
  quizMeta.totalWrong = quizResponse.length - quizMeta.totalCorrect;
  quizMeta.totalQuestionsCount = quizResponse.length;

  quizMeta.algoNames.forEach(algo => {
    const { totalCount, correctCount } = quizMeta[algo];
    if (totalCount > 0) {
      const percentage = Math.round(correctCount / totalCount * 100)
      quizMeta[algo].percentage = percentage
      quizMeta.algoPercentages.push(percentage)
    }
  })

}

function createScoreBarChart() {
  scoreEl.innerHTML = `
  <b>Score: </b> ${quizMeta.totalCorrect}/${quizMeta.totalQuestionsCount}`;
  const ctx = document.getElementById('score-chart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: quizMeta.algoNames,
      datasets: [{
        data: quizMeta.algoPercentages,
        backgroundColor:
          'rgb(230, 126, 34,1)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Topic wise percentage'
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.formattedValue}% correct`
          }
        }
      }
    },
  });
}

function createQuestionsPieChart() {
  const ctx = document.getElementById('questions-chart');
  const labels = ['Correct', 'Wrong']
  if (quizMeta.totalUnanswered > 0) {
    labels.push('Unanswered')
  }
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: [quizMeta.totalCorrect, quizMeta.totalWrong, quizMeta.totalUnanswered],
        backgroundColor: [
          'rgb(46, 204, 113)',
          'rgb(231, 76, 60)',
          'rgb(189, 195, 199)'
        ],
        hoverOffset: 4
      }]
    }
  });
}

reviewBtn.addEventListener("click", function () {
  window.localStorage.setItem("review", "true")
  window.location.href = "/quiz.html"
})

getQuizResponse()
computeQuizMeta()
createScoreBarChart()
createQuestionsPieChart()