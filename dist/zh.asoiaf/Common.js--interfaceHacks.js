//<pre>
/* This piece of code enables the dragon background. Put it AFTER stellar.js*/
if ($(document).height()>600){
  /* stellar data attribute */
  $(".WikiaSiteWrapper").attr("data-stellar-background-ratio","0.4");
  /* enable stellar.js*/
  $(window).stellar();
}else{
  $(".WikiaSiteWrapper").css('background-image','none');
}
/* Support dual langlinks (Both TV and Book) for English */
var en = mw.config.get('wgCanonicalNamespace')=='TV'?"http://gameofthrones.wikia.com/wiki/":"http://awoiaf.westeros.org/index.php/";
try{
$(".WikiaArticleInterlang").each(function(){
  var a = $(this).find("a[href^='http://iceandfire.wikia.com/wiki/']");
  var url = a.prop("href").replace(/^http:\/\/iceandfire\.wikia\.com\/wiki\//, en);
  a.prop("href", url);
});}catch(err){
}
/* 自定义按钮 */
if ( mwCustomEditButtons ) {
  mwCustomEditButtons[mwCustomEditButtons.length] = 
  {
    'imageFile': 'https://images.wikia.nocookie.net/__cb20080502182948/central/images/9/9f/Button_defaultsort.png',
    'speedTip': 'Default sort',
    'tagOpen': '\{\{DEFAULTSORT:',
    'tagClose': '\}\}',
    'sampleText': 'Pinyin'
  };

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    "speedTip": "重定向",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "页面名称"};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "删除线",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "被删除的文字"};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
       "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
       "speedTip": "换行",
       "tagOpen": "<br />",
       "tagClose": "",
       "sampleText": ""};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
         "speedTip": "添加注释行",
         "tagOpen": "<!-- ",
         "tagClose": " -->",
         "sampleText": "请在此处添加注释"};

       }
       /* this makes 类别： looks better. purly aesthetic */
       $('.special-categories').html('<a href="/wiki/Special:%E9%A1%B5%E9%9D%A2%E5%88%86%E7%B1%BB" title="Special:页面分类" class="categoriesLink" rel="nofollow">类别</a>：');

    /*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
    */
    function substUsername() {
      $('.insertusername').html(wgUserName);
    }

    function substUsernameTOC() {
      var toc = document.getElementById('toc');
      var userpage = document.getElementById('pt-userpage');

      if( !userpage || !toc )
        return;

      var username = userpage.firstChild.firstChild.nodeValue;
      var elements = getElementsByClass('toctext', toc, 'span');

      for( var i = 0; i < elements.length; i++ )
        elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
    }
    addOnloadHook(substUsername);
    addOnloadHook(substUsernameTOC);
//</pre>