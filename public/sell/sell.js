var placeSearch, autocomplete, geocoder;
$('#latcomplete').hide();
$('#lngcomplete').hide();

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      // This is the lat and lng results[0].geometry.location
      $('#latcomplete').val(results[0].geometry.location.lat);
      $('#lngcomplete').val(results[0].geometry.location.lng);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  codeAddress(document.getElementById('autocomplete').value);
}

$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
