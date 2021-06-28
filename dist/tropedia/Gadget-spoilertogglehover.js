function replace_spoiler_class () {
	$('.spoiler').addClass("hoverspoiler").removeClass("spoiler spoilerhidden");
}

mw.hook( 'wikipage.content' ).add( replace_spoiler_class );
document.usehoverspoilers = true;