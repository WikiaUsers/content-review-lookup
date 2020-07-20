/*
 * @name:           Banners
 * @description:    Allows for the creation of custom banners
 * @author:         Count of Howard <dev.wikia.com/wiki/User:Count_of_Howard>
 */
 
/*
 * This page is retained for historical documentation purposes. Do not submit
 * for review. FANDOM Staff, if this has been submitted, please reject.
 */

(function() {
    var mwVariables = mw.config.get([
        'wgServer',
        'wgScript',
        'wgUserName',
        'wgUserGroups',
        'wgNamespaceNumber'
    ]),
    cookieUN = mw.util.wikiUrlencode(mwVariables.wgUserName),
    cookieSN = mwVariables.wgServer.substr(7, mwVariables.wgServer.length-17);

    if (
        $('.banner-notification').length ||
        $.cookie(cookieUN + '-' + cookieSN + '-bannerDismiss') === cookieUN + '-' + cookieSN + '-bn-dismissed'
    ) {
        return;
    }

    //User-input values for namespaces, usergroups, location, and cookie expiration
    var namespaces = window.BNnamespaces || [0, 4, 8, 10, 14],
        usergroups = window.BNusergroups || ['user'],
        contentPage = window.BNcontentPage || 'Template:BannerNotification',
        cookieExpiration = window.BNcookieExpiration || 3;

    function init() {
        if(
            $.inArray(mwVariables.wgNamespaceNumber, namespaces) !== -1 &&
            new RegExp(usergroups.join('|')).test(mwVariables.wgUserGroups.join(' '))
        ) {
            getContent();
        }
    }

    function getContent() {
        var parameters = {
            action: 'render',
            title: contentPage
        };

        $.get(
            mwVariables.wgScript,
            parameters,
            function(data) {
                //Strip pesky comments and new lines when there's no content
                data = data.replace(/<!--[\s\S]*?-->/g, "").replace(/[\n]/g, "");
                if (!data.length) {
                    return;
                } else {
                    displayContent(data);
                }
            }
        );
    }

    function displayContent(data) {
        new BannerNotification('<span id="custom-banner-content">' + data + '</span>').show();

        $('div.banner-notification:first')
            .attr(
                'id', 'custom-banner'
            );

        $('#custom-banner .close').click(function() {
            $.cookie(
                cookieUN + '-' + cookieSN + '-bannerDismiss',
                cookieUN + '-' + cookieSN + '-bn-dismissed',
                { 
                    path: '/', 
                    expires: cookieExpiration,
                    domain: '.wikia.com'
                }
            );
        });
    }

    init();
}());