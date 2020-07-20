/*Imports - Full credits on imported pages*/

/* http://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/DiscussionsFeed.js", /* Mod tools for /d ~Flightmare*/
        "MediaWiki:Common.js/DiscussionsLinks.js", /* Contributions /d ~Flightmare*/
        "u:dev:RevealAnonIP/code.js",
        "MediaWiki:Common.js/navfix.js", /*Fix wiki navigation ~Jgjake2*/
        "u:deadisland:User:Jgjake2/js/ElderScrolls/Popups.js", /*Popup script  ~Jgjake2*/
        "MediaWiki:Common.js/collapse.js", /*Collapsibles ~HaLo2FrEeEk*/
        "MediaWiki:Functions.js",
        "MediaWiki:Gadget-Edittools.js",
        "MediaWiki:Common.js/summaries.js", /*Standard edit summaries*/
        "MediaWiki:Common.js/autolock.js", /*30day blog lock*/
        "MediaWiki:Gadget-SigReminder.js",
        "MediaWiki:Common.js/VotesTally.js",
        "u:dev:ArchiveTool/code.js",
        "u:dev:ProfileTags.js" /*Masthead.js replacement*/
    ]
});

/* Null edit: */
! function (mw, $) {
    "use strict";
 
    var $cc = $("#mw-content-text"),
        messages = {
            en: {
                text: "Null Edit",
                tooltip: "Null Edit this page",
                success: "Null Edit successful!",
                failed: "Null Edit failed!"
            },
            es: {
                text: "Edición vacía",
                tooltip: "Editar esta página sin hacer cambios",
                success: "Edición vacía exitosa!",
                failed: "Edición vacía fallado"
            },
            pl: {
                text: "Pusta edycja",
                tooltip: "Pusta edycja na tej stronie",
                success: "Pusta edycja  sukces!",
                failed: "Pusta edycja zawiodly!"
            },
            sv: {
                text: "Tom redigera",
                tooltip: "Tom redigera denna sid",
                success: "Tom redigera framgångsrik!",
                failed: "Tom redigera misslyckades!"
            }
        };
 
    // Localisation: User Lang > Wiki Lang > English
    messages = $.extend(messages.en, messages[mw.config.get("wgContentLanguage")], messages[mw.config.get("wgUserLanguage")]);
 
    // Add the button
    function addButton() {
        var $sel,
            $button = $('<li><a/>').find("a")
            .attr({
                href: "#",
                accesskey: "0",
                id: "ca-null-edit",
                title: messages.title
            }).text(messages.text).click(edit).end();
 
        $sel = mw.config.get("skin") === "oasis" ? $("a[data-id='history']").closest("ul") : $("#ca-edit").parent();
        $sel.append($button);
    }
 
    // Show results
    function showResult(message, result) {
        if (mw.config.get("skin") === "oasis")
            window.GlobalNotification.show(message, result);
        else window.alert(message);
    }
 
    // Get the page
    function getPage() {
        $('#ca-null-edit').html('<img id="null-edit-throbber" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" /> Getting page...');
        $cc.load(window.location.href + " #mw-content-text > *", function () {
            $("#ca-null-edit").parent().remove();
            addButton();
 
            // Fix collapsibles, sortables and tabber
            $cc.find(".mw-collapsible").makeCollapsible();
            if ($cc.find("table.sortable").length)
                $cc.find("table.sortable").tablesorter();
            if ($cc.find(".tabber").length)
                tabberAutomaticOnLoad();
 
            // Allow users to add custom callback functions if needed
            var neCallAgain = window.NullEditCallAgain || [];
            neCallAgain.forEach(function(v){
                v();
            });
 
            // Fade-in the page slowly
            $cc.fadeToggle(3000);
 
            // Success notification
            showResult(messages.success, "confirm");
        });
    }
 
    function onError() {
        $("#ca-null-edit").parent().remove();
        addButton();
        $cc.fadeIn();
        showResult(messages.failed, "error");
    }
 
    // Ajax edit the page
    function edit(e) {
        $cc.fadeToggle(1400);
        e.preventDefault();
        $('#ca-null-edit').html('<img id="null-edit-throbber" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" /> Editing...');
        new mw.Api().post({
            format: 'json',
            action: 'edit',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('editToken'),
            prependtext: ''
        })
        .done(function() {
            getPage();
        })
        .fail(function() {
            onError();
        });
    }
 
    // Init
    $(function () {
        if (!$("#ca-null-edit").length && $("#ca-edit, a[data-id='editprofile'], a[data-id='leavemessage']").length)
            addButton();
    });
}(mediaWiki, jQuery);

/* ---------------------------------Adds edit links to WLH page -- *
 * ---------------------------------Final-Fantasy-wiki------------ */
function addEditLinksToWLH() {
  if(wgCanonicalSpecialPageName=='Whatlinkshere')
  {
    var links = document.getElementById("mw-whatlinkshere-list").getElementsByTagName('li');
    for(var i = 0; i<links.length; i++)
    {
      aLink = links[i].getElementsByTagName('a');
      var linkHref = aLink[0].href.replace("?redirect=no","")+"?action=edit";
      var tools = getElementsByClassName(links[i], 'span', 'mw-whatlinkshere-tools');
      var editLinkSpan = document.createElement("span");
      editLinkSpan.className = "mw-whatlinkshere-edit";
      editLinkSpan.innerHTML = '<a title="Edit form" href="' + linkHref + '">(edit)</a> ';
      links[i].insertBefore(editLinkSpan,tools[0]);
    }
  }
}

addOnloadHook(addEditLinksToWLH);

/* Portable Infobox subtheme overrides by Kopcap94 */
(function( $ ) {
	"use strict";
	var title_text;
	$( '.pi-theme-book .pi-header' ).each( function() {	
		title_text = $( this ).text();
		switch( title_text ) {
            case 'Online':
                $( this ).addClass( 'online' );
				break;
			case 'Skyrim':
				$( this ).addClass( 'skyrim' );
				break;
			case 'Dragonborn':
				$( this ).addClass( 'dragonborn' );
				break;
			case 'Dawnguard':
                $( this ).addClass( 'dawnguard' );
                break;
			case 'Oblivion':
                $( this ).addClass( 'oblivion' );
                break;
			case 'Morrowind': 
				$( this ).addClass( 'morrowind' );
				break;
			case 'Daggerfall':
				$( this ).addClass( 'daggerfall' );
				break;
			case 'Bloodmoon':
                $( this ).addClass( 'bloodmoon' );
                break;
			default:
				return;
		}
	});
})( this.jQuery );