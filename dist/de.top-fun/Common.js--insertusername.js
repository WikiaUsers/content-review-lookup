/*   Username replace feature
 *
 *   Inserts viewing user's name into <span class="UserName"></span>
 *   Put text inside the spans to be viewed by logged out users
 *   Originally by [[wikia:User:Splarka|Splarka]]
 *   Updates:
 *   2012-11-15 [[wikia:User:PerryH|Perry]] added mw api query for userinfo
 */
var $global = window; /* we define a global object $global.userInfo to avoid multiple api queries */

$('span.UserName').html(function () {
    function doReplace(innerHTML) {
        $(element).html(innerHTML);
        if (debug) console.log(this, ': replaced innerHTML with', innerHTML);
    };

    function replaceFailsafe(userInfo) {
        if (!userInfo || (userInfo == "")) $global.userInfo = userInfo = mw.config.get('wgUserName');
        if (userInfo) doReplace(userInfo)
        else console.log(this, ': no user info found.', userInfo) /* should never happen */
    };
    var element = this;
    if ($global.userInfo) replaceFailsafe($global.userInfo) /* sync */
    else {
        $.getJSON('/api.php', {
            action: 'query',
            meta: 'userinfo',
            uiprop: 'options',
            format: 'json'
        }, function (data) {
            if (data.query.userinfo.options.name) $global.userInfo = data.query.userinfo.options.name
            else $global.userInfo = data.query.userinfo.name;
            if (debug) console.log('%s found, %s returns', element.outerHTML, this.url, data);
            replaceFailsafe($global.userInfo); /* async */
        });
    }
});