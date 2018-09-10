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
        "<form action=/my/products/detail/"+data[i]._id+"/delete method='post'><button class='btn-danger moredet' > Delete <i class='fa fa-trash'></i></button></form>"+
        "<hr>"+
        "</div>"+
        "</div>"
       );
  }
}
}
});

 $.ajax({
     type : "get",
     url : '/get/mail',
     contentType : "application/json",
     dataType : 'json',
     success : function(data,err){
       $(".howmanyclicks").html(data.length);
      }
});

$(".satisfaction").click(function(){
  $.ajax({
     type : "get",
     url : '/get/mail',
     contentType : "application/json",
     dataType : 'json',
     success : function(data,err){
       if(data.length==0)
       {
        $(".satisfactionpage").html("<button class='btn-info postspage'>Posts</button><br><br><div class='well'>You didn't have any clicks</div>");
       }
       else
       {
       $(".satisfactionpage").html("<i class='fa fa-question-circle' data-toggle='tooltip' title='If you click YES product will be updated depending upon the availability. If not please click NO.' style='font-size:24px;'></i><a href='/my/dashboard/posts'><i style='float: right; font-size:20px;' class='fa fa-shopping-cart'> Go to post</i></a><br><br>");
       for(var i = 0 ; i < data.length ; i++)
       {
          updatedquantity = Number(data[i].pquantity) - Number(data[i].howmuch);
          $(".satisfactionpage").append(
            "<div class='well'> Have you sold the  "+
            '<b>'+data[i].howmuch+' '+data[i].pqmeasure+'</b> of <b>'+
            data[i].productname+'</b> to <b>'+data[i].clickername+'</b>. <form style="float: right" action=/yesupdate/'+data[i].productid+'/'+updatedquantity+'/mail method="post"><button class="yes btn-success">YES</button></form><form style="float: right" action=/noupdate/'+data[i].productid+'/'+updatedquantity+'/mail method="post"><button class="no btn-danger" >NO</button></form>'+
            "</div>"
          );
       }
     }
     }
  });
});

$('[data-toggle="tooltip"]').tooltip();

$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
