// Initialize sticky nav
$("#sticky").sticky({topSpacing:0});
  
// smooth scroll
smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutCubic',
    offset: 80,
    updateURL: false,
    callbackBefore: function ( toggle, anchor ) {},
    callbackAfter: function ( toggle, anchor ) {}
});

/* magnific popup
$('.popup-gallery').magnificPopup({
  delegate: 'a',
  type: 'image',
  tLoading: 'Loading image #%curr%...',
  mainClass: 'mfp-img-mobile',
  gallery: {
    enabled: true,
    navigateByImgClick: true,
    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
  },
  zoom: {
    enabled: true,
    duration: 300, // don't foget to change the duration also in CSS
    opener: function(element) {
      return element.find('img');
    }
  },
  image: {
    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    titleSrc: function(item) {
      return item.el.attr('title') + '<small>© Deciy Expeditions</small>';
    }
  }
}); */

// Scroll effects
if (window.location.pathname == '/') {
  // Horizontal Scroller
  var next = document.querySelector('.next');
  var prev = document.querySelector('.prev');

  next.addEventListener('click', function(e) {
      e.preventDefault();
      $(".test-wrapper").animate({
        scrollLeft: "+=" + document.querySelector(".test-wrapper").offsetWidth
      }, "slow");
  });
    
  prev.addEventListener('click', function(e) {
      e.preventDefault();
      $(".test-wrapper").animate({
        scrollLeft: "-=" + document.querySelector(".test-wrapper").offsetWidth
      }, "slow");
  });
}

(function($){
  // Search toggler
  $("#search-toggle").click(function(){
      $("#searchform").toggle();
      $("#search-toggle").html("<i class=\"material-icons\">close</i>");
      $("#search-toggle").addClass("search-open");
      
      // subsequent clicks
      $("#search-toggle").click(function(){
          if ($("#search-toggle").hasClass("search-open")) {
              $("#search-toggle").html("<i class=\"material-icons\">search</i>");
              $("#search-toggle").removeClass("search-open");
          }
          else {
              $("#search-toggle").html("<i class=\"material-icons\">close</i>");
              $("#search-toggle").addClass("search-open");
          }
      });
  });

  // Toast
  $("#show-toast").click(function() {
    $('.toast').toast('show');
  });
  // Open booking form
  $("#show-form").click(function() {
    $('#booking').show();
  });

  // Input Spinner
  $("input.number-input").inputSpinner();

})(jQuery);

// Google Map
// function initMap() {
//     var office = new google.maps.LatLng(-1.2448, 36.6645);
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 18,
//       center: office,
//       zoomControl: false,
//       mapTypeControl: false,
//       streetViewControl: false,
//       scrollwheel: false
//     });
//     var style = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];
//     var marker = new google.maps.Marker({
//       position: office,
//       map: map,
//       styles: style
//       //icon: '../images/marker.png',
//     });
// }