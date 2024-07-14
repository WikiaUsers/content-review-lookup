// No Category Dropdown
// Forces categories out of their dropdown.
// Credits to the Star Wars Wiki.
$( '.page-footer__categories' ).removeClass( 'wds-is-collapsed' ).css( 'padding-top', '18px' );
$( '.page-footer__categories .wds-collapsible-panel__header' ).remove();
$( '#articleCategories .special-categories-label' ).css( 'display', 'block' );