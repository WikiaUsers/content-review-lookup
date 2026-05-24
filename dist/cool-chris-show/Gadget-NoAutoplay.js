mw.hook("wikipage.content").add(function() {
	$("audio").get().forEach((e) => e.pause());
});