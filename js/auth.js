const nameInput = document.querySelector("#input_name");
const emailInput = document.querySelector("#input_email");
const passInput = document.querySelector("#input_pass");
const loginBtn = document.querySelector("#login");
const logoutBtn = document.querySelector("#logout");
const avatar = document.querySelector("#avatar");

let operationsRemaining = false;

firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    if (loginBtn) loginBtn.classList.add("hidden");
    if (logoutBtn) logoutBtn.classList.remove("hidden")
    if (avatar) avatar.classList.remove("hidden")
    if (["/signup.html", "/login.html"].includes(window.location.pathname) && !operationsRemaining) {
      window.location.href = "/index.html";
    }
    if (avatar) {
      avatar.innerText = user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()
    }

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

  operationsRemaining = true;
  firebaseAuth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      if (getQueryValue("autoclose") === "true") {
        window.close();
      }
      window.location.href = "/index.html"
    })
    .catch(error => {
      console.log(error);
      alert(`Login failed! ${error.code}`)
    })
    .finally(() => operationsRemaining = false)
}

function signup(e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passInput.value;
  if (!name || !email || !password) {
    alert("Please enter all the details")
  }

  operationsRemaining = true;
  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.updateProfile({
        displayName: name
      })
    })
    .then(() => {
      if (getQueryValue("autoclose") === "true") {
        window.close();
      }
      window.location.href = "/index.html"
    })
    .catch(error => {
      console.log(error);
      alert(error.message)
    })
    .finally(() => operationsRemaining = false)

  return false
}

function logout() {
  firebaseAuth.signOut();
}

function getQueryValue(name) {
  let query = window.location.search.substring(1);
  let queryStringArrays = query.split("&");
  for (let query of queryStringArrays) {
    let pair = query.split("=");
    if (pair[0] === name) {
      return pair[1];
    }
  }
  return false
}