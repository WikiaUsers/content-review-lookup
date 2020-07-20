require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(wk, wd, $, mw){
    if ("ChatParty" in wk) return;
    
    const DOC_ELEM = wd.documentElement;
    const BODY_ELEM = wd.body;
    const WINDOW_HEIGHT = $(BODY_ELEM).height();
    const WINDOW_WIDTH = $(BODY_ELEM).width();
    const WINDOW_AREA = WINDOW_HEIGHT * WINDOW_WIDTH;
    const VIEWPORT_WIDTH = Math.max(DOC_ELEM.clientWidth, wk.innerWidth || 0);
    const VIEWPORT_HEIGHT = Math.max(DOC_ELEM.clientHeight, wk.innerHeight || 0);
    const VIEWPORT_AREA = VIEWPORT_HEIGHT * VIEWPORT_WIDTH;
    const EXPANDED_WIDTH = VIEWPORT_WIDTH * 1.1;
    const EXPANDED_HEIGHT = VIEWPORT_HEIGHT * 1.1;
    const EXPANDED_AREA = EXPANDED_HEIGHT * EXPANDED_WIDTH;
    const INITIAL_RIGHT = 0;
    const INITIAL_BOTTON = 0;
    
    var ChatParty = {};
    ChatParty.__loaded = false;
    ChatParty.Disco = function(config){
        this.wrapper = wd.createElement("section");
        BODY_ELEM.appendChild(this.wrapper);
        var C = Object.assign({}, null);
        this.size = C.size;
        this.margin = C.margin;
        this.blur = C.blur;
        this.spread = C.spread;
        this.type = C.type;
    };
});