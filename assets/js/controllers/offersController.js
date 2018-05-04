function offersController(obj) {
  $.get("pages/offersTemplate.htm").then(sourceHtml => {
    var template = Handlebars.compile(sourceHtml);
    $("#offersPage").html(template(obj));
    //Stars of favorites
    
    var favOfUser = userServices.getFavOffers(getFromMemory("loggedUserId"));
    // console.log("na toz lubimite");
    // console.log(favOfUser);

    Array.prototype.forEach.call($(".is-favorite"), el => {
      // console.log(el.id);
      if(favOfUser.indexOf(el.id)!=-1){
        $(el).toggleClass("darkBlue")
      }
    });
    //counterOfFavorites
    $("#counterOfFavorites").text(favOfUser.length)
  });
}
