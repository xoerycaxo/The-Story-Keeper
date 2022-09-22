const submitbtn = document.getElementById("loginsubmit")


submitbtn.addEventListener("click", async() => {
    const email = document.getElementById("email")
    const passwords = document.getElementById("passwords")
    const body = {
        email: email.value,
        passwords: passwords.value
    }
    const response = await fetch("/api/users/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        alert("Invalid")
    } else {
        window.location.href = ('/search')
    }
})