if(!!$('[data-edit]').length) {
    $('.WikiaPageHeader#WikiaPageHeader nav.wikia-menu-button ul.WikiaMenuElement').prepend(
        $('<li />').html(
            $('<a />').attr('href','/wiki/' + $('[data-edit]').data('edit') + '?action=edit').text($('[data-edit]').data('edit') + ' bearbeiten')
        )
    );
}

/* Adds the rules to the sidebar in edit mode */
addOnloadHook(function() {
    console.info('Adds the rules to the sidebar');
    //$.get('/api.php
    $('.EditPageRail .rail-auto-height').prepend(
        $('<div />').addClass('module module_rules').attr('data-id','rules').append(
            $('<h3 />').html(
                $('<span />').text('Regeln').append(
                    $('<img />').addClass('chevron collapse').attr('src',"data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D")
                )
            ),
            $('<div />').addClass('module_content').text('Unsere Regeln sind...')
        ).click(function() {
            console.log($(this).find('.chevron'));
            $(this).find('.module_content').toggle('slow')
            $(this).find('.chevron').toggleClass('collapse expand')
        })
    );
});

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 * Added section edit functionality by [[User:Green tentacle]]
 * Fix for new edit button next to the title by [[User:Grunny]]
 * New Wikia skin support by [[User:Grunny]]
 */
function addEditIntro(name) {
    // Top link
    if (skin == 'oasis') {
        $('a[data-id="edit"]').attr('href', $('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each(function () {
            $(this).attr('href', $(this).attr('href') + '&editintro=' + name);
        });
    } else {
        var el = document.getElementById('ca-edit');
 
        if (typeof (el.href) == 'undefined') {
            el = el.getElementsByTagName('a')[0];
        }
 
        if (el) el.href += '&editintro=' + name;
 
        // Section links
        var spans = document.getElementsByTagName('span');
        for (var i = 0; i < spans.length; i++) {
            el = null;
 
            if (spans[i].className == 'editsection') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el) el.href += '&editintro=' + name;
            } else if (spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el) el.href += '&editintro=' + name;
            }
        }
    }
}
 
if (wgNamespaceNumber === 0) {
    addOnloadHook(function () {
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats) return;
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title == 'Kategorie:Harry grangers Test Wiki Zauberhafte Artikel') {
                addEditIntro('Vorlage:Gewählter_Zauberhafter_Artikel_editintro');
                break;
            }
        }
    });
}