
$.ajax({
   type : "get",
   url : '/video/dashboard',
   dataType : "json",
   contentType : "application/json",
   success : function(data){
     if(data.length==0)
     {
       $(".videos").html("<div class='well'>You didn't post any videos</div>");
     }
     else
     {
     for(var i = 0 ; i < data.length ; i++)
     {
       $('.videos').append("<div class='col-lg-4 col-md-6 col-xs-12'><iframe class='resp-iframe' width='360' height='315' src="+data[i].videonum+" frameborder='0' encrypted-media' allowfullscreen></iframe><form method='post' action='/my/video/"+data[i]._id+"/delete'><button class='btn-danger delete' type='submit'>Delete <i class='fa fa-trash'></i></button></form></div>");
    }
  }
}
});
