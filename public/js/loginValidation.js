
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function(e) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
    
    let errors = [];

    if (emailInput.value.trim() === "") {
      errors.push("El correo es obligatorio.");
    }

    if (emailInput.value.trim() !== "" && !/\S+@\S+\.\S+/.test(emailInput.value)) {
      errors.push("El formato del correo no es válido.");
    }
    if (passwordInput.value.trim() === "") {
      errors.push("La contraseña es obligatoria.");
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorMessage.style.display = "block";
      errorMessage.textContent = errors.join(" ");
    }
  });
});