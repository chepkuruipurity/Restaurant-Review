restaurants = [];

//add new Restaurant

$("#newRestaurant #newRes").submit((e) => {
  e.preventDefault();
  restaurants = [];
  let name = $("#restaName").val();
  let address = $("#restaAddress").val();
  let rating = $("#rating").val();
  let website = $("#restaWebsite").val();
  let phone = $("#restaPhone").val();
  let lat = $("#position").attr("data-lat");
  let lng = $("#position").attr("data-lng");

  let position = new google.maps.LatLng(lat, lng);
  let resta = {
    id: num + "i",
    place_id: num + "i",
    name: name,
    formatted_address: address,
    reference: phone,
    geometry: { location: position },
    rating: rating,
    website: website,
    photos: "",
    reviews: "",
  };
  restaurants.unshift(resta);

  createMarker(resta, resta.id);
  infoWindow.setContent(display.newContent(resta));
  infoWindow.open(map, markers[resta.id]);
  showRestaDetails(resta, resta.id);
 
  display.newListing(resta, resta.id);

  resetForm();

  $("#newRestaurant").removeClass("show");
});

function resetForm() {
  $("#restaName").val("");
  $("#restaAddress").val("");
  $("#rating").val("");
  $("#restaWebsite").val("");
  $("#restaPhone").val("");
}
