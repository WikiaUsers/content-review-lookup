importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AnalyticsShortcut.js',
    ]
});
if (wgCanonicalSpecialPageName == 'AdminDashboard') { 
 
/*
    $('section.admin-dashboard-content div').append('<section class="control-section mediawiki"><header><h1>MediaWiki</h1><span class="dashboard-tooltip"></span></header><ul class="controls"></ul></section>');
*/
 
 
    $('section.wiki ul.controls').append(
        '<li class="control" data-tooltip="Common.CSSであなたのウィキアをカスタマイズします。"><a href="/ja/wiki/MediaWiki:Common.css" class="set">'+
        '<span class="representation">'+
        '<div style="background: #0c77b6; top: 13px; width: 34px; position: absolute; height: 22px; left: 8px; border-radius: 3px"><span style="color: white; top: 25%; position: absolute; left: 2%">C.css_</span></div>'+
        '</span>'+
        'Common.css'+
        '</a></li>'+
 
 
        '<li class="control" data-tooltip="ImportJSであなたのウィキアをカスタマイズします。"><a href="/ja/wiki/MediaWiki:ImportJS" class="set">'+
        '<span class="representation">'+
        '<div style="background: #0c77b6; top: 13px; width: 34px; position: absolute; height: 22px; left: 8px; border-radius: 3px"><span style="color: white; top: 25%; position: absolute; left: 1%">Import_</span></div>'+
        '</span>'+
        'ImportJS'+
        '</a></li>'+
 
 
        '<li class="control" data-tooltip="JavaScriptページにアクセスして、JSの審査状況を確認できます。"><a href="/ja/wiki/特別:JSPages" class="set">'+
        '<span class="representation">'+
        '<span style="color: white; top: 25%; position: absolute; left: 25%"><img src="https://vignette.wikia.nocookie.net/ursuul/images/f/f2/JS-dark.svg" class="badge-icon" width="25" height="25" data-original-title=""></span></div>'+
        '</span>'+
        'JavaScriptページ'+
        '</a></li>'+
 
 
        '<li class="control" data-tooltip="ガジェットであなたのウィキアをカスタマイズします。"><a href="/ja/wiki/特別:ガジェット" class="set">'+
        '<span class="representation">'+
        '<div style="background: #0c77b6; top: 13px; width: 45px; position: absolute; height: 22px; left: 3px; border-radius: 3px"><span style="color: white; top: 25%; position: absolute; left: 4%">Gadgets</span></div>'+
        '</span>'+
        'ガジェット'+
        '</a></li>'
 
 
    );
}