/*
 * AvatarLink
 * Makes it where clicking your avatar goes to your userpage
 * @Author Mario&LuigiBowser'sInsideStory
 * @Author Sophiedp (rewrite)
*/

mw.loader.using('mediawiki.util').then(function () {
    $('.global-navigation__icon .wds-avatar__image').click(function () {
        location.href = mw.util.getUrl('Special:MyPage');
    }).css('cursor', 'pointer');
});