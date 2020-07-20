/* Start Custom Chat Stars */

$('#ChatHeader .User').attr('data-user', wgUserName.replace(' ', '_').replace(/["']/g, ''));
var userBadges = function() {
        'use strict';
        $('.User').each(function() {
            $(this).removeClass('chatmoderator');
            if ($(this).attr('data-user').match(/(Farm River|Hypercane|MasterGarf|Money Hurricane|StrawberryMaster)/)) {
                $(this).addClass('bureaucrat');
            }
            if ($(this).attr('data-user').match(/(Cooper7579|Roy25)/)) {
                 $(this).addClass('admin');
            }
            if ($(this).attr('data-user').match(/(KingLucarius|WeatherWill)/)) {
                $(this).addClass('junioradmin');
            }
            if ($(this).attr('data-user').match(/(GiedriusforCat5|Sandy156)/)) {
                $(this).addClass('rollback');
            }
            if ($(this).attr('data-user').match(/(CycloneMC|HurricaneLucas4064)/)) {
                $(this).addClass('moderator');
            }
            if ($(this).attr('data-user').match(/(GloriouslyBlonde|Ssspp1)/)) {
                $(this).addClass('autopatrol');
            }
            if ($(this).attr('data-user').match(/Monsoonjr99/)) {
                $(this).addClass('codeeditor');
            }
            if ($(this).attr('data-user').match(/(Baron Kobe|ChapDurianBot|Hypercane Bot|Money Bot|PassionFruitMaster)/)) {
                $(this).addClass('bot');
            }
            if ($(this).attr('data-user').match(/Sjmaven1993/)) {
                $(this).addClass('founder');
            }             
        });
    },
    wikiList = $('#PrivateChatList')[0],
    privateList = $('#WikiChatList')[0],
    userBadgesMO = new MutationObserver(userBadges);
window.onload = userBadges();
userBadgesMO.observe(wikiList, {childList: true});
userBadgesMO.observe(privateList, {childList: true});

/* End Custom Chat Stars */