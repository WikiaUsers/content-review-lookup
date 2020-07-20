/* Any JavaScript here will be loaded for all users on every page load. */

$("ol.references > li").each(function() {
        if ($(this).children("sup").length > 0) {
                $($(this).children("sup")[0]).before($(this).children(".reference-text"));
                $($(this).children(".reference-text")[1]).remove();
        }
});

/* Color Code three Categories */

$(function() {
    var cats = mw.config.get('wgCategories'), 
      colors = {
        'Lit101':'rgb(128, 0, 128)',
        'Art101':'rgb(120, 175, 230)',
        'Film101':'rgb(255, 99, 71)'
      };
    for (var cat in colors) {
        if (cats.indexOf(cat) !== -1) {
            mw.util.addCSS('#WikiaArticle {' +
              'border: 0px solid ' + colors[cat] + ';' + 
              'background-color: transparent;' + //fallback
              'background-color: ' + colors[cat].replace('rgb', 'rgba').replace(')', ', 0.1)') + ';' + 
              'padding: 2px;' + 
            '}');
            break;
        }
    }
});

/* dependency for template:SubList: */
$(".prefixindex-custom:not(.done)").each(function() {
	// check if format is correct
	if ($(this).next().attr("id") == "mw-prefixindex-list-table" && $(this).next()[0].nodeName.toLowerCase() == "table") {
		// custom list style
		if ($(this).attr("data-list").length > 0) {
			switch ($(this).attr("data-list").toLowerCase()) {
				case "numbered":
					var piSort = "decimal";
					break;
				case "alpha":
					var piSort = "lower-greek";
					break;
				case "upper-roman":
					var piSort = "upper-roman";
					break;
				case "lower-roman":
					var piSort = "lower-roman";
					break;
				case "roman":
					var piSort = "lower-roman";
					break;
				default:
					var piSort = "none";
			}
			if (piSort != "none") {
				var b = [];
				$(".prefixindex-custom:not(.done)").next().find("a").each(function() {
					b.push('<li>' + $(this)[0].outerHTML + '</li>');
				});
				$(this).next().replaceWith(
					'<div style="-moz-column-count: 3; -webkit-column-count: 3; column-count: 3;">' +
					'<ul style="list-style-type: ' + piSort + ';">' +
					b.join("\n") +
					'</ul>' +
					'</div>'
				);
			}
		}
		// inline-list
		if ($(this).hasClass("prefixindex-custom-inline")) {
			if ($(this).next()[0].nodeName.toLowerCase() == "table") {
				// custom list style is now used
				$(this).next().css({
					"display": "inline-block"
				}).find("tbody, tr, td").css({
					"display": "inline"
				});
				$(this).next().find("a").css("margin-right", "5px");
				$(this).addClass("done");
			} else {
				// no custom list style
				$(this).next().find("li").css({
					"float": "left",
					"margin-left": "25px",
					"padding-left": "0px"
				});
			}
		}
	}
});