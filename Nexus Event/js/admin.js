document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('loginBtn');
  const user = document.getElementById('username');
  const pass = document.getElementById('password');
  const error = document.getElementById('errorMsg');

  btn.addEventListener('click', () => {

  const username = user.value.trim();
  const password = pass.value.trim();

  if (username === 'admin' && password === 'nexus2026') {
    window.location.href = "admin-dashboard/admin-dashboard.html";
  } else {
    error.textContent = "Invalid admin credentials!";
  }

});

});