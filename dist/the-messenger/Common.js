/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto update */
window.ajaxPages = [
    "Special:Watchlist",
    "Special:Contributions",
    "Special:WikiActivity",
    "Special:RecentChanges"
]; // pages
window.AjaxRCRefreshText = 'auto update'; // the name

/* Avatars script */
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }

    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';

        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width': width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);

/* Barma'thazel's page Picnic Panic (for styles see MediaWiki:Common.css) */
if (window.location.href.indexOf("Picnic_Panic_Boss") > -1) {
    $('#barmausual').removeClass('sy');
    $('#barmausual').addClass('sn');
    $('#barmapicnicpanic').addClass('sy');
    $('.zz-1').css('display', 'none');
    $('.zz-2').css('display', 'inherit');
}

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if ($('#barmapicnicpanic').hasClass('sy')) {
            window.location.hash = 'Picnic_Panic_Boss';
        } else if (!$('#barmapicnicpanic').hasClass('sy')) {
            history.pushState("Picnic_Panic_Boss", document.title, window.location.pathname +
                window.location.search);
        }
        if (window.location.href.indexOf("Picnic_Panic_Boss") > -1) {
            $('a').addClass('a-barma');
            $('body').addClass('body-barma');
            $('.WikiaPageBackground').addClass('WikiaPageBackground-barma');
            $('h2').addClass('h2-barma');
            $('.wds-community-header').addClass('wds-community-header-barma');
            $('.wds-button').addClass('wds-button-barma');
            $('.wds-button-group').addClass('wds-button-barma-second');
            $('.wds-community-header__wordmark').addClass('wds-community-header__wordmark-barma');
            $('.WikiaBarWrapper').addClass('WikiaBarWrapper-barma');
        } else if (window.location.href.indexOf("Picnic Panic Boss") == -1) {
            $('a').removeClass('a-barma');
            $('body').removeClass('body-barma');
            $('.WikiaPageBackground').removeClass('WikiaPageBackground-barma');
            $('h2').removeClass('h2-barma');
            $('.wds-community-header').removeClass('wds-community-header-barma');
            $('.wds-button').removeClass('wds-button-barma');
            $('.wds-button-group').removeClass('wds-button-barma-second');
            $('.wds-community-header__wordmark').removeClass('wds-community-header__wordmark-barma');
            $('.WikiaBarWrapper').removeClass('WikiaBarWrapper-barma');
        }

    });
});

if($('.barmaselected')[0])
mutationObserver.observe(document.querySelector('.barmaselected'), {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
});

/* Mainpage links blocks (simplified) (for styles see MediaWiki:Common.css) */
$('#linkbox-sabotage').click(function(){
	window.location.replace("https://themessengergame.com/");	
});
 
$('#linkbox-timeshard').css({
    'width': ($('#linkbox-sabotage').width() + 'px')
  });
 
$('#linkbox-timeshard').css({
    'height': ($('#linkbox-sabotage').height() + 'px')
  });
 
$('#linkbox-timeshard').click(function(){
	window.location.replace("https://store.steampowered.com/app/764790/The_Messenger/");	
});

/* Quarble NG+ calculator (for styles see MediaWiki:Common.css) */
$('#textboxinput').html('<input type="number" id="textboxname" min="1" max="999" placeholder="Enter a NG+ cycle" />');

function calculate(){
	var parseCheck = Number($('#textboxname').val());
	var calculatedResult = 5 + (parseCheck - 1) * 3;
	var reviveCost;
	var damage;
	if($('#textboxname').val() === '' || parseCheck === 0 || parseCheck > 999 || parseCheck < 0 || !Number.isInteger(parseCheck)){
		$('#artificerbutton').text('Invalid number, try again.');
	}
	else{
		if(parseCheck === 1)
			reviveCost = 50;
		else if(parseCheck < 10)
			reviveCost = parseCheck * 200;
		else if(parseCheck < 20)
			reviveCost = parseCheck * 400;
		else if(parseCheck === 20)
			reviveCost = 8000;
		else if(parseCheck > 20)
			reviveCost = 8000 + (parseCheck - 20) * 100;
		if(parseCheck < 16)
			damage = '+' + parseCheck + '.';
		else
			damage = 'everything will kill you in one hit!';
			$('#artificerbutton').html('NG+' + parseCheck + '<br />All incoming damage increased: ' + damage + '<br />Boss hit points increased: +' + calculatedResult + '.<br />Revive cost: ' + reviveCost + ' Time Shards.');
    }
}
 
$('#buttoncalculate').click(function(){
	calculate();
});

document.addEventListener("keypress", function onKeyPress(evt){
		evt = (evt) ? evt : (window.event) ? event : null;
		if (evt) {
		 var charCode = (evt.charCode) ? evt.charCode :((evt.keyCode) ? evt.keyCode :((evt.which) ? evt.which : 0));
		if (charCode === 13 && $('#textboxname').is(":focus")) 
			calculate();
			
}
});