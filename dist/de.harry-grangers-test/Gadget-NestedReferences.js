/*references = $('ol.references > li').map(function() {
	match = $(this).attr('id').match(/\d+(:\d+)+/g)[0];
	if (/:0/.test(match)) {
		match = match.replace(/(\d+):0/g, '$1');
    }
	return {
		level: match.split(':').map(function(val) { return parseInt(val); }),
		id: $(this).attr('id'),
		text: $(this).find('.reference-text').html()
    };
}).get();

ol = $('ol.references').empty();
console.log(ol);
lastLi = null;
references.forEach(function(val) {
	li = $('<li />', { id: val.id }).append(
		$('<a />', { href: '#' + val.id, text: '↑' }),
		'&nbsp;',
		$('<span />', { class: 'reference-text', text: val.text })
	);
	if (val.level.length == 1) {
		ol.append(li);
    }
	else {
		if (lastLi.find('> ol').length) {
			sublist = lastLi.find('> ol');
        }
		else {
			sublist = $('<ol />').appendTo(lastLi);
        }
		sublist.append(li);
    }
	lastLi = li;
});*/
if(!!$('ol.references').length && !!$('ol.references > li').length) {
	references = $('ol.references > li').map(function() {
        match = $(this).attr('id').match(/\d+(:\d+)+/g)[0];
        if (/:0/.test(match)) {
            match = match.replace(/(\d+):0/g, '$1');
        }
        return {
            level: match.split(':').map(function(val) { return parseInt(val); }),
            el: $(this).detach()
        };
    }).get();

    ol = $('ol.references').empty();
    console.log(ol);
    lastLi = null;
    references.forEach(function(val) {
        if (val.level.length == 1) {
            ol.append(val.el);
        }
        else {
            if (lastLi.find('> ol').length) {
                sublist = lastLi.find('> ol');
            }
            else {
                sublist = $('<ol />').appendTo(lastLi);
            }
            sublist.append(val.el);
        }
        lastLi = val.el;
    });
}