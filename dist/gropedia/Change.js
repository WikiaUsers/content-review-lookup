// **************************************************
// * Change                                         *
// * Autor: Vuh                                     *
// * Podziękowania za pomoc przy skrypcie dla: Sovq *
// **************************************************
// Użycie:
//  <span class="changebox" id="changebox1">Nagłówek #1</span>
//  <div class="changebox" id="changebox1" style="display: block;">Szablon #1</div>
//  <span class="changebox" id="changebox2">Nagłówek #2</span>
//  <div class="changebox" id="changebox2" style="display: none;">Szablon #2</div>
//  ...

$(document).ready(function() {
$("span.changebox").click(function() {
    var tab = $(this).attr("id");
    $("div.changebox").each(function() {
        if ($(this).attr("id") == tab) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});
});