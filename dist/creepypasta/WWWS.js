/**
 * CPWRedirect
 *
 * Redirects [[Project:WW]] and [[Project:WS]] to a random thread from the
 * boards "Writer's Workshop" and "Writer's Showcase", respectively.
 *
 * @author [[User:Underscorre]]
 * @license MIT
 *
 * @todo Implement some working mechanism for checking Writer's Workshop threads
 * (are they open/closed?). Can likely be done via Nirvana, need to look at the
 * "boardThread" method here - http://bit.ly/2aQNK01
 */

// Make sure that the "cpwRedirect" object exists
;window.cpwRedirect =
    (typeof window.cpwRedirect === 'object') ? window.cpwRedirect : {};

(function (cpwRedirect, nirvana, window, document, undefined) {

    // General setup stuff, creates default settings, makes sure required
    // functions exist
    cpwRedirect.setup = function () {
        if (typeof window.console === 'undefined') {
            // We're running on a REALLY old browser, create an empty function
            // for console.log to avoid throwing errors
            window.console = {
                log: function(m) {}
            };
        }

        // Ensure settings are set
        if (!cpwRedirect.hasOwnProperty('enable')) {
            cpwRedirect.enable = true;
        }
        if (!cpwRedirect.hasOwnProperty('debug')) {
            cpwRedirect.debug = false;
        }

        // Get some info about the current page
        cpwRedirect.pageInfo = mw.config.get([
            'wgTitle',
            'wgNamespaceNumber'
        ]);
    };

    // Log a message
    cpwRedirect.log = function (msg) {
        if (cpwRedirect.debug) {
            console.log("CPWRedirect: " + msg);
        }
    };

    // Error fetching threads
    cpwRedirect.error = function (msg) {
        cpwRedirect.log(msg);
        $('#mw-content-text h1').html("<h1 style='color: red'>Error!</h1>");
    };

    // Callback when trying to fetch threads succeeded
    cpwRedirect.successfulResponse = function (data, textStatus, jqXHR) {
        cpwRedirect.log("Successfully retrieved threads");
        data = data.html;
        var threadList = $(data).find("ul.ThreadList li"),
            validThreads = [],
            thread,
            dataId;

        for (var i = 0; i < threadList.length; i++) {
            thread = $(threadList[i]);
            dataId = thread.attr("data-id");
            if (typeof dataId !== "undefined") {
                validThreads[validThreads.length] = dataId;
            }
        }

        threadNum = validThreads.length;
        cpwRedirect.log("There are " + threadNum.toString() + " valid threads");
        if (threadNum < 1) {
            cpwRedirect.error("API error!");
            return;
        }

        var selectedThread = validThreads[
            Math.floor(Math.random() * validThreads.length)
        ];
        cpwRedirect.log("Selected thread " + selectedThread.toString());

        cpwRedirect.log("Redirecting...");
        window.location.replace("/wiki/Thread:" + selectedThread);
    };

    // Callback when trying to fetch threads failed
    cpwRedirect.errorResponse = function (jqXHR, textStatus, errorThrown) {
        cpwRedirect.error("Error fetching threads!");
    };

    // Redirect to a thread from a given board
    cpwRedirect.redirect = function (board) {
        cpwRedirect.log("Redirecting to a " + board + "thread");
        document.title = "Redirecting...";
        cpwRedirect.log("Getting threads from the '" + board + "' board");
        cpwRedirect.threads = [];
        nirvana.getJson("ForumExternalController", "getCommentsPage", {
            pagetitle: board,
            pagenamespace: 2000
        }, cpwRedirect.successfulResponse, cpwRedirect.errorResponse);
    };

    // Run the redirect script
    cpwRedirect.run = function () {
        if (!cpwRedirect.enable) {
            cpwRedirect.log("Redirecting disabled by user");
            return;
        }

        cpwRedirect.log("CPWRedirect has been enabled");

        if (cpwRedirect.pageInfo.wgNamespaceNumber === 4) {
            switch (cpwRedirect.pageInfo.wgTitle) {
                case 'WW':
                    cpwRedirect.redirect("Writer's Workshop");
                    break;
                case 'WS':
                    cpwRedirect.redirect("Writer's Showcase");
                    break;
                default:
                    cpwRedirect.log("Not the right page, not redirecting");
                    break;
            }
        } else {
            cpwRedirect.log("Not the right namespace, not redirecting");
        }
    };

    cpwRedirect.setup();
    cpwRedirect.run();

} (window.cpwRedirect, $.nirvana, window, document));