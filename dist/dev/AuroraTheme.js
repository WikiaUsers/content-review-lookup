//Script addon to the AuroraTheme
//Script developed by User:Universal Omega

var sassParams = mw.config.get('wgSassParams');
var root = document.documentElement;
if (window.AuroraOverwriteTransparency === true) {
    root.style.setProperty('--page-background-color', sassParams['color-page']);
    root.style.setProperty('--page-opacity', '0.5');
} else {
    root.style.setProperty('--page-background-color', sassParams['color-page']);
    root.style.setProperty('--page-opacity', sassParams['page-opacity'] + '%');
}
ExcludeAuroraWikis= window.ExcludeAuroraWikis || [];
AuroraOnlyWikis= window.AuroraOnlyWikis || [];

if(window.ExcludeAuroraWikis.includes(wgServer.replace(/\.[^]*?$/,'').replace(/^(.*[\\\/])/,'')) === true ){
console.log('Aurora Not Loaded: Wiki is in the exclude Aurora array!')
} else if(window.AuroraOnlyWikis && window.AuroraOnlyWikis.length > 0){
    if(window.AuroraOnlyWikis.includes(wgServer.replace(/\.[^]*?$/,'').replace(/^(.*[\\\/])/,'')) === true || window.AuroraOnlyWikis.includes('official') && (wgCityId == 177 || wgCityId == 1779 || wgCityId == 3487 || wgCityId == 3083 || wgCityId == 100619 || wgCityId == 5377 || wgCityId == 81390 || wgCityId == 49972  || wgCityId == 1090888 || wgCityId == 10261 || wgCityId == 11250 || wgCityId == 10466 || wgCityId == 3439 || wgCityId == 10465 || wgCityId == 1686 || wgCityId == 3321 || wgCityId == 791363 || wgCityId == 423369 || wgCityId == 7931 || wgCityId == 1610766 || wgCityId == 4079 || wgCityId == 65099 || wgCityId == 1634335 || wgCityId == 193260 || wgCityId == 1233861 || wgCityId == 1230494 || wgCityId == 1267502 || wgCityId == 14379)){
    console.log('Aurora Loaded')
   importArticles({
    type: "style",
    article: "u:dev:MediaWiki:AuroraTheme.css"
});  
    }else{
    console.log('Aurora Not Loaded: Aurora is set to only load on specific wikis.')
    }
} else
{
console.log('Aurora Loaded')
   importArticles({
    type: "style",
    article: "u:dev:MediaWiki:AuroraTheme.css"
});  
}
//To test once UCP allows JS - DO NOT USE THIS YET!
if(window.EnableAuroraUCPTesting === true && mw.config.get('wgCityId') == 2182188){
    console.log('Aurora Loaded - Aurora is set to UCP testing.')
   importArticles({
    type: "style",
    article: "u:dev:MediaWiki:AuroraTheme.css"
});  
}