/* Kod dla wszystkich skórek by Akodone */
// Działanie szablonu Edycja
mw.loader.using(['mediawiki.util', 'mediawiki.notification'], function() {
    mw.hook('wikipage.content').add(function(content) {
    	// Check if an article has the category and if the user is logged in
        if (mw.config.get('wgCategories').includes('Artykuły w edycji') && mw.config.get('wgUserId')!==null) {
            const editTemplate=document.getElementsByClassName('edit-template')[0];
            // Check if an article contains the template
            if(!!editTemplate) {
                // if contains, then create its content
                editTemplate.classList.add('komunikat');
                var editor=editTemplate.dataset.editor;
                if (editor!=='{{{1}}}' && editor.trim()!=='') {
                    var href=mw.util.getUrl('Użytkownik:' + editor);
                    editTemplate.innerHTML='Ten artykuł jest obecnie w czasie edycji. Pracuje nad nim użytkownik <a href="' + href + '">'+ editor +'</a>. Prosimy nie edytować artykułu, dopóki komunikat nie zniknie.';
                } else {
                    editTemplate.innerHTML='BŁĄD! Prosimy podać nazwę użytkownika, który edytuje artykuł, za pomocą składni: <code><nowiki>{{Edycja|NAZWA UŻYTKOWNIKA}}</nowiki></code>.';
                }
            } else {
                // if doesn't contain, show an alert to include the template
                mw.notify('Artykuł posiada kategorię „Artykuły w edycji”, lecz nie została ona wstawiona przez szablon Edycja. Prosimy o wstawienie kategorii poprzez szablon.');
            }
        }
    });
});