$(document).ready(function() {

  var username = $("#username");
  var password = $("#password");
  //var loginform = $("#loginform");
  // Adding an event listener for when the form is submitted
  console.log("register loginformevent");
  $("#loginform").on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    console.log("test");
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!username.val().trim() || !password.val().trim()) {
      return;
    }

    var userInfo = {
      username:username.val().trim(),
      password:password.val().trim()
    };
    // Constructing a newPost object to hand to the database
   
      submitLogin(userInfo);
    
  }

  // Submits a new post and brings user to blog page upon completion


  function submitLogin(userInfo) {
    console.log(userInfo);
    $.post("/login", userInfo, function(data) {
      window.location.href="/profile";
    });
  }



});