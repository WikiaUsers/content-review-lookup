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

/* dependency for template:SubList; Idea:Love Robin, custom code by Penguin-Pal */
$(".prefixindex-custom").each(function() {
	// custom css
	mw.util.addCSS(
		'/* upper-roman */\n' +
		'nav.toc.prefixindex-custom-toc-upper-roman li:before {\n' +
			'\tcontent: counters(item,".", upper-roman) " ";\n' +
		'}\n' +
		'/* lower-roman */\n' +
		'nav.toc.prefixindex-custom-toc-lower-roman li:before {\n' +
			'\tcontent: counters(item,".", lower-roman) " ";\n' +
		'}\n' +
		'/* lower-alpha */\n' +
		'nav.toc.prefixindex-custom-toc-lower-alpha li:before {\n' +
			'\tcontent: counters(item,".", lower-alpha) " ";\n' +
		'}\n' +
		'/* upper-alpha */\n' +
		'nav.toc.prefixindex-custom-toc-upper-alpha li:before {\n' +
			'\tcontent: counters(item,".", upper-alpha) " ";\n' +
		'}\n' +
		'/* square */\n' +
		'nav.toc.prefixindex-custom-toc-square li:before {\n' +
			'\tcontent: "\\25A0\\0020\\0020";\n' +
			'\tfont-size: 10px;\n' +
			'\tvertical-align: top;\n' +
		'}\n' +
		'/* none */\n' +
		'nav.toc.prefixindex-custom-toc-none li:before {\n' +
			'\tcontent: " ";\n' +
		'}'
	);
	// function t based on http://stackoverflow.com/questions/4549894/how-can-i-repeat-strings-in-javascript#answer-4549907
	function t(s, t) {
		return new Array(t + 1).join(s);
	}
	// list() from wiki2html, http://remysharp.com/2008/04/01/wiki-to-html-using-javascript/
    function list(str) {
        return str.replace(/(?:(?:(?:^|\n)[\*#].*)+)/g, function (m) {  // (?=[\*#])
            var type = m.match(/(^|\n)#/) ? 'ol' : 'ul';
            // strip first layer of list
            m = m.replace(/(^|\n)[\*#][ ]{0,1}/g, "$1");
            m = list(m);
            return '<' + type + '><li>' + m.replace(/^\n/, '').split(/\n/).join('</li><li>') + '</li></' + type + '>';
        });
    }
	if ($(this).next().attr("id") == "mw-prefixindex-list-table" && $(this).next()[0].nodeName.toLowerCase() == "table") {
		var a = $(this).next().find("a"), // links
			b = [], // raw output
			c = ""; // final output
		for (var i = 0; i < a.length; i++) {
			var href = $(a[i]).attr("href").substr(6); // current link target
			b.push(
				t("#", href.split("/").length - 1) + // give an index for the sub list - 1 is the first sub level
				" " +
				a[i].outerHTML
			);
			if (i + 1 == a.length) {
				var d = $(list(b.join("\n")));
				$(d).find("li").each(function(i) {
					$(this).addClass(
						"toclevel-" + (
							($(this).parents().length - 1) / 2 + 1
						)
					);
				});
				// add custom listing systems
				if ($(this).attr("data-list").length > 0) {
					switch ($(this).attr("data-list").toLowerCase()) {
						case "numbered":
							var piSort = "decimal";
							break;
						case "lower-alpha":
							var piSort = "lower-alpha";
							break;
						case "upper-alpha":
							var piSort = "upper-alpha";
							break;
						case "alpha":
							var piSort = "lower-alpha";
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
						case "square":
							var piSort = "square";
							break;
						case "none":
							var piSort = "none";
							break;
						default:
							var piSort = "decimal";
					}
				}
				$(this).next().replaceWith('<nav class="prefixindex-custom-toc' + (piSort != "decimal" ? ' prefixindex-custom-toc-' + piSort : '') + ' toc show">\n<ol>\n' + $(d).html() + '\n</ul>\n</nav>');
				// now, only give the links their "Final" sub page name
				$(this).next().find("a").each(function() {
					if ($(this).html().indexOf("/") > -1) {
						$(this).html(
							$(this).html().split("/")[
								$(this).html().split("/").length - 1
							]
						);
					}
				});
			}
		}
	}
});