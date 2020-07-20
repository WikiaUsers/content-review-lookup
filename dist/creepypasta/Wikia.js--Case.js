/*var editMenu = $('#WikiaPageHeader')
.find('nav.wikia-menu-button')
.find('ul.WikiaMenuElement');
 
$('<li><a>Case</a></li>')
.appendTo(editMenu)
.click(function() {
    var Content = $('.mw-content-ltr').find('ul').remove();
    Content = $('.mw-content-ltr').find('noscript').hide();
    Content = $('.mw-content-ltr').find('figure').remove();
    Content = $('.mw-content-ltr').find('h2').remove();
    Content = $('.mw-content-ltr').find('nav').remove();
    Content = $('.mw-content-ltr').find('a').remove();
    Content = $('.mw-content-ltr').find('br').remove();
    Content = $('.mw-content-ltr').clone().find('span').replaceWith(function() { 
        return this.innerHTML; 
    }).end().html();
    Content.replace(/ i /g, ' I ');
    Content.replace(/ im /g, " I'm ");
    $.post("/api.php", {action: "edit", title: wgPageName, token: mw.user.tokens.values.editToken, text: Content, summary: 'Correcting Case.'});
});*/