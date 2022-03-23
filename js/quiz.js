let quizList = [];

async function fetchQuiz() {
  const selectedAlgos = JSON.parse(localStorage.getItem("selectedAlgos"));
  if (!selectedAlgos) {
    alert("No Algo selected ! Please select one");
    window.location.href = '/begin-quiz.html'
  }
  await fillQuizList(selectedAlgos);

  // Shuffle the quiz list:
  quizList.sort(() => Math.random() > 0.5 ? 1 : -1)

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

fetchQuiz()