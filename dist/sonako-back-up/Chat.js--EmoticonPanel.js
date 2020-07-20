/* emoticon list */
window.Version['EmoticonPanel'] = "2014-08-07 - images outside chat area do not fire click event";
 
function emoticonClick(event) {
	if ($(event)[0].target.tagName != "IMG") return;
	mainRoom.viewDiscussion.getTextInput().focus().val(mainRoom.viewDiscussion.getTextInput().val()+" "+$(event)[0].target.title); 
	if (!chatOptions.options.lockCursor) $("body").css('cursor','url('+$(event)[0].target.src+'),auto');
	$("#emoticonlist").removeClass("show");
}
 
function refreshEmoticonlist() {
	if (!$('#emoticonlist').size()) $('.Chat').after('<div id="emoticonlist"></div>');
	emoticons = '<img title="!random" alt="!random" style="width:4em;"><a class="wikia-button" id="emoticonButton">Emoticons</a>';
	$.each(mw.config.get("EMOTICONS").split("http"), function( index, value ) {
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