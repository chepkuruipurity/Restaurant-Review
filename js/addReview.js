newReviews = [];

class Review {

  constructor() {
    this.display = new DisplayHtml();
  }

  addNewReview(name, rate, review) {
    let reviewDetails = {
      author_name: name,
      rating: rate,
      text: review,
    };
    let avatar = "images/avatar.png";

    let reviews = $("#reviews");
    let reviewsHtml = " ";
    reviewsHtml += this.display.reviewsHtml(reviewDetails, avatar);

    newReviews.push(reviewDetails);
    reviews.prepend(reviewsHtml);
  }

  addReview() {
    let name = $("#add-name").val();
    let rate = $("#rate").val();
    let review = $("#add-review").val();

    if (!(name && rate && review)) {
      return;
    }
    this.addNewReview(name, rate, review);
    $("#add-name").val("");
    $("#rate").val("");
    $("#add-review").val("");
  }
}

$("#addReviewButton").on("click", (e) => {
  let modal = $("#reviewModal");
  modal.css("display", "block");

  modal.click((e) => {
    if ($(e.target).hasClass("modal")) {
      $("#reviewModal").css("display", "none");
    }
  });
});

$("#reviewModal #form ").submit((e) => {
  e.preventDefault();
  $("#reviewModal").css("display", "none");
  new Review().addReview();
});
