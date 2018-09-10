function initMap(){
var locations = [];
$.ajax({
   type : "get",
   url : '/get/product',
   contentType : "application/json",
   dataType : 'json',
   success : function(data){
     for(var i = 0 ; i < data.length ; i++)
     {
          locations.push([data[i].lat,data[i].lng,data[i].pname,data[i].pquantity,data[i].pprice,data[i]._id,data[i].pimage]);
     }
     var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 7,
       center: new google.maps.LatLng(10.7801572,76.0433121),
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });

     var infowindow = new google.maps.InfoWindow();

     var marker, i;

     for (i = 0; i < locations.length; i++){
       var icon = {
            url: locations[i][6] , // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
        };
       marker = new google.maps.Marker({
         position: new google.maps.LatLng(locations[i][0],locations[i][1]),
         map: map,
         icon : icon
       });

     google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
         infowindow.setContent("<p><b>Product name : </b>"+locations[i][2]+"<br><b>Product quantity : </b>"+locations[i][3]+"<br><b>Product price : </b>"+locations[i][4]+"<br>"+"<a style='float:right' href=/my/products/detail/"+locations[i][5]+" id='newpage'><button style='cursor: pointer' id='more-details'>Get details</button></p>");
         infowindow.open(map, marker);
       }
     })(marker, i));
}
}
});
}
$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
