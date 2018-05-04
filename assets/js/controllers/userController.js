function loginController() {
  $("#login-btn").on("click", login);
  $("#register-btn").on("click", register);

//da izchisti sled kato onova za dobavqne v profila gramne
  $("#loginForm p.alert-danger")
          .text("")
          .hide();
//LOGIN
  function login(event) {
    $("#loginForm p.alert-danger").text("").hide();
    event.preventDefault();
    var user = $("#username").val();
    var pass = $("#password").val();
    var hasUserLogged = userServices.login(user, pass);
    
    if (hasUserLogged) {
      $("#login-modal").modal("toggle");
      toggleProfileNavLink();
    } else {
      $("#loginForm p.alert-danger").text("Невалидно потребителско име / парола!").show();
    }
  }
// REGISTER
  $("#registerForm div.alert-danger").html("").text("").hide();
  function register(event) {
    event.preventDefault();
    $("#registerForm div.alert-danger").html("").text("").hide();
    $("#registerForm input.is-invalid").removeClass("is-invalid");    

    var user = $("#newUsername").val().trim();
    var pass1 = $("#newPassword").val().trim();
    var pass2 = $("#repeatPassword").val().trim();
    var email=$("#email").val().trim()
    var fullName=$("#user_name").val().trim()
    var city = $("#user_address").val().trim();
    var phone = $("#user_phone").val().trim();
    console.log(phone)
    //VALIDATION
    var errorMessages=[];

    if (user.length < 2) {
      $("#newUsername")
        .addClass("is-invalid")
        .attr("title", "User name should be at least 2 charecters long.")
        .on("change", () => {
          $("#newUsername")
            .removeClass("is-invalid")
            .removeAttr("title");
        });
        errorMessages.push("Потребителското име трябва да съдържа поне 2 знака!")
    }

    if (pass1.length < 4) {
      $("#newPassword")
        .addClass("is-invalid")
        .attr("title", "Password should be at least 4 charecters long.")
        .on("change", () => {
          $("#newPassword")
            .removeClass("is-invalid")
            .removeAttr("title");
        });
        errorMessages.push("Паролата трябва да съдържа поне 4 знака!")
    }

    if (pass1 !== pass2) {
        $("#repeatPassword")
          .addClass("is-invalid")
          .attr("title", "Passwords don't match.")
          .on("change", () => {
            $("#repeatPassword")
              .removeClass("is-invalid")
              .removeAttr("title");
          });
          errorMessages.push("Паролата не съвпада!")
    }
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  if (!validateEmail(email)) {
    $("#email")
      .addClass("is-invalid")
      .attr("title", "Not a valid email.")
      .on("change", () => {
        $("#email")
          .removeClass("is-invalid")
          .removeAttr("title");
      });
      errorMessages.push("Невалиден имайл!")
}
$("#registerForm div.alert-danger").empty()
    if (errorMessages.length > 0) {
      var newUl = $("<ul>")
      errorMessages.forEach(m => $("<li>").appendTo(newUl).text(m));

      $("#registerForm div.alert-danger").append(newUl).show();
    } else {
      // uspeshna registraciq
      // switch to login tab
      $("#loginForm p.alert-success").text("Регистрирахте се успешно в mobile.bg").show();
      $('#login-modal a[href="#login-tab"]').tab("show");
      // трябва да проверяваме за вече съществуващо потребителско име
          //userName, pass,email,fullName,  city, phone
      var newUser=userServices.register(user, pass1,email,fullName, city, phone);
      console.log(newUser)
    }
  }
};
