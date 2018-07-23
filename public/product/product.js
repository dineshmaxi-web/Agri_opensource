$.ajax({
   type : "get",
   url : '/sell/product',
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     for(var i = 0 ; i < data.length ; i++)
     {
      $("#post").append(
        "<div class='col-xs-6 col-lg-3 col-sm-6 col-sm-3'"+
        "<div class='card'>"+
        "<img src='http://demandware.edgesuite.net/sits_pod32/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw58829350/images/products/vegetables/02735jp_01_hercules.jpg?sw=1120' class='img-responsive' width=100% height=150 >"+
        "<h1 class='item'>"+data[i].pname+"</h1>"+
        "<p class='list'>Price(in ruppees) : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
        "<p class='list'>Quantity(in tons) : "+data[i].pquantity+"</p>"+
        "<p class='list'>Place : "+data[i].city+"</p>"+
        "<a href=/my/products/detail/"+data[i]._id+" id='newpage'><button id='more-details'>alert / Details</button></p>"+
        "<hr>"+
        "</div>"+
        "</div>"
         );
      if(err)
      console.log(err);
  }
}
});
