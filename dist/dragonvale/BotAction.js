;
mw.loader.using('mediawiki.api')
    .then((function ($)
    {
        var api = new mw.Api();

        function instruct(pageName, op)
        {
            switch (op)
            {
            case "edit":
                api.edit(
                        'User:TheGreatNogard/Instructions',
                        function (revision)
                        {
                            return {
                                text: revision.content.concat(`|${op}:${pageName}`),
                                summary: 'Add instruction (automatic)',
                                minor: true
                            };
                        }
                    )
                    .done(function (d)
                    {
                        alert("Thank you, your instruction has been queued. Check back soon to see the updated page.")
                    })
                    .fail(function (f)
                    {
                        console.error("Failed edit", f);
                    });

                break;
            default:
                console.error("Unknown action:", op);
                break;
            }
        }

        function createLink(span, pageName, action)
        {
            var link = document.createElement("a");
            link.className = 'nogard-action';
            link.setAttribute('href', 'javascript:instruct("' + pageName + '", "' + action + '")');

            var child = span.firstChild;
            span.removeChild(child);
            link.appendChild(child);
            span.insertBefore(link, span.firstChild);
        }

        function init()
        {
            const spans = document.querySelectorAll('span.nogard-action');

            spans.forEach(function (span)
            {
                const pageName = span.getAttribute('data-page-name');
                const action = span.getAttribute('data-action');
                createLink(span, pageName, action);
            });
        }

        // only logged-in users
        if (!mw.config.get("wgUserName")) return;

        // do not affect Special or non-existent namespaces
        if (mw.config.get("wgNamespaceNumber") < 0) return;

        window.instruct = instruct;

        $(init);
    })(window.jQuery));