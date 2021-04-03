var wiXHR;
var currLength;
function msiGO() {
if ($("#searchInput").val().length == currLength) wiXHR = $.ajax({
url:"/?search="+$("#searchInput").val(),
complete: function( res, status ) {
if ( status === "success" || status === "notmodified") {
clearTimeout(rcTimer);
rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
$a = $("<div>").append(res.responseText.replace(rscript, "").replace('autofocus="" ',""));
$("title").text($a.find("title").text());
$("#content").html($a.find("#content > *"));
$("#p-namespaces").html($a.find("#p-namespaces > *"));
$("#p-views").html($a.find("#p-views > *"));
$("#p-cactions").html($a.find("#p-cactions > *"));
$("#footer-info").html($a.find("#footer-info > *"));
$("body").attr("ondblclick",$a.find("body").attr("ondblclick"));
ttMouseOver();
}
}
}); 
}

function makeSearchInstant() {
$("#searchInput").keyup(function () {
if (typeof(wiXHR)!="undefined") wiXHR.abort();
currLength = $("#searchInput").val().length;
setTimeout("msiGO();",500);
});
}
addOnloadHook(makeSearchInstant);