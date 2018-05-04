function searchController(params) {
  params = decodeURI(params);
  //Ready made function for converting URL parameters to a JavaScript object
  var searchObject = params.split("&").reduce(function(prev, curr, i, arr) {
    var p = curr.split("=");
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    return prev;
  }, {});
  console.log("tarsq sas ei toz obekt");
  console.log(searchObject);
  if(searchObject.hasOwnProperty("#search")){
    console.log("shte te varna v nachalnata stranica")
    $("#homeLink").click()
    return}
  var cars = getVehicles("cars").filterVehicles(searchObject);
  console.log("tarseneto varna ei tez koli");
  console.log(cars);
if(cars.length==0){
 
  getVehicles("cars")
      .getTopBy(30,"publishDate",false)
      .then(cars => {
        offersController({cars:cars,
        heading:"За съжаление нашият сайт е все още малък и няма кола отговаряща на вашето търсене.Може да допринесете за неговото развитие като публикувате обява."});
      });
  return
}
  offersController({
    cars: cars,
    heading: "Резултати от вашето търсене:"
  });
}
