function editOffersController() {
  console.log("edit offer controller");
  $.get("pages/editOffersPage.htm").then(html => {
    $("main>*").hide();
    $("#editOffers")
      .show()
      .html(html);

    var vehicleIds = userServices.getOffers(getFromMemory("loggedUserId"));
    console.log(vehicleIds);
    var vehicles = [];
    vehicleIds.forEach(id => {
      console.log("otivam da tarsq kola s id " + id);
      console.log("tva funciq li e");

      vehicles.push(getVehicles("cars").getById(id).vehicle);
    });
    console.log(vehicles);
    $("#offersPage").empty();
    offersController({
      cars: vehicles,
      heading: "Вашите обяви:"
    });
    $("#offersPage").show();
  });
}
