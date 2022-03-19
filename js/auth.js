const nameInput = document.querySelector("#input_name");
const emailInput = document.querySelector("#input_email");
const passInput = document.querySelector("#input_pass");

function login(e) {
  e.preventDefault();
  const email = emailInput.value;
  const pass = passInput.value;
  console.log(email, pass)
}

function signup(e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passInput.value;
  if (!name || !email || !password) {
    alert("Please enter all the details")
  }


  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return firestore.doc(`profiles/${user.uid}`).set({
        email: user.email,
        name,
        userId: user.uid
      })
    })
    .then(() => {
      window.location.href = "/index.html"
    })
    .catch(error => {
      console.log(error);
      alert(error.message)
    })

  return false
}