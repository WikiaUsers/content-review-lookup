if (mw.config.get("wgPageName") == "Help:Images_licensing" && mw.config.get("wgAction") == "view") {
$(function() {
	var licensing = [
		{
			label: "Welcome!",
			contents: [
				{
					label: "Hello there, and welcome to the licensing FAQ!",
					contents: "This short FAQ will answer some of the common questions that you may have about how to license files, whether you've got to license a file in the past or not. Select the next item from the navigation bar above, and let's get started!",
					isStatic: true
				}
			]
		},
		{
			label: "Introduction",
			contents: [
				{
					label: "What is a license?",
					contents: "A license is a reference to a file's source and copyright status. The purpose of licenses is to give credits to the creators and to the legal owners of the files, and also to possibly direct people who are interested in them to the file's source."
				},
				{
					label: "Why do I need to license my files?",
					contents: "As mentioned, the licenses show the relevant copyright information about a certain file. Licensing a given file will let people who are interested in using it know when it may, and under what circumstances it should not be used."
				}
			]
		},
		{
			label: "Getting started",
			contents: [
				{
					label: "How do I know which license to pick?",
					contents: "Different files are published with a different copyright status. Here is a short list of all the common licensings and when to use them:<br /><table class=\"wikitable\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Template</th>\n\t\t\t<th>When to use</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t{{<a href=\"/wiki/Template:Self\">Self</a>}}\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\tYou have taken/created this file or image yourself. This isn't exactly a licensing, but more of a way to let others know that you are the creator of this file.\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t{{<a href=\"/wiki/Template:Copyrighted_Game\">Copyrighted Game</a>}}\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\tThe subject of this file is an image, screenshot or a photo of a Club Penguin, Club Penguin's website or a related product by Disney (e.g. Club Penguin books and stickers).\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t{{<a href=\"/wiki/Template:Fairuse\">Fairuse</a>}}\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\tSimilar to Copyrighted Game, but is a general case about any copyrighted game, product, website, and so on, unless the subject has specifically mentioned that it is not protected under this copyrighted status. This licensing essentially says that, although you need that file for a very specific purpose in the wiki, you understand that the file is protected with a copyright status, and therefore it should only be used in the page about what it describes (e.g. a company logo).\n\t\t\t</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\t{{<a href=\"/wiki/Template:CC_BY-SA\">CC BY-SA</a>}}\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\tThe <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\">CC BY-SA</a> licensing is very common licensing in wikis, even this is not the case in the Club Penguin Wiki. Releasing a file under this means that you can use it anywhere on the internet, as long as you release it under the same licensing, and give credit to its author and add a link to the place from whcih you got the file. It is commonly used in Wikimedia projects, such as Wikipedia and Wikimedia Commons, and when uploading files from there.\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>"
				},
				{
					label: "Are there other licenses?",
					contents: "Yes! There is a variety of licenses available, but these four are the most common and you are likely to almost always deal with them."
				},
				{
					label: "How do I license Club Penguin cutouts or customs?",
					contents: "For those of you who don't know, cutouts is a common term referred to specific images that have been extracted from a Club Penguin file (e.g. a penguin pose from a catalog), and customs are fan images made from different Club Penguin images and/or cutouts. The 'Copyrighted Game' template is used for all Club Penguin files- after all, cutouts and customs are essentially files created by the Club Penguin team that were then rearranged by someone to create a new image. As for customs, however, there is a special template- {{<a href=\"/wiki/Template:CustomImage\">CustomImage</a>}}, which is the same as Copyrighted Game, but with an addition label that mentions that this is a custom image."
				},
				{
					label: "What if several licenses match my file?",
					contents: "If that is the case, you can still pick several licenses to the file. While uploading a file, you can only select one license. However, you can still edit the file page after the upload and add further licenses."
				},
				{
					label: "File usage based on licensing",
					contents: "When you go to a file's page, you can see its licensing, and thereby know when you will be able to use it, and what usage restrictions or requirements it may have.<br />When it comes to Club Penguin content, we understand that content by Club Penguin and copyrighted content from the internet in general are used in all sorts of ways- most of them are edgey or completely violate its legal copyrights. If you need to use a content of this sort for this sort of usage, you are asked to make sure that the content is used in a fair manner, and is released in a way that others will be able to tell who the content's actual owners are."
				}
			]
		},
		{
			label: "Picking the license",
			contents: [
				{
					label: "How do I add a license to a file?",
					contents: "Whenever uploading an image, a dropdown with a list of common licenses is found. Selecting a licensing is done by picking the relevant licensing from the dropdown before uploading the file, where each one represents a template license. Each dropdown label describes the license in a few words, and you can hover above each one of them to see what template it represents."
				},
				{
					label: "Help! I can't find my license in the dropdown!",
					contents: "Although this scenario is unlikely, you may once in a while need to upload a file with licensing that does not appear in the dropdown- which only covers the more common licenses. You can go to the <a href=\"/wiki/Category:Copyright_tags\">copyright tags category</a> and see if you can find what you need. If so, upload your file without choosing a license, and once uploaded, edit the file page and replace the placeholder template in the 'Licensing' section with the template that you need. If you still cannot find it, you can contact an admin about this, ask in chat for help, or even create a new licensing template that matches the copyright status of your file, which will also be usable for future files."
				},
				{
					label: "But wait, there is no dropdown!",
					contents: "If you upload a file via <a href=\"/wiki/Special:Upload\">Special:Upload</a> or <a href=\"/wiki/Special:MultipleUpload\">Special:MultipleUpload</a>, the licensing dropdown is found on the bottom of the page. If, however, you upload your file via the 'Add a Photo' popup interface, accessible via the right rail on articles in the wiki, it will not be visible by default. For that, you can press the 'More Options' in the popup section, which will show options such as changing the target file name or adding an upload summary.<br />If, however, you're uploading a new version of an existing file, you won't be able to modify the file's licensing. You will only be able to do that after the upload."
				}
			]
		}
	];

	function parse(arr, depth) {
		var markup = "";
		for (var i in arr) {
			markup += (
				'<li>' +
					(depth === 0 ? '\t<a class="licenses-tab">' + arr[i].label + '</a>\n' : '\t<h3' + (arr[i].isStatic ? ' class="licenses-static"' : '') + '>' + arr[i].label + '</h3>\n') +
					'\t' + (typeof arr[i].contents == "string" ? '<div>' + arr[i].contents + '</div>' : '<ul>' + parse(arr[i].contents, depth + 1) + '</ul>') + '\n' +
				'</li>'
			);
		}
		return "\n" + markup;
	}

	$("#mw-content-text").html('<ul id="licenses"></ul>');


	$(parse(licensing, 0)).appendTo("#licenses");


	$("#licenses > li:first-child").addClass("licenses-selected");


	$("#licenses > li > .licenses-tab").click(function() {
		if (!$(this).parent().hasClass("licenses-selected")) {
			$("#licenses > .licenses-selected").removeClass("licenses-selected");
			$(this).parent().addClass("licenses-selected");
		}
	});
	$("#licenses > li > ul > li > h3:not(.licenses-static)").click(function() {
		window.a = this;
		$(this).next().toggle(200);
	});


	mw.util.addCSS(
		'#mw-content-text ul, #mw-content-text li {\n' +
			'\tlist-style: none;\n' +
			'\tmargin: 0;\n' +
			'\tpadding: 0;\n' +
		'}\n' +
		'#mw-content-text > ul {\n' +
			'\toverflow: hidden;\n' +
			'\theight: 440px;\n' +
			'\tposition: relative;\n' +
	//		'\tpadding-top: 40px;\n' +
			'\tbackground: linear-gradient(to bottom, #c7c2a6 0, #a9a489 40px);\n' + // uriginally used #272714
			'\tborder-right: 1px solid #eee;\n' +
			'\tborder-left: 1px solid #eee;\n' +
		'}\n' +
		'#mw-content-text > ul > li {\n' +
			'\tdisplay: inline-block;\n' +
		'}' +
		'#mw-content-text > ul > li > ul {\n' +
			'\tdisplay: none;\n' +
			'\toverflow-y: scroll;\n' +
			'\theight: 390px;\n' +
			'\tposition: absolute;\n' +
			'\tleft: 0;\n' +
			'\tpadding: 4px;\n' +
			'\tbackground: #fafafa;\n' +
		'}' +
		'#mw-content-text .licenses-tab {\n' +
			'\tdisplay: inline-block;\n' +
			'\theight: 34px;\n' +
			'\tpadding: 3px 8px;\n' +
	//		'\tposition: absolute;\n' +
	//		'\ttop: 0;\n' +
			'\tline-height: 34px;\n' +
			'\tcolor: #222;\n' +
			'\tfont-size: 18px;\n' +
			'\ttext-decoration: none;\n' +
			'\tcursor: hand;\n' +
			'\tcursor: pointer;\n' +
		'}' +
		'#mw-content-text .licenses-tab + .licenses-tab {\n' +
			'\tborder-left: 1px solid #ccc;\n' +
		'}' +
		'#mw-content-text .licenses-selected .licenses-tab {\n' +
			'\tbackground: linear-gradient(to bottom, #eee, #ddd);\n' +
			'\tbox-shadow: 0 0p 6px rgba(0,0,0,0.3) inset;\n' +
		'}' +
		'#mw-content-text :not(.licenses-selected) > .licenses-tab:hover {\n' +
			'\tbackground: linear-gradient(to bottom, rgba(208,205,188,0.9), rgba(208,205,188,0.23));\n' +
			'\tborder-radius: 5px;\n' +
		'}' +
		'#mw-content-text .licenses-selected > ul {\n' +
			'\tdisplay: block;\n' +
		'}' +
		'#licenses h3 {\n' +
			'\tfont-weight: bold;\n' +
			'\tcursor: hand;\n' +
			'\tcursor: pointer;\n' +
		'}' +
		'#licenses h3:not(.licenses-static)::before {\n' +
			'\tmargin-right: 3px;\n' +
			'\tcontent: url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Emblem-question.svg/18px-Emblem-question.svg.png\');\n' +
			'\tvertical-align: middle;\n' +
		'}' +
		'#licenses > li > ul {\n' +
			'\twidth: ' + ($("#mw-content-text").width() - 8) + 'px\n;' +
		'}' +
		'#licenses > li > ul > li > h3:not(.licenses-static) + div {\n' +
			'\tdisplay: none;\n' +
			'\tmargin-left: 8px;\n' +
		'}'
	);
	$("#licenses ul a").click(function(e) {
		e.preventDefault();
		window.open(this.href, "_blank");
	});
});
}