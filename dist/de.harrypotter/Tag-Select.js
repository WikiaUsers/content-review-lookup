importArticle({
    type: "style",
    article: "MediaWiki:Tag-Select.css"
});
 
$.fn.tagSelect = function(tags, onSearch) {
	var tags = tags.slice(); 
	function navigation(e) {
		var val = $(e.currentTarget).val();
		var keyCode = e.keyCode || e.which;
		if (e.keyCode == 9) {
			onSelect.call(this, val);
			e.preventDefault();
			e.stopPropagation();
			search.val('');
			datalist.empty();
		}
	}
 
	function searchFn(e) {
		var val = $(e.currentTarget).val();
		var keyCode = e.keyCode || e.which;
		if (val.length < 3 || e.altKey) {
			return;
		}
 
		if (typeof onSearch === "function") {
			onSearch.call(this, val, _.debounce(onResult.bind(this), 300));
		}
	}
 
	function onResult(result) {
		datalist.empty().append(result.map(function(val) {
			return $('<option />', { value: val });
		}));
		var e = $.Event("keydown");
		e.which = 40;
		e.altKey = true;
		search.trigger(e);
	}
 
	function onSelect(tag) {
		tags.push(tag)
		addTag.call(this, tag);
	}
 
	function addTag(tag) {
		$('<li />').append(
			$('<span />', { class: 'tag', text: tag })
		).prependTo($(this));
	}
 
	if (typeof tags !== 'undefined' && tags.length) {
		for (tag of tags) {
			addTag.call(this, tag);
		}
	}
    var searchLi = $('<li />').appendTo($(this));
	var listID = _.uniqueId('tag-select-results_');
    var search = $('<input />', {
        type: 'text',
        list: listID,
        on: {
            keyup: searchFn.bind(this),
            keydown: navigation.bind(this)
        }
    }).appendTo(searchLi);

    var datalist = $('<datalist />', {
        id: listID
    }).appendTo(searchLi);

	return {
		getTags: function() {
			return tags;
        }
	};
}
 
/*
Example:
$('.tag-select').tagSelect(['Zaubererschaft', 'Zaubertränke'], function(val, onResult) {
	return onResult(['Schulfächer']);
});
*/