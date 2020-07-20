/**
 * This is the code to
 * create the HTML5 version
 * of the Oasis skin.
 * 
 * Please be aware that this
 * code can only be in your
 * personal JavaScript page
 * at this time as this code
 * is being tested.
 * 
 * Credits:
 * - Ultimate Dark Carnage
 **/
 
// Creating the basic API
function OASIS2(){
    this.version = '0.01';
    this.urlVarRegExp = /(\?|\&)useskin=(oasis|wikia)2/gi;
    this.loaded = false;
    this.skinName = 'Oasis II';
}

OASIS2.prototype.config = {
    noads: false,
    loaded: false,
    enabled: false,
    categories: true,
    modules: true,
    toolbox: true,
    globalnav: true,
    header: true,
    breakpoints: {
        menu: true,
        rail: true
    },
    editor: true,
    masthead: true,
    notifications: false,
    search: true,
    animation: true,
    canonicalThemes: {
        'Wikia': {},
        'Metalic': {},
        'Monochrome (Wikia)': {},
        'Monochrome (Black)': {}
    },
};

OASIS2.prototype.createSkin = function(callback){
    if (this.config.enabled)
        $(document).ready(function(){
            if (!this.urlVarRegExp.test(location.href)){
                var $WikiaPageHeader = $('#WikiaPageHeader'),
                    $button = $('<a href="?useskin=oasis2" id="OASISIIButton" />').addClass('wikia-button').text('View in HTML5');
                if (!$('#OASISIIButton').length)
                    $WikiaPageHeader.append($button);
            } else {
                var $data = $('.WikiaSiteWrapper'),
                    $menu_bp = $('<aside class="WikiaMenu breakpoint" />'),
                    $modules_bp = $('<aside class="WikiaSidebar breakpoint" />'),
                    $page = $('<article class="O2Article article" />'),
                    $footer = $('<footer class="O2Footer w-categories" />'),
                    $header = $('<header class="O2Header PageHeader" />');
                
            }
        });
};