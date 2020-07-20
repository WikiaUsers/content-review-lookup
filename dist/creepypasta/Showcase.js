/**
 * Showcase
 *
 * Displays recent threads from a forum board. Used on CPW to display writer's
 * showcase threads on the fron page.
 *
 * This script is designed to be user-configurable. See
 * [[User:Underscorre/Showcase]] for documentation.
 *
 * @author [[User:Underscorre]]
 * @license MIT
 */

// Create the showcase settings object if it doesn't already exist
window.showcase = (typeof window.showcase === 'object') ? window.showcase : {};

(function ($, nirvana, mw, window) {
    /**
     * This class represents a single showcase element.
     *
     * A showcase can appear an arbitrary number of times on a page, a separate
     * class is created for each instance.
     *
     * @class
     */
    class Showcase {
        /**
         * Class constructor.
         *
         * @param {HTMLElement} target Element to showcase threads within.
         * @param {object} settings Settings for the showcase.
         */
        constructor(target, settings) {
            this.api = new mw.Api();
            this.target = target;
            this.settings = settings;
            this.getElementConfig();
            this.debug(`Ready to showcase threads from '${this.board}' in this element:`);
            this.debug(target);
        }

        /**
         * Gets config details from the element (i.e: Board to showcase, number
         * of threads to show).
         */
        getElementConfig() {
            // The board to fetch threads from & number of threads to display
            // can be configured as attributes of the container element.
            this.board = this.getAttr('data-board', this.settings.defaultBoard);
            this.debug(`Running on board '${this.board}'`);

            this.maxThreads = Math.min(
                this.getAttr('data-max-threads', this.settings.maxThreads),
                this.settings.maxThreads
            );
            this.debug(`Displaying ${this.maxThreads} threads at maximum`);
        }

        /**
         * Get an attribute of the target element, or return a default value.
         *
         * @param {string} attribute Attribute name to retrieve.
         * @param {string} defaultVal Value to return if attribute is not
         * present.
         *
         * @return {string} Attribute or default alternative.
         */
        getAttr(attribute, defaultVal) {
            if (this.target.hasAttribute(attribute)) {
                return this.target.getAttribute(attribute);
            } else {
                return defaultVal;
            }
        }

        /**
         * Print a debug message, if debugging is enabled.
         *
         * @param {string} msg Message to print.
         */
        debug(msg) {
            if (this.settings.debug) {
                window.console.log('Showcase:', msg);
            }
        }

        /**
         * Inform the user of an error.
         *
         * @param {string} msg Error message.
         */
        error(msg) {
            // Display in the console.
            window.console.error('Showcase:', msg);

            // Display in the container element.
            let errorMsg = $('<h4 class="error" style="color: red"></h4>');
            // Avoid XSS by setting it as the textContent, not innerHTML.
            errorMsg.text(msg.toString());
            errorMsg.appendTo(this.target);
        }

        /**
         * Run the showcase.
         */
        run() {
            // Create a list to display the threads we highlight.
            this.list = $('<ul></ul>').appendTo(this.target);

            this.debug('Fetching threads...');
            // Nirvana is a very interesting & poorly documented API we can use
            // to interact with a lot of Wikia-specific plugins (e.g: forums)
            // Essentially, it allows us to call public methods in the
            // server-side Controller classes of the forum plugin directly. For
            // example, here, we call the method used to fetch the HTML making
            // up the forum thread listing (https://bit.ly/2vzoUNG). It's kinda
            // messy, and just returns raw HTML to sift through, but it's nicer
            // than just scraping the pages.
            //
            // Why not use the EmbeddedIn API from MediaWiki, and look for
            // transclusions of the WS template? Doing that starts from the
            // oldest threads, and would require us to keep making queries to
            // get to the latest stuff. Also, this method allows us to include
            // threads which don't use the WS template.
            nirvana.getJson('ForumExternalController', 'getCommentsPage', {
                pagetitle: this.board,
                pagenamespace: 2000
            }, data => this.processThreadlist(data), () => this.fetchThreadsFail());
        }

        /**
         * Callback for when the threads are fetched successfully.
         *
         * @param {object} data Data from the Nirvana API
         */
        processThreadlist(data) {
            this.debug('Fetched threads successfully');
            // Parse the HTML from the Nirvana API. This would be dangerous
            // (XSS) on arbitrary input, but because this comes from the Wikia
            // API & is already sanitised, we assume we can trust it. The HTML
            // fetched is the same as the inner HTML of any board
            // (e.g: https://cpw.wikia.com/Board:Writer%27s_Showcase).
            let outer = $(data.html);
            let threadList = outer.find('.ThreadList')[0].children;

            // The user may want to display less threads than are available, or
            // there may be less threads than the user wants, choose whatever's
            // lower.
            let length = Math.min(threadList.length, this.maxThreads);

            // Loop through the threads on the board.
            for (let i = 0; i < length; i++) {
                // Scrape some data from the HTML linking to the thread.
                let thread = threadList[i],
                    title = $(thread).find('h4')[0],
                    id = thread.getAttribute('data-id'),
                    link = title.firstChild.getAttribute('href');

                this.debug(`Processing thread id ${id}`);

                // This API call gets the parsed text from the thread, as well
                // as the user who made the most recent revision. We need to get
                // the user in case they're not using the WS template, so we can
                // guess who wrote the thread.
                this.api.get({
                    action: 'query',
                    prop: 'revisions',
                    pageids: id,
                    rvprop: 'user|content',
                    rvlimit: 1,
                    rvdir: 'older',
                    rvparse: true
                }).done(data => this.processThread(title, id, link, data))
                    .fail(() => this.fetchContentFail(id));
            }
        }

        /**
         * Callback for when the content of a single thread is fetched
         * successfully.
         *
         * Retrieves information about the author, description, title from the
         * thread.
         *
         * @param {HTMLElement} title HTML element of thread title
         * @param {number} id ID of the thread
         * @param {string} link URL of the thread
         * @param {object} data Data from the Nirvana API
         */
        processThread(title, id, link, data) {
            this.debug(`Successfully fetched thread ${id}`);

            data = data.query.pages[parseInt(id)].revisions[0];

            // Similar to the threadlist, create an element to store this
            // thread's HTML & parse it. Once again, this is coming from Wikia &
            // should already be sanitised
            let container = $('<div></div>').html(data['*']);
            
            // Check if the post contains the WS template. If so, get details
            // from the template.
            if (container.find('#cpw-ws-title').length > 0) {
                this.debug(`Thread ${id} includes {{WS}} template`);
                this.processThreadTemplate(container, link);
            } else {
                this.debug(`Thread ${id} does not include {{WS}} template`);
                this.processThreadNoTemplate(title, id, link, data);
            }
        }

        /**
         * Retrieves information about the author, description, title from the
         * WS template in a thread.
         *
         * Called by processThread if there is a WS template present.
         *
         * @param {HTMLElement} container Div element containing the thread's
         * source code
         */
        processThreadTemplate(container, link) {
            let title = container.find('#cpw-ws-title')[0],
                titleText = title.innerText;

            let author = container.find('#cpw-ws-author')[0],
                authorText = author.firstChild.lastChild.innerText,
                authorLink = author.firstChild.lastChild.getAttribute('href');

            let desc = container.find('#cpw-ws-description')[0],
                descText = desc.innerText;

            this.drawThread(titleText, link, authorText, authorLink, descText);
        }

        /**
         * Retrieves information about the author, description, title by
         * scraping details from the thread HTML.
         *
         * Called by processThread if there is no WS template present.
         *
         * @param {HTMLElement} title Title of the thread
         * @param {number} id ID of the thread
         * @param {string} link Link to the thread
         */
        processThreadNoTemplate(title, id, link, data) {
            let titleText = title.innerText,
                desc = 'The author has not provided a description for this pasta';

            let authorText = data.user,
                authorLink = `/wiki/User:${encodeURIComponent(authorText)}`;

            this.drawThread(titleText, link, authorText, authorLink, desc);
        }

        /**
         * Writes the thread to the DOM.
         *
         * @param {string} title Title of the thread
         * @param {string} link Link to the thread
         * @param {string} author Username of the author
         * @param {string} authorLink Link to the author's user page
         * @param {string} desc Description of the pasta
         */
        drawThread(title, link, author, authorLink, desc) {
            let li = $('<li></li>');

            title = this.snip(title, 50);
            author = this.snip(author, 50);
            desc = this.snip(desc, 250);
            
            this.debug(`Drawing thread with title '${title}'`);

            let pastaTag = this.createLink(link, title);
            let pastaHeading = $('<h3></h3>').append(pastaTag);

            let authorTag = this.createLink(authorLink, author);
            let authorHeading = $('<h4>By </h4>').append(authorTag);

            let descElement = $('<p></p>').text(desc);

            pastaHeading.appendTo(li);
            authorHeading.appendTo(li);
            descElement.appendTo(li);

            $(li).appendTo(this.list);
        }

        /**
         * Truncates a string to a specified length, adding ellipses to signify
         * that it has been cut off.
         *
         * @param {string} text Text to truncate
         * @param {number} length Length to cut to
         *
         * @return {string} Truncated string
         */
        snip(text, length) {
            if (text.length >= (length - 3)) {
                return text.substr(0, length - 3) + '…';
            }
            return text;
        }

        /**
         * Creates a HTML link element
         *
         * @param {string} href Destination of the link
         * @param {string} text Text to display
         *
         * @return {jquery} Link tag created with jQuery
         */
        createLink(href, text) {
            return $('<a></a>').attr('href', href).text(text);
        }

        /**
         * Callback for when fetching threads fails.
         */
        fetchThreadsFail() {
            this.error('Failed to fetch list of threads');
        }

        /**
         * Callback for when fetching content of an individual thread fails.
         */
        fetchContentFail(id) {
            this.error(`Failed to fetch content of thread ID ${id}`);
        }

    }

    let defaultSettings = {
        // Should Showcase run?
        enable: true,
        // Prints extra debugging info if set to true
        debug: false,
        // Maximum number of threads to showcase
        maxThreads: 15,
        // Default board, if not specified in the container element
        defaultBoard: 'Writer\'s Showcase',
        // Class name of element into which forum showcases should be inserted.
        // Please include the dot at the beginning
        targetElement: '.forum-showcase'
    };

    // Merge settings
    let settings = Object.assign({}, defaultSettings, window.showcase);

    // If we haven't run yet, let's get this party started.
    if (!window.showcase.hasOwnProperty('executed') && settings.enable) {
        window.showcase.executed = true;

        // Create a separate Showcase class for each instance of the target div.
        let targets = $(settings.targetElement);
        let i = 0;
        Array.from(targets).forEach(target => {
            // Limit to 10 instances per page to avoid abuse, since this makes a
            // fair few requests
            if (i < 10) {
                let showcaseInstance = new Showcase(target, settings);
                showcaseInstance.run();
            }
            i++;
        });
    }

    // ZION loader directive
    if (window.ZION !== undefined) window.ZION.loaded.fire();
} ($, $.nirvana, window.mw, window));