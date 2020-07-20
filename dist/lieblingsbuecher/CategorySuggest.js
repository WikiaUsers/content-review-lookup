function suggestCategory(text,callback) {
    //Dot would be added at the end of the word and
    //the word could not be recognized anymore
	var words = text.split(" ").map(function(w) { return w.replace(/[.|,|?|!]$/,''); });
	var records = [];
    getCategories('BuchPorträts/nach Thema',function(categories) {
        for(var w = 0; w < words.length; w++) {
			var word = words[w];
			var match = _.findWhere(categories,{title: word});
			if(typeof match != "undefined") {
				records.push(match.title);
            }
        }
		callback(records);
    });
}

function getCategories(category,callback) {
    url = '/api.php?' + $.param({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:' + category,
        cmtype: 'subcat',
        cmlimit: 500,
        format: 'json'
    });
    $.getJSON(url,function(res) {
        categories = res.query.categorymembers.map(function(cat) {
            cat.title = cat.title.replace('Kategorie:','');
            return cat;
        });
        callback(categories);
    });
}