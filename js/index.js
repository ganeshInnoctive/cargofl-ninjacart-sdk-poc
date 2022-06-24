function myMap() {
    var mapCanvas = document.getElementById("tracking-map");
    var mapOptions = {
      center: new google.maps.LatLng(51.5, -0.2), 
      zoom: 5
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

$( document ).ready(function() {  

});