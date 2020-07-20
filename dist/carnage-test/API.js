window.dev = $.extend({}, window.dev);

var API = { 
    name: "API-js",
    version: "1.0" 
};

API._prefixes = {};

API._prefixes.prop = {
    "info": "in",
    "revisions": "rv",
    "links": "pl",
    "iwlinks": "iw",
    "langlinks": "ll",
    "images": "im",
    "imageinfo": "ii",
    "stashimageinfo": "sii",
    "templates": "tl",
    "category": "cl",
    "extlinks": "el",
    "categoryinfo": "ci",
    "duplicatefiles": "df",
    "pageprops": "pp",
    "infobox": "ib"
};

API._prefixes.list = {
    "allimages": "ai",
    "allpages": "ap",
    "alllinks": "al",
    "allcategories": "ac",
    "allusers": "au",
    "backlinks": "bl",
    "blocks": "bk",
    "categorymembers": "cm",
    "deletedrevs": "dr",
    "embeddedin": "ei",
    "filearchive": "fa",
    "imageusage": "iu",
    "iwbacklinks": "iwbl",
    "langbacklinks": "lbl",
    "logevents": "le",
    "recentchanges": "rc",
    "search": "sr",
    "tags": "tg",
    "usercontribs": "uc",
    "watchlist": "wl",
    "watchlistraw": "wr",
    "exturlusage": "eu",
    "users": "us",
    "random": "rn",
    "protectedtitles": "pt",
    "querypages": "qp",
    "wkdomains": "wk",
    "wkpoppages": "wk",
    "groupmembers": "gm",
    "multilookup": "ml",
    "checkuser": "cu",
    "checkuserlog": "cul",
    "gadgetcategories": "gc",
    "gadgets": "ga",
    "abuselog": "afl",
    "abusefilters": "abf",
    "unconvertedinfoboxes": "",
    "allinfoboxes": "",
    "firstcontributions": "fc",
    "neweditors": "fc"
};

API._prefixes.meta = {
    "siteinfo": "si",
    "userinfo": "ui",
    "allmessages": "am"
};

API._types = {
    "wikia": ["nirvana"],
    "api": ["mwapi"]
};

API.request = function(options){
    if (!(this instanceof API.request)) return new API.request(options);
    
    this.method = API._default(options.method, "GET");
    this.dataType = API._default(options.dataType, "json");
    
    this.complete = API._default(options.complete);
    this.progress = API._default(options.progress);
    this.error = API._default(options.error);
    this.always = API._default(options.always);
    
    this.context = API._default(options.context, window);
    return this.process(options);
};

API.request.prototype = {
    constructor: API.request,
    process: function(options){
        this.type = API._default(options.type, "api");
        
    }
};