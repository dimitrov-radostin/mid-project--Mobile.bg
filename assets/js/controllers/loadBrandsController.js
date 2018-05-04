function loadBrandsController() {
  console.log("load brands controller");
  //On home page and on AND the new offer page
  $(() => {
    $(".make").empty();
    $(".model").empty();
    $("#homePage .make").append($(`<option value="0">- Всички -</option>`));
    $("#addOffer .make").append(
      $(`<option value="0">- Избери марка -</option>`)
    );
    $("#homePage .model").append($(`<option value="0">- Всички -</option>`));
    $("#addOffer .model").append(
      $(`<option value="0">- Избери модел -</option>`)
    );
    // $.get("http://127.0.0.1:8080/assets/data/cars-make-model.json").then(
    $.get("assets/data/cars-make-model.json").then(
      data => {
        data.car_makes.forEach(element => {
          $(".make").append(
            $("<option>")
              .attr("value", element.make_id)
              .text(element.make)
          );
        });
      }
    );
console.log($(".make"))
    $(".make").on("change", e => {

      let makeSelectedId = $(e.target).val();
      $.get("assets/data/cars-make-model.json").then(
        data => {
          $(".model").empty();
          $("#homePage .model").append(
            $(`<option value="0">- Всички -</option>`)
          );
          $("#addOffer .model").append(
            $(`<option value="0">- Избери модел -</option>`)
          );
          //adding the corresponding options to the data list
          data.car_models
            .filter(element => element.make_id == makeSelectedId)
            .forEach(element => {
              console.log("dobavqm go sega");
              $(".model").append(
                $("<option>")
                  .attr("value", element.model_id)
                  .text(element.model)
              );
            });
        }
      );
    });
  });
}
