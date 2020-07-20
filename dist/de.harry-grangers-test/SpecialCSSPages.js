$.getJSON('/api.php?' + $.param({
    action: 'parse',
    text: '{{#dpl:titlematch=%.css|namespace=8}}',
    disablepp: true,
    format: 'json'
}),function(result) {
	if(result.parse.links.length) {
		ul = $('<ul />');
		result.parse.links.forEach(function(val) {
			$('<li />').append(
				$('<a />',{href: val['*']}).text(val['*'])
			).appendTo(ul);
        })
		mw.util.$content.append(ul)
    }
});