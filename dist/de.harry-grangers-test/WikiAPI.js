/* The API Objects */
var Hubs = {
    books: 'Literatur',
    lifestyle: 'Lifestyle',
    games: 'Videospiele',
    tv: 'TV/Fernsehen',
    film: 'Filme',
    anime: 'Anime'
};
 
function Wiki() {
    this.id = mw.config.get('wgCityId');
    this.lang = mw.config.get('wgContentLanguage');
    this.name = 'harry-grangers-test';
    this.title = mw.config.get('wgSitename');
    this.subject = 'Harry Potter';
    this.hub = Hubs[mw.config.get('wgWikiVertical')];
    this.category = verticalName;
    this.affinity = mw.config.get('wgWikiCategories');
}
 
var WAM = {
    best: 0,
    worst: 0
};

/* Fetching the Main information */
function getWikiData(id, callback) {
    // Should use a workaround
    // $.getJSON('http://www.wikia.com/api/v1/Wikis/Details/?ids=' + id).done(callback);
    console.info("WikiData feature is currently not available because of cross origin problems");
}

/*function getWAM(ranking,callback) {
    var sort = (ranking == 1 ? "desc" : "asc");
    $.getJSON('http://www.wikia.com/api/v1/WAM/WAMIndex?vertical_id=2&sort_column=wam&sort_direction=' + sort + '&limit=1&fetch_admins=true&fetch_wiki_images=true').done(callback).error(function (error) {
        console.log('Somethink went wrong',error);
    });
}

getWAM(1,function(data) {
    WAM.best = {
        wikiId: data.wam_index[Object.keys(data.items)[0]].wiki_id,
        rank: data.wam_index[Object.keys(data.items)[0]].url,
        wam: data.wam_index[Object.keys(data.items)[0]].wam,
        wam_rank: data.wam_index[Object.keys(data.items)[0]].wam_rank,
        wam_change: data.wam_index[Object.keys(data.items)[0]].wam_change
    }
});

getWAM(0,function(data) {
    WAM.worst = {
        wikiId: data.wam_index[Object.keys(data.items)[0]].wiki_id,
        rank: data.wam_index[Object.keys(data.items)[0]].url,
        wam: data.wam_index[Object.keys(data.items)[0]].wam,
        wam_rank: data.wam_index[Object.keys(data.items)[0]].wam_rank,
        wam_change: data.wam_index[Object.keys(data.items)[0]].wam_change
    }
});*/

/* Insert fetched Data in Dom */

$('.api-fetch-wam').html(Wiki.wam);
/*
var date = new Date();
var monthnames = [];
monthnames['de'] = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
var monthname = monthnames['de'][date.getMonth()];
$.get('https://de.wikipedia.org/w/api.php?action=query&prop=extracts&rvlimit=1&rvprop=content&format=json&titles=Wikipedia:Hauptseite/Jahrestage/' + monthname + '/' + date.getDate()).error(function(error) {
    console.log(error);
}).done(function(data) {
    console.log(data);
});*/