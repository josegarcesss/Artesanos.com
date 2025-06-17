document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("registerForm");
  form.addEventListener("submit", function(e) {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
    
    let errors = [];

    if (nombreInput.value.trim() === "") {
      errors.push("El nombre es obligatorio.");
    }
    if (apellidoInput.value.trim() === "") {
      errors.push("El apellido es obligatorio.");
    }
    if (emailInput.value.trim() === "") {
      errors.push("El correo es obligatorio.");
    }
    if (emailInput.value.trim() !== "" && !/\S+@\S+\.\S+/.test(emailInput.value)) {
      errors.push("El formato del correo no es válido.");
    }
    if (passwordInput.value.trim() === "") {
      errors.push("La contraseña es obligatoria.");
    }
    if (passwordInput.value.trim().length > 0 && passwordInput.value.trim().length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorMessage.style.display = "block";
      errorMessage.textContent = errors.join(" ");
    }
  });
});