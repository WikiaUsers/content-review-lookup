/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */

/*Predefini��o:USERNAME*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* �cones No Cabe�alho da P�gina*/
$(function() {
    if( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#icons' ).attr( 'style', 'position: absolute; right: 115px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#icons' ) );
        $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
    }
});