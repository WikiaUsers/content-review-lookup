/* Any JavaScript here will be loaded for all users on every page load. */
// <nowiki>
/* switch infobox code for infoboxes
 * contains switching code for both:
 * * originalInfoboxes:
 *		older infobox switching, such as [[Template:Infobox Bonuses]]
 *		which works my generating complete infoboxes for each version
 * * moduleInfoboxes:
 *		newer switching, as implemented by [[Module:Infobox]]
 *		which generates one infobox and a resources pool for switching
 * 
 * The script also facilitates synchronising infoboxes, so that if a button of one is pressed
 *	and another switchfobox on the same page also has that button, it will 'press' itself
 * This only activates if there are matching version parameters in the infoboxes (i.e. the button text is the same)
 * - thus it works best if the version parameters are all identical
 */
;(function ($, mw) {
/* functions for moduleSwitchInfoboxes */
// lookup the value for the param and index provided in resources
// if not present, use the param at index 0
var getVal = function ($infobox, param, index) {
var $span = $infobox.parent().find('.infobox-switch-resources > span[data-attr-param="' + param + '"]'),
$val,
addclass;
// make sure the resources contain a span for the param
if (!$span.length) {
return { value: -1, addclass: -1 };
}
$val = $span.find('> span[data-attr-index="' + index + '"]');
// if it couldn't grab the new one, grab the default
if (!$val.length) {
$val = $span.find('> span[data-attr-index="0"]');
}
addclass = $val.attr('data-addclass');
if (typeof addclass === 'undefined') {
addclass = '';
}
return { value: $val.clone(true, true), addclass: addclass };
},
// shows the infobox corresponding to the given index
showInfoboxVariant = function ($infobox, index) {
// for everything that can be changed...
// the things that can change can be a th, td, or caption tag
// it has a data-attr-param that isn't empty
var selectors = [
'th[data-attr-param][data-attr-param!=""]',
'td[data-attr-param][data-attr-param!=""]',
'caption[data-attr-param][data-attr-param!=""]'
];
// hide all tooltips on page, switchfo box may change width
// (silent failure if no tooltips)
// see also [[MediaWiki:Common.js/tooltips.js]]
$('.js-tooltip-wrapper').trigger('js-tooltip-close');
$infobox.find(selectors.join(',')).each(function () {
var elt = $(this),
param = elt.attr('data-attr-param'),
// attempt to grab the new version from the infobox resources
v = getVal($infobox, param, index),
val = v.value,
newclass = v.addclass,
$m,
$parent;
// if getVal() returns -1, the resources didn't contain the param, so skip it
// === prevents false matches with a string "-1" returned by val.html() in getVal()
if (val === -1) {
return;
}
// 'references' support:
// if a the value from the resources is $2 (specifically \$\d+ in regex),
// use that value instead of $2
$m = /^\$(\d+)/.exec(val.html());
if ($m) {
v = getVal($infobox, param, $m[1]);
val = v.value;
newclass = v.addclass;
// check again
if (val === -1) {
return;
}
}
// put that into the cell
//if there's an input followed by a span, its a calc from [[MediaWiki:Common.js/infoboxQty.js]], so we need to account for that
if (elt.find('input+span').length) {
// input+span returns the span
elt.find('input+span').replaceWith($(val).contents());
//reset the input to 1
elt.find('input').val(1);
} else {
//otherwise its a normal cell
elt.empty().append(val.contents());
}
// change classes if required
// put the class found in resources with the original from the tr, and trim to remove excess spaces
newclass = (originalClasses[$infobox.attr('data-infobox-index-internal')][param] + ' ' + newclass).trim();
if (newclass === '') {
//if its empty, we can remove the class attr
$parent = elt.parent('tr');
if ($parent.length) {
// parent is a tr
$parent.removeAttr('class');
}
else {
// parent is not a tr
elt.removeAttr('class');
}
} else {
//if it is not empty, replace the class attr with the new class attr
$parent = elt.parent('tr');
if ($parent.length) {
$parent.attr('class', newclass);
}
else {
elt.attr('class', newclass);
}
}
});
},
// changes the window's hash without scrolling to the position of an unrelated element
changeHash = function (hash) {
if (window.history && window.history.replaceState) {
if (window.location.hash !== '') {
window.history.replaceState({}, '', window.location.href.replace(window.location.hash, hash));
} else {
window.history.replaceState({}, '', window.location.href + hash);
}
} else {
// replaceState not supported, I guess we just change the hash normally?
window.location.hash = hash;
}
},
/* functions for both infobox types */
// linking function, triggers the custom jQuery event 'switchinfobox' in all registered infoboxes
// this event should be implemented using .on() applied to the element which contains the buttons
switchInfoboxes = function (txt, triggerer) {
var i, $boxes = $(switchfoboxes);
$boxes.not(triggerer).trigger('switchinfobox', {txt:txt, num:-1});
},
switchInfoboxesIndex = function (num, triggerer) {
var i, $boxes = $(switchfoboxes);
$boxes.not(triggerer).trigger('switchinfobox', {txt:'', num:num});
},
// various other vars
$infoboxselects,
$select,
$hash,
$ifbb,
defver,
val,
// associative array of original classes in moduleInfoboxes
originalClasses = {},
// list of infoboxes on the page
switchfoboxes = '.switch-infobox, .infobox-buttons';
/**
 * originalInfobox setup
 */
mw.log('Checking for original switch infoboxes...');
if ($('.switch-infobox-triggers').length) {
mw.log('Found some! Setting them up...');
// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
if ( $( this ).children( 'br' ).length ) {
$( this ).remove();
} else {
$( this ).replaceWith( this.innerHTML );
}
} );
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
// The switch triggers
var triggers = $( this ).children( '.switch-infobox-triggers' );
 
$( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// click event for switching
$( '.switch-infobox .switch-infobox-triggers' ).children( '.trigger' ).click( function(e) {
// The parent .switch-infobox of the clicked trigger
var $this = $(this), parentSwitchInfobox = $this.parents( '.switch-infobox' );
// Hides items showing
parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
// Show the relevant item
parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
// enable all buttons
parentSwitchInfobox.find('.trigger').removeAttr('disabled');
// 'disable' the clicked button
parentSwitchInfobox.find('span.trigger[data-id="'+$this.attr('data-id')+'"]').attr('disabled', 'disabled');
// trigger custom events for other infoboxes
switchInfoboxes($this.text(), parentSwitchInfobox);
//trigger on-completion functions (for other scripts)
parentSwitchInfobox.trigger('switchinfoboxComplete', {txt:$this.text(), num:-1});
} );
// custom event, essentially the same as above, but has to find the button to press, and doesn't trigger the custom event
$('.switch-infobox').on('switchinfobox', function(event, obj) {
var parentSwitchInfobox = $( event.currentTarget ), $el = $(null);
// find the button that we need to press
if (obj.txt === '' && obj.num > -1) {
$el = parentSwitchInfobox.find('span.trigger[data-id="'+obj.num+'"]');
} else if (obj.txt !== '') {
parentSwitchInfobox.find('.trigger').each(function () {
if ($(this).text() === obj.txt) {
$el = $(this);
}
});
}
// didn't find it, don't do anything else
if (!$el.length) {
return;
}
// as above
parentSwitchInfobox.find( '.item.showing' ).removeClass( 'showing' );
parentSwitchInfobox.find( '.item[data-id="' + $el.attr( 'data-id' ) + '"]' ).addClass( 'showing' );
parentSwitchInfobox.find('.trigger').removeAttr('disabled');
parentSwitchInfobox.find('span.trigger[data-id="'+$el.attr('data-id')+'"]').attr('disabled', 'disabled');
//trigger on-completion functions (for other scripts)
parentSwitchInfobox.trigger('switchinfoboxComplete', obj);
});
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
// first button by default
$('.switch-infobox').trigger('switchinfobox', {txt:'', num:1});
}
mw.log('Finding and setting up module-based switch infoboxes...');
//setup moduleInfoboxes
$('.infobox-buttons').each(function (ibindex, ifb) {
mw.log('Setting up module switch infobox ' + ibindex);
var $infobox_buttons = $(ifb),
$infobox = $infobox_buttons.parent().find('.infobox-switch'),
$select;
$infobox.attr('data-infobox-index-internal', ibindex);
if ($infobox_buttons.hasClass('infobox-buttons-select')) {
mw.log('Module infobox ' + ibindex + ' is a select, setting up');
$select = $('<select>')
.attr({
id: 'infobox-select-' + ibindex,
name: 'infobox-select' + ibindex,
});
$infobox_buttons.children('span.button').each(function() {
var $this = $(this),
$option = $('<option>')
.val($this.attr('data-switch-index'))
.text($this.text())
.attr('data-switch-anchor', '#' + $this.text());
$select.append($option);
});
$select.change(function (event) {
var $this = $(event.currentTarget);
showInfoboxVariant($infobox, $this.val());
var val = $this.val();
// change the hash to be a shortcut to the infobox
// hacky since you can't get the specific option tag from the event, so have to re-find it
changeHash($select.find(' > option[value="' + val + '"]').attr('data-switch-anchor'));
var txt = $select.find(' > option[value="' + val + '"]').text();
switchInfoboxes(txt, $this);
//trigger on-completion functions (for other scripts)
$infobox_buttons.trigger('switchinfoboxComplete', {txt:txt, num:-1});
});
$infobox_buttons.on('switchinfobox', function (event, obj) {
var $el = $(null), txt, num;
if (obj.txt === '' && obj.num > -1) {
mw.log('triggered switchinfobox for module infobox '+ ibindex + ', value ' + obj.num);
$el = $(event.currentTarget).find('> option[value="'+obj.num+'"]');
txt = $el.text();
} else if (obj.txt !== '') {
txt = obj.txt.replace(/ /g, '_');
mw.log('triggered switchinfobox for module infobox '+ ibindex + ', value ' + txt);
$el = $(event.currentTarget).find('> option[data-switch-anchor="#' + txt + '"]');
}
if ($el.length) {
val = $el.val();
showInfoboxVariant($infobox, val);
$select.val(val);
}
//trigger on-completion functions (for other scripts)
$infobox_buttons.trigger('switchinfoboxComplete', obj);
});
// remove all the buttons from the container and replace it with the select
$infobox_buttons
.empty()
.append(
'<label for="infobox-select-'+ibindex+'">' +
'<strong>Version:&nbsp;</strong>' +
'</label>'
)
.append($select);
} else {
mw.log('Module infobox ' + ibindex + ' is not a select, setting up buttons');
$infobox_buttons.find('span.button[data-switch-index]').click(function (event) {
var $this = $(event.currentTarget);
showInfoboxVariant($infobox, $this.attr('data-switch-index'));
switchInfoboxes($this.text(), $infobox_buttons);
// change the hash to be a shortcut to the infobox
changeHash($this.attr('data-switch-anchor'));
$infobox_buttons.find('span.button[data-switch-index][disabled]').removeAttr('disabled');
$this.attr('disabled', 'disabled');
//trigger on-completion functions (for other scripts)
$infobox_buttons.trigger('switchinfoboxComplete', {txt:$this.text(),num:-1});
});
//custom event - as above, but doesn't fire the event again
$infobox_buttons.on('switchinfobox', function (event, obj) {
var $el = $(null), txt, num;
if (obj.txt === '' && obj.num > -1) {
mw.log('triggered switchinfobox for module infobox '+ ibindex + ', value ' + obj.num);
$el = $infobox_buttons.find('span.button[data-switch-index="'+obj.num+'"]');
txt = $el.text();
} else if (obj.txt !== '') {
txt = obj.txt.replace(/ /g, '_');
mw.log('triggered switchinfobox for module infobox '+ ibindex + ', value ' + txt);
$el = $(event.currentTarget).find('> span[data-switch-anchor="#' + txt + '"]');
}
if ($el.length) {
val = $el.attr('data-switch-index');
showInfoboxVariant($infobox, val);
$infobox_buttons.find('span.button[data-switch-index][disabled]').removeAttr('disabled');
$el.attr('disabled', 'disabled');
}
//trigger on-completion functions (for other scripts)
$infobox_buttons.trigger('switchinfoboxComplete', obj);
});
}
// setup originalClasses
$infobox.find(	'th[data-attr-param][data-attr-param!=""], ' +
'td[data-attr-param][data-attr-param!=""], ' +
'caption[data-attr-param][data-attr-param!=""]').each(function () {
var $this = $(this), $parent = $this.parent('tr'), origclass;
if ($parent.length) {
// parent is a <tr>, so get that class
origclass = $parent.attr('class');
} else {
// parent is not a <tr>, probably means its <caption> (with parent <table> or such)
origclass = $this.attr('class');
}
if (typeof origclass === 'undefined') {
// there was no class, so set it as the empty string
origclass = '';
}
originalClasses[ibindex] = {};
originalClasses[ibindex][$this.attr('data-attr-param')] = origclass;
});
// unhide the buttons/select
$infobox_buttons.show();
});
$ifbb = $('.infobox-buttons');
// if there's a hash, and it matches text of one of the buttons/options, switch to it on load
// only hashes for module switches
if ($ifbb.length) {
$hash = $ifbb.find(
' > span.button[data-switch-anchor="' + window.location.hash + '"],' +
' > select > option[data-switch-anchor="' + window.location.hash + '"]'
);
if ($hash.length) {
switchInfoboxes($hash.first().text(), null);
//change the select as well (silently fails if there isn't a select)
$ifbb.find(' > select').val($hash.first().val());
$ifbb.find(' > span[data-switch-anchor="'+window.location.hash+'"]').attr('disabled', true); //disable the relevant button (silently fails for dropdowns)
// if can't find an element matching the hash, disable version 1
// (buttons only - silently fails for dropdowns)
} else {
// no hash, find default version
defver = $ifbb.attr('data-default-version');
if (defver) {
switchInfoboxes($ifbb.find('option[value="'+defver+'"], span.button[data-switch-index="'+defver+'"]').first().text(), null);
} else {
// if there isn't a default, its on version 1, so disable the button (silently fails for dropdowns)
$ifbb.find(' > span[data-switch-index="1"]').attr('disabled', true);
switchInfoboxesIndex(1, null);
}
}
} else {
//no module switchfo found, just setup original switchfo
switchInfoboxesIndex(1, null);
}
})(jQuery, mw);