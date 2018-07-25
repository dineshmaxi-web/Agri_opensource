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
        "<ul class='media-list'>"+
          "<li class='media'>"+
            "<a class='pull-left' href='#'>"+
              "<img class='media-object img-circle' src='http://demandware.edgesuite.net/sits_pod32/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw58829350/images/products/vegetables/02735jp_01_hercules.jpg?sw=1120' alt='carrot' width=100% height=100vh>"+
            "</a>"+
            "<div class='media-body'>"+
              "<div class='well well-lg'>"+
                  "<h4 class='media-heading text-uppercase reviews'>"+data[i].pname+"</h4>"+
                  "<ul class='media-date text-uppercase reviews list-inline'>"+
                    "<li class='dd'>"+dt+"-" + month + "-"+year+"</li>"+
                  "</ul>"+
                  "<p class='media-comment'> <strong>Price : </strong> <i class='fa fa-inr'></i>"+data[i].pprice+"</p>"+
                  "<p class='media-comment'> <strong>Quantity : </strong>"+data[i].pquantity+" "+data[i].pqmeasure+"</p>"+
                  "<p class='media-comment'> <strong>City : </strong>"+data[i].city+"</p>"+
              "</div>"+
            "</div>"+
          "</li>"+
        "</ul>"
        );
      if(err)
      $("#post").html(err);
  }
}
});
