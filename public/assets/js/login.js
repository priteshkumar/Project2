$(document).ready(function() {

  var username = $("#username");
  var password = $("#password");
  var email = $("#email");
  //var loginform = $("#loginform");
 
  $("#loginform").on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    console.log("login form submit");
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
    $.post("/login", userInfo, function(data) {
      window.location.href="/profile";
    });
  }


    $("#registerform").on("submit", handleRegisterSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleRegisterSubmit(event) {
    console.log("register form submitted");
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!username.val().trim() || !password.val().trim()) {
      return;
    }

    var userInfo1 = {
      username:username.val().trim(),
      email:email.val().trim(),
      password:password.val().trim()
    };
    // Constructing a newPost object to hand to the database
   
      submitRegistration(userInfo1);
    
  }

  // Submits a new post and brings user to blog page upon completion


  function submitRegistration(userInfo1) {
    console.log(userInfo1);
    $.post("/register", userInfo1, function(data) {
      window.location.href="/profile";
      console.log(data);
    });
  }
});