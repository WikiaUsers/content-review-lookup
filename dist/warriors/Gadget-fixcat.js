// forces categories out of their dropdown, optional/opt-in gadget for Special:Preferences
$( '.page-footer__categories' ).removeClass( 'wds-is-collapsed' ).css( 'padding-top', '18px' );
$( '.page-footer__categories .wds-collapsible-panel__header' ).remove();
$( '#articleCategories .special-categories-label' ).css( 'display', 'block' );