/*
 * AvatarLink
 * Makes it where clicking your avatar goes to your userpage
 * @Author Mario&LuigiBowser'sInsideStory
 * @Author Sophiedp (rewrite)
*/

$('.wds-global-navigation .wds-global-navigation__user-menu .wds-avatar__image').click(function () {
    window.location.href = mw.util.getUrl('Special:MyPage');
}).css('cursor', 'pointer');