/**
 * @fileOverview This file defines Railgun modules, it is a package of
 * additional modules which can be displayed on the Wikia Rail. This file
 * is automatically loaded by the Railgun client.
 * 
 * Railgun Wiki:   http://railgunscript.wikia.com/wiki/Railgun_Wiki
 * Contact Author: http://community.wikia.com/wiki/Message_Wall:Mathmagician
 * 
 * @author © Jeff Bradford, 2012
 * @version 2.2.1
 */
console.log("[Railgun]: Loading modules package:", Railgun.Config.modulesJS);

//-------------------------------------------------------------------------------------Friend's List
(function (ns) {
    /**
     * (storage key) An array of objects representing all of the user's friends,
     * initialized in the init() method and kept sorted by username in the
     * addFriend() method. Each element of the array is an object of the form:
     * <code>{ username: "Bob", avatarURL: "http://...somepic.png",
     * homewiki: "http://community.wikia.com" }</code>
     * @type Array
     */
    var friends = [];

    /**
     * The maximum number of friends someone is allowed to have.
     * @type Number
     * @constant
     */
    var limit = 20;

    /**
     * HTML code for the message which is displayed to the user when the Friend's List is empty.
     * @type String
     * @constant
     */
    var noFriendsMessage = '<p id="railgun-no-friends-message">'
            + 'It looks like you haven\'t made any friends yet. '
            + 'To add someone to your friend\'s list, first visit their profile. '
            + 'An icon will appear in the upper-right corner of this module, '
            + 'click it to add them to your list. You can remove friends '
            + 'the same way.';

    /**
     * Creates a table row element for a single friend to be added to the Friend's List.
     * @param {String} username name of a Wikia user, such as "Mathmagician"
     * @returns {String} a table row HTML element with the railgun-friend-tr CSS class.
     */
    function createFriendHTML(username, avatarURL) {
        var encoded = encodeURIComponent(username.replace(/ /g, '_'));

        var imagelink = '<a href="/wiki/User:' + encoded + '">';
        var image = '<img src="' + avatarURL + '" class="railgun-friend-avatar">';
        var tr = '<tr class="railgun-friend-tr" data-user="' + username + '">';
        var td1 = '<td class="railgun-friend-td1">';
        var td2 = '<td class="railgun-friend-td2">';
        var td2span1 = '<span class="railgun-friend-td2-span1">';
        var profile = '<a href="/wiki/User:' + encoded + '">' + username + '</a>';
        var td2span2 = '<span class="railgun-friend-td2-span2">';
        var talk = '[<a href="/wiki/User_talk:' + encoded + '">talk</a>]';
        var blog = ' [<a href="/wiki/User_blog:' + encoded + '">blog</a>]';
        var contrib = ' [<a href="/wiki/Special:Contributions/' + encoded + '">contrib</a>]';
        var count = ' [<a href="/wiki/Special:Editcount/' + encoded + '">count</a>]';
        var log = ' [<a href="/wiki/Special:Log/' + encoded + '">log</a>]';
        var sub = ' [<a href="/wiki/Special:PrefixIndex/User:' + encoded + '">sub</a>]';

        var html = tr + td1 + imagelink + image + '</a></td>' + td2 + td2span1 + profile
                + '</span><br />' + td2span2 + talk + blog + contrib + count + log + sub
                + '</span></td></tr>';
        return html;
    };

    /**
     * Adds a single friend to the Friend's List upon clicking the add friend button and
     * issues a request to save the updated friends array to localStorage.
     * This method sorts friends alphabetically by username and does not permit duplicates.
     * @event
     */
    function addFriend(event) {
        var username = event.data.username;
        var avatarURL = event.data.avatarURL;
        var homewiki = event.data.homewiki;
        
        if (friends.length === limit) {
            return;
        }

        // remove this friend (don't allow duplicates)
        var index = -1;
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].username === username) {
                index = i;
                break;
            }
        }
        if (-1 !== index) {
            friends.splice(index, 1);
        }
 
        // add friend object to friends array
        friends.push({
            username : username,
            avatarURL : avatarURL,
            homewiki : homewiki
        });
 
        // sort friends array
        friends.sort(function (a, b) {
            if (a.username < b.username)
                return -1;
            else if (a.username == b.username)
                return 0;
            else
                return 1;
        });

        // save friends in localStorage
        Railgun.setItem("friends", friends);
        
        // attach event handler
        var friendTR = $(createFriendHTML(username, avatarURL));
        friendTR.hover(function () {
            $(this).find('.railgun-friend-td2-span2').css('visibility', 'visible');
        }, function () {
            $(this).find('.railgun-friend-td2-span2').css('visibility', 'hidden');
        });

        // remove no friends message
        $('#railgun-no-friends-message').remove();

        // add new friend into the document
        $('.railgun-friend-tr[data-user="' + username + '"]').remove();
        var friendsListed = $('.railgun-friend-tr');
        if (0 === friendsListed.length) {
            $('#railgun-friend-table').append(friendTR);
        } else if (username < friendsListed.first().attr('data-user')) {
            $('#railgun-friend-table').prepend(friendTR);
        } else if (username > friendsListed.last().attr('data-user')) {
            $('#railgun-friend-table').append(friendTR);
        } else {
            for (var i = 0; i < friendsListed.length; i++) {
                if (username < $(friendsListed[i]).attr('data-user')) {
                    $(friendsListed[i]).before(friendTR);
                    break;
                }
            }
        }

        // replace add friend icon with remove friend icon
        $('#railgun-add-friend-icon').css('display', 'none');
        $('#railgun-remove-friend-icon').css('display', 'inline');
    };

    /**
     * Removes a single friend from the Friend's List upon clicking the remove
     * friend button and issues a request to save the updated <code>friends</code>
     * array in localStorage.
     * @event
     */
    function removeFriend(event) {
        var username = event.data.username || "";
        
        // remove friend from friends array
        var index = -1;
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].username === username) {
                index = i;
                break;
            }
        }
        if (-1 !== index) {
            friends.splice(index, 1);
        }

        // save friends in localStorage
        Railgun.setItem("friends", friends);

        // remove friend from the document
        $('.railgun-friend-tr[data-user="' + username + '"]').remove();
        var friendsListed = $('.railgun-friend-tr');
        if (0 === $('.railgun-friend-tr').length) {
            $('#railgun-friend-table').append(noFriendsMessage);
        }

        // replace remove friend icon with add friend icon
        $('#railgun-remove-friend-icon').css('display', 'none');
        $('#railgun-add-friend-icon').css('display', 'inline');
    };

    /**
     * Initialization method for the Friend's List module.
     */
    function init_friendslist() {
        // initialize friends property
        friends = Railgun.getItem("friends") || [];
        
        // determine if this is a userpage
        var masthead = $('#UserProfileMasthead');
        var isUserpage = (0 < masthead.length);
        var username = "";
        var avatarURL = "";
        var isFriend = false;
        if (isUserpage) {
            username = masthead.find('.masthead-info h1').text();
            avatarURL = masthead.find('.masthead-avatar img').attr('src');
        }

        // build HTML base
        var table = '<table id="railgun-friend-table">';
        var rows = '';
        if (0 === friends.length) {
            rows = noFriendsMessage;
        } else {
            for (var i = 0; i < friends.length; i++) {
                if (username === friends[i].username) {
                    isFriend = true;
                }
                rows += createFriendHTML(friends[i].username, friends[i].avatarURL);
            }
        }
        var addFriendIcon = '<img id="railgun-add-friend-icon" title="Add ' + username + ' to friend\'s list?" '
        + 'src="https://images.wikia.nocookie.net/__cb20120418234625/mathmagician/images/0/00/Bomb_Omb_30px.png"';
        var removeFriendIcon = '<img id="railgun-remove-friend-icon" title="Click to remove ' + username + '." '
        + 'src="https://images.wikia.nocookie.net/__cb20120418234525/mathmagician/images/7/79/Star_30px.png"';
        if (isFriend) {
            addFriendIcon += ' style="display:none;">';
            removeFriendIcon += '>';
        } else {
            addFriendIcon += '>';
            removeFriendIcon += ' style="display:none;">';
        }
        var html = table + rows + '</table>';
        if (isUserpage) {
            html = addFriendIcon + removeFriendIcon + html;
        }

        // insert module into the siderail
        Railgun.insert('railgun-friend-module', html, 'Friend\'s List');

        // attach event handlers
        $('.railgun-friend-tr').hover(function () {
            $(this).find('.railgun-friend-td2-span2').css('visibility', 'visible');
        }, function () {
            $(this).find('.railgun-friend-td2-span2').css('visibility', 'hidden');
        });
        if (isUserpage) {
            $('#railgun-add-friend-icon')
            .on('click', { username: username, avatarURL: avatarURL, homewiki: wgServer }, addFriend);
            $('#railgun-remove-friend-icon')
            .on('click', { username: username }, removeFriend);
        }
    };

    // Register this module
    Railgun.register("railgun-friend-module", "Friend\'s List", init_friendslist);
}());

