// Redirects [[Project:WW]] and [[Project:WS]] to a random thread from their respective boards

var pagename = mw.config.get('wgTitle');
var ns = mw.config.get('wgNamespaceNumber');

function checkThread(threadnum) {
    $.ajax({
        url: '/wiki/Thread:' + threadnum,
        type: 'GET',
        success: function (threaddata) {
            var content = $(threaddata).find('div.deleteorremove-infobox').html();
            if(content.length) {
                console.log('Thread selected is closed! Will get a new one...')
                return false;
            } else {
                return true;
            }
        },
        error: function (a, b, c) {
            return true;
        }
    });
}

$(function () {
    if (pagename === "WS" && ns === 4) {
        document.title = 'Redirecting...';
        console.log("Now loading content of Writer's Showcase board...");
        $.ajax({
            url: '/wiki/Board:Writer%27s_Showcase',
            type: 'GET',
            success: function (data) {
                console.log("Content loaded!");
                var content = $(data).find('ul.ThreadList').html();
                $('div.redirect').append($(content));
                var threads = [];
                $('div.redirect li').each(function(index) {
                    if (typeof $(this).attr('data-id') !== 'undefined') {
                        threads[threads.length] = $(this).attr('data-id');
                    }
                });
                var thread = threads[Math.floor(Math.random()*threads.length)];
                console.log("Selected: Thread:" + thread);
                window.location.replace("/wiki/Thread:" + thread);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('div#mw-content-text').append("<p>There was an error fetching Writer's Showcase threads, please show an <a href=\"/wiki/Special:ListAdmins\">admin</a> a screenshot of this page for assistance.</p><p>" + textStatus + " - " + errorThrown + "</p>");
            }
        });
	} else if (pagename === "WW" && ns === 4) {
        document.title = 'Redirecting...';
        console.log("Now loading content of Writer's Workshop board...");
        $.ajax({
            url: '/wiki/Board:Writer%27s_Workshop',
            type: 'GET',
            success: function (data) {
                console.log("Content loaded!");
                var content = $(data).find('ul.ThreadList').html();
                $('div.redirect').append($(content));
                var threads = [];
                $('div.redirect li').each(function(index) {
                    if (typeof $(this).attr('data-id') !== 'undefined') {
                        threads[threads.length] = $(this).attr('data-id');
                    }
                });
                var thread = threads[Math.floor(Math.random()*threads.length)];
                if(!checkThread(thread)) {
                    // assume next thread will not be closed, to avoid absurd wait times
                    thread = threads[Math.floor(Math.random()*threads.length)];
                }
                console.log("Selected: Thread:" + thread);
                
                window.location.replace("/wiki/Thread:" + thread);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('div#mw-content-text').append("<p>There was an error fetching Writer's Workshop threads, please show an <a href=\"/wiki/Special:ListAdmins\">admin</a> a screenshot of this page for assistance.</p><p>" + textStatus + " - " + errorThrown + "</p>");
            }
        });
	}
});