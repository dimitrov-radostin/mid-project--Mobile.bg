function addOfferController() {
  console.log("controller for adding an offer");
  //tva e ako go napishe directno v url-to
  if (localStorage.getItem("loggedUserId") == null) {
    $("#homeLink").click();
    // location.replace("#home")
    // $("#addOfferLink").click()
    return;
  }

  $(() => {
    // $("#loginContainer").hide();
    // $("#registerContainer").hide();
    // $("#homePage").hide();
    // $("#offersPage").hide();
    $("main>*").hide();
    $("#addOffer").show();
    $.get("pages/addOfferPage.htm").then(html => {
      $("#addOffer").html(html);
      loadBrandsController();
      
      
      for (let year = 2018; year > 1970; year--) {
        $("#selectYear").append($(`<option value=${year}>${year}</option>`));
      }

      //Creating an object
      $("#publish").on("click", e => {
        var isInvalid = false;
        e.preventDefault();
        var type = $(); //not using types for the moment
        var obj = { photos: [], extras: [], optional: {} };
        Array.prototype.forEach.call(
          $("#addOffer input,#addOffer select, #addOffer textarea"),
          el => {
            var key = el.name.trim();
            var value = el.value.trim();
            //PHTOTOS
            if ($(el).hasClass("photo")) {
              // console.log("SNIMKA!!!!!@@@@@@@")
              console.log();
              if ($(el).is(":disabled")) {
                console.log("bravo uspq da vkarash pravilno snimka");
                console.log(value);
                obj.photos.push(value);
              }
              return;
            }
            //EXTRAS
            if ($(el).attr("type") == "checkbox") {
              if ($(el).is(":checked")) {
                // obj.extras.push($(el).attr("name"));
                obj.extras.push($(el).attr("value"));
              }
              return;
            }
            //OPTIONAL
            if ($(el).hasClass("optional")) {
              if (value.length > 0) {
                obj.optional[key] = value;
              }
              return;
            }
            //MAIN
            obj[key] = value;
            if (key == "makeId") {
              obj.make = $("#addOffer .make option:selected").text();
            }
            if (key == "modelId") {
              obj.model = $("#addOffer .model option:selected").text();
            }

            if ($(el).prop("required")) {
              if (!value || value == 0) {
                console.log(1)
                $(el)
                .addClass("is-invalid")
                .on("change", () => {
                  $(el)
                    .removeClass("is-invalid");
                });

                isInvalid = true;
              }
            }
          }
        );

        if (isInvalid) {
          isInvalid = false;
          // return;
        } else {
        //the type should be used here
        var cars = getVehicles("cars");
        var finallyACar = cars.addVehicle(obj, getFromMemory("loggedUserId"));
        console.log(finallyACar);
        console.log(JSON.stringify(finallyACar));
        location.replace("#details?veh=" + finallyACar.id)
        }
      });
      //adding more photos
      var photoCount = 1;

      $("table").on("click", e => {
        if ($(e.target).hasClass("addPhoto")) {
          $(`<tr>
        <td>
            <input type="url" class="form-control photo" name="photo${++photoCount}" placeholder="photo${photoCount}">
        </td>
        <td>
           <span class="addPhoto" title="add another photo">  &#10133 </span>
        </td>
    </tr>`).insertAfter(
            $(".addPhoto")
              .last()
              .closest("tr")
          );
        }
      });
      //displaying the photo added by the user
      $("table").on("change", e => {
        if ($(e.target).hasClass("photo")) {
          var url = $(e.target)
            .val()
            .trim();
          var urlExtension = url.split(".")[url.split(".").length - 1];
          const validExtension = ["gif", "jpeg", "jpg", "png", "pdf"];

          if (validExtension.indexOf(urlExtension) === -1) {
            //FOR THE NEAR FUTURE-- with erorrs or/and an error class for the input
            alert("please try again with an image url");
            return;
          }
          // i iska CORS

          (() => {
            $.get(url)
              .then(image => {
                // alert("snimkata doide");
                $(e.target).attr("disabled", "disabled");
                var sourceHtml = document.getElementById("carPhotoTemplate")
                  .innerHTML;
                var templatingFunction = Handlebars.compile(sourceHtml);
                var newHtml = templatingFunction({
                  url: url,
                  photoNumber: $(e.target).attr("placeholder")
                });
                $(newHtml).appendTo($("#photosRow"));
              })
              .catch(e => {
                console.log(e);
                alert(
                  "За съжаление ресурсът не е достъпен, моля включете си CORS pluggin или оптайте пак с различен адрес."
                );
              });
          })();
        }
      });
    });
    loadBrandsController();
  });
}
