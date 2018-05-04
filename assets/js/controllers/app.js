function router() {
  var page = location.hash.slice(1);

  $('#offersNav li a').on("click", menuActive);


  // za kogato ima parametri kym tyrseneto
  if (page.indexOf("?") != -1) page = page.substring(0, page.indexOf("?"));
  console.log(page);
  switch (page) {
    case "offers":
      offersController();
      break;
    case "details":
      detailsController();
      break;
    case "addOffer":
      addOfferController();
      break;
    case "search":
      searchController(location.hash.slice(location.hash.indexOf("?")+1));
      // searchController();
      break;
    case "profile":
      editProfileController();
      break;
      case "editOffers":
      editOffersController();
      break;
      case "favorites":
    favoritesController()
      break;
    case "home":
      homePageController();
     
      break;
    default:
      location.replace("#home");
      break;
  }
}

$(function() {
  $(window).on("hashchange", router);
  router();
  toggleProfileNavLink();
});

function menuActive() {
    $("#offersNav li a").removeClass('active');
    $(this).addClass('active');
}

function toggleProfileNavLink() {
  if (localStorage.getItem("loggedUserId")) {
    $("#nav-login").hide();
    $("#nav-profile").show();
  } else {
    $("#nav-login").show();
    $("#nav-profile").hide();
  }
}
