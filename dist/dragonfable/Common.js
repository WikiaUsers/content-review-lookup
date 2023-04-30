/* Any JavaScript here will be loaded for all users on every page load. */
// Collapsible trs
$('tr.collapsibletr').each(function(){
     $(this).nextUntil('.collapsibletr, .uncollapsible').hide();
}).click(function(){
     $(this).toggleClass('collapsed').nextUntil('.collapsibletr, .uncollapsible').toggle();
});