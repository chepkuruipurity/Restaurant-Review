class GeneralFunctions {
  constructor() {}

  starRating(place) {
    let rating = [];
    let rounded = place.rating | 0;
    let empty = 5 - rounded;

    for (let i = 0; i < 5; i++) {
      if (i < rounded) {
        rating.push('<i class="fa fa-star "></i>');
      } else if (place.rating - i > 0 && place.rating - i < 1) {
        rating.push('<i class="fa fa-star-half-o "></i>');
      } else if (empty > 0 && empty < rounded) {
        rating.push('<i class="fa fa-star-o "></i>');
      } else {
        rating.push('<i class="fa fa-star-o"></i>');
      }
    }
    return rating.join(" ");
    rating = [];
  }

  createPhoto(place) {
    let photo =
      typeof place.photos !== "undefined"
        ? place.photos[0].getUrl({ maxWidth: 600, maxHeight: 400 })
        : "images/kosewe.jpg";

    return photo;
  }
  resetResults() {
    let results = document.getElementById("restaurants");
    while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
    }
  }

  resetMarkers() {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }

    markers = [];
  }
}

$("#options").on("change", ".sort", (e) => {
  e.preventDefault();
  let min = $("#min").val();
  let max = $("#max").val();

  $(".resta-one").each(function (index, element) {
    let text = $(element).find(".rating").text();
    let number = Math.floor(text);

    number >= min && number <= max
      ? $(element).removeClass("notSearched")
      : $(element).addClass("notSearched");
  });
});
