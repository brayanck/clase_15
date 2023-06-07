const formRegistrar = document.getElementById("registrar")
const email = document.getElementById("email_register")
formRegistrar.addEventListener("submit", (e) => {
    e.preventDefault();
    let data={
        email:email.value
    }

    fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          // Redireccionar al usuario a la página de inicio de sesión
          window.location.href = "/user/login";
        } else {
          console.error("Error al crear el usuario");
        }
      })
      .catch(error => {
        console.error("Error de red:", error);
      });
});
