/**
 * Skrypt do automatycznego zwijania tabeli i navboxów umieszczonych jedna za drugą.
 * 
 * @author  MGRINZ
 */

$(function () {
	var selector = ".mw-collapsible.autocollapse";
    
    $(selector).each(function () {
        var table = $(this);
        var nextTable = table.next(selector);
 
        if(nextTable.length) {
        	table.addClass("mw-collapsed")
        	nextTable.addClass("mw-collapsed")
        }
    })
})