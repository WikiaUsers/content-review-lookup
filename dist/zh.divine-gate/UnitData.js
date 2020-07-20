/**

使用方法：

    <script src="/load.php?mode=articles&only=scripts&articles=MediaWiki:UnitData.js"></script>

    ...

    loadData([['Unit'], ['Skill', 'zh-hant']], function onFinish() {
        var unitInfo = $.Unit;
        var skillInfo = $.Skill;
        ...
    });

*/

function loadData(thingsToLoad, callback) {
    var countDown = thingsToLoad.length;
    var defaultLanguage = mw.user.options.get('variant');
    var onComplete = function (data, stat, xhr) {
        -- countDown;
        $[xhr.thing] = $.secureEvalJSON(data.firstChild.textContent);
        if (countDown == 0) {
            callback();
        }
    };

    for (var i = thingsToLoad.length-1; i >= 0; -- i) {
        var thingPair = thingsToLoad[i];
        var thing = thingPair[0];
        var language = thingPair[1] || defaultLanguage;
        if ($[thing]) {
            -- countDown;
        } else {
            $[thing] = true;
            var pageName = '/index.php?action=render&title=MediaWiki:' + thing + 'JSInfo&variant=' + language;
            var xhr = $.ajax(pageName, {
                success: onComplete,
                dataType: 'xml',
            });
            xhr.thing = thing;
        }
    }

    if (countDown == 0) {
        callback();
    }
}