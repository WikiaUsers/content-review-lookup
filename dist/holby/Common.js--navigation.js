//************************************************
// Wiki Nav Mod - By User:Manic The Hedgehog
//************************************************
var modnav = '';
modnav += '<li id="rules" class="subnav-2-item">';
modnav += '<a class="subnav-2a" href="/wiki/Help:Project_Holby">project holby<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></a>';
modnav += '<ul class="subnav-3 subnav" style="top: 28px; display: none;">';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="http://holbycity.wikia.com/wiki/Holby_City_Wiki">Holby City Wiki</a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a"></a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Special:Forum">Casualty Wiki Forum</a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="http://holbycity.wikia.com/wiki/Special:Forum ">Holby City Wiki Forum </a></li>';
modnav += '</ul>';
modnav += '</li>';
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').append(modnav);
	$('#rules').mouseover(function () {
            var $this = $(this);
            $this.addClass('marked2').find('.subnav-3').css('display', 'block');
        }).mouseout(function () {
            $(this).removeClass('marked2').find('.subnav-3').css('display', 'none');
        });
    }
});