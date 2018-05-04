function editProfileController() {
  $.get("pages/editProfilePage.htm")
    .then(html => {
      $("main>*").hide();
      $("#editProfile")
        .show()
        .html(html);
    // })
    // .then(() => {
      var user = userServices.getUserById(getFromMemory("loggedUserId"));
      console.log(user);
      console.log($("#newUsername"))
      console.log($("#user_phone"))
      // $(() => {
      $("#editProfile #loginForm p.alert-danger")
        .text("")
        .hide();
      $("#editProfile #newUsername").val(user.name);
      $("#editProfile #email").val(user.email);
      console.log($("#editProfile #email"))
      $("#editProfile #email").attr('disabled','disabled').attr("title","Не може да променяте емайла си.")
      $("#editProfile #user_name").val(user.fullName);
      $("#editProfile #user_address").val(user.city);
      $("#editProfile #user_phone").val(user.phone);
      $("#registerForm div.alert-danger").hide();
      //EDIT
      $("#edit-btn").on("click", e => {
        e.preventDefault();

        $("#registerForm div.alert-danger")
          .html("")
          .text("")
          .hide();
        $("#registerForm input.is-invalid").removeClass("is-invalid");

        var newUser = $("#editProfile #newUsername")
          .val()
          .trim();
        var oldPass = $("#editProfile #oldPassword")
          .val()
          .trim();
        var newPass1 = $("#editProfile #newPassword")
          .val()
          .trim();
        var newPass2 = $("#editProfile #repeatPassword")
          .val()
          .trim();
        var email = $("#editProfile #email")
          .val()
          .trim();
       
        var fullName = $("#editProfile #user_name")
          .val()
          .trim();
        var city = $("#editProfile #user_address")
          .val()
          .trim();
        var phone = $("#editProfile #user_phone")
          .val()
          .trim();
        console.log(phone, city ,fullName,email,oldPass);
        //VALIDATION
        var errorMessages = [];

        if (newUser.length < 2) {
          $("#newUsername")
            .addClass("is-invalid")
            .attr("title", "User name should be at least 2 charecters long.")
            .on("change", () => {
              $("#newUsername")
                .removeClass("is-invalid")
                .removeAttr("title");
            });
          errorMessages.push(
            "Потребителското име трябва да съдържа поне 2 знака!"
          );
        }

        if (newPass1.length < 4) {
          $("#newPassword")
            .addClass("is-invalid")
            .attr("title", "Password should be at least 4 charecters long.")
            .on("change", () => {
              $("#newPassword")
                .removeClass("is-invalid")
                .removeAttr("title");
            });
          errorMessages.push("Паролата трябва да съдържа поне 4 знака!");
        }
        //old pass
        
        if (oldPass !== user.pass) {
          $("#oldPassword")
            .addClass("is-invalid")
            .attr("title", "Password don't match.")
            .on("change", () => {
              $("#олдPassword")
                .removeClass("is-invalid")
                .removeAttr("title");
            });
          errorMessages.push("Грешна парола!");
        }

        if (newPass1 !== newPass2) {
          $("#repeatPassword")
            .addClass("is-invalid")
            .attr("title", "Passwords don't match.")
            .on("change", () => {
              $("#repeatPassword")
                .removeClass("is-invalid")
                .removeAttr("title");
            });
          errorMessages.push("Паролата не съвпада!");
        }
       
        $("#registerForm div.alert-danger").empty();
        if (errorMessages.length > 0) {
          var newUl = $("<ul>");
          errorMessages.forEach(m =>
            $("<li>")
              .appendTo(newUl)
              .text(m)
          );

          $("#registerForm div.alert-danger")
            .append(newUl)
            .show();
        } 
        else {
          $("#editForm p.alert-success")
            .text("промените по прoфила Ви са запазени.")
            .show();
          // $('#login-modal a[href="#login-tab"]').tab("show");
          var id= getFromMemory("loggedUserId")
          userServices.removeUserById(id)
          var nU = userServices.register(
            newUser,
            newPass1,
            email,
            fullName,
            city,
            phone,
            id
          );
          console.log(nU);
        }
      });
    });

}
