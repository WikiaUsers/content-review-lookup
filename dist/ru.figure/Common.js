importArticles({
    type: "script",
    articles: [ 
        'MediaWiki:Custom-forms.js',
  ]
});
 
// Открывает страницу создания статьи в режиме исходного кода через InputBox
$(function(){
  $('form.createbox').append('<input type="hidden" name="useeditor" value="source" />');
});