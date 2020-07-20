$(function() {
    var rights = {
        'Adlerkralle99'    : ['Admin'],
        'Agent Zuri'       : ['Technischer Admin'],
        'D(G) Dragon'      : ['Admin', 'inaktiv'],
        'Harry granger'    : ['Admin', 'Bürokratin'],
        'Pakarof'          : ['Gründer', 'inaktiv'],
        'Avatar'           : ['FANDOM-Mitarbeiter'],
        'ElBosso'          : ['FANDOM-Mitarbeiter'],
        'Mira Laime'       : ['FANDOM-Mitarbeiterin'],
        'MtaÄ'             : ['FANDOM-Mitarbeiter'],
        'Wikia'            : ['Wikia-Bot']
    };
    var newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for ( var i in newrights ) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});