(function () {
  var counth = 0;
  $("td.build").click(function () {
    counth += 1;
    if (counth == 1) {
      $(this).addClass("marked");
      counth = 0
    }
  });
})();

$("div#island_reset").click(function () {
$("td.build").removeClass("marked");
});