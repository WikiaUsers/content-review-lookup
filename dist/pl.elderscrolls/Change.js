// *******************************************************
// * Change                                              *
// * Autor: Vuh                                          *
// * Podziękowania za pomoc przy skrypcie dla: Sovq, Wed *
// *******************************************************
// Użycie:
//  <span class="changebox" id="changebox1">Nagłówek #1</span>
//  <div class="changebox" id="changebox1" style="display: block;">Szablon #1</div>
//  ...

$("span.changebox").click(function(){
	var e = $(this).attr("id")
	$("div.changebox").each(function(){
		($(this).attr("id")==e)?$(this).show():$(this).hide()
	})
	$("span.changebox").each(function(){
		($(this).attr("id")==e)?$(this).addClass("changebox-active"):$(this).removeClass("changebox-active")
	})
})