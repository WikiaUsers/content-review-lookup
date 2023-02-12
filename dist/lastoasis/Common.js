/* Any JavaScript here will be loaded for all users on every page load.                      */
// for hover gifs
$(".hover-gif img").each(function(i, obj) {
  var $canvas = $("<canvas width='" + $(obj).attr("width") + "' height='" + $(obj).attr("height") + "'></canvas>");
  $(obj).parent().append($canvas);
  var ctx = $canvas[0].getContext("2d");
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  img.src = obj.src;
});

// for Template:Button
mw.loader.using(['oojs-ui-core', 'oojs-ui.styles.icons-editing-core']).done(function() {
	$(".button-template").each(function(i, el) {
		console.log(el);
		var button = new OO.ui.ButtonWidget({
			label: $(el).attr("data-label"),
			href: $(el).attr("data-link"),
			target: '_blank',
		});
	
		if ($(el).attr("data-icon") ) {
			button.setIcon($(el).attr("data-icon"));
		}
		$(el).append(button.$element);
	});
});


// make gadgets-definition nicer
$(function() {
	if (mw.config.get('wgPageName') != 'MediaWiki:Gadgets-definition') return;
	if (window.location.href.indexOf("history") > 0) return;
	var urlPrefix = mw.config.get('wgServer') + '/MediaWiki:Gadget-';
	function replaceWithLink(str) {
		var link = document.createElement('a');
		$(link).attr('href', urlPrefix + str);
		$(link).html(str);
		return link.outerHTML;
	}
	$('#mw-content-text li').each(function() {
		var html = $(this).html();
		var htmlParts = html.split('|');
		for (i in htmlParts) {
			if (htmlParts[i].endsWith('css') || htmlParts[i].endsWith('js')) {
				htmlParts[i] = replaceWithLink(htmlParts[i]);
			}
		}
		var text = htmlParts.join('|');
		var firstPart = text.match(/^([^\|\[]*)/)[0];
		if (firstPart) text = text.replace(firstPart, replaceWithLink(firstPart));
		$(this).html(text);
	});
	$('#mw-content-text h2 .mw-headline').each(function() {
		$(this).html(replaceWithLink('section-' + $(this).html()));
	});
});

// Hide normal edit buttons if
function checkCategories(categories) {
	var isPageForm = categories.some(function(cat) {
		return cat === "Page forms"
	})
	var isPageForm = isPageForm || mw.config.get('wgAction') === "formedit"
	console.log("is page form? " + isPageForm)
	if (isPageForm) {
		$(".desktop #ca-edit").css("display", "none")
		$(".desktop #ca-ve-edit").css("display", "none")
		mw.user.getGroups(function(groups) {
			if (groups.indexOf("sysop") > -1) {
				$(".desktop #ca-edit").css("display", "block")
				$(".desktop #ca-ve-edit").css("display", "block")
			}
		})
	}
}

mw.loader.using(["mediawiki.user", "mediawiki.api"]).done(function() {
	var categories = mw.config.get('wgCategories')
	if (categories == null) {
		var api = new mw.Api()
		api.get({
			action: 'query',
			prop: 'categories',
			format: 'json',
			pageids: mw.config.get('wgArticleId')
		}).done(function(res) {
			categories = res.query.pages[parseInt(mw.config.get('wgArticleId'))].categories.map(function(el) {
				return el.title.split(':')[1]
			})
			checkCategories(categories)
		})
	}
	else {
		checkCategories(categories)
	}
})