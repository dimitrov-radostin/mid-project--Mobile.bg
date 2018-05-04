function favoritesController(){
    console.log("just another controller")
    // $.get("pages/editOffersPage.htm").then(html => {
        $("main>*").hide();
        $("#favorites")
          .show()
        //   .html(html);
    console.log(getFromMemory("loggedUserId"))
        var vehicleIds = userServices.getFavOffers(getFromMemory("loggedUserId"));
        console.log(vehicleIds);
        var vehicles = [];
        vehicleIds.forEach(i => {
          console.log("otivam da tarsq kola s id " + i);
       
          vehicles.push(getVehicles("cars").getById(i).vehicle);
        });
        console.log(vehicles);
        $("#offersPage").empty();
        offersController({
          cars: vehicles,
          heading: "Вашите любими обяви:"
        });
        $("#offersPage").show();
    //   });
}