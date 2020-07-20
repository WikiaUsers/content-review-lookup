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
 
    /*コミュニティ*/   
    $('section.community ul.controls').append(
        '<li class="control" data-tooltip="ヘルプ:ウェルカムツールにアクセスして、あなたのウィキアをカスタマイズします。"><a href="/ja/wiki/ヘルプ:ウェルカムツール" class="set">'+
        '<span class="representation">'+
        '<div style="background: #0c77b6; top: 13px; width: 45px; position: absolute; height: 22px; left: 2px; border-radius: 3px"><span style="color: white; top: 25%; position: absolute; left: 2%">welcome</span></div>'+
        '</span>'+
        'ウェルカムツール'+
        '</a></li>'+


        '<li class="control" data-tooltip="ヘルプ:ディスクリプションの設定にアクセスして、あなたのウィキアをカスタマイズします。"><a href="/ja/wiki/ヘルプ:ディスクリプションの設定" class="set">'+
        '<span class="representation">'+
        '<span style="color: white; top: 25%; position: absolute; left: 28%"><img src="https://vignette.wikia.nocookie.net/ursuul/images/c/c7/Checklist-dark.svg" class="badge-icon" width="25" height="25" data-original-title=""></span></div>'+
        '</span>'+
        'ディスクリプション'+
        '</a></li>'+


        '<li class="control" data-tooltip="ウィキア通知では、通知の内容を編集することができます"><a href="/ja/wiki/MediaWiki:Custom-WikiaNotifications" class="set">'+
        '<span class="representation">'+
        '<span style="color: white; top: 25%; position: absolute; left: 25%"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="railwam-wam-logo" id="railwam-wam-logo"><path d="M21.882 19.472a.998.998 0 0 0-.05-1.026C21.814 18.418 20 15.656 20 12V8c0-4.411-3.59-8-8-8-4.411 0-8 3.589-8 8v4c0 3.628-1.815 6.419-1.832 6.446a1.003 1.003 0 0 0-.05 1.026c.175.325.514.528.882.528h18a1 1 0 0 0 .882-.528M12 24c1.474 0 2.75-.81 3.444-2H8.556c.694 1.19 1.97 2 3.444 2"></path></svg></span>'+
        '</span>'+
        'ウィキア通知'+
        '</a></li>'+


        '<li class="control" data-tooltip="コメントガイドラインでは、コメントセクションのテキストボックスの内容を編集することができます"><a href="/ja/wiki/MediaWiki:Custom-comment-guidelines" class="set">'+
        '<span class="representation">'+
        '<span style="color: white; top: 25%; position: absolute; left: 25%"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 19 18" class="railwam-wam-logo" id="railwam-wam-logo"><path d="M 7.3 12.7 l -2 -2 c -0.4 -0.4 -0.4 -1 0 -1.4 c 0.4 -0.4 1 -0.4 1.4 0 L 8 10.6 l 3.3 -3.3 c 0.4 -0.4 1 -0.4 1.4 0 c 0.4 0.4 0.4 1 0 1.4 l -4 4 c -0.4 0.4 -0.9 0.5 -1.4 0 Z M 16 2 h -3 v 2 h 2 v 11 H 3 V 4 h 2 V 2 H 2 c -0.6 0 -1 0.4 -1 1 v 13 c 0 0.6 0.4 1 1 1 h 14 c 0.6 0 1 -0.4 1 -1 V 3 c 0 -0.6 -0.4 -1 -1 -1 Z M 6 1 h 6 v 4 H 6 V 1 Z"></path></svg></span>'+
        '</span>'+
        'コメントガイドライン'+
        '</a></li>'+



        '<li class="control" data-tooltip="新しい記事のテキストでは、これはまだ存在しないページのリンクをたどったときに表示されるメッセージを編集することができますです。"><a href="/ja/wiki/MediaWiki:Newarticletext" class="set">'+
        '<span class="representation">'+
        '<span class="icon topnavigation"></span>'+
        '</span>'+
        '新しい記事のテキスト'+
        '</a></li>'
    );
}