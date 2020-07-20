(function(window, $, mw){
    if (window.noDemo) return;
    var Demo = {};
    Demo.currPage = mw.config.get('wgPageName');
    Demo.codeBase = 'MediaWiki:' + Demo.currPage;
    Demo.jsPage = Demo.codeBase + '/demo.js';
    Demo.cssPage = Demo.codeBase + '/demo.css';
}(window, jQuery, mediaWiki));