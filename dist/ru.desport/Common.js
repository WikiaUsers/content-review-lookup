/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// ############################################################################# //
// Begin: User roots
// ############################################################################# //
 
$(function() {
 var rights = {};

 rights["Dodger.55555"] = ["ОСНОВАТЕЛЬ"];
 rights["Черный странник"] = ["БЮРОКРАТ SPORTS WIKI"];
 rights["Tommi da Silva"] = ["АДМИНИСТРАТОР SPORTS WIKI"];
 rights["Wildream"] = ["ПОМОЩНИК РУССКОЯЗЫЧНОГО ПОРТАЛА"];
 rights["Kuzura"] = ["ПОМОЩНИК РУССКОЯЗЫЧНОГО ПОРТАЛА"];
 rights["Jormun"] = ["ПОМОЩНИК РУССКОЯЗЫЧНОГО ПОРТАЛА"];
 
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for(var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>' + '<span>' + '&nbsp;' + '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});
function addWikifButton(){
 var toolbar = document.getElementById('toolbar')
 var textbox = document.getElementById('wpTextbox1')
 if (!textbox || !toolbar) return
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
 i.alt = i.title = 'Викификатор'
 i.onclick = Wikify
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit'){
document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')
 addOnloadHook(addWikifButton)
}


//TimedSlider
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});