function ThemaMaintenance() {
var clickThema = '<div class="clickThema"><a>Bakugan</a>' + 
'<a>Beyblade</a>' + 
'<a>Bleach</a>' + 
'<a>Crossover</a>' + 
'<a>Digimon</a>' + 
'<a>Halo</a>' + 
'<a>Hellsing</a>' + 
'<a>Kirby</a>' + 
'<a>Mario</a>' + 
'<a>Metroid</a>' + 
'<a>One Piece</a>' + 
'<a>Persona</a>' + 
'<a>Pokémon</a>' + 
'<a>Selbst ausgedacht</a>' + 
'<a>Sonic</a>' + 
'<a>Spellbinder</a>' + 
'<a>Star Wars</a>' + 
'<a>Vampire - Die Maskerade</a>' + 
'<a>Vampire Knight</a>' + 
'<a>Warrior Cats</a>' +
'</div>';
$(clickThema).appendTo("form#someForm");
jQuery(function() {
    jQuery('.clickThema a').click(function() {
        titleText = jQuery(this).text();
        jQuery("input[id='thema_name']").val(titleText);
    });
});
$("head").append("<style>.clickThema a { background: rgba(205, 195, 150, 0.5); border: 1px solid #BBA; padding: 5px 7px; line-height: 15px; word-break: break-all; margin-right: 10px; float: left; margin-bottom: 5px; margin-top: 5px; cursor: pointer; }</style>");
}