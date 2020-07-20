function includePage(name) {
	document.write('<script type="text/javascript" src="' + wgScript + '?title='+name+'&action=raw&ctype=text/javascript"><\/script>');
}

includePage('MediaWiki:AjaxRC.js');
includePage('MediaWiki:Tabby.js');
includePage('MediaWiki:Color.js');

$(document).ready(function() {
	/* Shrinking talk bubble sprites */
	if (document.readyState != "complete") {
		setTimeout(arguments.callee,100);
		return;
	}
	$("table.talkbubble").each(function() {
		$(this).find("td").first().find("img").each(function() {
			if ($(this).width() > 90)
				$(this).width(90);
		});
	});
	
	/* Fix for URL parsers which do not catch the last ")" of a URL */
	$(".noarticletext:first").each(function() {
		var headerText = $("#firstHeading").text();
		
		var countL = 0;
		var countR = 0;
		var leftBracket = headerText.match(/\(/g);
		var rightBracket = headerText.match(/\)/g);
		
		if (leftBracket)
			countL = leftBracket.length;
		if (rightBracket)
			countR = rightBracket.length;
		
		if (countL == countR + 1) {
			var didYouMean = "<div style='margin:10px 20px;font-size:130%'>Did you mean <a href='" + document.URL + ")'>" + headerText + "<i><b style='color:#d55'>)</b></i></a>?</div>";
			$("#mw-content-text").prepend($("<div />", {
				html: didYouMean,
			}));
		}
	});
	
	/* Tabby */
	$("body.ns-8.action-edit textarea, body.ns-8.action-submit textarea").tabby();
	
	/* Recent Changes modifications */
	$(".page-Special_RecentChanges").each(function() {
		$("table.mw-enhanced-rc.mw-collapsible").removeClass("mw-collapsible");
		$(".mw-collapsible-toggle").live("mouseover",function() { $(this).unbind().die(); });
		
		/* Sliding enhanced page */
		$("table.mw-enhanced-rc.mw-made-collapsible .mw-rc-openarrow a, table.mw-enhanced-rc.mw-made-collapsible .mw-rc-closearrow a").live("click",function() {
			var $collTable = $(this).closest("table.mw-enhanced-rc.mw-made-collapsible");
			var $openarrow = $collTable.find(".mw-rc-openarrow");
			var $closearrow = $collTable.find(".mw-rc-closearrow");
			
			$openarrow.css("visibility","visible").removeClass("mw-changeslist-hidden mw-changeslist-expanded");
			$closearrow.css("visibility","visible").removeClass("mw-changeslist-hidden mw-changeslist-expanded");
			
			if ($collTable.find("tr:last").is(":hidden")) {
				$openarrow.hide();
				$closearrow.show();
				$collTable.find("tr:not(:first)").show();
			} else {
				$openarrow.show();
				$closearrow.hide();
				$collTable.find("tr:not(:first)").hide();
			}
			
			return false;
		});
	});
	
	/* Collapsible tables */
	$("table.collapsible").each(function() {
		var $table = $(this);
		var $toggle = $table.find("span.toggle");
 
		if ($toggle.size() <= 0)
			$toggle = $("<span/>").addClass("toggle").css("float","right").prependTo($table.find("tr").first().find("th").last());
		
		$toggle = $table.find("span.toggle");
		$toggle.html("[<a href='#'>hide</a>]");
 
		$toggle.find("a").live("click",function() {
			if ($table.hasClass("is_collapsed")) {
				$table.find("tr:not(:first)").show();
				$toggle.html("[<a href='#'>hide</a>]");
				$table.removeClass("is_collapsed");
			} else {
				$table.find("tr:not(:first)").hide();
				$toggle.html("[<a href='#'>show</a>]");
				$table.addClass("is_collapsed");
			}
			return false;
		});
 
		if ($table.hasClass("collapsed"))
			$toggle.find("a").click();
	});

	/* Maintenance templates */
	$("#todo").each(function() {
		var $this = $(this).removeClass("todo-no-js");
		var $main = $this.find("#main").show();
		if ($(".maintenance").length > 0) {
			var $items = $this.find("#other");
			$(".maintenance").appendTo($items);
			var vheight = $items.height();
			$items.data("height", vheight).hide();
			$this.find(".todo-show a").attr("href", "#").removeAttr("title").click(function() {
				$main.slideUp(500);
				$items.show().css("height", "0").animate({ height: vheight }, {
					duration: 500,
				});
				return false;
			});
		} else {
			$this.find("hr, .todo-show").hide();
		}
	});
	
	/* Highlight desired section */
	var supportElem = jQuery("<p>")[0];
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	if (supportElem.style.backgroundColor.indexOf("rgba") > -1) {
		$("#" + window.location.hash.substring(1).replace(/'/, "")).closest("h6, h5, h4, h3, h2, h1").css("background-color", "#d58e04").delay(1000).animate({ "background-color": "transparent" }, 1000);
	}
	
	/* Showing/hiding spoilers */
	$("div.spoiler").each(function() {
		var $spoiler = $(this).removeClass("spoilerCss");
		var $spoilerstart = $spoiler.prev(".spoilerStart");
		var $spoilerend = $spoiler.next(".spoilerEnd");
		$spoilerend.appendTo($spoiler).css("width", "100%").css("margin-top", "12px");
		$spoiler.hide();
		$("<a/>", {
			href: "#",
			style: "margin-left:30px",
			text: "[Click here to show/hide the spoiler content.]"
		}).click(function() {
			$spoiler.slideToggle();
			return false;
		}).appendTo($spoilerstart.find("div:first"));
	});
	
	/* Selected sidebar item */
	$("#column-one li a").each(function() {
		var href = $(this).attr("href");
		if (href == document.URL.replace("http://evangelion.wikia.com", "")) {
			$(this).addClass("selected");
		}
	});
	
	/* Oasis Main Page fix */
	if ($("#HOME_TOP_RIGHT_BOXAD").is(":hidden")) {
		$(".skin-oasis.page-Main_Page #WikiaArticle .compensate_ads table").each(function() {
			$(this).attr("style", $(this).attr("style") + ";width:100% !important");
		});
	}
});