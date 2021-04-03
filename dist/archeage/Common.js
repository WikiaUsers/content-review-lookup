/**
 * These are for creating tooltips that appear when an object with the
 *   "tooltip-hover" class is hovered over.
 * The trigger object should have a data-tooltip attribute which contains the ID of
 *   the tooltip.
 * The tooltip should have "display: none;" by default, either inline or from CSS.
 */
 
function jqEscapeId( id ) {
    return id.replace(/(:|\.|\[|\])/g, "\\$1" );
}
 
$('.tooltip-hover').hover(function() {
    $('[id="' + jqEscapeId($(this).attr('data-tooltip')) + '"]').show();
}, function() {
    $('[id="' + jqEscapeId($(this).attr('data-tooltip')) + '"]').hide();
});
 
$('.tooltip-hover').mousemove(function(e) {
    var tooltip = $('[id="' + jqEscapeId($(this).attr('data-tooltip')) + '"]');
    var pos = $('#bodyContent').position();
    var padding = 20;
    var maxX = $('#bodyContent').width() - tooltip.width() - padding;
    var x = Math.max(padding, Math.min(e.pageX + 10 - pos.left, maxX));
    tooltip.css('position','absolute');
    tooltip.css('top',e.pageY + 10 - pos.top + 'px');
    tooltip.css('left',x + 'px');
});

/*********************************
 * Skill description rank slider *
 *********************************/

$('input.rank-slider').mounsemove(function() {
    var rank = $(this).value - 1;
    $('p.skilltt span[data-values]').each(function (n, el) {
        console.log(el.dataset.values.split(','), rank);
        el.textContent = el.dataset.values.split(',')[rank];
    });
    $(this).text('Rank ' + (rank + 1));
});