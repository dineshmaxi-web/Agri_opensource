String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$.ajax({
   type : "get",
   url : '/post/dashboard',
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     for(var i = 0 ; i < data.length ; i++)
     {
       date = new Date(data[i].created_at);
       year = date.getFullYear();
       month = date.getMonth()+1;
       dt = date.getDate();

        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
      $("#posts").append(
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
      if(err)
      $("#post").html(err);
  }
}
});
