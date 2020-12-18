class DisplayHtml {
  constructor() {
    this.generalFn = new GeneralFunctions();
  }
  infoWindowHtml(data, i) {
    let content = ` 
    <div id="infoWindow${i}" class="infoWindow">
     <div>
     <img class="infoImg" id="infoImg${i}" src="${this.generalFn.createPhoto(
      data
    )}"/>
     </div> 
     <div class="details">
     <h3 class="name">${data.name}</h3>`;
    if (data.rating) {
      content += `<h3 class="rating" id="rating">${
        data.rating
      }${this.generalFn.starRating(data)}</h3>`;
    } else {
      content += `<h3 class="rating" id="rating">0${this.generalFn.starRating(
        data
      )}</h3>`;
    }

    content += `<div id="restaurantDetails">
    <p id="address${i}" class="address" >${data.formatted_address}</p>
    </div>
    <div> <a href="#restaurant-info" id="link${i}" class="link"><h3>See Reviews</h3></a></div>
    </div>
    </div>
  `;

    return content;
  }

  listingHtml(data, i) {
    let restaurant = `
    <div id="imgSpace" >
    <img class="restaImg" id= "restaImg${i}" src="${this.generalFn.createPhoto(
      data
    )}"/></div>
    <div id="details">
      <h3 id="resta-name${i}"  class="resta-name name"><a class="nameLink">${
      data.name
    }</a></h3>
    <h3 id="rating${i}" class="rating"> ${
      data.rating
    } ${this.generalFn.starRating(data)}</h3>
   
    </div>`;

    return restaurant;
  }

  reviewsHtml(data, avatar, i) {
    let reviewsHtml = "";
    reviewsHtml += `<div class="restaurant-reviews">
    <h3 class="review-title">
    <span class="profile-photo" style="background-image: url('${avatar}')"></span>
    <div class="reviewtop"><div id="author" >${data.author_name}</div>
    `;
    if (data.rating) {
      reviewsHtml += `<p id="review-rating" class="rating">${this.generalFn.starRating(
        data
      )}</p></div></h3>`;
    }
    reviewsHtml += `<p class="comment">${data.text} </p></div>`;
    return reviewsHtml;
  }
  newListing(data, i) {
    let restaurants = $("#restaurants");
    let listDiv = $("<div></div>").attr("class", "resta-one");

    listDiv.click(function () {
      google.maps.event.trigger(markers[i], "click");
    });
    let details = `
    <div id="imgSpace" >
    <img class="restaImg" id= "restaImg${i}" src="images/kosewe.jpg"/></div>
    <div id="details">
      <h3 id="resta-name${i}"  class="resta-name name"><a class="nameLink">${
      data.name
    }</a></h3>
    <h3 id="rating${i}" class="rating"> ${data.rating} ${generalFn.starRating(
      data
    )}</h3>
   
    </div>`;

    listDiv.append(details);
    restaurants.prepend(listDiv);
  }

  newContent(data, i) {
    let content = ` 
    <div id="infoWindow${i}" class="infoWindow">
     <div>
     <img class="infoImg" id="infoImg${i}" src="images/kosewe.jpg"/>
     </div> 
     <div class="details">
     <h3 class="name">${data.name}</h3>`;
    if (data.rating) {
      content += `<h3 class="rating" id="rating">${
        data.rating
      }${generalFn.starRating(data)}</h3>`;
    } else {
      content += `<h3 class="rating" id="rating">0</h3>`;
    }
    content += ` 
    <div id="restaurantDetails">
    <p id="address${i}" class="address" >${data.formatted_address}</p>
    </div>
    <div> <a href="#restaurant-info" id="link${i}" class="link"><h3>See Reviews</h3></a></div>
    </div>
    </div>
  `;
    return content;
  }
}
