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
        "<img src='http://demandware.edgesuite.net/sits_pod32/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw58829350/images/products/vegetables/02735jp_01_hercules.jpg?sw=1120' class='img-responsive' width=100%>"+
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
}
});

$('.search-button').click(function(){
  $("#post").empty();
   searchval = $('.search-term').val();
$.ajax({
   type : "get",
   url : '/get/product/search/'+searchval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     for(var i = 0 ; i < data.length ; i++)
     {
      $("#post").append(
        "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
        "<div class='card'>"+
        "<img src='http://demandware.edgesuite.net/sits_pod32/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw58829350/images/products/vegetables/02735jp_01_hercules.jpg?sw=1120' class='img-responsive' width=100%>"+
        "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
        "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
        "<p class='list'>Quantity : "+data[i].pquantity+"</p>"+
        "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
        "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Alert / Details</button></p>"+
        "<hr>"+
        "</div>"+
        "</div>"
         );
      if(err)
      console.log(err);
  }
}
});
});
