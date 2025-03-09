$('.license-description').append(` For more information, see the ${link('Copyright Policy')}.`);

function link(page, text = page){
	const newLink = $('<a>');
	newLink.attr('href', mw.util.getUrl(page));
	newLink.attr('title', page);
	newLink.html(text);
	return newLink.prop('outerHTML');
}