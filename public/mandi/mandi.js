$(document).ready(function(){
  var table =  $('#myTable');

  $.ajax({
     type : "get",
     url : 'https://data.gov.in/node/86943/datastore/export/json',
     Accept : 'application/json',
     success : function(data){
       for (var i = 0 ; i < data.length; i++) {
             var $nr = $('<tr><td>' + data[i].state  + '</td> <td>' + data[i].district  + '</td> <td>' + data[i].market  + '</td> <td>' + data[i].commodity  + '</td> <td>' + data[i].variety  + '</td> <td>' + data[i].arrival_date  + '</td> <td>'
              + data[i].min_price  + '</td> <td>' + data[i].max_price  + '</td> <td>' + data[i].modal_price  + '</td></tr>');
             table.append($nr);
         }
       $('#myTable').DataTable();
}
});
});
$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
