document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterButton = document.getElementById("showRegister");
    const showLoginButton = document.getElementById("showLogin");

    showRegisterButton.addEventListener("click", () => {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLoginButton.addEventListener("click", () => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    const loginFormElement = document.getElementById("loginFormElement");
    const registerFormElement = document.getElementById("registerFormElement");

    loginFormElement.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            document.getElementById("loginMessage").textContent = data.message;
            if (data.success) {
                // Handle successful login, e.g., redirect or save token
                localStorage.setItem("token", data.token);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    registerFormElement.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const phone = document.getElementById("registerPhone").value;

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password, phone })
            });
            const data = await response.json();
            document.getElementById("registerMessage").textContent = data.message;
            if (data.success) {
                // Optionally auto-login after registration
                loginForm.style.display = "block";
                registerForm.style.display = "none";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
