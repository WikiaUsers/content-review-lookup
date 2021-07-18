/* objects */
// root object
EntityConvert = typeof EntityConvert !== "undefined" ? EntityConvert : {};

// functions
EntityConvert.functions = typeof EntityConvert.functions !== "undefined" ? EntityConvert.functions : {};

// markup
EntityConvert.markup = typeof EntityConvert.markup !== "undefined" ? EntityConvert.markup : {};

// default + custom entities
EntityConvert.entities = typeof EntityConvert.entities !== "undefined" ? EntityConvert.entities : {};
EntityConvert.entities.defxml = {"lt": "<", "gt": ">", "quot": "\"", "apos": "\'"};

/* css */
mw.util.addCSS('\
section#entity-convert {\
	width: 400px;\
	height: 324px;\
	position: fixed;\
	top: 120px;\
	left: 380px;\
	overflow: hidden;\
	background: #fafafa;\
	border: 1px solid #cccccc;\
	border-radius: 5px;\
	-moz-border-radius: 5px;\
	-webkit-border-radius: 5px;\
	text-align: center;\
	color: #333333;\
	font-size: 15px;\
	z-index: 2\
}\
section#entity-convert h3 {\
	border-bottom: 1px solid #333;;\
	font-size: 15px;\
	font-weight: bold;\
}\
section#entity-convert #entity-convert-textarea {\
	width: 380px;\
	height: 270px;\
	resize: none;\
}\
section#entity-convert > div {\
	display: none;\
	width: auto;\
	text-align: left;\
}\
section#entity-convert > div.selected {\
	display: inline-block;\
}\
section#entity-convert > #entity-convert-close {\
	display: inline-block !important;\
	width: 399px;\
	height: 12px;\
	padding-top: 1px;\
	padding-right: 1px;\
	text-align: right;\
}\
section#entity-convert > #entity-convert-close span {\
	display: inline-block;\
	width: 12px;\
	height: 12px;\
	background: url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emblem-unreadable.svg/14px-Emblem-unreadable.svg.png\') center no-repeat;\
	border: 1px solid #cccccc;\
	border-radius: 3px;\
	-moz-border-radius: 3px;\
	-webkit-border-radius: 3px;\
	cursor: hand;\
	cursor: pointer;\
}');

/* interface */
// markup
EntityConvert.markup.interface = '<section id=\"entity-convert\" style=\"display: none;\">\
	<div id=\"entity-convert-close\"><span title=\"close\"></span></div>\
	<div class=\"interface selected\">\
		<textarea id=\"entity-convert-textarea\" placeholder=\"Text to encode/decode goes here\"></textarea><br />\
		<input type=\"button\" id=\"entity-convert-button-encode\" value=\"Encode\" />\
		<input type=\"button\" id=\"entity-convert-button-decode\" value=\"Decode\" />\
		<input type=\"button\" id=\"entity-convert-button-clear\" value=\"Clear\" />\
		<input type=\"button\" id=\"entity-convert-button-options-show\" value=\"Options\" />\
	</div>\
	<div class=\"options\">\
		<h3>Encoding options</h3>\
		<input type=\"radio\" checked=\"checked\" name=\"entity-convert-options-encode-other\" id=\"entity-convert-options-encode-dec\" /> Decimal (base 10, e.g. z &rarr; &amp;#122;)<br />\
		<input type=\"radio\" name=\"entity-convert-options-encode-other\" id=\"entity-convert-options-encode-hex\" /> Hexadecimal (base 16, e.g. z &rarr; &amp;#x7a;)<br />\
		<input type=\"checkbox\" name=\"entity-convert-options-encode-warning\" id=\"entity-convert-options-encode-warning\" /> Ignore warning of big string encoding<br />\
		<input type=\"checkbox\" name=\"entity-convert-options-encode-vitalchars\" id=\"entity-convert-options-encode-vitalchars\" /> Encode only vital characters (&amp;, ", \', &lt;, &gt;)\
		<h3>Decoding options</h3>\
		<input type=\"checkbox\" checked="checked" id=\"entity-convert-options-decode-dec\" /> Decode decimal entities<br />\
		<input type=\"checkbox\" checked="checked" id=\"entity-convert-options-decode-hex\" /> Decode hexadecimal entities<br />\
		<input type=\"checkbox\" id=\"entity-convert-options-decode-amp\" /> Decode ampersands (&amp;amp; &rarr; &amp;)<br />\
		<input type=\"checkbox\" id=\"entity-convert-options-decode-xml\" /> Decode other default XML entities <span class=\"explain\" title=\"&amp;quot;, &amp;apos;, &amp;lt; and &amp;gt; to &quot;, &apos;, &lt; and &gt;\">(?)</span><br />\
		<input type=\"checkbox\" id=\"entity-convert-options-decode-custom\" /> Decode custom entities <a class=\"explain\" title=\"Entities specified by words, like &amp;nbsp;, &amp;bull; and &amp;trade; are not decoded. Checking this checkbox allows you to decode these as well. Click this link to find out more.\" href=\"https://dev.fandom.com/wiki/EntityConvert#Custom_Entities\">(?)</a><br />\
		<input type=\"button\" id=\"entity-convert-button-options-hide\" value=\"Close options\" />\
		<a href="https://dev.fandom.com/wiki/Talk:EntityConvert" target="_blank" title="Go to feature\'s talk page"><input type=\"button\" value=\"Feedback/bug reports\" /></a>\
	</div>\
</section>';
EntityConvert.markup.trigger = '<li id="entity-convert-trigger" class="overflow"><a style="cursor: hand; cursor: pointer;">HTML Entity Convert</a></li>';

