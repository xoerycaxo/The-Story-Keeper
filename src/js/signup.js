localStorage.setItem('user',JSON.stringify(a));

function createUser( username, password ) {
    const user = { username, password }; //create a user object to go in an array
    users.push( user ); 
}

function getUser( username, password ) {
    //loops through each user in the array and checks the stored username
    return users.find( eachUser => {
        return eachUser.username === username && eachUser.password === password;
    })
}
var users = [];

a=JSON.parse((localStorage.getItem("user")));
a.push({name: username, password: password});
localStorage.setItem('name',JSON.stringify(a));
for(var i=0; i<a.length; i++)
  {
   var li = document.createElement("li");
   li.innerHTML=a[i]['name'];
   document.getElementById("listuser").appendChild(li);
  }

