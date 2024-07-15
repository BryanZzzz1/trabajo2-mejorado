const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

const pwShowHide = document.querySelectorAll(".pw_hide");
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  if (username === 'admin' && password === '123') {
    localStorage.setItem('loggedIn', true);
    window.location.href = './inicionuevo.html';
  } else {
    document.getElementById('loginMessage').textContent = 'Credenciales incorrectas. Inténtelo de nuevo.';
  }
});
