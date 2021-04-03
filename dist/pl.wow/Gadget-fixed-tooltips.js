function fixedTooltipsHide() {
$(".itemtooltip").hover(function () { $(this).css("visibility","hidden"); },function () { $(this).css("visibility","visible"); });
}
addOnloadHook(fixedTooltipsHide);