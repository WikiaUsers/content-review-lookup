/* emoticon list */
window.Version['EmoticonPanel'] = "2014-08-08 - images outside chat area do not fire click event";

function emoticonClick(event) {
	if ($(event)[0].target.tagName != "IMG") return;
	mainRoom.viewDiscussion.getTextInput().focus().val(mainRoom.viewDiscussion.getTextInput().val()+" "+$(event)[0].target.title); 
	if (!chatOptions.options.lockCursor) $("body").css('cursor','url('+$(event)[0].target.src+'),auto');
	if ($(event)[0].target.title == "!random") $("body").css('cursor','');
	$("#emoticonlist").removeClass("show");
}
	
function refreshEmoticonlist() {
	if (!$('#emoticonlist').size()) $('.Chat').after('<div id="emoticonlist"></div>');
	emoticons = '<img title="!random" alt="!random" style="height:auto !important;" src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAATCAYAAADI876sAAACRklEQVRYR+1WPawBQRCeV1JolDqNUiuhRk2hQCJRkEgkCiWCUiHRiRKFRk2jopXoaEQroVZ6mUlmszdv714ij3cJ291l5+f75puZ/brf73d4w/P1Af5mVXdFxafTKeRyOaK+0+lAo9F4ehkI+OFwgEwmA/V6HbLZ7NODmgJcr1eKHY1GXwd8s9lALBZ7Gdsm4LfbDWq1GgQCgdcBd0PF/wU4yyyfz5PcuOfC4TC0221otVqw2+1gvV6TFFkhXLlSqQT9fh88Ho+tLd5le7brdrvQbDYtAjD1uLzHfuzyxLxnsxlcLhdSMp5EIkG5+f1++qYeZ+A4VBAYHnaKoMrlMhQKBZoByWTS0osmtTAxTAj6QxnjQYL4+3Q6qWTYTzqdVlJnFbAdEsu+JXgZazgcqtY15UjAMQBWtVgsQigUosQwQKVSIeb4n6k37YBLWyRyPB4T0P1+T5XQFWCSugSJ8SUZ2+32R556LKywyffDwFl+8XgczuezZSOYSNOTWSwW0Ov1LKSakpMA9BbBGEyiE8mOwNHhaDSCVCqlesCu4nLtyPlgpxYJnKvPPWcHXBKE/pH0PwMuZWwHXP5/BLhrpG4aLE7A9f7kITiZTNTjx2SrV8nr9dKwMw23SCSiNgSrQL8n+/63WI5Sl1N4Pp+rJ6TpGamvFwR8PB5pLeEqCgaDFlscYKvVSq0tXisMHqcvHpzKPp+Pel+uHj0eryocuPpTl9eljDUYDKBarcJyuVRxcLO44q1u2hbP/vcB/myG3eb/bSv+DS09u8vql8WYAAAAAElFTkSuQmCC"><a class="wikia-button" id="emoticonButton">Emoticons</a>';
	$.each(mw.config.get("wgChatEmoticons").split("http"), function( index, value ) {
		if (!index) return;
		valuearray = value.replace(/\*/g,"").replace(/\n /g,"\n").split("\n");
		emoticons += '<img title="'+valuearray[1]+'" src="http'+valuearray[0]+'" style="cursor: url(http'+valuearray[0]+') , auto;">';
	});
	$('#emoticonlist').html(emoticons);
	$( "#emoticonlist" ).hover(
		function() { $("#emoticonlist").addClass("show");	}, 
		function() { $("#emoticonlist").removeClass("show");	}
	);
	$("#emoticonButton").bind("click", function() { 
		$("#emoticonlist").addClass("show");
	});
	$("#emoticonlist").unbind('click').bind('click', function(event) { emoticonClick(event); });
}
$(function () {
	refreshEmoticonlist();
	$(".Chat").bind('click', function(event) { emoticonClick(event); });
});