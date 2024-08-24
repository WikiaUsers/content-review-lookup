//Config ChatStatus
window.ChatStatus = {
	statuses: {
		afk: "Ausente",
		edit: "Editando",
		food: "Comiendo",
		tv: "Repartiendo cáncer",
		google: "Error 404 Not Found",
		ufo: "U ar UFO?",
		star: "Viendo Uvpc",
		game: "Jugando",
		program: "Programando",
		bath: "En el baño",
		sleep: "Durmiendo",
		see: "Vigilando",
		eww: "Viendo R34",
		anime: "Viendo anime",
		dnd: "No molestar",
		dnds: "No molestar 7w7",
		sen: "7w7"
	},
	debug: false
};
//Config ChatTags
var chatags = { images: true, videos: true };
//Config Emoticons
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emoticonos",
        close: "Cerrar"
    },
    help: "Haz clic en un emote."
};

// Implementación de chat 3.2 -- by Sakuzyo and HumanoidPikachu
$('.ChatWindow').after('<div class="dialog-initChat">Iniciando Chat...</div>');
$('.ChatHeader').css('filter', 'blur(14px)'); // HEADER
$('#WikiaPage').css('filter', 'blur(14px)'); // BODY CHAT
var retinit = setInterval(function () {
    var ret = $('.WikiChatList li.User:not(.ui-sortable-placeholder)').length;
    if (ret !== 0) {
        $('.ChatHeader').css('filter', 'blur(0px)'); // HEADER
        $('#WikiaPage').css('filter', 'blur(0px)'); // BODY CHAT
            $('.dialog-initChat').hide();
            clearInterval(retinit);
        } else {
            console.log('Esperando respuesta...');
    }
}, 500);



//Importes --NOTA: Los importes de JavaScript SI O SI tienen que estar al final--
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatOptions/es/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
} );