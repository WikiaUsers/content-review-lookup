/**
 * 
 * @module                  CodeLinksDropdown
 * @description             Adds a dropdown link to personal code pages.
 * @author                  Americhino
 * @version                 0.0.0
 * @license                 CC-BY-SA 3.0
 * @notes                   Total alpha rewrite, DO NOT USE.
 * 
 */
var $linksMenu = $('<div>').addClass('wds-is-not-scrollable wds-dropdown-level-2__content codelinks-menu').append(
        $('<ul>').addClass('wds-list wds-is-linked')
    );
$('.wds-global-navigation__user-menu > .wds-dropdown__content > ul.wds-list > li:nth-child(2)').after(
    $('<li>').addClass('wds-is-stickied-to-parent wds-dropdown-level-2').append(
        $('<a>').attr('href', '#').attr('data-id', 'codelinks').addClass('wds-dropdown-level-2__toggle').text('Code Links'/* i18n.msg('codelinks').escape() */).append(
            $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron"> <path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"></path> </svg>')
        )
    ).append($linksMenu)
)
['common.js', 'wikia.js', 'chat.js', 'common.css', 'wikia.css', 'chat.css'].forEach(function (codepg) {
    $('.codelinks-menu .wds-list.wds-is-linked').append(
        $('<li>').append(
            $('<a>').attr('href', '/wiki/User:' + wgUserName + '/' + codepg).text(codepg)
        )
    )
});