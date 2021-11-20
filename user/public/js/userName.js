//EDIT 5/7
let params = (new URL(document.location)).searchParams;
let name = params.get("userName");
console.log("User Name Received: "+name);
document.getElementById("username").textContent = name;

// sameerah 5/9 get first userName
// function getFirstName(name) {
//   var expr = /[^ ]+/; // get everything before first space
//   var firstname = expr.exec(name);
//   return(firstname); 
//   console.log("getFirstName:", name);
// }

/*function onSignIn(googleUser){
  console.log("Inside onSignIn: "+googleUser);
  var profile = googleUser.getBasicProfile()
  console.log("User is " + JSON.stringify(profile))

  var element = document.getElementById("username")
  element.textContent =  profile.getName();
}*/