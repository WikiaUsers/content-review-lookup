/* Any JavaScript here will be loaded for all users on every page load.                      */

// Tooltips
function positionTooltip(element, event) {
    var left = event.clientX + 20 + element.width() > window.innerWidth ?
        window.innerWidth - element.width() - 20 : event.clientX + 10;
    var top = event.clientY + 20 + element.height() > window.innerHeight ?
        event.clientY - element.height() - 30 : event.clientY + 20;
    element.css({'left': left + 'px', 'top': top + 'px'});
}

$(document).on('mousemove', function (event) {
    positionTooltip($('.tooltip:hover > .tooltip-block'), event);
    positionTooltip($('.tooltip:hover > .tooltip-block-item'), event);
    positionTooltip($('.tooltip:hover > .tooltip-block-weapon'), event);
    positionTooltip($('.tooltip:hover > .tooltip-block-converter'), event);
    positionTooltip($('.tooltip:hover > .tooltip-block-shop'), event);
    positionTooltip($('.tooltip:hover > .tooltip-block-furniture'), event);
});