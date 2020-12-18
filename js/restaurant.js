class Restaurant {
  constructor() {
    this.display = new DisplayHtml();
    this.generalFn = new GeneralFunctions();
    this.reviews = $("#reviews");
  }
  addListing(data, i) {
    let restaurants = $("#restaurants");
    let listDiv = $("<div></div>").attr("class", "resta-one");

    listDiv.click(function () {
      google.maps.event.trigger(markers[i], "click");
    });
    let details = this.display.listingHtml(data, i);

    listDiv.append(details);
    restaurants.append(listDiv);
  }
  oneRestaDetails(data, i) {
    $(".restaurant-name").text(data.name);
    $(".restaurant-address").text(data.formatted_address);
    $(".restaurant-phone").text(data.formatted_phone_number);
    if (data.rating) {
      $(".restaurant-rating").html(
        `${data.rating}${this.generalFn.starRating(data)}(${
          data.user_ratings_total
        })`
      );
    } else {
      $(".restaurant-rating").html(`0${this.generalFn.starRating(data)}(0)`);
    }
    if (data.website) {
      let website = data.website;
      if (website === null) {
        website = "https://" + data.website + "/";
      }
      $("#website").html(
        '<a href="' + website + '">Visit the restaurant website</a>'
      );
    }
    if (data.opening_hours) {
      if (data.opening_hours.open_now) {
        $("#open").css("display", "");
        $("#open").text("OPEN NOW");
      } else {
        $("#open").css("display", "none");
      }
    }

    let reviewsHtml = "";
    if (data.reviews) {
      if (data.reviews.length > 0) {
        for (let i = 0; i < data.reviews.length; i++) {
          let review = data.reviews[i];
          let avatar;
          if (data.reviews[i].profile_photo_url) {
            avatar = data.reviews[i].profile_photo_url;
          } else {
            avatar = "images/avatar.png";
          }
          reviewsHtml += this.display.reviewsHtml(review, avatar, i);

          this.reviews.html(reviewsHtml);
        }
      }
    }
  }
}
