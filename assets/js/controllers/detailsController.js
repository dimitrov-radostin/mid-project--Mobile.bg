function detailsController() {
  $("#homePage").hide();
  $("#addOffer").hide();
  $("#offersPage").hide();
  $("#editOffers").hide();
  $("#offerDetailsPage").show();

  var carId = location.hash.slice(location.hash.indexOf("?veh=") + 5);
  $.get("pages/offerDetailsTemplate.htm").then(sourceOffer => {
    var template = Handlebars.compile(sourceOffer);
    var car = getVehicles("cars").getById(carId);
    $("#offerDetailsPage").html(template(car));

    $("a.gallery").colorbox({ opacity: 0.5, rel: "gallery" });
    // console.log($(".koko"));
    $(".koko").on("click", e => {
      console.log("koko")
      if ($(e.target).hasClass("is-favorite")) {
        console.log("zvezdichkaaaaa")
        e.preventDefault()
        $(e.target).show()
        $(e.target)
          .closest("a")
          .text("премахни от бележника");
      } else {
        e.preventDefault();
        $(e.target)
          .text("премахни от бележника");
      }
    });
  });
}
