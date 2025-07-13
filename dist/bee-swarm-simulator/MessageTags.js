// Render ProfileTags on messages
mw.loader.using(['mediawiki.util', 'mediawiki.Title']).then(function () {
	function getUserTags() {
		var url = mw.util.wikiScript(),
			params = {
			action: 'raw',
			title: 'MediaWiki:ProfileTags'
		},
			map = new Map();
		
		jQuery.get(url, params, function(data) {
			if (!data.length) return;
			regex = new RegExp('(?:^|\\n)\\s*(.*?)\\s*\\|\\s*(.*?)\\s*(?:\\n|$)', "gm");
			var array = [...data.matchAll(regex)];
			
			if (array.length == 0) return;
			for (var i = 0; i < array.length; i++) {
				map.set(array[i][1].trim(),
						array[i][2].trim().split(/\s*,\s*/));
			}
		});
		return map;
	}

	function getTagClass(tag) {
        var tagClass = 'tag-' + tag.toLowerCase().replace(/\s/g, '_');
        return tagClass;
    }
	
	function getLinkTag($span, tag) {
        var re = /\[\[(.+?)\|(.+?)\]\]/,
            match = re.exec(tag),
            href = mw.util.getUrl(match[1]),
            text = match[2],
            $a = $('<a>')
                .attr('href', href)
                .css('color', 'inherit')
                .text(text);

        $span.addClass(getTagClass(tag)).append($a);
        return $span;
    }
	
	function generateTag(tag) {
		var $span = $('<span>').addClass('bss-user-message-header__tag');
		var linkTestRegex = /\[\[.+?\|.+?\]\]/;
		
		if (linkTestRegex.test(tag)) {
			$span = getLinkTag($span, tag);
		} 
		else {
			$span.addClass(getTagClass(tag)).text(tag);
		}
		return $span;
	}
	
	function insertTags($e, tags) {
		tags.forEach(function(tag) {
			$e.append(generateTag(tag));
		});
	}
	
	const userTags = getUserTags();
	setInterval(function() {
		$("div[class^='EntityHeader_entity-header__']:not(.bss-hasAppendedTag)").each(function() {
			var $this = $(this);
			var username = this.querySelector("a[class^='EntityHeader_name__']").innerText;
			if (userTags.has(username)) {
				insertTags($this, userTags.get(username));
			}
			$this.addClass("bss-hasAppendedTag");
		});
	}, 1000);
});