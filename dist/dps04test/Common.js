* Any JavaScript here will be loaded for all users on every page load. */

<div id="JRChatReplace">Enable JavaScript and Java to see the IRC chat interface.</div>

function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Dps04" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

new Function(document.querySelector("#licenses-pre").innerText)();

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="500" height="426" id="obj_0010000013008303225"><param name="movie" value="http://wikiaembed.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=0010000013008303225&v=0&w=0"/><embed id="emb_0010000013008303225" src="http://cpwikia.chatango.com/group" width="500" height="426" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=0010000013008303225&v=0&w=0"></embed></object><br>[ <a href="http://cpwikia.chatango.com/clonegroup?ts=0010000013008303225">Copy this</a> | <a href="http://chatango.com/creategroup?ts=0010000013008303225">Start New</a> | <a href="http://cpwikia.chatango.com">Full Size</a> ]';
  }
}


if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}


function parse(arr, depth) {
	var markup = "";
	for (var i in arr) {
		markup += (
			'<li>' +
				(depth == 0 ? '\t<a class="licenses-tab">' + arr[i].label + '</a>\n' : '\t<h3' + (arr[i].isStatic ? ' class="licenses-static"' : '') + '>' + arr[i].label + '</h3>\n') +
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
		'\tcontent: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Emblem-question.svg/18px-Emblem-question.svg.png\');\n' +
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

var quizName = "Test your Wikia skills";
var quizLang = "en";
var resultsTextArray = [
	"You can do better than that!",
	"You're not a full-fledged Wikian yet, but you're getting there",
	"You're quite an experienced Wikian, I bet you're an admin and have your own wiki, right?",
	"You're the wiki expert. You've mastered everything there is to learn about wikis"
	];
var questions = [
 
	["How do you edit an article?",
	"All of the methods described in the other answers will work",
	"By using the edit button which is above the article area",
	"By selecting the edit option from the contribute menu in the navigation area ",
	"By appending ?action=edit to the URL"], 
 
	["How do you start creating a table in wiki markup?",
	"{|",
	"&lt;table&gt;",
	"{+",
	"&lt;thead&gt;",
	"{{"],
 
	["MediaWiki:Wikia.css allows admins to",
	"Customize the appearance of the \"Wikia\" skin",
	"Edit all the wiki's style sheets",
	"Enable and disable particular features on a wiki",
	"Add custom JavaScript functionalities"],
 
	["Wikia is using an unmodified, 'clean' version of the MediaWiki platform",
	"False",
	"True"],
 
	["By default, bureaucrats can",
	"Block other users, give rights to other users, remove themselves from the bureaucrats group",
	"Block other users, check and compare IP addresses, give rights to other users",
	"Access Special:Promote, access Special:WikiFeatures, assign bot flags",
	"Bureaucrats have all the rights listed in the other answers"],
 
	["Wikia is best described as a",
	"Free wiki farm",
	"Wikimedia project focused mainly on entertainment and gaming",
	"Paid wiki hosting service",
	"Entertainment website focused on video games",
	"Paid web hosting service"],
 
	["To add bold text use",
	"'''text'''",
	"&lt;i&gt;text&lt;/i&gt;",
	"===text===",
	"None of the other answers"],
 
	["If you want to create a template, you need to create a template page and",
	"Nothing else; templates are like other pages and don't need to be tagged in any special way",
	"Add &lt;template&gt;&lt;/template&gt; tags around the content you want to be included in the template",
	"Ask an admin to set the status of your page to 'template'",
	"Add the new page to the \"Templates\" category"],
 
	["Wikia hosts wikis in over 200 languages",
	"True",
	"False"],
 
	["Which word do you need to add to an article to disable the table of contents?",
	"__NOTOC__",
	"__TOC__",
	"&lt;hidetoc /&gt;",
	"__NOEDITSECTION__",
	"__NOINDEX__"]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});