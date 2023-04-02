/*Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */


window.BackToTopModern = true;

var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
/*превью предметов*/
window.tooltips_list = [
    {
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Снаряжение}}'
},
{
    classname: 'tooltip-spec',
}
];


/*Детектив Искажения перемещение/WonderLab персонажи (Lucifer wiki) */
jQuery(document).ready(function($) {
    $(".lobotomy-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});


jQuery(document).ready(function($) {
    $(".lobotomy-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});

/* Дайте, пожалуйста, причину */

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discord.com/api/guilds/480414333520707594/widget.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '</td>' +
                        '<h2><div style="padding-left: 25px; text-align: left;">Наш Discord</div></h2>' +
                    '</td>' +
                '<tr>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Открыть в <a href="https://discordapp.com/channels/343465056190857216/448478541051592704" target="_blank">браузере</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/lobotomycorp/images/7/7f/DiscordAva.png/revision/latest?cb=20190604051420&format=original&path-prefix=ru" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
})();


/* Красивые табберы*/
function getpar(object)
{
	var par = $(object)[0].parentNode;
	var el = par;
	while (el.parentNode) {
    	if (el.classList.contains("tab") || el.classList.contains("mw-parser-output")) {
    		return el;
    	}
    	el = el.parentNode;
	}
	return null;
}
mw.loader.using('mediawiki.util').then(function() {
var IndexClick = 0;
function zselector( $content ) {
    $(function () {
        $('[class|="cc"]').click(function () {
            var cn = $(this).attr('class');
			IndexClick = IndexClick+1;
            if (typeof cn !== 'undefined' && IndexClick%2 == 0) {
                ZContent(cn, '0', $(this));
            }
        });
        $('[class|="hh"]').mouseenter(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '1', $(this));
            }
        });
        $('[class|="hh"]').mouseleave(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '2', $(this));
            }
        });
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).css('display') == 'none') {
                $(this).css('opacity', 0);
            }
        });
    });
    function ZContent(classValue, effect, object) {
        if (classValue.split) {
            var ID = '';
            var par = getpar(object);
            var flagElem = false;
            var elemClasses = classValue.split(' ');
            for (var j = 0; j < elemClasses.length; j++) {
            	flagElem = flagElem || elemClasses[j] == 'sy';
            }
            for (var i = elemClasses.length-1; i >= 0; i--) {
                var elemClass = elemClasses[i];
                if (elemClass.substring(0, 3) == 'hh-' || elemClass.substring(0, 3) == 'cc-') {
                	ID = elemClass.substring(3);
                    if (effect == '0') {
                        ZEffect(ID,par);
                        SelectElem('cc', ID, par);
                    } else if (effect == '1') {
                        ZEffect(ID,par);
                        SelectElem('hh', ID, par);
                    } else if (effect == '2') {
                        ZEffect(ActiveID,par);
                        SelectElem('hh', ID, par);
                    }
                }
            }
            if(flagElem)
            {
                ZEffect("Default",par);
                SelectElem('cc', "Default", par);
            }
        }
    }
    function ZEffect(ID,par) {
        $('[class|="zz"]').each(function (i, elem) {
        	var par1=  getpar(this);
        	if(par1 == par)
        	{
            if ($(this).hasClass('zz-' + ID)) {
                $(this).css('display', 'block');
                $(window).trigger('scroll');
                $(this).stop();
                $(this).animate({
                    opacity: 1,
                    queue: false
                }, 10);
            } else {
                $(this).css('display', 'none');
                $(this).stop();
                $(this).animate({
                    opacity: 0,
                    queue: false
                }, 0);
            }
        	}
        });
    }
    function SelectElem(type, ID, par) {
        $('[class|="cc"],[class|="hh"]').each(function (i, elem) {
        	var par1= getpar(this);
        	if(par1 == par)
        	{
            	if ($(this).hasClass(type + '-' + ID)) {
            	    $(this).removeClass('sn');
        	    	$(this).addClass('sy');
        		} else {
                	$(this).removeClass('sy');
                	$(this).addClass('sn');
            	}
        	}
        });
    }
}
    
    mw.hook( 'wikipage.content' ).add( zselector );
    zselector( mw.util.$content );
});

/* Таблица Идентичностей Лимбуса*/
function Filt(arr, clas){
	All = [];
	o = '.'+clas;
	arr.forEach(function(Mini){al = Mini.querySelectorAll(o); if(al.length > 0 || Mini.classList.contains(clas)) All.push(Mini); });
	
	return All;
}
function Filter(Allmini, Sin){
	if (Sin == '')
		return Allmini;
	Allmininext = [];
	Sins = [];
	rar = document.querySelectorAll('.IdTable .'+Sin+' .IdTBl.IdTBl1 i');
	rar.forEach(function(Ra){Sins.push(Ra.textContent);});
	
	if(Sins.length > 0){
		Sins.forEach(function(Ra){Allmininext = Allmininext.concat(Filt(Allmini,Sin+Ra));});
		return Array.from(new Set(Allmininext));
	}
	return Allmini;
}
function UpdateTable() {
	Allmini = document.querySelectorAll(".IdTable .IdTIc");
	//Hide all
	Allmini.forEach(function(Mini){Mini.style.display = "none";});
	Allmininext = [];
	AllRows = document.querySelectorAll(".IdTable .IdTRow");
	AllRows.forEach(function(Mini){Allmini = Filter(Allmini, (Mini.classList.length >= 2 ? (Mini.classList.value.split(' ')).at(-1) : '')) });
	
	Allmini.forEach(function(Mini){Mini.style.display = "inline-block";});
}

document.querySelectorAll(".IdTBl").forEach( 
	function(button){
	button.addEventListener(
		'click',
		function (){ 
			if(this.classList.contains("IdTCross"))
				document.querySelectorAll(".IdTBl").forEach(function(button){button.classList.remove("IdTBl1");});
			else
				this.classList.toggle("IdTBl1");
			UpdateTable();
	}, false
);});