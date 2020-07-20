/* Удаление ссылки изображения вместе с изображением */

importScriptPage( 'FastOldImageDelete/code.js', 'dev' );


// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
} );

 $(function() {
    var rights = {};
 
    //Хранители Вики
    rights["Ms_Sapfirra"] = ["Окрылённая"];
  
    if (typeof rights[wgTitle] != "undefined") {
 
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            // add new rights
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
        //Создатели лучших статей
    rights["Torloid"] = ["Создатель лучшей статьи"];
  
    if (typeof rights[wgTitle] != "undefined") {
 
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            // add new rights
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});
    






 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS