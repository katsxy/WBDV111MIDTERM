document.addEventListener('DOMContentLoaded', () => {

  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    if (confirm("Log out?")) {
      window.location.href = "../admin.html";
    }
  });

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});