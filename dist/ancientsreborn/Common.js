/* Any JavaScript here will be loaded for all users on every page load. */

$(".MapItem").on("mouseover", function() {
  var className = $(this).find("table").attr("class");
  var classSplit = className.split(" ");
  if (
    $(this)
      .find("table")
      .find("tr")
      .html().trim() === ""
  ) {
    var output = "";
    for (var i in classSplit) {
      output += "<td>" + $("#" + classSplit[i]).html() + "</td>";
    }
    $(this)
      .find("table")
      .find("tr")
      .append(output);
  }
});
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