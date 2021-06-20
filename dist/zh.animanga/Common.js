/* Any JavaScript here will be loaded for all users on every page load. */

/* From zh.wikipedia.org MediaWiki:Gadget-site-lib.js for language conversion */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hant || hans || tw || cn || hk || sg || mo || my,
        'zh-hans': hans || cn || sg || my,
        'zh-hant': hant || tw || hk || mo,
        'zh-cn': cn || hans || sg || my,
        'zh-sg': sg || hans || cn || my,
        'zh-tw': tw || hant || hk || mo,
        'zh-hk': hk || hant || mo || tw,
        'zh-mo': mo || hant || hk || tw
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; //保證每一語言有值
}

window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.importScriptCallback = function(page, ready) {
    importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};

window.importScriptURICallback = jQuery.getScript;

/* Special:Analytics */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                    'Brunei')
        .replace('Bolivia (Plurinational State of)',                     'Bolivia')
        .replace('China',                                                'Mainland China')
        .replace('中国',                                                  '中国大陆')
        .replace('中華人民共和國',                                         '中國大陸')
        .replace('Iran (Islamic Republic of)',                           'Iran')
        .replace('Korea (Democratic People\'s Republic of)',             'Democratic People\'s Republic of Korea (North Korea)')
        .replace('Korea, Republic of',                                   'Republic of Korea (South Korea)')
        .replace('Moldova, Republic of',                                 'Moldova')
        .replace('Tanzania, United Republic of',                         'Tanzania')
        .replace('Taiwan, Province of China',                            'Taiwan')
        .replace('Taiwan, Province of Mainland China',                   'Taiwan')
        .replace('台灣',                                                  '臺灣')
        .replace('China',                                                'Mainland China')
        .replace('Mainland Mainland China',                              'Mainland China')
        .replace('Venezuela (Bolivarian Republic of)',                   'Venezuela')
        .replace('Viet Nam',                                             'Vietnam')
    );
});

/** 折疊 div table *****************************
 *  Description: 實現div.NavFrame和table.collapsible的可摺疊性。
 *  JSConfig的collapseText、expandText、autoCollapse屬性定義預設文字和預設最少自動摺疊塊
 *  Maintainers: User:fdcn
 */
addOnloadHook(function(){
        function toggleState(item){
                var nstate=1-item.state;
                if(item.text[0]){
                        item.text[item.state].style.display = 'inline';
                        item.text[nstate].style.display='none';
                }
                item.state=nstate;
                item.action(item);
        }

        function cancelBubble(e){
                e=e||window.event;
                if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}
        }
        function createToggleButton(head,frame,toggle){
                var textS,textH;
                var button=getElementsByClassName(head,"span","NavToggle")[0];
                if(button){
                        textS=getElementsByClassName(button,"span","NavToggleShow")[0]
                        textH=getElementsByClassName(button,"span","NavToggleHide")[0];
                }else {
                        textS=createElement("span",[JSConfig.expandText]);
                        textH=createElement('span',[JSConfig.collapseText]);
                        button=createElement("span",[textS,textH],{'class':"NavToggle",styles:{'width':"3.8em"}});
                }
                if(textS){textS.style.display='none';}
                var item={'state':0, 'text':[textS,textH],'frame':frame,'action':toggle}

                var links=head.getElementsByTagName("A");
                for(var i=0,l;l=links[i];i++){l.onclick=cancelBubble;}
                
                head.insertBefore( button, head.childNodes[0] );
                head.onclick=function(){toggleState(item);}
                head.style.cursor = "pointer";
                return item;
        }
        
        /* 折疊div */
        function toggleNavigationBar(item)
        {
                var cls=item.state?'none':'block';
                for (
                        var NavChild = item.frame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                ){
                        if (NavChild.className == 'NavPic' || NavChild.className == 'NavContent') {
                                NavChild.style.display = cls;
                        }
                }
        }
        
        /* 折疊表格 */
        function collapseTable( item )
        {
                var rows = item.frame.getElementsByTagName( "tr" ); 
                var rowsLen=rows.length;
                if (item.state ) {
                        for ( var i = 1; i < rowsLen; i++ ) {
                                rows[i].style.display = "none";
                        }
                } else {
                        for ( var i = 1; i < rowsLen; i++ ) {
                                rows[i].style.display = rows[0].style.display;
                        }
                }
        }
        
        //init
        var item,items=[];
        var NavFrames=getElementsByClassName(document,"div","NavFrame");
        for(var i=0,NavFrame;NavFrame = NavFrames[i];i++) {
                var heads=getElementsByClassName(NavFrame,"div","NavHead");
                for(var ih=0,head; head = heads[ih]; ih++ ) {
                        if (head.parentNode != NavFrame) {continue;}
                        items.push(createToggleButton(head,NavFrame,toggleNavigationBar));
                        break;
                }
         }

        var tables = getElementsByClassName(document,"table","collapsible");
        for ( var i = 0,table; table= tables[i]; i++ ) {
                var head = table.getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
                items.push(createToggleButton(head,table,collapseTable));
        }

        var count=items.length;
        for ( var i = 0;  i<count; i++ ) {
                item=items[i];
                if ( hasClass( item.frame, "collapsed" ) || ( count >= JSConfig.autoCollapse && hasClass( item.frame, "autocollapse" ) ) ) {
                        toggleState(item);
                }
        }
});

/* 修正折疊後定位變化 */
hookEvent("load",function(){if(location.hash){location.href=location.hash;}});