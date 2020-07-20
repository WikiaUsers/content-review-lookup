$(".histo-showmore").click(function(){
var txt = $(".histo-hide").is(':visible') ? '[ show more ]' : '[ show less ]';
$(".histo-showmore").text(txt);
$(".histo-hide").toggle();
});
/* adds a button that increases the content size and hides the rail */