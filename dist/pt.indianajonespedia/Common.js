/* jQuery para esconder e mostrar elementos
Extremamente simples...mas eficiente 
Retirado da Star Wars Wiki em Portugu�s
Autor: Thales C�sar
*/

$(document).ready(function(){
$("#hider").click(function()
{
if ($("#hider").html()=="[Mostrar]") {
$("#hider").html("[Esconder]")
$("#hiden").fadeIn("slow");
} else {
$("#hider").html("[Mostrar]")
$("#hiden").fadeOut("slow");
}
});
});