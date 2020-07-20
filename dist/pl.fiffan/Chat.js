/* Nagłowek */ 
var chatTopic = 'Witaj w Spółce Zło! Koniecznie zobacz: <br/><a href="http://pl.fiffan.wikia.com/wiki/Fanowska_Fineasz_i_Ferb_Wiki:Regulamin/Czat" target="_blank" title="Regulamin czatu" style="position:relative;text-decoration:underline;">Regulamin czatu</a>, <a href="http://pl.fiffan.wikia.com/wiki/MediaWiki%3AEmoticons" target="_blank" title="Lista emotikonów" style="position:relative;text-decoration:underline;">Lista emotikonów</a>, <a href="http://orig12.deviantart.net/b89a/f/2017/071/a/4/chattagi_by_fiffanseba7211-db22t60.png" target="_blank" title="ChatTagi" style="position:relative;text-decoration:underline;">ChatTagi</a>';

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:left;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:120px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

/* Chat Tags */
var chatags = { images: true, videos: true };

/* Importowane skrypty  */
importArticles( {
    type: 'script',
    articles: [
        'u:pl.s124test:MediaWiki:Czatmotyw.js',             // Motyw
        'u:pl.s124test:MediaWiki:ChatFiFFanpowitanie.js',   // Powitanie
        'u:pl.s124test:MediaWiki:ChatFiFFanskorki.js',      // Skórki
        'u:pl.fiffan:MediaWiki:ChatOptions-pl.js',          // ChatOptions
        'u:pl.milomurphyslaw:MediaWiki:Quizy.js',           // Quizy
        'u:dev:IsTyping/code.js'                            // Ktoś pisze
    ]
} );