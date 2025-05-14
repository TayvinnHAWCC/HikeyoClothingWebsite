const form = document.getElementById("authForm");
const logoutBtn = document.getElementById("logoutBtn");
const message = document.getElementById("authMessage");

function checkAuth() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    message.textContent = `Logged in as: ${currentUser}`;
    logoutBtn.style.display = "inline-block";
    form.style.display = "none";
  }
}

checkAuth();

form.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    if (users[email] === password) {
      localStorage.setItem("currentUser", email);
      message.textContent = `Welcome back, ${email}`;
      form.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      message.textContent = "Incorrect password.";
    }
  } else {
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);
    message.textContent = `Account created and logged in as: ${email}`;
    form.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  message.textContent = "Logged out.";
  form.style.display = "block";
  logoutBtn.style.display = "none";
});
