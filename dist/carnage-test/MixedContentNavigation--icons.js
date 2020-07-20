(function(mw, $){
    var MCN = $.extend({}, window.MCN);
    MCN.icons = $.extend({
        search: '<svg class="mcn-icon icon mcn-search-icon" width="32" height="32"><symbol id="mcn-search-icon"><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></symbol><use xlink:href="#mcn-search-icon" /></svg>'
    }, MCN.icons);
    MCN.insertIcon = function(name){
        var icons = this.icons, res = '';
        if (icons.hasOwnProperty(name)){
            res = icons[name];
        }
        return res;
    };
    window.MCN = MCN;
}(mediaWiki, jQuery));