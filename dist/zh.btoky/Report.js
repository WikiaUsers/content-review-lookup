
( function ( $, mw ) {
    var nsNr = mw.config.get( 'wgNamespaceNumber' ),
        theText = '\u56de\u5831\u9801\u9762\u932f\u8aa4';
/*        if ($.isArray(wgUserGroups) && !(0 > $.inArray("autoconfirmed", wgUserGroups))) {
            $( addReportButton );
        }
*/    
    function reportPage () {
            window.open().location.href = "http://zh.tos.wikia.com/wiki/Project:回報?page=" + wgPageName.replace(/%/g, '%25');
    }
    
    function addOasisReportButton () {
        switch (nsNr) {
            case 500:
            case 502:
                $('.page-header__contribution-buttons').append(
                    '<a class="custom-report-button wds-button wds-is-squished wds-is-secondary" href="javascript:void(0)"></a>'
                );
                break;
            case 2:
            case 3:
                $( '.UserProfileActionButton .wikia-menu-button ul' ).append(
                    '<li><a class="custom-report-button" href="javascript:void(0)"></a></li>'
                );
                break;
            default:
                $( '.page-header__contribution-buttons .wds-list' ).append(
                    '<li><a class="custom-report-button" href="javascript:void(0)"></a></li>'
                );
        }
    }
    
    function addReportButton () {
        switch( mw.config.get( 'skin' ) ) {
            
            case 'uncyclopedia': /* monobook clone, pass to monobook */
            case 'wowwiki': /* monobook clone, pass to monobook */
            case 'lostbook': /* monobook clone, pass to monobook */
            case 'monobook':
                $('#p-cactions > .pBody > ul').append('<li id="ReportButton" id="ca-report"><a class="custom-report-button" href="javascript:void(0)"></a></li>');
                break;
            
            case 'oasis':
            case 'wikia':
                addOasisReportButton();
                break;
        }
        $( '.custom-report-button' ).text( theText ).click( reportPage );
    }    
} ( jQuery, mediaWiki ) );