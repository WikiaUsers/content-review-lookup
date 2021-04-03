/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {

$('.tooltip-hover').hover(function() {
    $('#' + this.id + '-tooltip').show();
}, function() {
    $('#' + this.id + '-tooltip').hide();
});
$('.tooltip-hover').mousemove(function(e) {
    var tooltip = $('#' + this.id + '-tooltip');
    var pos = $('#bodyContent').position();
    var padding = 2;
    var maxX = $('#bodyContent').width() - tooltip.width() - padding;
    var x = Math.max(padding, Math.min(e.pageX + 10 - pos.left, maxX));
    tooltip.css('position','absolute');
    tooltip.css('top',e.pageY + 10 - pos.top + 'px');
    tooltip.css('left',x + 'px');
});

} );