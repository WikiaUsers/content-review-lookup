if (window.location.href.indexOf('action=edit') == -1) {
    $('body').append('<div class="ContestWidget">Contests [<a href="/wiki/Project:Unterganging_Contests?action=edit&useeditor=source">edit</a>]<div class="g-contest"></div></div>')
    $('.g-contest').load('/wiki/Project:Unterganging_Contests?action=render .contests-container', function() {
        deadlineFlags();
    })
    importStylesheetPage('User:Mfaizsyahmi/g-contest.css', 'hitlerparody');
}