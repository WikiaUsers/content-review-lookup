//PageCreator - Count of Howard
//9-12-16 - Initial revision
//12-12-16 - User inputted namespaces accepted
//22-12-16 - Removed Help namespace in favor of Project/Sitename
//23-12-16 - Local/UTC timezone options available

$(function() {
    //Cache mw variables
    const mwVariables = mw.config.get([
        'skin',
        'wgServer',
        'wgArticlePath',
        'wgPageName',
        'wgArticleId',
        'wgUserLanguage',
        'wgNamespaceNumber'
    ]);
 
    //Add your language here
    //Make sure to add the $1 and $2 variables in the string
    const i18n = {
        'en': 'Created by $1 on $2',
        'be': 'Створана удзельнікам $1 $2',
        'nl': 'Aangemaakt door $1 op $2',
        'pl': 'Utworzone przez $1 dnia $2',
        'pt': 'Criada por $1 em $2',
        'pt-br': 'Criada por $1 em $2',
        'sv': 'Skapad av $1 på $2',
        'es': 'Creado por $1 el $2',
        'ru': 'Создано участником $1 $2',
        'uk': 'Створено користувачем $1 $2',
        'zh': '由 $1 创建于 $2',
        'zh-hant': '由 $1 創建於 $2'
    };
 
    const lang = mw.config.get('wgUserLanguage');
    const textContent = i18n.hasOwnProperty(lang) ? i18n[lang] : i18n.en;
    var username, userid, creationDate, revisionURL, useavatar, time, formattedCreationDate, utc;
 
    //Api call parameters
    const parameters = {
        action: 'query',
        prop: 'revisions',
        titles: mwVariables.wgPageName,
        rvprop: 'ids|timestamp|user|userid',
        rvlimit: '1',
        rvdir: 'newer',
        format: 'json'
    };
 
    //Default script only for Main, Project, MediaWiki, Template, and Category namespaces
    var namespaces = [0, 4, 8, 10, 14];
 
    //Selecting namespaces
    if (typeof PCOptions !== 'undefined' && PCOptions !== null) {
        if (PCOptions.namespaces && PCOptions.namespaces.constructor == Array) {
            namespaces.length = 0;
            for (var ns in PCOptions.namespaces) {
                namespaces.push(PCOptions.namespaces[ns]);
            }
        }
    }
 
    //Assembling the API url
    var pararray = [];
    for (var i in parameters) {
        pararray.push(mw.util.wikiUrlencode(i) + '=' + mw.util.wikiUrlencode(parameters[i]));
    }
    pararray = '?' + pararray.join('&');
    var apiURL = mw.util.wikiScript('api') + pararray;
 
    //Making the call
    if( $.inArray(mwVariables.wgNamespaceNumber, namespaces) != -1) {
        $.get(apiURL, function(data) {
            username = data.query.pages[mwVariables.wgArticleId].revisions[0].user;
            userid = data.query.pages[mwVariables.wgArticleId].revisions[0].userid;
            creationDate = data.query.pages[mwVariables.wgArticleId].revisions[0].timestamp;
            revisionURL = wgPageName + '?oldid=' + data.query.pages[mwVariables.wgArticleId].revisions[0].revid;
        }).done(function(data) {
            //Checking for other instances of script
            if (document.contains(document.getElementById('page-creator'))) {
                document.getElementById('page-creator').remove();
            }
 
            var pageCreator = document.createElement('div');
            pageCreator.setAttribute('class', 'page-creator');
            pageCreator.setAttribute('id', 'page-creator');
 
            //Placement varies depending on skin employed
            if (mwVariables.skin == 'oasis' || mwVariables.skin == 'wikia') {
                if (document.contains(document.getElementById('lastEdited'))) {
                    $(pageCreator).insertBefore('.lastEdited');
                } else {
                    $(pageCreator).appendTo('#PageHeader .page-header__title');
                }
                mw.util.addCSS('#page-creator { line-height: normal; font-size: 12px; font-weight: normal; }');
            } else if (mwVariables.skin == 'monobook') {
                $(pageCreator).prependTo('#bodyContent');
            }
 
            //Handle user input for timezones and avatar preferences
            if (typeof PCOptions !== 'undefined' && PCOptions !== null && PCOptions.utc === true) {
                time = new Date(creationDate).toUTCString();
                formattedCreationDate = time.slice(0, 3) + ', ' + time.slice(4, 16) + ', ' + time.slice(17, 25) + ' (' + time.slice(26) + ')';
            } else {
                time = new Date(creationDate).toString();
                formattedCreationDate = time.slice(0, 3) + ', ' + time.slice(4, 15) + ', ' + time.slice(16, 24) + ' ' + time.slice(34);
            }

            if (typeof PCOptions !== 'undefined' && PCOptions !== null && PCOptions.avatar === false) {
                useavatar = PCOptions.avatar;
            } else {
                useavatar = true;
            }
 
            //Link HTML assembled
            var userNameLink = '<img id="pc-avatar"/><a href="/wiki/User:' + mw.util.wikiUrlencode(username) + '">' + username + '</a> (<a href="/wiki/User_talk:' 
                + username + '">talk</a> | <a href="/wiki/Special:Contributions/' + username + '">contribs</a>)';
            var creationDateLink = '<a href="/wiki/' + revisionURL + '">' + formattedCreationDate + '</a>';
 
            //Snippet modified from Slyst's LastEdited
            if (useavatar === true) {
                var XMLrequest = new XMLHttpRequest();
                XMLrequest.open('GET', '/api/v1/User/Details?ids=' + userid + '&size=15', true);
                XMLrequest.onload = function() {
                    if (XMLrequest.status == 200) {
                        var pcavatar = document.getElementById('pc-avatar');
                        pcavatar.setAttribute('src', JSON.parse(XMLrequest.responseText).items[0].avatar);
                        pcavatar.insertAdjacentHTML('afterEnd', '&nbsp;');
                    }
                };
                XMLrequest.send();
            }
 
            //Do the thing
            var pageCreatorContent = textContent.replace(/\$1/g, userNameLink).replace(/\$2/g, creationDateLink);
            $('.page-creator').html(pageCreatorContent);
        });
    } else {
        return;
    }
});