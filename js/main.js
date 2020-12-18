let userMarker = "images/user.png";
let markers = [];
let restaurants = [];
let num = restaurants.length;
let numb = num + "i";
let newRestaurants = [];
let newMarkers = [];

let map, infoWindow, restaurant, display, general;

function myMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-1.283176, 36.734676),
    zoom: 14.5,
  });
  infoWindow = new google.maps.InfoWindow({});
  let bounds = new google.maps.LatLngBounds();
  let options = {
    enableHighAccuracy: true,
  };
  let service = new google.maps.places.PlacesService(map);

  restaurant = new Restaurant();
  display = new DisplayHtml();
  generalFn = new GeneralFunctions();

  //add restaurant
  map.addListener("rightclick", (e) => {
    showModal();

    let pos = $("#position");
    pos.attr("data-lat", e.latLng.lat());
    pos.attr("data-lng", e.latLng.lng());
  });

  //searchbox
  let searchBox = new google.maps.places.SearchBox(
    document.getElementById("search")
  );
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(
    document.getElementById("search")
  );
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  google.maps.event.addListener(searchBox, "places_changed", function () {
    searchBox.set("map", null);
    restaurants = [];
    let places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    places.forEach((resta, i) => {
      (function (resta) {
        let pos = resta.geometry.location;

        markers[i] = new google.maps.Marker({
          position: pos,
        });
        markers[i].bindTo("map", searchBox, "map");

        google.maps.event.addListener(markers[i], "map_changed", function () {
          if (!this.getMap()) {
            this.unbindAll();
          }
        });
        bounds.extend(resta.geometry.location);
        restaurants.unshift(resta);
        getNearbyRestaurants(pos);
      })(resta);
    });

    map.fitBounds(bounds);
    searchBox.set("map", map);
    map.setZoom(16);
    google.maps.event.trigger(map, "resize");
  });

  function getMapCenter() {
    let getCenter = map.getCenter();
    let lat = getCenter.lat();
    let lng = getCenter.lng();
    let newLocation = { lat, lng };
    return newLocation;
  }
  //idle map
   google.maps.event.addListener(map, "idle", function () {
    markers = [];
    restaurants = [];
    let pos = getMapCenter();
    getNearbyRestaurants(pos);
  }); 

  function showPosition(position) {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    getNearbyRestaurants(pos);
    map.setCenter(pos);
    bounds.extend(pos);

    infoWindow.open(map);
    new google.maps.Marker({
      position: pos,
      map: map,
      icon: userMarker,
      draggable: true,
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error, options);
  }

  //get restaurants
  function getNearbyRestaurants(position) {
    let request = {
      location: position,
      rankBy: google.maps.places.RankBy.PROMINENCE,
      keyword: "restaurant",
      radius: 1000,
    };

    service.nearbySearch(request, nearbyCallblack);
  }

  function nearbyCallblack(results, status) {
    if ((status = google.maps.places.PlacesServiceStatus.OK)) {
      generalFn.resetMarkers();
      generalFn.resetResults();
      for (let i = 0; i < results.length; i++) {
        restaurants = [];
        let resta = results[i];
        restaurant.addListing(resta, i);
        createPlaceMarker(resta, i);

        restaurants.unshift(resta);
      }
    }
  }

  function createPlaceMarker(data, i) {
    markers[i] = new google.maps.Marker({
      position: data.geometry.location,
      map: map,
      title: data.name,
    });

    google.maps.event.addListener(markers[i], "click", () => {
      let request = {
        placeId: data.place_id,
        fields: [
          "name",
          "formatted_address",
          "geometry",
          "rating",
          "website",
          "photos",
          "reviews",
          "rating",
          "formatted_phone_number",
          "user_ratings_total",
          "opening_hours",
        ],
      };
      service.getDetails(request, (result, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          markerDetails(result, i);
        }
      });
    });
  }

  data.forEach((resta, i) => {
    resta.id = i;
    restaurants.push(resta);
    restaurant.addListing(resta, i);
    createMarker(resta, i);
  });
}
function createMarker(data, i) {
  let coords = data.geometry.location;

  markers[i] = new google.maps.Marker({
    position: coords,
    map: map,
    id: data.id,
  });

  google.maps.event.addListener(markers[i], "click", function (e) {
    markerDetails(data, i);
  });
  markers[i].setMap(map);
}

function markerDetails(data, i) {
  infoWindow.setContent(display.infoWindowHtml(data, i));
  infoWindow.open(map, markers[i]);
  showRestaDetails(data, i);
}

function showRestaDetails(data, i) {
  googleStreetView(markers[i].position);
  restaurant.oneRestaDetails(data, i);
}

function googleStreetView(latLng) {
  let panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: latLng,
      pov: { heading: 165, pitch: 0 },
      zoom: 1,
    }
  );
  return panorama;
}
function showModal() {
  $("#newRestaurant").addClass("show");
  $("#newRestaurant").click((e) => {
    if ($(e.target).hasClass("modal")) {
      $("#newRestaurant").removeClass("show");
    }
  });
}
