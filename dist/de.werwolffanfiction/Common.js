/* Das folgende JavaScript wird für alle Benutzer geladen. */

/* Werwolf-Wiki: Rollenspiel- & FanFiktion-Toolbar */
(function() {
    // 1. Name des Buttons in der Leiste
    var toolbarLabel = 'Wolfs-Zentrale 🐺'; 

    // Spam-Filter-Schutz: Wir zerlegen die Foren-Domain
    var ffForum = 'forum.' + 'fan' + 'fiktion.' + 'de/';

    // 2. Deine maßgeschneiderte Link-Liste
    var toolbarLinks = [
        {
            link: 'https://' + ffForum + 't/21678/1', 
            label: '🎬 Spiel-Anfang (Seite 1)'
        },
        {
            link: 'https://' + ffForum + 't/21678/2090', 
            label: '📖 Aktuelle Etappe (S. 2090)'
        },
        {
            link: 'https://' + ffForum + 't/21678/?view=getnewpost', 
            label: '🚀 Direkt zum neuesten Post'
        },
        {
            link: '/wiki/Kategorie:Charaktere', 
            label: '👥 Unsere Werwolf-Rollen'
        },
        {
            link: '/wiki/Spezial:Neue_Seiten', 
            label: '📝 Neue Wiki-Einträge'
        }
    ];

    // 3. Das technische Gerüst (baut das Menü in die Fandom-Leiste ein)
    var toolbarWrapper = document.querySelector('#WikiaBar .tools, #WikiaBar .wikia-bar-anon');
    
    // Nur ausführen, wenn die Werkzeugleiste auf der Seite existiert
    if (toolbarWrapper) {
        var toolbarElement = document.createElement('li');
        toolbarElement.classList.add('custom', 'menu', 'wds-dropdown', 'wikiabar-button', 'wds-is-flipped');
        
        toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
            '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + '</span>' + 
            '<div class="wds-dropdown__content">' + 
                '<h2 style="margin-left: 16px; font-size: 14px; margin-top: 10px; margin-bottom: 5px;">Unser Forenspiel</h2>' +
                '<ul class="wds-list wds-is-linked">' + 
                    toolbarLinks.map(function(link) {
                        return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
                    }).join('') + 
                '</ul>' + 
            '</div>';
            
        toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);
    }
})();

/* dev:AutoCreateUserPages.js */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:newuser}}',
        3: '{{sub'+'st:welcome}}',
        1202: false
    },
    summary: 'Script: Creating profile and talkpage on first edit'
};
var firstRun = true;

function loadFunc() {
    if( firstRun ) {
        firstRun = false;
    } else {
        return;
    }

    window.pageName = wgPageName;
    window.storagePresent = (typeof(globalStorage) != 'undefined');

    fillPreloads();
    substUsername();
    substUsernameTOC();
    rewriteTitle();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if( typeof(onPageLoad) != "undefined" ) {
        onPageLoad();
    }
}
function fillPreloads() {
    if( !$( '#lf-preload' ).length ) return;

    $( '#lf-preload' ).attr( 'style', 'display: block' );

    $.get( wgScript, { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } )
    .done( function( data ) {
        var lines = data.split( '\n' );
        var $preloadOptionsList = $( '<select />' )
            .attr( 'id', 'stdSummaries' )
            .change( function() {
                var templateName = $( this ).val();
                if ( templateName !== '' ) {
                    templateName = 'Template:' + templateName + '/preload';
                    templateName = templateName.replace( ' ', '_' );
                    $.get( wgScript, { title: templateName, action: 'raw', ctype: 'text/plain' } )
                    .done( function( data ) {
                        insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
                    });
                }
            });

        for ( var i = 0; i < lines.length; i++ ) {
            var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
            $preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
        }

        $( '#lf-preload-cbox' ).html( $preloadOptionsList );
    });

    $( '#lf-preload-pagename' ).html( '<input type="text" class="textbox" />' );
    $( '#lf-preload-button' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />' );
}
function rewriteTitle() {
    if( window.SKIP_TITLE_REWRITE ) return;
    if( $('#title-meta').length == 0 ) return;

    var newTitle = $('#title-meta').html();

    if( skin == "oasis" ) {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
    }
}
}
function addEditIntro(name) {
    if( skin == 'oasis' ) {
        $('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each(function() {
            $(this).attr('href',$(this).attr('href') + '&editintro=' + name);
        });
    } else {
        var el = document.getElementById('ca-edit');
        if( typeof(el.href) == 'undefined' ) el = el.getElementsByTagName('a')[0];
        if (el) el.href += '&editintro=' + name;

        var spans = document.getElementsByTagName('span');
        for ( var i = 0; i < spans.length; i++ ) {
            if (spans[i].className == 'editsection' || spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el) el.href += '&editintro=' + name;
            }
        }
    }
}
if (mwCustomEditButtons) {
  mwCustomEditButtons.push({
    imageFile: "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    speedTip: "Redirect",
    tagOpen: "#REDIRECT [[",
    tagClose: "]]",
    sampleText: "Insert page"
  });

  mwCustomEditButtons.push({
    imageFile: "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
    speedTip: "Strike",
    tagOpen: "<s>",
    tagClose: "</s>",
    sampleText: "Strike-through text"
  });

  mwCustomEditButtons.push({
    imageFile: "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
    speedTip: "Line break",
    tagOpen: "<br />",
    tagClose: "",
    sampleText: ""
  });

  mwCustomEditButtons.push({
    imageFile: "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
    speedTip: "Comment visible only for editors",
    tagOpen: "<!-- ",
    tagClose: " -->",
    sampleText: "Insert comment here"
  });
}
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function() {
    function substUsername() {
        // Nutzt die sichere mw.config API anstelle der veralteten wgUserName-Variable
        var userName = mw.config.get('wgUserName');
        
        // Nur ausführen, wenn ein Benutzer eingeloggt ist
        if (userName) {
            $('.insertusername').text(userName);
        }
    }
    
    // Führt die Funktion aus, sobald das DOM bereit ist
    substUsername();
});

mw.hook('wikipage.content').add(function() {
    // Verhindern, dass der Button mehrfach erstellt wird
    if ($('#scroll-to-top-button').length) return;

    var $button = $('<div>')
        .attr('id', 'scroll-to-top-button')
        .html('▲')
        .attr('title', 'Nach oben scrollen')
        .appendTo('body');

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $button.fadeIn();
        } else {
            $button.fadeOut();
        }
    });

    $button.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
});