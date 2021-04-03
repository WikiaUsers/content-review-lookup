importArticles({
    type: "script",
    articles: [ 
        'MediaWiki:Custom-forms.js',
  ]
});

//исправляет ошибку не выбора пространства имён в форме поиска inputbox на странице Фанон:Фанфики
if (wgPageName == 'Фанон:Фанфики') {
	$(function(){
	  $('form.searchbox').append('<input type="hidden" name="ns[0]" value="112" />');
	});
}