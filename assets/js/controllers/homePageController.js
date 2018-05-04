function homePageController() {
  $.get("pages/homePage.htm").then(html => {
    $("main>*").hide();
    $("#homePage")
      .html(html)
      .show();
    $("#offersPage").show();
    // $("#addOffer").hide();
    // $("#offerDetailsPage").hide();

    //YEARS
    for (let year = 2018; year > 1970; year--) {
      $("#YearFrom").append($(`<option value=${year}>от ${year}</option>`));
    }
    //PRICES
    for (let price = 1000; price <= 20000; price += 1000) {
      $("#PriceTo").append($(`<option value=${price}>от ${price}</option>`));
    }
    for (let price = 25000; price <= 90000; price += 5000) {
      $("#PriceTo").append($(`<option value=${price}>от ${price}</option>`));
    }
    $("#PriceTo").append($(`<option value="90000">над 90000</option>`));
    //MAKES AND MODELS
    loadBrandsController();
    //SEARCH BUTTON
    $("#searchButton").on("click", e => {
      e.preventDefault();
      var parameters = "#search?";
      // var searchObject = {};
      Array.prototype.forEach.call($("#homePage select"), s => {
        if ($(s).val() != 0) {
          // console.log()
          parameters += $(s).attr("name") + "=" + $(s).val() + "&";
          // searchObject[$(s).attr("name")] = $(s).val();
        }
      });
      parameters = parameters.split("");
      parameters.pop();
      parameters = parameters.join("");
      location.replace(parameters);
      // console.log(searchObject);
      // sessionStorage.setItem("searchObject", JSON.stringify(searchObject));
      // setInMemory("searchObject", searchObject);
      // // console.log(parameters);
    });
    //ADD OFFERS LINK
    $("#addOfferLink").on("click", e => {
      e.preventDefault();
      if (localStorage.getItem("loggedUserId") == null) {
        $("#homeLink").click();

        $.get("pages/login.htm").then(loginDiv => {
          $("#login-modal").html(loginDiv);
          $("#login-modal").modal("show");

          loginController();

          $("#loginForm p.alert-danger")
            .text("За да добавите обява, трябва да влезете в своя профил.")
            .show();
        });
      } else {
        location.replace("#addOffer");
      }
    });

    ///OFFERS
    getVehicles("cars")
      .getTopBy(6, "publishDate", false)
      .then(cars => {
        offersController({
          cars: cars,
          heading: "Най-нови обяви"
        });
      });
  });
  //LOGIN
  $.get("pages/login.htm").then(loginDiv => {
    $("#login-modal").html(loginDiv);
    loginController();
  });
  //Marking as favorite
  $("main").on("click", e => {
    //   e.preventDefault()
    //  console.log(e.target)

    if ($(e.target).hasClass("favorite")) {
      e.preventDefault();
    //   if(localStorage.getItem("loggedUser")==null){
    //     console.log("vlez si v profila predi da cakash zvezdicki")
    //     return
    // }

    }
    if ($(e.target).hasClass("is-favorite")) {
      console.log("zvezdichka")

      if(localStorage.getItem("loggedUserId")==null){
          console.log("vlez si v profila predi da cakash zvezdicki")
          console.log($(e.target))
          $(e.target).attr("title","vlez si v profila predi da cakash zvezdicki")
          $(e.target).closest("a").animate({color:"red"},2000,()=>{})
          // css("color","red").
          
          return
      }


      e.preventDefault();
      // console.log("favorite-----zvezdichka");
      console.log(e.target.id)
      var isNowFav= userServices.toggleFavorite(getFromMemory("loggedUserId"),e.target.id)
      // console.log(isNowFav)
      if(isNowFav){
        var current=$("#counterOfFavorites").text()
        $("#counterOfFavorites").text(+current+1)
      }else{
        var current=$("#counterOfFavorites").text()
        $("#counterOfFavorites").text(+current-1)
      }
      $(e.target).toggleClass("darkBlue");
      e.stopImmediatePropagation()
    }
  });
}