//---------------------------------------------------------------------------------------Quicksearch
(function () {
    /**
     * Whether or not to open search results in a new window.
     */
    var quicksearchUseNewWindow = true;

    /**
     * Returns the text currently selected in the browser window (trimmed).
     * @returns {String} text currently highlighted
     */
    function getSelectedText() {
        var txt = '';
        if ("function" == typeof window.getSelection) {
            txt = window.getSelection().toString();
        } else if ("function" == typeof document.getSelection) {
            txt = document.getSelection().toString();
        } else if ("object" == typeof document.selection
                && "function" == typeof document.selection.createRange) {
            txt = document.selection.createRange().text
        }
        return txt.trim();
    }

    /**
     * Creates the HTML for a search button.
     * @param {String} id the id of the button
     * @param {String} cssClass the class of the button
     * @param {String} text the text of the button
     * @returns html for a button
     */
    function createButton(id, text) {
        return '<button id="' + id + '" class="railgun-quicksearch-button">' + text + '</button>';
    }

    /**
     * Attaches the proper event handler to a button with given id.
     * @param {String} id the id of the button
     * @param {String} strPrompt what to prompt the user
     * @param {String} url the url of the website to search
     */
    function attachHandler(id, strPrompt, url) {
        $('#' + id).click(function () {
            var query = prompt(strPrompt, getSelectedText());
            if ("string" == typeof query) {
                query = encodeURIComponent(query);
                if (quicksearchUseNewWindow) {
                    window.open(url + query);
                } else {
                    window.location.href = url + query;
                }
            }
        });
    }

    /**
     * Initializes the Quicksearch module.
     */
    function init_quicksearch() {
        // build html base
        var message = '<p>Highlight some text anywhere on the page and then click one'
                + ' of the search buttons!</p>';
        var table = '<table id="railgun-quicksearch-table">';

        var localwiki = createButton('railgun-quicksearch-localwiki', 'Local Wiki');
        var globalwikia = createButton('railgun-quicksearch-globalwikia', 'Global Wikia');
        var wikipedia = createButton('railgun-quicksearch-wikipedia', 'Wikipedia');
        var mediawiki = createButton('railgun-quicksearch-mediawiki', 'Mediawiki');
        var google = createButton('railgun-quicksearch-google', 'Google');
        var googleimages = createButton('railgun-quicksearch-googleimages', 'Google Images');
        var translate = createButton('railgun-quicksearch-translate', 'Translate');
        var youtube = createButton('railgun-quicksearch-youtube', 'Youtube');
        var dictionary = createButton('railgun-quicksearch-dictionary', 'Dictionary');
        var amazon = createButton('railgun-quicksearch-amazon', 'Amazon');
        var w3schools = createButton('railgun-quicksearch-w3schools', 'w3schools');
        var csstricks = createButton('railgun-quicksearch-csstricks', 'CSS Tricks');

        var html = message + table + '<tr><td>' + localwiki + '</td><td>' + globalwikia + '</td></tr>'
                + '<tr><td>' + wikipedia + '</td><td>' + mediawiki + '</td></tr>'
                + '<tr><td>' + google + '</td><td>' + googleimages + '</td></tr>'
                + '<tr><td>' + translate + '</td><td>' + youtube + '</td></tr>'
                + '<tr><td>' + dictionary + '</td><td>' + amazon + '</td></tr>'
                + '<tr><td>' + w3schools + '</td><td>' + csstricks + '</td></tr></table>';

        // insert module into the siderail
        Railgun.insert('railgun-quicksearch-module', html, 'Quick² Search');

        // attach event handlers
        attachHandler('railgun-quicksearch-localwiki', 'Search ' + wgSiteName,
                wgServer + '/wiki/index.php?go=Go&search=');
        attachHandler('railgun-quicksearch-globalwikia', 'Perform a global Wikia search',
                'http://www.wikia.com/index.php?fulltext=Search&search=');
        attachHandler('railgun-quicksearch-wikipedia', 'Search Wikipedia, The Free Encyclopedia',
                'http://en.wikipedia.org/wiki/index.php?search=');
        attachHandler('railgun-quicksearch-mediawiki', 'Search Mediawiki.org',
                'http://www.mediawiki.org/w/index.php?search=');
        attachHandler('railgun-quicksearch-google', 'Search Google',
                'https://www.google.com/#hl=en&q=');
        attachHandler('railgun-quicksearch-googleimages', 'Search Google Images',
                'https://www.google.com/search?hl=en&tbm=isch&q=');
        attachHandler('railgun-quicksearch-translate', 'Translate a word using Google Translator',
                'http://translate.google.com/#auto|en|');
        attachHandler('railgun-quicksearch-youtube', 'Search for a Youtube video',
                'http://www.youtube.com/results?search_query=');
        attachHandler('railgun-quicksearch-dictionary', 'Look up a word on Dictionary.com',
                'http://dictionary.reference.com/browse/');
        attachHandler('railgun-quicksearch-amazon', 'Search for a product on Amazon.com',
                'http://www.amazon.com/s/field-keywords=');
        attachHandler('railgun-quicksearch-w3schools', 'Look up HTML/CSS/JavaScript '
                + 'specifications at w3schools.com',
                'https://www.google.com/search?sitesearch=www.w3schools.com&as_q=');
        attachHandler('railgun-quicksearch-csstricks',
                'Pick up some new CSS tricks from css-tricks.com',
                'http://css-tricks.com/search-results/?q=');
    }

    // register the quicksearch module with Railgun
    Railgun.register('railgun-quicksearch-module', 'Quick² Search', init_quicksearch);
}());