// append to page
$("body").append(EntityConvert.markup.interface);

/* interface */
// position in screen center
$("section#entity-convert").css("top", (screen.availHeight - $("section#entity-convert").height()) / 2 + "px");
$("section#entity-convert").css("left", (screen.availWidth - $("section#entity-convert").width()) / 2 + "px");

// add to bottom option menu "dropdown" if it has less than 10 items. if it has more add to the ordinary bottom bar
if ($("#my-tools-menu > li").length < 10) {
	$("#my-tools-menu").prepend(EntityConvert.markup.trigger);
} else {
	$("#WikiaBarWrapper .tools").prepend(EntityConvert.markup.trigger);
}


// close interface
$("section#entity-convert > #entity-convert-close span").click(function() {
	$("section#entity-convert").hide(70);
});

// open interface
$("#my-tools-menu #entity-convert-trigger").click(function() {
	$("section#entity-convert").show(70);
});

// show-hide options buttons
$('section#entity-convert input#entity-convert-button-options-show').click(function() {
	$("section#entity-convert .interface").removeClass("selected");
	$("section#entity-convert .options").addClass("selected");
});
$('section#entity-convert input#entity-convert-button-options-hide').click(function() {
	$("section#entity-convert .options").removeClass("selected");
	$("section#entity-convert .interface").addClass("selected");
});

// buttons trigger
	// encode
$("section#entity-convert input#entity-convert-button-encode").click(function() {
	if ($('input[name="entity-convert-options-encode-warning"]:checked').length === 0 && $("section#entity-convert textarea#entity-convert-textarea").val().length >= 100000) { // prevent load encoding time for large inputs
		if (confirm("Notice! The input field for the entity encoding contains a very long string, and encoding may take a few seconds. Do you wish to continue?\nTip: check the \"Encode only vital characters\" checkbox to minimize encoding time.") === true) {
			EntityConvert.functions.encode();
		}
	} else {
		EntityConvert.functions.encode();
	}
});
	// decode
$("section#entity-convert input#entity-convert-button-decode").click(function() {
	EntityConvert.functions.decode();
});
	// clear textarea
$("section#entity-convert input#entity-convert-button-clear").click(function() {
	$("section#entity-convert textarea#entity-convert-textarea").val("");
});

/* convertion syntax */
// encoding
EntityConvert.functions.encode = function() {
	var a = $("section#entity-convert textarea#entity-convert-textarea").val(),
		b = [];
	if (a.length > 0) {
		$("section#entity-convert textarea#entity-convert-textarea").attr("disabled","disabled"); // disable modifying until encoding is done, unless the textarea is empty
	}
	for (var i = 0; i < a.length; i++) {
		b.push(
			$('input[name="entity-convert-options-encode-vitalchars"]:checked').length === 0 ? // encode all characters
			(
				"&#" +
				($('input[name="entity-convert-options-encode-other"]:checked').attr("id") === "entity-convert-options-encode-dec" ? "" : "x") + // dec or hex
				(
					$('input[name="entity-convert-options-encode-other"]:checked').attr("id") === "entity-convert-options-encode-dec" ?
					a.charCodeAt(i) :
						(a.charCodeAt(i)).toString(16)
				) +
				";"
			) : ( // encode only "important" characters
			
				["&", "\"", "'", "<", ">"].indexOf(a.charAt(i)) > -1 ? ( // important character
					"&#" +
					($('input[name="entity-convert-options-encode-other"]:checked').attr("id") === "entity-convert-options-encode-dec" ? "" : "x") + // dec or hex
					(
						$('input[name="entity-convert-options-encode-other"]:checked').attr("id") === "entity-convert-options-encode-dec" ?
						a.charCodeAt(i) :
							(a.charCodeAt(i)).toString(16)
					) +
					";"
				) : ( // not an important character - return as it is
					a.charAt(i)
				)
			)
		);
		if (i + 1 === a.length) {
			$("section#entity-convert textarea#entity-convert-textarea")
			.val(b.join(""))
			.removeAttr("disabled");
		}
	}
};

// decoding
EntityConvert.functions.decode = function() {
	$("section#entity-convert textarea#entity-convert-textarea").val(
		$("section#entity-convert textarea#entity-convert-textarea").val()
		.replace(/&(#[1-9][0-9]*|#x[1-9a-f][0-9a-f]*|[a-z]+);/gi, function(a) {
			if (a.substr(0,3) == "&#x" && $("section#entity-convert input#entity-convert-options-decode-hex:checked").length === 1) {
				return String.fromCharCode("0x" + a.substr(3).split(";")[0]);
			} else if (a.substr(0,2) == "&#" && $("section#entity-convert input#entity-convert-options-decode-dec:checked").length === 1) {
				return String.fromCharCode(a.substr(2).split(";")[0]);
			} else if ("amp" === a.substr(1).split(";")[0].toLowerCase() && $("section#entity-convert input#entity-convert-options-decode-amp:checked").length === 1) { // amp
				return "&";
			} else if (Object.keys(EntityConvert.entities.defxml).indexOf(a.substr(1).split(";")[0].toLowerCase()) > -1 && $("section#entity-convert input#entity-convert-options-decode-xml:checked").length === 1) { // other default xml entities
				return EntityConvert.entities.defxml[a.substr(1).split(";")[0].toLowerCase()];
			} else if (Object.keys(EntityConvert.entities.custom).indexOf(a.substr(1).split(";")[0].toLowerCase()) > -1 && $("section#entity-convert input#entity-convert-options-decode-custom:checked").length === 1) {
				return EntityConvert.entities.custom[a.substr(1).split(";")[0].toLowerCase()];
			} else {
				return a; // no option selected
			}
		})
	);
};