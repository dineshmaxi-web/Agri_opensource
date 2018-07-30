$('.addvideo').click(function(){
  v = $('.vidval').val();
 $.ajax({

  type : "post",
  url : '/post/videos/',
  data : JSON.stringify({
     vid : v
  }),
  contentType : "application/json",
  success : function(data){
     $('.vidval').val() = "";
     alert("Video publicly posted");
  }
 });
 });

  $.ajax({
   type : "get",
   url : '/get/videos',
   dataType : "json",
   contentType : "application/json",
   success : function(data){
     for(var i = 0 ; i < data.length ; i++)
     {
        $('.video').append("<div class='col-lg-4 col-md-6 col-xs-12'><iframe class='resp-iframe' width='360' height='315' src="+data[i].videonum+" frameborder='0' encrypted-media' allowfullscreen></iframe></div>");
      }
    }
  });
