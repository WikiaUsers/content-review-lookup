
$('.CBC').on("keyup change", function(){
  CalcCB();
});
function CalcCB(){
    var str = parseInt($("#str").text());
  var dex = parseInt($("#dex").text());
  var def = parseInt($("#def").text());
  var int = 1;
  var total = str + dex + def;
  var left = 375-total;
  $("#left").text(left);
  $("#used").text(total);
  var cbl = (total * .32) + (int * .25);
  $("#cbl").text(cbl.toFixed(2));
}