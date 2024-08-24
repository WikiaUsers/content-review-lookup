function getWAM(obj) {
    obj = obj || {};
    wikia_url = 'http://de.wikia.com/api/v1/WAM/WAMIndex?' + $.param({
	wiki_lang: obj.hasOwnProperty('lang') ? obj.lang : wgContentLanguage,
        wiki_id: obj.hasOwnProperty('wiki_id') ? obj.wiki_id : wgCityId,
        wiki_word: obj.hasOwnProperty('wiki_word') ? obj.wiki_word : wgDBname.replace(wgContentLanguage,''),
        sort_column: 'wam',
        sort_direction: 'ASC',
        limit: 1,
        fetch_admins: false,
        fetch_wiki_images: false,
        v: Math.round(Math.random() * 10),//prevent caching
        format: 'json'
    }).replace(/%7C/g,'|'); //fix for encoding inside yql url to prevent double encoding
    $.ajax({
      url      : "https://query.yahooapis.com/v1/public/yql",
      data     : { q: "select * from json where url='" + encodeURI(wikia_url) + "'", format : "json" },
      success  : function(data) {
          if(data.query.count == 1 && data.query.results.json.wam_results_total != 0 && obj.hasOwnProperty('callback')) {
              obj.callback(data.query.results.json.wam_index[Object.keys(data.query.results.json.wam_index)[0]]);
          }
      }
    });
}