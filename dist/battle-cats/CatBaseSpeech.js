/* Emulate the talking Cat in the Cat Base Menu */

mw.loader.using('mediawiki.api').then(function () {
	switch (mw.config.get('wgPageName')) {
		case 'Cat_Base_Menu':
			handleCatBaseYapper();
			break;
	}
});

// display a talking Cat at a div#cat_base_speech element in the page
function handleCatBaseYapper() {
	// decorate
	$("#cat_base_speech").css({
		"height": "250px",
		"position": "relative",
		"display": "grid",
		"justify-items": "center"
	});
	$("#cat_base_speech").append(`
<div id="speech_area">
	<img src='/Special:Redirect/file/cat_base_speech_bubble.png' />
	<p id="cat_speech" style="color: white; text-align: center; position: absolute; top: 3%; width: 400px; line-height:1.3"></p>
</div>
<img style="width:100px; left: 50px; position: relative;" src='/Special:Redirect/file/cat_base_cat_face.png' />
	`);

	// data source
	params_speech = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_base_quotes.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};

	// JSON parsing
	let cat_quotes = null;

	api = new mw.Api();
    api.get(params_speech).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        cat_quotes = JSON.parse(content);
    	// default text for the Cat
	    $("#cat_speech").html(cat_quotes.quotes[0]);
    });

	// click event for the speech bubble
	$("#speech_area").on("click", function() {
		let index = Math.floor(Math.random() * cat_quotes.quotes.length);
		$("#cat_speech").html(cat_quotes.quotes[index]);
	});
}