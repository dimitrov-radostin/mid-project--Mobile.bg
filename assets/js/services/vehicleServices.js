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

let getVehicles = (() => {
  const SUPPORTED_VEHICLE_TYPES = ["cars", "trucks", "buses"];
  //CONSTRUCTOR

  function ListOfVehicles(type) {
    if (SUPPORTED_VEHICLE_TYPES.indexOf(type) == -1) {
      return new Error("Not a supported type of vehicle");
    }
    this.type = type;

    //INITIALIZATION -- ne e mnogo qsno koga trqbva da pravi zaqvka do onzi json ,
    //poluchavashe se che e pri vsqko prezarejdane no pametta ostava
    //taka sega e samo i edinstveno ako v pametta nqma "cars"
    if (localStorage.getItem(type) == null) {
      setInMemory(type, []);
      this.hasLoadedFromJson = false;
    } else {
      this.hasLoadedFromJson = true;
    }
  }
  //ADDING VEHICLE
  ListOfVehicles.prototype.addVehicle = function(obj, loggedUserId) {
    //works with any object
    obj.id = Math.floor(Math.random() * 99999999);
    obj.publisherId = loggedUserId;
    //DATE
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    obj.publishDate = year + "/" + month + "/" + day;
    //i taka tozi obekt veche oficialno e oferta

    var list = getFromMemory(this.type);
    list.push(obj);
    setInMemory(this.type, list);
    //tozi da si q dobavi pri negovite oferti
    userServices.publishOffer(obj, loggedUserId);
    return obj;
  };
  //REMOVING
  ListOfVehicles.prototype.removeVehicle = function(id) {
    //can only delete those in local memory
    var list = getFromMemory(this.type);
    list.filter(veh => veh.id != id);
    setInMemory(this.type, list);
  };
  //FINDING VEHICLE BY ID
  ListOfVehicles.prototype.getById = function(id) {
    var veh = getFromMemory(this.type).find(v => v.id == id);
    console.log(veh)
    if (veh == null) {
      throw new Error("No vehicle with such id " + id);
    }
    var user=userServices.getUserById(veh.publisherId)

    return {
      vehicle:veh,
      user:user
    };
  };
  //LOADING THOSE FROM JSON

  
  ListOfVehicles.prototype.loadAll = function() {
    //if it has already loaded ,but its still a promise for consistency
    var self = this;
    if (this.hasLoadedFromJson) {
      return new Promise(function(resolve, reject) {
        resolve(getFromMemory(self.type));
      });
    }
    //the first time
    this.hasLoadedFromJson = true;
    console.log("pravq zaqvakta kam json-a s kolite");
    return $.get(
      // "http://127.0.0.1:8080/assets/data/" + this.type + ".json"
      "assets/data/" + this.type + ".json"
    ).then(d => {
      console.log("ei tva doide ot json-a");
      console.log(d);
      let list = getFromMemory(this.type);
      list = list.concat(d);
      setInMemory(this.type, list);
      return list;
    });
  };
  //FILTER
  ListOfVehicles.prototype.filterVehicles = function(searchObject) {
    let list = getFromMemory(this.type);
    for (const key in searchObject) {
      if (searchObject.hasOwnProperty(key)) {
        list = list.filter(veh => {
          if(key=="yearFrom"){
            console.log("bravo")
            console.log(parseInt(veh.year) >= parseInt(searchObject[key]));
            return parseInt(veh.year) >= parseInt(searchObject[key])
          }
          if (key == "priceTo") {
            // console.log(searchObject[key]);
            // console.log(veh.price);
            // console.log(parseInt(veh.price) < parseInt(searchObject[key]));
            return parseInt(veh.price) < parseInt(searchObject[key]);
          }
          return veh.hasOwnProperty(key) && veh[key] == searchObject[key];
        });
        // console.log(list);
      }
    }
    return list;
  };

  //SORT
  //връща първите num , превозни средста с такова property сортирани
  ListOfVehicles.prototype.getTopBy = function(num, property, descending) {
    return this.loadAll().then(list => {
      console.log("ei tuka vav vtoria promise");
      console.log(list);
      return list
        .filter(veh => veh.hasOwnProperty(property))
        .sort((veh1, veh2) => {
          //e taq proverka e pravi vseki pat , ama koda e kratichak
          if (isNaN(veh1[property])) {
            console.log("sortiram leksikografski");
            return descending
              ? veh1[property] > veh2[property]
              : veh1[property] < veh2[property];
          } else {
            console.log("sortiram chisla");
            return (descending - 0.5) * (veh1[property] - veh2[property]);
          }
        })
        .slice(0, num);
    });
  };

  //RETURN
  return function(typeOfVehicle) {
    return new ListOfVehicles(typeOfVehicle);
  };
})();

// //DEMO

// getVehicles("platnohodki");
// var cars = getVehicles("cars");
// //za sega vseki pat kato refreshna i dobavq po edno takova ,ama to maj taka trqbva da e
// // cars.addVehicle({
// //   describtion: "edna testova kolichka dobavena ej taj s methoda"
// // });
// console.log(cars);
// cars.loadAll().then(d => {
//   console.log("bravo ,mnogo dobre se pokazvat kolichkite");
//   console.log(d);
// });

// cars.getTopBy(2, "numberOfDoors", false).then(d => {
//   console.log("izkarvam dvete s naj-mnogo vrati");
//   console.log(d);
// });
// cars.getTopBy(5, "price", true).then(d => {
//   console.log("izkarvam pette naj-evtini");
//   console.log(d);
// });
// cars.getTopBy(200, "model", true).then(d => {
//   console.log("izkarvam gi po azbuchen red na modela");
//   console.log(d);
// });

// // var trucks = getVehicles("trucks");
// // trucks.addVehicle({ name: "lorry_the_truck" });
// // console.log(trucks);
// // var trucksForReal = trucks.loadAll();
// // console.log(trucksForReal);
