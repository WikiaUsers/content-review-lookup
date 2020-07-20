/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*
==================================================

/*** Collapsible trs v2 ***************************************************
 * Allows associated table rows to collapse under another
 * Uses class "collapsibletr" to set collapsibility
 * Class "collapsed" makes it collapsed by default
 * Collapses all rows underneath it until another tr has
 * the class "collapsibletr", or a tr has the class "uncollapsibletr"
 ****************************************************************************/
$('tr.collapsibletr').each(function(){
     $(this).nextUntil('.collapsibletr, .uncollapsible').hide();
}).click(function(){
     $(this).toggleClass('collapsed').nextUntil('.collapsibletr, .uncollapsible').toggle();
});
 
/*** Scrollable tables v2 **************************************************
 * Allows a table to scroll vertically, retaining table header
 * Uses class "scrollable" to allow scrolling header
 * Requires create tHead
 ****************************************************************************/
mw.util.addCSS('.scrollable-process th, .scrollable-process td {border-width: 0 !important}');
document.querySelectorAll("table.scrollable").forEach(function (table) {
  createTHead(table);
  var $table = $(table);
  $table.addClass('scrollable-process scrollable-active');
  $table.find('thead tr th').each(function(i, v) {
    var $this = $(this),
        dataWidth = $($table.find('tbody tr:first').children().get(i)).width(),
        headWidth = $this.width();
    if (headWidth > dataWidth) {
        $($table.find('tbody tr:first').children().get(i)).width(headWidth);
        $this.width(headWidth);// needed in case of pre-existed inline-styling
    } else {
        $this.width(dataWidth);
    }
  });
  $table.removeClass('scrollable-process');
});
 
/* create tHead helper function
 * Takes header rows from tables and puts them in tHead element
 * Uses rows at beginning of table containing only THs
 * Stops at row with TDs or row with "first-row" class*/
function createTHead(table) {
    var thead = table.tHead;
    if (thead) return thead;
    thead = document.createElement("thead");
    var tbody = table.tBodies[0];
    table.insertBefore(thead, tbody);
    for (var i = 0; i < tbody.rows.length; i++) {
        var tbodyrow = tbody.rows[0];
        if (tbodyrow.querySelectorAll("td").length !== 0 || tbodyrow.classList.contains("first-row")) break;
        thead.appendChild(tbodyrow);
    }
    return thead;
}

/*** Article box *******************************************************
 * Creates and displays article info box (if page has something to display)
 * Adds sideicons in the given order
 ****************************************************************************/
$(function(){
    var icons = document.getElementsByClassName('sideicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="sideiconrail"><h2>Информация о статье:</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("sideiconrail");
        var j = icons.length;
        for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
    }
 
    $(".sideicon").show();
});