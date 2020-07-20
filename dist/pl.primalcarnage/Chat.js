// IMPORT
importArticles({
    type: "script",
    articles: [
      "w:c:dev:ChatTags/code.js",            //ChatTags
      "w:c:dev:CapsFirst/code.js",           //CapsFirst
    ]
});

// LINKI W NAGŁÓWKU by Szynka013
var headline_wikiname = 'Primal Carnage Wiki',
    headline_ruleslink = 'Project:Regulamin',
    headline_textcolor = '#000',
    headline_styles = 'display: inline-block; width: 300px; font-size: 12px; text-align: center; line-height: 14px; padding: 7px 0; font-weight: bold; color: #000; position: absolute; right: 160px;',
    headline_bar = '<div style="' + headline_styles + '">Ważne strony ' + headline_wikiname + '!</br><a href="/wiki/Project:O_nas" target="_blank">O nas</a> — <a href="/wiki/' + headline_ruleslink + '" target="_blank">Zasady</a> — <a href="/wiki/MediaWiki:Emoticons" target="_blank">Emotikony</a></div>';  
 
$('.ChatHeader > .wordmark').append(headline_bar);

// AUTOMATYCZNE ODŚWIEŻANIE EMOTIKON
ajaxEmoticonsInterval = 45000;
importScriptPage('AjaxEmoticons/code.js', 'dev');