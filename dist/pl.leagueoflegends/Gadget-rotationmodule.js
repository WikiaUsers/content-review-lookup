/* Adds right rail module with free champion rotation */

/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */

function champRotationModule() {
    $(document).ready(function() {
        var module = $('<section class="module" id="ChampionRotationModule"><h1 style="margin-bottom:5px;">Darmowi bohaterowie</h1></section>').hide();
        $('#WikiaRail').append(module);
        var href = $('link[rel="canonical"]').attr('href');
        if(typeof href == 'undefined' || !href) { console.log('ChampRotationModule: script couldn\'t find link[rel="canonical"] tag'); return false; }
        var i = href.indexOf('/wiki/');
        $.getJSON('/api.php?format=json&action=parse&disablepp=true&prop=text&title='+href.substring(i+6)+'&text={{Aktualna rotacja|module}}', function(data, textStatus, jqXHR) {
            var code = data.parse.text['*'];
            $('#ChampionRotationModule').append(code);
            $(window).trigger({type:"RotationModule",time: new Date()}, $('#ChampionRotationModule'));
            if($('#ChampionRotationModule a.new').length > 0) $('#ChampionRotationModule').remove();
            else {
                $('#WikiaRail').prepend($('#ChampionRotationModule'));
                $('#ChampionRotationModule')
                    .insertAfter('#WikiaRail #WikiaSearch')
                    .insertAfter('#WikiaRail #TOP_RIGHT_BOXAD')
                    .show();
            }
        });
    });
}
$(champRotationModule);