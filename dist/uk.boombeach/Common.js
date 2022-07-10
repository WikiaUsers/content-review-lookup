/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
$(document).ready(function() {
    // Template:CollapsibleContent
    $("table.collapsing-table tr.collapsing-table-trigger td").click(function() {
        $(this).parent("tr").siblings("tr").children("td").fadeToggle(600);
        $(this).children("p.collapsing-table-trigger-messages").children("span.collapsing-table-trigger-text").toggleClass("collapsing-table-trigger-text-hidden");
    });
});