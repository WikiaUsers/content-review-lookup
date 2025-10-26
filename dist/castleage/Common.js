/* Any JavaScript here will be loaded for all users on every page load. A lot of this code has been taken from other Wikis, which follow the same copyright laws. */

/**
 * @description All conditional article imports
 */
mw.hook('wikipage.content').add(function () {
    'use strict';

    // get current page name with namespace. Example result: 'Template:TName'
    const pageName = mw.config.get('wgPageName');
    let scriptsToLoad = [];

    // check if tool page
    const toolPages = ['Template:TokenSimulator'];
    if (toolPages.includes(pageName) || pageName.startsWith('Tools')) {
        scriptsToLoad.push('MediaWiki:TokenSimulator.js');
    }

    // if any article is added then import
    if (scriptsToLoad.length > 0) {
        importArticles({
            type: 'script',
            articles: scriptsToLoad
        });
    }
});

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               Wikipedia:NavFrame.
 *  Maintainers: User:R. Koot
 * 
 *  Fixed by CA.EXCELSIOR to maintain backwards compatibility but should be
 *	changed everywhere to mediawiki mw-collapsible
 */
mw.hook('wikipage.content').add(function ($content) {
    'use strict';

    const content = $content.get(0);

    const autoCollapse = 2;
    const collapseCaption = "hide";
    const expandCaption = "show";

    createCollapseButtons();

    // only definitions after this

    function collapseTable(tableIndex) {
        let Button = document.getElementById("collapseButton" + tableIndex);
        let Table = document.getElementById("collapsibleTable" + tableIndex);

        if (!Table || !Button) {
            return false;
        }

        let Rows = Table.rows;

        if (Button.firstChild.textContent == collapseCaption) {
            for (let i = 1; i < Rows.length; i++) {
                Rows[i].style.display = "none";
            }
            Button.firstChild.textContent = expandCaption;
        } else {
            for (let i = 1; i < Rows.length; i++) {
                Rows[i].style.display = Rows[0].style.display;
            }
            Button.firstChild.textContent = collapseCaption;
        }
    }

    function createCollapseButtons() {
        let tableIndex = 0;
        let Tables = content.querySelectorAll("table.collapsible");

        Tables.forEach(table => {
            let Header = table.querySelector("th");

            /* if there is no header row to work with do nothing */
            if (!Header) {
                return;
            }

            table.setAttribute("id", "collapsibleTable" + tableIndex);

            let Button = document.createElement("span");
            let ButtonLink = document.createElement("a");
            let ButtonText = document.createTextNode(collapseCaption);

            Button.style.float = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:;");
            ButtonLink.addEventListener('click', function () {
                collapseTable(this.id.match(/^collapseButton(\d+)$/)[1]);
            });
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            /* add button */
            Header.insertBefore(Button, Header.childNodes[0]);

            /* if it's .collapsed or .autocollapse with index >= tableIndex then collapse table now */
            if (table.classList.contains('collapsed') || (tableIndex >= autoCollapse && table.classList.contains('autocollapse'))) {
                collapseTable(tableIndex);
            }

            /* increment count */
            tableIndex++;
        });
    }
});

/** The code marked below was taken from
  * http://mel-green.com/2009/02/javascript-1337-speak-translator/
  * with a few minor translation improvements and tweaks to fit
  * the wiki framework.
  */
var PhrasesEnglish =
    new Array('the', 'dude', 'hacker',
        'hacks', 'you', 'cool', 'oh my gosh',
        'fear', 'power', 'own',
        'what the heck', 'elite', 'for the win',
        'loser', 'good game', 'sucks',
        'sucker', 'is', 'rocks', 'winner');
var PhrasesLeet =
    new Array('teh', 'dood', 'haxxor', 'hax', 'u',
        '1337', 'zomg', 'ph43', 'powwah', 'pwn',
        'wth', 'leet', 'ftw', 'n00b', 'gg',
        'sux', 'suxxor', 'iz', 'rox', 'pwnster');

var LettersEnglish =
    new Array('n', 'b', 'k', 'd', 'e', 'f', 'g', 'h',
        'p', 'm', 'r', 'l', 'o', 'q', 's', 't',
        'u', 'x', 'w', 'y', 'z', 'c', 'a', 'j',
        'i', 'v', ' ');
var LettersLeet =
    new Array('/\\/', '|3', '|<', '[)', '3', '|=', '6', '|-|',
        '|*', '|\\/|', '|2', '|_', '0', '0.', '5', '+',
        '|_|', '><', '\\/\\/', '\'/', '2', '(', '/\\', '_|',
        '1', '\\/', '  ');

