String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$.ajax({
   type : "get",
   url : '/post/dashboard',
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length==0)
     {
       $("#posts").html("<div class='well'>You didn't post any products</div>");
     }
     else
     {
     for(var i = 0 ; i < data.length ; i++)
     {
      $("#posts").append(
        "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
        "<div class='card'>"+
        "<img src="+data[i].pimage+" class='img-responsive' style='width:100%;height:200px;'>"+
        "<h1 class='item'>"+data[i].pname.capitalize()+"</h1>"+
        "<p class='list'>Price : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].pprice+"</p>"+
        "<p class='list'>Quantity : "+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
        "<p class='list'>Place : "+data[i].city.capitalize()+"</p>"+
        "<form action=/my/products/detail/"+data[i]._id+"/delete method='post'><button class='btn-danger'> Delete <i class='fa fa-trash'></i></button></form>"+
        "<hr>"+
        "</div>"+
        "</div>"
       );
      if(err)
      $("#post").html(err);
  }
}
}
});


$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
