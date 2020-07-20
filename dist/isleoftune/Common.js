/* Any JavaScript here will be loaded for all users on every page load. */
$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js', function () {
     // jQuery UI is loaded
});
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('ListAdmins/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev'); 
importScriptPage('Sine/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 1 };
importScriptPage('Standard_Edit_Summary/code.js', 'dev');
// Does the InfoWidgets style on the Main Page
$(document).ready(function () {
    if ($('#info-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
 
            np = Widgets.newPages();
            np.selector = '#new-pages';
            Widgets.add(np);
 
            rc = Widgets.recentChanges();
            rc.selector = '#recent-changes';

            Widgets.add(rc);
 
            Widgets.add({
                selector: '#new-files',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 6
                }
            });
         }
    }
});
// End InfoWidgets

window.SpoilerAlert = {
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('SpoilerAlert/code.js', 'dev'); 

// Skin Switch Button for monobook to oasis and vice versa
$(function() {
    if (!document.getElementById('ca-skins')) {
        if (skin === 'oasis' || skin === 'wikia') {
            $('ul.tools li:first-child').before('<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">Monobook</a></li>');
        } else {
            $('<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul');
        }
    }
} );
//

// Happylander Page ajax style
$(document).ready(function() {
    $('#list-projects').fadeOut(400);
    $('#list-projects').show();
    $('#back').hide();
    $('#project-1').click(function() {
        $('#back').fadeIn(200);
        $('#projects').load('/wiki/Happylander/Project:Gamiacs_Controllers #WikiaArticle', function() {
            $('#list-projects').fadeIn(400);
        });
        return false;
    });
    $('#back').click(function() {
        $('#projects').load('/wiki/Happylander #projects');
        $('#back').fadeOut(200);
    })
});
// End Happylander Page ajax style

importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = {
    brackets: '',
        en: {
            show: '↓',
            hide: '↑'
        }
    }