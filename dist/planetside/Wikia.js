// auto-zebra stripe for tables
function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","transparent");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
});
}
}