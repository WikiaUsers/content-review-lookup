/*
 * @name: WdsTooltips
 * @author: KhangND (idea by 机智的小鱼君)
 * @description: documented at https://dev.fandom.com/WdsTooltips
 */
(function () {
var container = '#mw-content-text';
if (window.WdsTLoaded || $(container).length === 0) {
return;
}
window.WdsTLoaded = true;

var className = '.custom-tooltip > ',
containerBound = {
left: $(container).offset().left,
right: $(container).offset().left + $(container).width(),
bottom: $(container).offset().top + $(container).height()
},
handlers = {
mouseenter: function() {
var tip = $(this).parent().children('.wds-dropdown__content')[0],
toggle = $(this).parent().children('.wds-dropdown__toggle')[0];

//fix for short pages
if($(container).height() < $(tip).height()) {
$('#content').css('overflow', 'unset');
return;
}

//resize tooltip if toggle is too small
if ($(tip).height() / $(toggle).width() > 25) {
$(tip).width(200);
$(tip).height('auto');
}

//check bounds
var tipBound = {
left: $(tip).offset().left,
right: $(tip).offset().left + $(tip).width(),
bottom: $(tip).offset().top + $(tip).height()
};
$(overflowBounds(tipBound, containerBound)).each(function(i, val) {
switch (val) {
case 'L':
$(tip).addClass('wds-is-left-aligned');
break;
case 'R':
$(tip).addClass('wds-is-right-aligned');
break;
case 'B':
$(tip).parent().addClass('wds-is-flipped');
break;
}
});

$(window).trigger('scroll'); //trigger scroll to display lazy loading images
},
mouseout: function() {
$(this).parent().removeClass('wds-is-flipped');
$(this).parent().children('.wds-dropdown__content')[0].className = 'wds-dropdown__content';
}
};

function overflowBounds(tip, container) {
var res = [];
if (tip.left < container.left) res.push('L');
if (tip.right > container.right) res.push('R');
if (tip.bottom > container.bottom) res.push('B');
return res;
}

$(className + '*').hover(handlers.mouseenter, handlers.mouseout);
})();