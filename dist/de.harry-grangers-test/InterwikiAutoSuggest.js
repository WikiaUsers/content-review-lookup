$('input[type="text"],textarea,[contenteditable=true]').on('input',function() {
	link = $(this).val();
    re = /\[\[w:c:([a-zA-Z.-]+):(.*)\]\]/;
    if(re.test(link)) {
        _splitted = link.match(re);
        dbname = _splitted[1];
        article = _splitted[2];
        wikia_url = 'http://' + dbname + '.wikia.com/wiki/index.php?action=ajax&rs=getLinkSuggest&format=json&query=' + article;
		console.log('search for',article,'in',dbname);
        $.ajax({
            url     : "https://query.yahooapis.com/v1/public/yql",
            data 	: { q: "select * from json where url='" + encodeURI(wikia_url) + "'", format : "json" },
            success : function(res) {
                console.log(res)
            }
        });
    }
	else {
		console.log($(this).val());
    }
})