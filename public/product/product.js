String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$.ajax({
   type : "get",
   url : '/get/product',
   contentType : "application/json",
   dataType : 'json',
   success : function(data){
     for(var i = 0 ; i < data.length ; i++)
     {
      $("#post").append(
        "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
        "<div class='card'>"+
        "<img src="+data[i].pimage+" class='img-responsive' style='width:100%;height:200px;'>"+
        "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
        "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
        "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
        "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
        "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
        "<hr>"+
        "</div>"+
        "</div>"
        );
}
}
});

$('.namesearch').click(function(){
   searchval = $('.search-term').val();
$.ajax({
   type : "get",
   url : '/get/product/search/name/'+searchval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length == 0){
         $("#post").empty();
         $("#post").html("<div class='well text-center'><b>"+searchval +"</b> is not found.</div>")
      }
      else {
        $("#post").empty();
        for(var i = 0 ; i < data.length ; i++)
        {
         $("#post").append(
           "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
           "<div class='card'>"+
           "<img src='https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' class='img-responsive' style='width:100%;height:200px;'>"+
           "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
           "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
           "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
           "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
           "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Alert / Details</button></p>"+
           "<hr>"+
           "</div>"+
           "</div>"
            );
        }}}
});
});

$('.search-location').on('change',function(){
  locval = this.value;

$.ajax({
   type : "get",
   url : '/get/product/search/location/'+locval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length == 0){
         $("#post").empty();
         $("#post").html("<div class='well text-center'>There is no product available in <b>"+locval +"</b>.</div>")
      }
      else {
        $("#post").empty();
        for(var i = 0 ; i < data.length ; i++)
        {
         $("#post").append(
           "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
           "<div class='card'>"+
           "<img src='https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' class='img-responsive' style='width:100%;height:200px;'>"+
           "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
           "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
           "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
           "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
           "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Alert / Details</button></p>"+
           "<hr>"+
           "</div>"+
           "</div>"
            );
        }}}
});
});

$('.search-condition').on('change',function(){
  condval = this.value;
  priceval = $(".search-price").val();
$.ajax({
   type : "get",
   url : '/get/product/search/price/'+condval+'/'+priceval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length == 0){
         $("#post").empty();
         $("#post").html("<div class='well text-center'>There is no product "+cond+" <b><i class='fa fa-inr'></i> "+priceval+"</b>.</div>")
      }
      else {
        $("#post").empty();
        for(var i = 0 ; i < data.length ; i++)
        {
         $("#post").append(
           "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
           "<div class='card'>"+
           "<img src='https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' class='img-responsive' style='width:100%;height:200px;'>"+
           "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
           "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
           "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
           "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
           "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Alert / Details</button></p>"+
           "<hr>"+
           "</div>"+
           "</div>"
            );
        }
      }}
});
});

$('.search-price').on('change',function(){
  priceval = this.value;
  condval = $(".search-condition").val();
$.ajax({
   type : "get",
   url : '/get/product/search/price/'+condval+'/'+priceval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length == 0){
         $("#post").empty();
         $("#post").html("<div class='well text-center'>There is no product "+condval+" <b><i class='fa fa-inr'></i>"+priceval+"</b>.</div>")
      }
      else {
        $("#post").empty();
        for(var i = 0 ; i < data.length ; i++)
        {
         $("#post").append(
           "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
           "<div class='card'>"+
           "<img src='https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' class='img-responsive' style='width:100%;height:200px;'>"+
           "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
           "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
           "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
           "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
           "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Alert / Details</button></p>"+
           "<hr>"+
           "</div>"+
           "</div>"
            );
        }
      }}
});
});