function translateText(inputString) {

    for (i = 0; i < PhrasesEnglish.length; ++i)
        inputString = inputString.replace(
            new RegExp(PhrasesEnglish[i], "gi"),
            PhrasesLeet[i]
        );

    for (i = 0; i < LettersEnglish.length; ++i)
        inputString = inputString.replace(
            new RegExp(LettersEnglish[i], "gi"),
            LettersLeet[i]
        );

    return inputString;
}
/* End of copied code, http://mel-green.com/2009/02/javascript-1337-speak-translator */

function LeetTrigger() {
    $(".leet").each(function () {
        var originalText = $(this).html();
        $(this).html(translateText(originalText));
    });
}
addOnloadHook(LeetTrigger);


/** Username replace function ([[Template:Username]]) **************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Newer version by: CA.EXCELSIOR
  */
mw.hook('wikipage.content').add(function UserNameReplace($content) {
    'use strict';

    if (typeof disableUsernameReplace !== 'undefined' && disableUsernameReplace) return;

    const username = mw.config.get('wgUserName');
    if (username == null) return;

    const content = $content.get(0);
    content.querySelectorAll("span.insertusername").forEach(elem => {
        elem.innerHTML = username;
    });
});


/**
 * auto-switching-tabber
 * @description Wrap tabber in element with 'auto-switching-tabber' class to 
 *				periodically switch tabs. Optionally set period with 
 *				'data-period-ms' attribute to number of miliseconds. Meant for 
 *				both default <tabber> and Dev lua module tabber or any other 
 *				with the same html structure and css classes.
 * @author      CA.EXCELSIOR
 * @example     Best to use [[Template:TabberAutoSwitching]] same as other 
 *				tabbers with one additional named parameter. Alternatively use 
 *				class directly:
 *              <div class="auto-switching-tabber" data-period-ms="8000" >
 *					<tabber>...</tabber>
 *				</div>
 */
mw.hook('wikipage.content').add(function initAutoSwitchingTabber($content) {
    'use strict';

    // default timeout values in miliseconds
    const TIMEOUT_MS = {
        MIN: 500,
        MAX: 60000,
        DEFAULT: 4000,
        MIN_AFTER_USER_INTERACTION: 5000,
    };

    const content = $content.get(0);

    // for each element with 'auto-switching-tabber' class init first descendant tabber
    content.querySelectorAll('.auto-switching-tabber').forEach(slidingTabber => {
        const tabsContainer = slidingTabber.querySelector('.tabber .wds-tabs');
        if (!tabsContainer) return;

        // only direct children tabs - not nested
        const tabs = Array.from(tabsContainer.children).filter(tab => tab.classList.contains('wds-tabs__tab'));
        const tabNumber = tabs.length;
        if (tabNumber <= 0) return;

        // determine switching period from data attribute and between min / max, else default
        function getTimeoutValue(dataAttr) {
            if (dataAttr === null) return TIMEOUT_MS.DEFAULT;

            const val = Number(dataAttr);
            if (isNaN(val)) return TIMEOUT_MS.DEFAULT;

            return Math.min(Math.max(val, TIMEOUT_MS.MIN), TIMEOUT_MS.MAX);
        }

        const timeoutMiliseconds = getTimeoutValue(slidingTabber.getAttribute('data-period-ms'));

        // current active tab
        let currentTabIndex = tabs.findIndex(tab => tab.classList.contains('wds-is-current'));
        let currentTabInvalidated = false;
        let isProgrammatic = false;
        let intervalId;

        // it clicks programmtically on next tab
        function tabberSwitch() {
            if (currentTabInvalidated) {
                currentTabIndex = tabs.findIndex(tab => tab.classList.contains('wds-is-current'));
            }

            const nextTabIndex = (currentTabIndex + 1) % tabNumber;

            // set flag before click to skip programmatic change
            isProgrammatic = true
            tabs[nextTabIndex].click();
            currentTabIndex = nextTabIndex;
        }

        // if user invoked change it invalidates current tab index and resets timer
        function onTabIndexChange() {
            if (isProgrammatic) {
                isProgrammatic = false;
                return;
            }

            // invalidate current tab
            currentTabInvalidated = true;

            // delay switch after user interaction and then set new interval
            clearTimeout(intervalId);
            intervalId = setTimeout(() => {
                tabberSwitch();
                setOnInterval();
            }, Math.max(timeoutMiliseconds, TIMEOUT_MS.MIN_AFTER_USER_INTERACTION));
        }

        // set switch on interval
        function setOnInterval() {
            clearInterval(intervalId);
            intervalId = setInterval(tabberSwitch, timeoutMiliseconds);
        }

        // observe only tabindex change in subtree nodes
        const config = { attributeFilter: ['tabindex'], subtree: true };
        // create an observer that captures all user tab changes (not just mouse) and programmatic changes
        const tabsObserver = new MutationObserver(onTabIndexChange);
        // start observing the target node for configured mutations
        tabsObserver.observe(tabsContainer, config);

        // start interval
        setOnInterval();
    });
});