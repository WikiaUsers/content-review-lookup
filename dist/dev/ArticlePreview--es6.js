;(function(mw, $, module){
    // Importing the required stylesheet
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:ArticlePreview.css'
        ]
    });
    // Setting variables
    var [mwVars, config] = [mw.config.get([
            'wgServer', // host (server) name
            'wgPageName', // page name
            'wgNamespaceNumber', // namespace number
            'wgArticlePath' // article path
        ]), $.extend(module, {
            version: '1.0.1 beta',
            // Create the database name from host
            dbName: mwVars.wgServer.replace(/https?:\/\/(.+)\.wikia\.com/g, '$1'),
            // Array of selectors that will be excluded
            exceptions: ['.free', '.toc a', '.wikia-button', '.button a', '.wikia-menu-button a'],
            // Get all links that are not excluded
            // @returns jQuery object
            links: () => {
                return $('.mw-content-text a').filter(function(){
                    var isNormalLink = !$(this).is(config.exceptions.join(', '));
                    return isNormalLink;
                });
            },
            // Check if the database name of the link matches the
            // database name of the current wiki
            // @returns Boolean
            isCurrentServer: (link) => {
                var link_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g,
                    link_dbname = link.replace(link_regex, '$1'),
                    value = null;
                if (link_dbname == config.dbName){
                    value = true;
                } else {
                    value = false;
                }
                return value;
            },
            // Shortens the URL
            // @returns String
            shorten: (fullurl) => {
                var link_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(fullurl))
                    return fullurl.replace(wgServer, '');
                else
                    return fullurl;
            },
            // Lengthens the URL
            // @returns String
            lengthen: (url) => {
                var link_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(url))
                    return url;
                else
                    return wgServer + url;
            }
        })];
    
    $(document).ready(() => {
        // Setting a variable for the links that will have a mouse event
        var $links = config.links();
        // Binding all links
        $links.each(function(index){
            var [link, height, link_l, varr, ns, nsr] = [
                    $(this).attr('href'),
                    $(this).height(),
                    config.lengthen(link),
                    /(?:.*)[?&](?:[a-z0-9])=(.*)/g,
                    ['Template', 'MediaWiki', 'Category', 'Forum'],
                    new RegExp('http\:\/\/(?:.*)\.wikia\.com\/wiki\/(' + ns.join('|') + ')\:(?:.*)')
                ];
            if (varr.test(link) || !config.isCurrentServer(link_l) || nsr.test(link_l)) return;
            $(this).on('mouseover', (event) => {
                var [offset, isNew, $preview_wrapper, $header, $container, $more_button, link_s] = [
                    $(event.target).offset(),
                    $(event.target).hasClass('new'),
                    $('<section class="article-preview" id="article-preview" />'),
                    $('<h2 class="preview-header" />').text($(event.target).text()),
                    $('<div class="preview-container mw-content-text" />'),
                    $(`<a href="${link_l}" class="see-more" />`).text('See More'),
                    config.shorten(link_l)
                ];
            });
        });
    });
})(this.mediaWiki, this.jQuery, (window.preview = window.preview || {}));