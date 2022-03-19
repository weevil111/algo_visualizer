const nameInput = document.querySelector("#input_name");
const emailInput = document.querySelector("#input_email");
const passInput = document.querySelector("#input_pass");
const loginBtn = document.querySelector("#login");
const logoutBtn = document.querySelector("#logout");
const avatar = document.querySelector("#avatar");

firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    if (loginBtn) loginBtn.classList.add("hidden");
    if (logoutBtn) logoutBtn.classList.remove("hidden")
    if (avatar) avatar.classList.remove("hidden")
  } else {
    if (loginBtn) loginBtn.classList.remove("hidden");
    if (logoutBtn) logoutBtn.classList.add("hidden")
    if (avatar) avatar.classList.add("hidden")
  }
})

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

function logout() {
  firebaseAuth.signOut();
}