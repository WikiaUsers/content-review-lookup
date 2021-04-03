/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
function itemGridFiltering() {
var itemGrid = $(itemGridContainer)
if(!itemGrid.length) return
if(!itemGridFilteringSwitches()) return
 
window.itemGridElements = []
itemGrid.find('.item-icon').each(function() {
var obj = {}
var elem = $(this)
obj['*'] = elem
for(x in itemGridFilters) {
obj[x] = elem.data(x).split(',')
for(var y=0;y<obj[x].length;y++) {
obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
}
}
window.itemGridElements.push(obj)
})
}
 
function itemGridFilteringSwitches() {
var flag = false
for(x in itemGridFilters) {
var container = $('#item-grid-filter-'+x)
if(!container.length) continue
flag = true
 
if(itemGridFilters[x] == 'search') {
var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
field.keyup(function() {
itemGridFilteringApply()
})
} else if(itemGridFilters[x] instanceof Array) {
var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
$('<option></option>').appendTo(field).attr('value', '').html(itemGridFilters[x][0])
for(var y=1;y<itemGridFilters[x].length;y++) {
$('<option></option>').appendTo(field).attr('value', itemGridFilters[x][y][0]).html(itemGridFilters[x][y][1])
}
field.val('')
 
field.change(function() {
itemGridFilteringApply()
})
}
}
return flag
}
function itemGridFilteringClear() {
for(x in itemGridFilters) {
$('#item-grid-filter-'+x+'-field').val('')
}
itemGridFilteringApply()
}
function itemGridFilteringApply() {
for(var x=0;x<itemGridElements.length;x++) {
var elem = $(itemGridElements[x]['*'])
var active = true
for(y in itemGridFilters) {
var field = $('#item-grid-filter-'+y+'-field')
 
var value = field.val().toLowerCase()
if(value == '') continue;
 
var type = field.data('type')
if(type == 'search') {
var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
var flag = rx.test(itemGridElements[x][y].join(', '))
if(!flag) active = false
} else if(type == 'select') {
if(itemGridElements[x][y].indexOf(value) == -1) active = false
}
}
if(active) itemGridFilteringShow(elem)
else itemGridFilteringHide(elem)
}
}
function itemGridFilteringHide(elem) {
$(elem).stop(true);
$(elem).fadeTo(200, 0.1);
}
function itemGridFilteringShow(elem) {
$(elem).stop(true);
$(elem).fadeTo(200, 1);
}
$( itemGridFiltering )
} )( jQuery );