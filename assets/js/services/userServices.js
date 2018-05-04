//HELPFUL FUNCTIONS
function getFromMemory(str) {
  if (localStorage.getItem(str) != null) {
    return JSON.parse(localStorage.getItem(str));
  } else {
    return new Error("Sorry, " + str + " is not yet set in local memory!");
  }
}
function setInMemory(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}



var userServices = {};

(() => {
  //тва кат не го връщаме и като ги парсваме си губят методите ,
  // затва всички методи са на UserServices.prototype

  //USER CONSTRUCTOR
  function User(name, pass,email,fullName,  city, phone, id) {
    this.name = name;
    this.pass = pass;
    this.city = city || "No city provided";
    this.phone = phone || "No phone provided";
    this.email = email || "No mail provided";
    this.fullName=fullName|| "No full name provided"
    this.favOffers = [];
    this.publishedOffers = [];
    this.id = id|| Math.floor(Math.random() * 9999);
  }

  //INITIALIZATION
  if (localStorage.getItem("allUsers") == null) {
    let pesho = new User(
      "pesho",
      "4567",
      "pesh@abv.bg",
      "Петер Ганчев",
      "Каспичан",
      "0897765234"      
    );
    pesho.id=26;
    let rado = new User("rado", "1234","radokz@abv.bg","Радостин Димитров","Казанлък","0897748129");
    rado.id=42;
    rado.publishedOffers=["4","5","10"]
    rado.favOffers=["10"]
    setInMemory("allUsers", [pesho, rado]);
  }
  //LOGIN
  userServices.login = function(name, pass) {
    let _allUsers = getFromMemory("allUsers");
    let thatUser = _allUsers.find(u => u.name == name && u.pass == pass);
    let successs = !(thatUser == null);
    if (successs) {
      setInMemory("loggedUserId", thatUser.id);
    }
    return successs;
  };
  //REGISTRATION
  userServices.register = function(name, pass,email,fullName,  city, phone , id) {
    let newU = new User(name, pass,email,fullName,  city, phone ,id);
    let _allUsers = getFromMemory("allUsers");
    _allUsers.push(newU);
    setInMemory("allUsers", _allUsers);
    return newU
  };
  //REMOVE
  userServices.removeUserById = function(userId) {
    let _allUsers = getFromMemory("allUsers");
    _allUsers = _allUsers.filter(u => u.id != userId);
    setInMemory("allUsers", _allUsers);
   return true
  };
  //FINDING AN USER BY ID
  userServices.getUserById = function(userId) {
    let _allUsers = getFromMemory("allUsers");
    let thatUser = _allUsers.find(u => u.id == userId);

    if (thatUser == null) {
      throw new Error("No user with such id:" + userId);
    }
    return thatUser;
  };

  // //LIKING AN OFFER
  // userServices.likeOffer = function(offer,userId) {
  //   let _allUsers = getFromMemory("allUsers");
  //   let thatUser = _allUsers.find(u => u.id == userId);
  //   thatUser.favOffers.push(offer);
  //   setInMemory("allUsers", _allUsers);
  // };

  //TOGGLE fAVORITE
userServices.toggleFavorite=function(userId,offerId){
    let _allUsers = getFromMemory("allUsers");
    let thatUser = _allUsers.find(u => u.id == userId);

    if(thatUser.favOffers.indexOf(offerId)==-1){
      console.log("dobavqm na toz "+thatUser.name+" tazi kola "+offerId)
      thatUser.favOffers.push(offerId);
      setInMemory("allUsers", _allUsers);
      return true
    }else{
      console.log("maham na toz "+thatUser.name+" tazi kola "+offerId)
      // thatUser.favOffers.filter(offId=>offId!=offerId)
      thatUser.favOffers.splice(thatUser.favOffers.indexOf(offerId),1)
      setInMemory("allUsers", _allUsers);
      return false
    
    }
}
  //SHOWING FAVORITE OFFERS OF AN USER
  userServices.getFavOffers = function(userId) {
    let _allUsers = getFromMemory("allUsers");
    let thatUser = _allUsers.find(u => u.id == userId);
    return thatUser.favOffers
  };
  //SHOWING OFFERS OF AN USER
    userServices.getOffers = function(userId) {
    return userServices.getUserById(userId).publishedOffers;
  };
  //ADDING A CAR AS PUBLISHED BY THAT USER ,called by the vehicleServices.addVeh
  userServices.publishOffer = function(offer, userId) {
    let _allUsers = getFromMemory("allUsers");
    let thatUser = _allUsers.find(u => u.id == userId);
    
    thatUser.publishedOffers.push(offer.id);
    console.log(thatUser)
    setInMemory("allUsers", _allUsers);
  };
  // //OFFER CONSTRUCTOR(not really a constructor)
  // function createNewOffer(userId, vehId) {
  //   let user = getUserById(userId);
  //   return getById(vehId).then(veh => ({
  //     vehicle: veh,
  //     publisher: user,
  //     date: new Date() //or Date.now() so that its easier to sort , and somewhere in the controller new Date(offer.date) to display it normaly
  //   }));
  // }
  // //PUBLISHING AN OFFER--with just an object which shoud be a vehicle
  // userServices.publishOffer = function(obj,userId) {
  //   let _allUsers = getFromMemory("allUsers");
  //   let thatUser = _allUsers.find(u => u.id == userId);
  //   var veh = vehicleServices.addVehicle(obj);
  //   return createNewOffer(userId, veh.id).then(offer => {
  //     thatUser.publishOffer.push(offer);
  //     setInMemory("allUsers", _allUsers);
  //   });
  // };
})();
