$.ajax({
   type : "get",
   url : '/video/dashboard',
   dataType : "json",
   contentType : "application/json",
   success : function(data){
     for(var i = 0 ; i < data.length ; i++)
     {
       $('.videos').append("<div class='col-lg-4 col-md-6 col-xs-12'><iframe class='resp-iframe' width='360' height='315' src="+data[i].videonum+"frameborder='0' encrypted-media' allowfullscreen></iframe><button class='btn-danger'><a href=''>Delete</a></button></div>");
      }
    }
});
