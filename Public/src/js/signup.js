const submitbtn = document.getElementById("signupSubmit")


submitbtn.addEventListener("click", async() => {
    const firstname = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const signupemail = document.getElementById("signupemail")
    const submitpassword = document.getElementById("submitpassword")
    const submitpasswordconfirm = document.getElementById("submitpasswordconfirm")
    const body = {
        first_name: firstname.value,
        last_name: lastname.value,
        email: signupemail.value,
        passwords: submitpassword.value
    }
    const response = await fetch("/api/users/signup", {
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