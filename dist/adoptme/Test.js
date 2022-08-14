mw.hook('.page__main').add(function($content) {
    console.log( "ready!" );
});
/*
mw.hook("wikipage.content").add(function($content) {
    var test = document.createElement("div");
	test.innerHTML = "<div style=\"color: red;\">Test</div>";
	$(".mw-body-content").eq(0).before(test);
});
*/