const pageCache = {};
const MAX_CACHE_SIZE = 666;
let stopSignal = false;
let api;
let ui;
let preact;
let h;
let tags;
let useEffect;
let useState;

function getAllPagesInCategory(cat, { setStatus }) {
    return new Promise(resolve => {
        setStatus(`Fetching all pages in category ${cat}...`);

        let cmcontinue;
        let allPages = [];

        function lock(data) {
            if (!data) return;

            if (data.query && data.query.categorymembers) {
                allPages.push(...data.query.categorymembers);
            }

            if (data.continue && data.continue.cmcontinue) {
                setStatus(`Fetching ${allPages.length} of all the pages in category ${cat}...`);
                cmcontinue = data.continue.cmcontinue;
                step();
            } else {
                setStatus(`Fetched ${allPages.length} of all the pages in category ${cat}.`);
                resolve(allPages);
            }
        }

        function step() {
            api.get({
                list: 'categorymembers',
                cmtitle: `Category:${cat}`,
                cmlimit: 500,
                cmcontinue
            }).then(lock);
        }

        step();
    });
}

function getAllPages({ setStatus }) {
    return new Promise(resolve => {
        setStatus('Fetching all pages...');

        let apcontinue;
        let allPages = [];

        function lock(data) {
            if (!data) return;

            if (data.query && data.query.allpages) {
                allPages.push(...data.query.allpages);
            }

            if (data.continue && data.continue.apcontinue) {
                setStatus(`Fetching ${allPages.length} of all the pages...`);

                apcontinue = data.continue.apcontinue;
                step();
            } else {
                setStatus(`Fetched ${allPages.length} of all the pages.`);

                resolve(allPages);
            }
        }

        function step() {
            api.get({
                list: 'allpages',
                aplimit: 500,
                apcontinue
            }).then(lock);
        }

        step();
    });
}

function parseHtml(html) {
    // DOMParser is sanitized enough not to load assets in `html` images, scripts, etc.
    return new DOMParser().parseFromString(html, 'text/html');
}

