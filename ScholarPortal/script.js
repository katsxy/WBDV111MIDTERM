// BLOCK NON-NUMBERS WHILE TYPING
document.getElementById("studentID").addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

// LOGIN FLOW
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let studentID = document.getElementById("studentID").value.trim();
    let email = document.getElementById("schoolEmail").value.trim();
    let password = document.getElementById("password").value.trim();

    // Check empty fields
    if(studentID === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    // Ensure Student ID is numbers only
    if (!/^\d+$/.test(studentID)) {
        alert("Student ID must contain numbers only");
        return;
    }

    // Save (mock login)
    localStorage.setItem("studentID", studentID);
    localStorage.setItem("schoolEmail", email);

    // Redirect to home page
    window.location.href = "home.html";
});

// ENROLL NOW CLICK
document.getElementById("enrollNow").addEventListener("click", function(){
    alert("Redirecting to Enrollment Page");
    window.location.href = "enroll.html"; 
});