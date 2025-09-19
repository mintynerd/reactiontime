document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const logoutSection = document.getElementById('logout-section');
    const welcomeUser = document.getElementById('welcome-user');
    const logoutBtn = document.getElementById('logout-btn');

    // Forms
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotForm = document.getElementById('forgot-form');

    // Login
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');

    // Signup
    const signupUsername = document.getElementById('signup-username');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const signupError = document.getElementById('signup-error');

    // Forgot
    const forgotEmail = document.getElementById('forgot-email');
    const forgotError = document.getElementById('forgot-error');

    // Links
    document.getElementById('show-signup').onclick = e => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        forgotForm.style.display = 'none';
        loginError.textContent = '';
    };
    document.getElementById('show-login').onclick = e => {
        e.preventDefault();
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'none';
        signupError.textContent = '';
    };
    document.getElementById('show-login2').onclick = e => {
        e.preventDefault();
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'none';
        forgotError.textContent = '';
    };
    document.getElementById('show-forgot').onclick = e => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'flex';
        loginError.textContent = '';
    };

    // Session helpers
    function setSession(username) {
        localStorage.setItem('username', username);
    }
    function clearSession() {
        localStorage.removeItem('username');
    }
    function getSession() {
        return localStorage.getItem('username');
    }

    // Check session
    function checkSession() {
        const username = getSession();
        if (username) {
            loginSection.style.display = 'none';
            logoutSection.style.display = '';
            welcomeUser.textContent = `Welcome, ${username}!`;
        } else {
            loginSection.style.display = '';
            logoutSection.style.display = 'none';
        }
    }

    // Login
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPassword.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                loginError.textContent = data.error;
            } else {
                setSession(loginUsername.value);
                loginError.textContent = '';
                checkSession();
            }
        })
        .catch(() => {
            loginError.textContent = 'Server error.';
        });
    };

    // Signup
    signupForm.onsubmit = function(e) {
        e.preventDefault();
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: signupUsername.value,
                email: signupEmail.value,
                password: signupPassword.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                signupError.textContent = data.error;
            } else {
                setSession(signupUsername.value);
                signupError.textContent = '';
                checkSession();
            }
        })
        .catch(() => {
            signupError.textContent = 'Server error.';
        });
    };

    // Forgot password
    forgotForm.onsubmit = function(e) {
        e.preventDefault();
        fetch('http://localhost:3001/forgot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: forgotEmail.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                forgotError.style.color = 'red';
                forgotError.textContent = data.error;
            } else {
                forgotError.style.color = 'green';
                forgotError.textContent = 'Password reset link sent (demo only).';
            }
        })
        .catch(() => {
            forgotError.style.color = 'red';
            forgotError.textContent = 'Server error.';
        });
    };

    // Logout
    logoutBtn.onclick = function() {
        clearSession();
        checkSession();
    };

    // On load
    checkSession();
});