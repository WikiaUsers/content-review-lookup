$('.CBC').on("keyup change", function(){
  CalcCB();
});
function CalcCB(){
    var str = parseInt($("#str").text());
  var dex = parseInt($("#dex").text());
  var def = parseInt($("#def").text());
  var int = parseInt($("#intellect").text());
  var total = str + dex + def + int;
  var left = 407-total;
  $("#left").text(left);
  $("#used").text(total);
  var cbl = (total * .32);// + (1 * .25);
  $("#cbl").text(cbl.toFixed(2));
}