/*
 * messages
 * Napisane przez Py64
 * Data utworzenia: 18.10.2014r. 13:49
 * Zmieniaj etykiety
*/
NMessages = {
    search: 'Przeszukaj Pasta Wiki',
    createawiki: 'Utwórz wiki',
    gototop: 'Na górę',
    discussion: 'Dyskusja',
    pagesonwiki: 'strony na<br/>tej wiki',
    contribute: 'Dodaj',
    default: {
        search: 'Przeszukaj Pasta Wiki',
        createawiki: 'Utwórz wiki',
        gototop: 'Na górę',
        discussion: 'Dyskusja',
        pagesonwiki: 'strony na<br/>tej wiki',
        contribute: 'Dodaj'
    }
};

var $_msg = NMessages;

function nmsginit() {
    if($_msg.search != $_msg.default.search || $_msg.createawiki != $_msg.default.createawiki || $_msg.gototop != $_msg.default.gototop || $_msg.discussion != $_msg.default.discussion || $_msg.pagesonwiki != $_msg.default.pagesonwiki || $_msg.contribute != $_msg.default.contribute) {
        $('#WikiaSearch input[name="search"]').attr('placeholder',$_msg.search);
        $('.start-a-wiki a').html($_msg.createawiki);
        $('.toTop').html($_msg.gototop);
        $('.WikiaPageHeader a[data-id="comment"]').html($_msg.discussion);
        $('#WikiaPageHeader .tally span').html($_msg.pagesonwiki);
        $('#WikiHeader .contribute').html($_msg.contribute);
    }
}