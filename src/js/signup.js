// localStorage.setItem("user", JSON.stringify(a));

// function createUser(username, password) {
//   const user = { username, password }; //create a user object to go in an array
//   users.push(user);
// }

// function getUser(username, password) {
//   //loops through each user in the array and checks the stored username
//   return users.find((eachUser) => {
//     return eachUser.username === username && eachUser.password === password;
//   });
// }
// var users = [];

// a = JSON.parse(localStorage.getItem("user"));
// a.push({ name: username, password: password });
// localStorage.setItem("name", JSON.stringify(a));
// for (var i = 0; i < a.length; i++) {
//   var li = document.createElement("li");
//   li.innerHTML = a[i]["name"];
//   document.getElementById("listuser").appendChild(li);
// }

// EXAMPLE FROM QUIZ JS MODULE I DID

function saveEmail() {
  var emails = document.getElementById("email");
  var emails = emails.value.trim();
}

//make sure value wasnt empty
if (emails !== ""&& emails !== "") {
 
}


  
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    //format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
      initials2: initials2,
    };

    // save to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //redirect to next page
    window.location.href = "highscorepage.html";
  }
}

submitBtn.onclick = saveHighscore;

// Highscore
var highscoresContainer = document.getElementById("highscores");

function getHighscore() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  console.log(highscores);

  highscoresContainer.innerHTML = "";

  highscores.forEach((highscore) => {
    var listItem = document.createElement("li");
    var initials = highscore.initials;
    var initials2 = highscore.initials2;
    var score = highscore.score;
    listItem.textContent =
      "Initials: " + initials + initials2 + " Highscore: " + score;
    highscoresContainer.appendChild(listItem);
  });
}

getHighscore();
