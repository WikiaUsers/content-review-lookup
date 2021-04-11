importArticle({
    type: "style",
    article: "u:dev:MediaWiki:Tag-Select/style.css"
});
 
$.fn.tagSelect = function(tags, onSearch) {
	tags = tags.slice();
	
	function navigation(evt) {
		var val = $(evt.currentTarget).val();
		var keyCode = evt.keyCode || evt.which;
		if (evt.keyCode == 9) {
			onSelect.call(this, val);
			evt.preventDefault();
			evt.stopPropagation();
			search.val('');
			datalist.empty();
		}
	}
 
	function searchFn(evt) {
		var val = $(evt.currentTarget).val();
		var keyCode = evt.keyCode || evt.which;
		if (val.length < 3 || evt.altKey) {
			return;
		}
 
		if (typeof onSearch === "function") {
			onSearch.call(this, val, _.debounce(onResult.bind(this), 300));
		}
	}
 
	function onResult(result) {
		datalist.empty().append(result.map(function(val) {
			return $('<option>', { value: val });
		}));
		var evt = $.Event("keydown");
		evt.which = 40;
		evt.altKey = true;
		search.trigger(evt);
	}
 
	function onSelect(tag) {
		tags.push(tag);
		addTag.call(this, tag);
	}
 
	function addTag(tag) {
		$('<li>').append(
			$('<span>', { class: 'tag', text: tag })
		).prependTo($(this));
	}
 
	if (typeof tags !== 'undefined' && tags.length) {
		for (var tag in tags) {
			addTag.call(this, tags[tag]);
		}
	}
    var searchLi = $('<li>').appendTo($(this));
	var listID = _.uniqueId('tag-select-results_');
    var search = $('<input>', {
        type: 'text',
        list: listID,
        on: {
            keyup: searchFn.bind(this),
            keydown: navigation.bind(this)
        }
    }).appendTo(searchLi);
 
    var datalist = $('<datalist>', {
        id: listID
    }).appendTo(searchLi);
 
	return {
		getTags: function() {
			return tags;
		}
	};
};
 
/*
Example:
$('.tag-select').tagSelect(['Zaubererschaft', 'Zaubertränke'], function(val, onResult) {
	return onResult(['Schulfächer']);
});
*/