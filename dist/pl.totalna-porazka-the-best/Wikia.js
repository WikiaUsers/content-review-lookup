// POWRÓT NA GÓRĘ STRONY
$(function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Wróć na górę</a></li>');
});
 
/* EDYTOR - PRZYCISK*/
$(function extraEditButton() {
    $('#WikiaPageHeader>nav.wikia-menu-button')
    .after($('<nav />')
        .addClass('wikia-menu-button extra-wikia-edit-button')
        .append(
            $('<a href="/wiki/' + encodeURIComponent( wgPageName ) + '?action=edit">Edytor klasyczny</a>'),
            $('<style>.extra-wikia-edit-button {margin: 3px 0 0 12px !important;} .extra-wikia-edit-button>a {color:#fff; border-right: none !important;} a:hover {text-decoration: none;}</style>')
        )
    );
});
 
/* USER TAGS */
window.UserTagsJS = {
    modules: {},
    tags: {
        'Znawcawiki':         { u:'Znawca Wiki', title:'Znawca Wiki' },
 
    }
};
UserTagsJS.modules.custom = {
    'TerriblePlayer':                ['Znawcawiki']
};