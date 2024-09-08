/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
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