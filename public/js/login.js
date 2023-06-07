
const formLogin= document.getElementById("form_login")
const email_login = document.getElementById("email_login")

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let data={
        email:email_login.value
    }
    fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
            localStorage.setItem(
                "chat-app-email",
                JSON.stringify(data.email)
            );
          // Redireccionar al usuario a la página de inicio de sesión
          window.location.href = "/home";
        } else {
          console.error("Error al iniciar el usuario");
        }
      })
      .catch(error => {
        console.error("Error de red:", error);
      });
});