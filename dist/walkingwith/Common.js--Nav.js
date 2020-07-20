/* Any JavaScript here will be loaded for all users on every page load. */
var modnav = '';
modnav += '<li id="rules" class="subnav-2-item">';
modnav += '<a class="subnav-2a" href="/wiki/Walking With Wikis:Rules and Policies">Rules<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></a>';
modnav += '<ul class="subnav-3 subnav" style="top: 28px; display: none;">';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Walking With Wikis:Rules and Policies">Rules and Policies</a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Walking With Wikis:Rules and Policies/Manual of Style">Manual of Style</a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Walking With Wikis:Rules and Policies/Uploading Policy ">Uploading Policy </a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Walking With Wikis:Canon and Fanon ">Canon and Fanon </a></li>';
modnav += '<li class="subnav-3-item"><a class="subnav-3a" href="/wiki/Walking With Wikis:Administrators">List of Administrators</a></li>';
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