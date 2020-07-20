// KONFIGURACJA AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
 
// LICZNIK by Nanaki
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime())/1000);
    if(amount < 0) return false;
 
    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);
 
    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    list.push('<span span="seconds">' + secs + ' s</span>');
 
    return list.join(' ');
}

function countBoxTick(box) {
    console.log(this);
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box);
        }, 1000);
    } else {
        box.html('Oczekuj!');
    }
}

$('.countbox').each(function() {
    if($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if(!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data');
        }
    }
});

//IKONY NA GÓRZE STRONY
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
    if( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
        $( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
    );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#icons' ) );
        $( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/a/a8/CudzyslowIconWhite.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/6/62/PpauzaIconWhite.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/7/70/ApostrofIconWhite.svg",
        "speedTip": "Wstaw polski apostrof",
        "tagOpen": "’",
        "tagClose": "",
        "sampleText": ""
    };
}
 
// SPIS TREŚCI W MODULE ŁADNIE by Luqgreg <3
$(function() {
    var $toc = $( '#toc' ), $rail = $( '#WikiaRail' );
    
	function createRailTOC() {
		if ( $toc.find( 'li' ).length === 0 || !$rail.hasClass( 'loaded' ) ) {
			setTimeout( createRailTOC, 200 );
			return;
		}
		$toc = $toc.clone().attr( 'id', 'railtoc' ).appendTo( $rail ).addClass( 'rail-module show' );
		$toc.find( '.toctoggle' ).remove();
		
		var $othersticky = $( '.rail-sticky-module' );
		if ( $othersticky.length ) {
			var offset = $othersticky.outerHeight() + 65, margin = $toc.outerHeight() + 20;
			$toc.css( { 'top': offset + 'px', 'margin-top': '-' + margin + 'px' } );
			$othersticky.css( 'margin-bottom', margin + 'px' );
		}
	}
	if ( $toc.length ) {
		createRailTOC();
    }
});