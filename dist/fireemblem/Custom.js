/* Default last tab in the infobox */
mw.hook('wikipage.content').add(function(elem) {
    var $nav = $(elem).find('#last-tab .tabbernav li');
    var $tab = $(elem).find('#last-tab .tabbertab');
     
    $nav.first().removeClass('tabberactive');
    $nav.last().addClass('tabberactive');
    $tab.first().css('display', 'none');
    $tab.last().css('display', 'block');
});


/* Skin Switch
* Description: Creates a skin switch button on the user
  toolbar to switch between default and custom skins.
* Author: KhangND*/
(function(window, $, mw) {
    var skinPage = "MediaWiki:Light_theme.css";
    
    // Create button
    $('<li>', {
    	appendTo: '#WikiaBar .tools',
    	append: $('<a>', {
    		text: 'Switch Skin',
    		css: { cursor: 'pointer' },
    		click: check
    	})
    });
    
    function switchSkin(){
        // Check storage for skin
    	if (localStorage.getItem('skin') === 'custom') {
            $('<link>', {
    			id: 'skinSwitch',
                rel: "stylesheet",
                type: "text/css",
                href: "/load.php?mode=articles&only=styles&articles=" + skinPage.replace(/ /g, '_'),
    			appendTo: 'head'
    		});
        } else $('#skinSwitch').remove();
    }
    switchSkin();

    function check(){
        var skin = localStorage.getItem('skin');
        if (!skin || skin !== 'custom')
    		localStorage.setItem('skin', 'custom');
    	else
    		localStorage.removeItem('skin');
    	switchSkin();
        return false;
    }
}(this, jQuery, mediaWiki));