/* Any JavaScript here will be loaded for all users on every page load. */
function getCorrectTarget(target) {
    while(!target.classList.contains('effect-cell')) {
        target = target.parentElement;
    }

    return target;
}

function onMouseEnter(event) {
    var target = getCorrectTarget(event.target);
    var effectId = target.getAttribute('data-tooltip-id');
    var tooltip = tooltip_map[effectId];
    tooltip.style.display = 'block';
}

function onMouseMove(event) {
    var target = getCorrectTarget(event.target);
    var effectId = target.getAttribute('data-tooltip-id');
    var tooltip = tooltip_map[effectId];
    tooltip.style.left = event.layerX + 'px';
    tooltip.style.top = event.layerY + 'px';
}

function onMouseLeave(event) {
    var target = getCorrectTarget(event.target);
    var effectId = target.getAttribute('data-tooltip-id');
    var tooltip = tooltip_map[effectId];
    tooltip.style.display = 'none';
}

function onPageLoaded(event) {
	window.tooltip_map = {};
    var effectCells = document.querySelectorAll('.effect-cell[data-tooltip-id]');
    
    for (var i = 0; i < effectCells.length; i++) {
        var td = effectCells[i];
        var effectId = td.getAttribute('data-tooltip-id');
        var tooltip = document.querySelector('#' + effectId + '-Tooltip');
        tooltip_map[effectId] = tooltip;

        td.addEventListener('mouseenter', onMouseEnter);
        td.addEventListener('mousemove', onMouseMove);
        td.addEventListener('mouseleave', onMouseLeave);
    }
}

mw.hook("wikipage.content").add(function($content) {
    onPageLoaded();
});