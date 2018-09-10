
var html = '';
$(document).ready(function(){
  var table =  $('#myTable');
  $("#myTable thead").html("<i style='color:gold;font-size:20px;'>Loading... <i class='fa fa-refresh fa-spin' ></i></i>");
  $.ajax({
     type : "get",
     url : 'https://data.gov.in/node/86943/datastore/export/json',
     Accept : 'application/json',
     success : function(data){
       for (var i = 0 ; i < data.length; i++) {
             html += '<tr><td>' + data[i].state  + '</td> <td>' + data[i].district  + '</td> <td>' + data[i].market  + '</td> <td>' + data[i].commodity  + '</td> <td>' + data[i].variety  + '</td> <td>' + data[i].arrival_date  + '</td> <td>'
              + data[i].min_price  + '</td> <td>' + data[i].max_price  + '</td> <td>' + data[i].modal_price  + '</td></tr>';
         }
       $("#myTable thead").html('<tr><th class="col">City</th><th class="col">District</th><th class="col">Market</th><th class="col">Commodity</th><th class="col">Variety</th><th class="col">Arrival_date</th><th class="col">Min_price</th><th class="col">Max_price</th><th class="col">Modal_price</th></tr>');
       table.append(html);
       $('#myTable').DataTable();
}
});
});
$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
