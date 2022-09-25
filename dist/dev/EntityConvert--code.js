mw.hook('dev.i18n').add(function (i18n) {
	i18n.loadMessages("EntityConvert").done(function (i18n) {
/* I18N READY HERE */
/* SCRIPT STARTS HERE */

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
importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:EntityConvert/style.css',
	]
});

/* interface */
// markup
EntityConvert.markup.interface = ' \
<section id="entity-convert-wrapper"> \
	<section id="entity-convert"> \
		<header id="entity-convert-close"> \
			<h2>' + i18n.msg("title").escape() + '</h2> \
			<span class="entity-convert-imgbtn" title="' + i18n.msg("close-tooltip").escape() + '"></span> \
		</header> \
		<div class="interface selected"> \
			<textarea id="entity-convert-textarea" placeholder="' + i18n.msg("textarea-placeholder").escape() + '"></textarea> \
			<nav class="entity-convert-buttonnav"> \
				<input type="button" id="entity-convert-button-encode" value="' + (i18n.msg("buttons-decode-encode").exists ? i18n.msg("buttons-decode-encode").escape() : i18n.msg("buttons-encode").escape()) + '" /> \
				<input type="button" id="entity-convert-button-decode" value="' + (i18n.msg("buttons-decode-decode").exists ? i18n.msg("buttons-decode-decode").escape() : i18n.msg("buttons-decode").escape()) + '" /> \
				<input type="button" id="entity-convert-button-clear" value="' + (i18n.msg("buttons-decode-clear").exists ? i18n.msg("buttons-decode-clear").escape() : i18n.msg("buttons-clear").escape()) + '" /> \
				<input type="button" id="entity-convert-button-options-show" value="' + (i18n.msg("buttons-decode-options").exists ? i18n.msg("buttons-decode-options").escape() : i18n.msg("buttons-options").escape()) + '" /> \
			</nav> \
		</div> \
		<div class="options"> \
			<form> \
			<fieldset> \
				<legend>' + i18n.msg("options-encode-header").escape() + '</legend> \
				<label><input type="radio" checked="checked" name="entity-convert-options-encode-other" id="entity-convert-options-encode-dec" /> ' + i18n.msg("options-encode-decimal").escape() + '</label><br /> \
				<label><input type="radio" name="entity-convert-options-encode-other" id="entity-convert-options-encode-hex" /> ' + i18n.msg("options-encode-hexadecimal").escape() + '</label><br /> \
				<label><input type="checkbox" name="entity-convert-options-encode-warning" id="entity-convert-options-encode-warning" /> ' + i18n.msg("options-encode-ignore-warning").escape() + '</label><br /> \
				<label><input type="checkbox" name="entity-convert-options-encode-vitalchars" id="entity-convert-options-encode-vitalchars" /> ' + i18n.msg("options-encode-vitals-only").escape() + '</label> \
			</fieldset> \
			<fieldset> \
				<label><legend>' + i18n.msg("options-decode-header").escape() + '</legend> \
				<label><input type="checkbox" checked="checked" id="entity-convert-options-decode-dec" /> ' + i18n.msg("options-decode-decimal").escape() + '</label><br /> \
				<label><input type="checkbox" checked="checked" id="entity-convert-options-decode-hex" /> ' + i18n.msg("options-decode-hexadecimal").escape() + '</label><br /> \
				<label><input type="checkbox" id="entity-convert-options-decode-amp" /> ' + i18n.msg("options-decode-ampersands").escape() + '</label><br /> \
				<label><input type="checkbox" id="entity-convert-options-decode-xml" /> ' + i18n.msg("options-decode-other").escape() + ' <span class="entity-convert-imgbtn entity-convert-explain" title="' + i18n.msg("options-decode-other-tooltip").escape() + '"></span></label><br /> \
				<label><input type="checkbox" id="entity-convert-options-decode-custom" /> <a href="https://dev.fandom.com/wiki/EntityConvert#Custom_entities" target="_blank" rel="nofollow noopener">' + i18n.msg("options-decode-custom").escape() + '</a></label> \
			</fieldset> \
			<nav class="entity-convert-buttonnav"> \
				<input type="button" id="entity-convert-button-options-hide" value="' + (i18n.msg("buttons-decode-close-options").exists ? i18n.msg("buttons-decode-close-options").escape() : i18n.msg("buttons-close-options").escape()) + '" /> \
				<a href="https://dev.fandom.com/wiki/Talk:EntityConvert" target="_blank" rel="nofollow noopener"><input type="button" value="' + (i18n.msg("buttons-decode-feedback").exists ? i18n.msg("buttons-decode-feedback").escape() : i18n.msg("buttons-feedback").escape()) + '" /></a> \
			</nav> \
		</div> \
	</section> \
</section>';
EntityConvert.markup.trigger = '<li id="entity-convert-trigger" class="overflow"><a style="cursor: hand; cursor: pointer;">' + i18n.msg("interface-open").escape() + '</a></li>';

// append to page
$("body").append(EntityConvert.markup.interface);

/* interface */

// add to bottom option menu "dropdown" if it has less than 10 items. if it has more add to the ordinary bottom bar
if ($("#my-tools-menu > li").length < 10) {
	$("#my-tools-menu").prepend($(EntityConvert.markup.trigger));
} else {
	$("#WikiaBarWrapper .tools").prepend(EntityConvert.markup.trigger);
}

// close interface
$("section#entity-convert > #entity-convert-close span").click(function() {
	$("section#entity-convert-wrapper").removeClass("entity-convert-wrapper-visible");
});

// open interface
$("#my-tools-menu #entity-convert-trigger").click(function() {
	$("section#entity-convert-wrapper").addClass("entity-convert-wrapper-visible");
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
		if (confirm(i18n.msg("interface-warning-large").plain()) === true) {
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
	const a = $("section#entity-convert textarea#entity-convert-textarea").val(),
		b = [];
	if (a.length > 0) {
		$("section#entity-convert textarea#entity-convert-textarea").attr("disabled","disabled"); // disable modifying until encoding is done, unless the textarea is empty
	}
	for (let i = 0; i < a.length; i++) {
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

/* SCRIPT ENDS HERE */
/* I18N ENDS HERE */
	});
});
importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });