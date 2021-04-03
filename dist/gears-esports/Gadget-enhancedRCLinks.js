$(function() {
	var $changeList = $('.mw-changeslist');
	var $catList = $('.mw-category-generated');
	var $contribList = $('ul.mw-contributions-list');
	var $searchList = $('.searchresults');
	if (!$changeList.length && !$catList.length && !$contribList.length && !$searchList.length) {
		return;
	}
	
	function addTagMarker(obj) {
		var classes = $(obj).attr('class');
		var re = /.*mw-tag-marker-([^\s]*)/g;
		var thisClass = re.exec(classes)[1];
		if (thisClass) {
			var sep = (window.location.href.indexOf("?") === -1) ? "?" : "&";
			$('<a>')
			.addClass('tag-filter-link')
			.attr({
				href: window.location.href + sep + 'tagfilter=' + thisClass,
				title: 'Filter to this tag'
			})
			.css({'margin-left':'.5em','background-color':'#0FE40F'})
			.text('...')
			.insertAfter(obj);
		}
	}
	$changeList.find('.mw-tag-marker').each(function(){
		addTagMarker(this);
	});
	$contribList.find('.mw-tag-marker').each(function(){
		addTagMarker(this);
	});
	
	function addEditlink(elem, target) {
		$('<a>').addClass('custom-editlink').attr({
			href : mw.util.getUrl(target, { action : 'edit' }),
			title : 'Edit this page'
		}).text('✎').insertAfter(elem);
	}
	
	function fixProfileLink(elem, title) {
		if (! title.match(/^User/)) return;
		var $elem = $(elem);
		$elem.attr('href', $elem.attr('href') + '?profile=no');
	}
	
	mw.loader.using('mediawiki.util').then(function() {
		$changeList.find('.mw-title').each(function() {
			var title_obj = $(this).find('.mw-changeslist-title');
			if (title_obj) {
				var title = title_obj.attr('title');
				addEditlink(this, title);
				fixProfileLink(this, title);
			}
		});
		
		$catList.find('.mw-content-ltr ul li a').each(function() {
			var title = $(this).text();
			if (title) {
				title = $(this).hasClass("CategoryTreeLabel") ? "Category:" + title : title;
				addEditlink(this, title);
			}
		});
		$contribList.find('a.mw-contributions-title').each(function() {
			var title = $(this).attr('title');
			fixProfileLink(this, title);
			addEditlink(this, title);
		});
		$searchList.find('.mw-search-result-heading').each(function() {
			var title_obj = $(this).find('a');
			if (title_obj) {
				var title = title_obj.attr('title');
				addEditlink(title_obj, title);
				fixProfileLink(title_obj, title);
			}
		});
	});
});