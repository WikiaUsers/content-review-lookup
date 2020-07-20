mw.util.$content.prepend(
	$('<fieldset />',{class: 'filter-form'}).append(
		$('<legend />',{text: 'filters'}),
        $('<div />',{text: 'type'}),
        $('<div />',{class: 'type-filter'}),
        $('<div />',{text: 'namespace'}),
        $('<select />',{class: 'ns-filter'}).change(nsFilter)
	)
);
['edit','talk','new'].forEach(function(val) {
	$('.type-filter').append(
        $('<label />',{for: 'test', text: val}),
        $('<input />',{type: 'checkbox', id: val}).change(typeFilter)
    );
});
Object.keys(wgFormattedNamespaces).forEach(function(val) {
	ns = wgFormattedNamespaces[val];
	$('.ns-filter').append(
        $('<option />',{value: val, text: ns})
    );
});

function nsFilter(e) {
	$('#wikiactivity-main > ul > li').show();
	var ns = $(e.currentTarget).val();
	$('#wikiactivity-main > ul > li:not(.activity-ns-' + ns + ')').hide();
}

function typeFilter(e) {
	$('#wikiactivity-main > ul > li').show();
	var types = $('.type-filter > input[type="checkbox"]:checked').map(function(val) {
		return ':not(.activity-type-' + $(this).attr('id') + ')';
    }).get().join('');
	$('#wikiactivity-main > ul > li' + types).hide();
}