function display(path) {
    return decodeURIComponent(path).replace(/^\/wiki\//, '').replace(/_/g, ' ');
}

function getCached(pathname) {
    if (Object.hasOwn(pageCache, pathname)) {
        pageCache[pathname].lastUse = Date.now();

        return pageCache[pathname].cached;
    } else {
        return undefined;
    }
}

function putCached(pathname, page) {
    pageCache[pathname] = {
        lastUse: Date.now(),
        cached: page
    };

    const keys = Object.keys(pageCache);

    if (keys.length > MAX_CACHE_SIZE) {
        const oldest = keys.sort((a, b) => pageCache[a].lastUse - pageCache[b].lastUse);

        delete pageCache[oldest[0]];
    }
}

function getUrlPage(pathname, noredirects) {
    function goopify(html) {
        // console.log(`received ${html.length} bytes of html from ${pathname}`);
        const parsed = parseHtml(html);
        // console.log('parsed page:', parsed);

        return {
            pathname,
            url: new URL(pathname, location.origin).toString(),
            parsed
        };
    }

    return new Promise((resolve, reject) => {
        if (getCached(pathname)) {
            resolve(getCached(pathname));
            return;
        }

        let url = noredirects ? `${pathname}?redirect=no` : pathname;

        fetch(url).then(res => res.text(), reject).then(goopify).then(page => {
            putCached(pathname, page);

            resolve(page);
        });
    });
}

function allRelevantAnchors(doc) {
    // we're checkin links that point to the current wiki (no externals), have an anchored url
    const all = Array.from(doc.querySelectorAll('#mw-content-text a[href]:not(.extiw, .external)')).filter(a => {
        const url = new URL(a.href);

        // anchors
        return (url.hash !== '' && url.hash !== '#') &&
            // wiki article, I guess
            (url.pathname.startsWith('/wiki/'));
    });


    const deduplicated = all.filter((a, index) => all.findIndex(a2 => a2.href === a.href) === index);

    return deduplicated;
}

function findFuckedLinks(frompage, anchors, { setStatus, addLog, addResult }) {
    return new Promise(resolve => {
        let index = 0;

        function lock(topage) {
            if (stopSignal) {
                setStatus('Stopped due to a change in the input data.');
                return;
            }

            const id = decodeURIComponent(new URL(anchors[index]).hash.replace(/^#/, ''));

            if (!Array.from(topage.parsed.querySelectorAll('[id]')).some(node => node.id === id)) {
                addResult({
                    anchor: id,
                    frompath: frompage.pathname,
                    topath: topage.pathname
                });
            }

            index++;
            step();
        }

        function unlock(pathname, e) {
            addLog(`Error when fetching ${pathname}: ${e}`);
        }

        function step() {
            if (index >= anchors.length) {
                resolve();
                return;
            }

            const parsed = new URL(anchors[index].getAttribute('href'), frompage.url);
            const pathname = parsed.pathname;

            // const anchorstr = anchors.map(a => decodeURIComponent(new URL(a.getAttribute('href'), frompage.url).hash)).join(', ');

            setStatus(`${display(frompage.pathname)} links to\n${display(pathname)}, scraping it for broken anchors:\n${display(parsed.hash)}`);

            // follow redirects when scraping the target page for missing anchors
            getUrlPage(pathname, { noredirects: false }).then(lock, unlock.bind(null, pathname));
        }

        step();
    });
}

function scrape({ pagesref, setStatus, addLog, addResult }) {
    function lock(page) {
        if (stopSignal) {
            setStatus('Stopped due to a change in the input data.');
            return;
        }

        const anchors = allRelevantAnchors(page.parsed);

        findFuckedLinks(page, anchors, { setStatus, addLog, addResult }).then(() => {
            step();
        });
    }


    function unlock(pathname, e) {
        addLog(`Error when fetching ${pathname}: ${e}`);

        step();
    }

    function step() {
        const next = pagesref.current.pop();
        if (next.trim() === '') {
            setStatus(`Reached the end of the page list or an empty line.`);
            return;
        }

        setStatus(`Scraping ${next}`);

        // No redirects when fetching from AllPages
        getUrlPage(`/wiki/${encodeURIComponent(next)}`, { noredirects: true }).then(lock, unlock.bind(null, next));
    }

    step();
}

function PagesInput({ pagesref }) {
    const [value, setValue] = useState('');

    preact._hooks.useImperativeHandle(pagesref, () => {
        return {
            getValue: () => value,
            setValue: (v) => setValue(v),
            pop: () => {
                let split = value.split('\n');
                let first = split[0];

                setValue(split.slice(1).join('\n'));

                return first;
            },
            append: (s) => {
                if (value.trim() === '') {
                    setValue(s);
                } else {
                    setValue(value + '\n' + s);
                }
            }
        };
    });

    return tags.textarea({
        value,
        class: 'pages-input',
        onChange: (e) => {
            stopSignal = true;
            setValue(e.target.value);
        }
    });
}

function StatusReport({ status }) {
    return tags.div({
        class: 'status-report',
        child: status
    });
}

function Logs({ logs }) {
    return tags.ul({
        class: 'logs',
        'data-i18n-empty': 'Logs will appear here.',
        children: logs.map((log, index) => {
            return tags.li({
                key: index,
                child: log.message
            });
        })
    });
}

function Results({ results }) {
    // const collapsedResults = [];
    const collapsedResults = preact.useMemo(() => {
        let collapsed = [];

        for (const result of results) {
            if (collapsed.length === 0 || collapsed[collapsed.length - 1].frompath !== result.frompath) {
                collapsed.push({
                    frompath: result.frompath,
                    results: [result]
                });
            } else {
                collapsed[collapsed.length - 1].results.push(result);
            }
        }

        return collapsed;
    }, [results]);


    return tags.ul({
        class: 'results',
        'data-i18n-empty': 'Pages that link to pages with a missing #anchor will appear here.',
        children: collapsedResults.map((result, index) => {
            return tags.li({
                class: 'result',
                key: index,
                children: [
                    tags.a({
                        href: result.frompath,
                        child: display(result.frompath)
                    }),
                    ':',
                    tags.br(),
                    tags.ol({
                        class: 'result-inner',
                        children: result.results.map(inner => {
                            return tags.li({
                                children: [
                                    inner.topath !== result.frompath && tags.a({
                                        href: inner.topath,
                                        child: display(inner.topath)
                                    }),
                                    `#${inner.anchor}`,
                                    tags.br()
                                ]
                            });
                        })
                    }),
                ]
            });
        })
    });
}

function Cubacklinks({ rootref }) {
    const [status, setStatus] = useState('Ready.');
    const [logs, setLogs] = useState([]);
    const [results, setResults] = useState([]);

    function addLog(message) {
        setLogs(logs => [...logs, { message }]);
    }

    function addResult(result) {
        setResults(results => [...results, result]);
    }

    const pagesref = preact.useRef();

    preact._hooks.useImperativeHandle(rootref, () => {
        return {
            addPagesInCategory() {
                const category = prompt('Enter the category name, without the Category: prefix.');

                getAllPagesInCategory(category, { setStatus }).then(categoryMembers => {
                    window.categoryMembers = categoryMembers;

                    // pagesref.current.setValue('asd');
                    pagesref.current.append(categoryMembers.map(page => page.title).join('\n'));
                });
            },
            addAllPages() {
                getAllPages({ setStatus }).then(allPages => {
                    window.allPages = allPages;

                    pagesref.current.append(allPages.map(page => page.title).join('\n'));
                });
            },
            start() {
                stopSignal = false;

                scrape({ pagesref, setStatus, addLog, addResult });
            }
        };
    }, []);

    return preact.frag([
        h(PagesInput, { pagesref }),
        h(StatusReport, { status }),
        h(Logs, { logs }),
        h(Results, { results })
    ]);
}

function showModal() {
    let root;

    const rootref = preact._preact.createRef();

    const $modal = dev.showCustomModal('Cubacklinks', {
        width: 500,
        content: root = ui.div({
            id: 'Cubacklinks-root'
        }),
        onClose: () => stopSignal = true,
        buttons: [
            {
                message: 'Close',
                handler: function() {
                    dev.showCustomModal.closeModal($modal);
                }
            },
            {
                message: 'Add all pages',
                defaultButton: true,
                handler: function() {
                    rootref.current.addAllPages();
                }
            },
            {
                message: 'Add pages in category',
                defaultButton: true,
                handler: function() {
                    rootref.current.addPagesInCategory();
                }
            },
            {
                message: 'Start',
                defaultButton: true,
                handler: function() {
                    rootref.current.start();
                }
            }
        ]
    });

    preact.render(
        h(Cubacklinks, { rootref }),
        root
    );
}

function init() {
    var tools = document.getElementById('my-tools-menu');
    if (tools === null) return;

    tools.appendChild(
        ui.li({
            class: 'custom',
            child: ui.a({
                id: 'Cubacklinks-tools-button',
                href: '#',
                text: 'Cubacklinks'
            }),
            events: {
                click: function(e) {
                    e.preventDefault();
                    showModal();
                }
            }
        })
    );

    mw.util.addCSS(`
.pages-input {
    height: 320px;
    width: 100%;
    resize: vertical;
}

.status-report {
    background: #ffee66;
    color: black;
    font-weight: bold;
    padding: 8px;
    margin-bottom: 8px;
    display: block;
    white-space: pre-line;
}

.logs {
    background: rgb(255, 240, 240);
    color: black;
    max-height: 120px;
    overflow: auto;
    padding: 8px;
    margin-bottom: 8px;
}

.logs:empty::after {
    content: attr(data-i18n-empty);
    font-style: italic;
    color: gray;
}

.results:empty::after {
    content: attr(data-i18n-empty);
    font-style: italic;
    color: gray;
}

.result-inner {
    padding-left: 16px;
}
    `);
}

var loading = [
    'preact',
    'dorui',
    'modal',
    'api',
];
function onload(label, arg) {
    switch (label) {
        case 'preact':
            preact = arg;
            h = preact.h;
            tags = preact.tags;
            useEffect = preact.useEffect;
            useState = preact.useState;
            break;
        case 'dorui':
            ui = arg;
            break;
        case 'api':
            api = new mw.Api();
            break;
    }

    var index = loading.indexOf(label);
    if (index === -1) {
        throw new Error('Unregistered dependency loaded: ' + label);
    }

    loading.splice(index, 1);

    if (loading.length === 0) {
        init();
    }
}

function preload() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:Preact.js',
            'u:dev:MediaWiki:ShowCustomModal.js'
        ]
    });

    mw.hook('doru.ui').add(onload.bind(null, 'dorui'));
    mw.hook('dev.preact').add(onload.bind(null, 'preact'));
    mw.hook('dev.showCustomModal').add(onload.bind(null, 'modal'));
    mw.loader.using('mediawiki.api').then(onload.bind(null, 'api'));
}

preload();