//たぬき Wiki から転送（リファラー付き）
//空想科学系のカテゴリは 空想科学Wiki へ転送
//「Mirahezeに移動した記事」カテゴリは Miraheze Tanukipedia へ転送
 
/*
 * カテゴリに応じて転送先を変える
 */

if (wgCategories.indexOf('数量の比較 (空想科学世界)') >= 0 || wgCategories.indexOf('ドラえもん') >= 0 || wgCategories.indexOf('ドラえもんの道具') >= 0 || wgCategories.indexOf('スタジオジブリ') >= 0 || wgCategories.indexOf('青鬼') >= 0 || wgCategories.indexOf('数学') >= 0 || wgCategories.indexOf('宇宙基準単位系') >= 0 )
{
  var redirect_url = "https://dreamscience.miraheze.org/wiki/" + wgPageName;
  if (document.referrer) {
    var referrer = "referrer=" + encodeURIComponent(document.referrer);
    redirect_url = redirect_url +'?'+ referrer;
  }
  location.href = redirect_url;
}
else if (wgCategories.indexOf('Mirahezeに移動した記事') >= 0)
{
  var redirect_url = "https://tanukipedia.miraheze.org/wiki/" + wgPageName;
  if (document.referrer) {
    var referrer = "referrer=" + encodeURIComponent(document.referrer);
    redirect_url = redirect_url +'?'+ referrer;
  }
  location.href = redirect_url;
}
 

function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");