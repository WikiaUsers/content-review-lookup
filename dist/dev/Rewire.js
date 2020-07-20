(function (window, $, mw) {
    'use strict';

    window.dev = window.dev || {};  // Prepare the dev object, if it doesn't already exist.
    if (window.dev.rewire) return;  // Guard against double loads.

    // Shadow the globals that we'll be using.
    var Array = window.Array,
        CSS = window.CSS,
        Document = window.Document,
        DocumentFragment = window.DocumentFragment,
        Element = window.Element,
        HTMLCollection = window.HTMLCollection,
        HTMLScriptElement = window.HTMLScriptElement,
        JSON = window.JSON,
        Map = window.Map,
        Math = window.Math,
        Node = window.Node,
        NodeList = window.NodeList,
        Object = window.Object,
        Set = window.Set,
        String = window.String,
        document = window.document;

    // -----------------------------------------------------------------
    // Private polyfills
    // NB: We're using a ternary because otherwise the function definitions won't make it into this closure (as they'll be swallowed up by the if/else blocks).
    // -----------------------------------------------------------------

    // CSS.escape
    var cssEscape = CSS.escape ? CSS.escape : function (str) {
        // TODO: Implement for Edge/IE
        return str;
    };

    // Element.matches
    var elementMatches = Element.prototype.matches ? Element.prototype.matches.call.bind(Element.prototype.matches) : function (element, selector) {
        // IE11
        return element.msMatchesSelector(selector);
    };

    // Map.values
    var mapValues = Map.prototype.values ? Map.prototype.values.call.bind(Map.prototype.values) : function (m) {
        var vs = [];
        m.forEach(function (v, k) { vs.push(v); });
        return vs;
    };

    // Node.isConnected
    var nodeIsConnected = Object.prototype.hasOwnProperty.call(Node.prototype, 'isConnected') ? function (node) {
        return node.isConnected;
    } : function (node) {
        // Edge/IE
        return document.contains(node);
    };

    // new Set(iterable)
    var setFromArray = ((new Set([{}, {}])).size === 2) ? function (xs) {
        return new Set(xs);
    } : function (xs) {
        // IE11
        var zs = new Set();
        xs.forEach(function (x) { zs.add(x); });
        return zs;
    };

    // -----------------------------------------------------------------
    // DOM-related utility functions
    // -----------------------------------------------------------------

    // Given some potentially nested sequence of things, flatten them into an array of disjoint `Node`s.
    function flattenNodes(sequence) {
        var nodes = [];
        checkNextObject: for (var i = 0; i < sequence.length; ++i) {
            var object = sequence[i];
            if (object instanceof Node) {
                var candidates = [object];
            } else if ((object instanceof $) || (object instanceof Array) || (object instanceof HTMLCollection) || (object instanceof NodeList)) {
                var candidates = flattenNodes(object);
            } else {
                continue checkNextObject;  // Silently drop this mystery object.
            }

            checkNextCandidate: for (var j = 0; j < candidates.length; ++j) {
                for (var k = nodes.length - 1; k > -1; --k) {
                    if (candidates[j] === nodes[k]) {
                        continue checkNextCandidate;  // Candidate node has already been witnessed.
                    }
                    var mask = candidates[j].compareDocumentPosition(nodes[k]);
                    if (mask & Node.DOCUMENT_POSITION_CONTAINS) {
                        continue checkNextCandidate;  // Candidate node is a descendant of a node that has already been witnessed.
                    } else if (mask & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                        // Candidate node is an ancestor of a node that has already been witnessed.
                        // We'll remove that node and add the candidate node instead.
                        nodes.splice(k, 1);
                    }
                }
                nodes.push(candidates[j]);  // Add candidate node.
            }
        }
        return nodes;
    }

    function nodeInclusiveQuerySelector(node, selector) {
        if ((node instanceof Document) || (node instanceof DocumentFragment)) {
            return node.querySelector(selector);
        } else if (node instanceof Element) {
            return elementMatches(node, selector) ? node : node.querySelector(selector);
        } else {
            return null;  // It's not a ParentNode.
        }
    }

    function nodeInclusiveQuerySelectorAll(node, selector) {
        if ((node instanceof Document) || (node instanceof DocumentFragment)) {
            return node.querySelectorAll(selector);
        } else if (node instanceof Element) {
            var results = [];
            if (elementMatches(node, selector)) results.push(node);
            results.push.apply(results, node.querySelectorAll(selector));
            return results;
        } else {
            return [];  // It's not a ParentNode;
        }
    }

    function nodeIsDisconnected(node) { return !nodeIsConnected(node); }

    // -----------------------------------------------------------------
    // Map-related utility functions
    // -----------------------------------------------------------------

    function mapValuesAsSet(m) {
        return setFromArray(mapValues(m));
    }

    // -----------------------------------------------------------------
    // Set-related utility functions
    // -----------------------------------------------------------------

    function setIntersection(xs, ys) {
        var zs = new Set();
        ys.forEach(function (y) { if (xs.has(y)) zs.add(y); });
        return zs;
    }

    function setUnion(xs, ys) {
        var zs = new Set();
        xs.forEach(function (x) { zs.add(x); });
        ys.forEach(function (y) { zs.add(y); });
        return zs;
    }

    function setUnionSelf(xs, ys) {
        ys.forEach(function (y) { xs.add(y); });
        return xs;
    }

    // -----------------------------------------------------------------
    // Wikia-related functions
    // -----------------------------------------------------------------

    var PARSE_JS_SNIPPETS_STACK_PUSH_REGEX = /^(?:\/\*<!\[CDATA\[\*\/)?JSSnippetsStack\.push\({dependencies:\[.*\],callback:function\(json\){(.+)\(json\)},id:"\1"(?:,options:(.*))?}\)(?:\/\*]]>\*\/)?$/;
    function parseJSSnippetsStackPush(node, expectedCallback) {
        if (!(node instanceof HTMLScriptElement)) return null;
        var result = PARSE_JS_SNIPPETS_STACK_PUSH_REGEX.exec(node.innerHTML);
        if (!(result && (result[1] === expectedCallback))) return null;
        if (result[2] === undefined) {
            var options = undefined;
            var spliceIndex = node.innerHTML.lastIndexOf('})');
            var spliceLength = 0;
        } else {
            var options = JSON.parse(result[2]);
            var spliceIndex = node.innerHTML.lastIndexOf(result[2] + '})');
            var spliceLength = result[2].length;
        }
        if (spliceIndex > -1) {
            var preamble = node.innerHTML.slice(0, spliceIndex);
            var postamble = node.innerHTML.slice(spliceIndex + spliceLength);
            var rewriteOptions = function (newOptions) {
                // For our use case, we wouldn't expect to mutate the options so much as to require CDATA wrapping.
                node.innerHTML = preamble + JSON.stringify(newOptions) + postamble;
            }
        } else {
            var rewriteOptions = undefined;  // This should not happen.
        }
        return {options: options, rewriteOptions: rewriteOptions};
    }

    // -----------------------------------------------------------------
    // Rewire-related functions
    // -----------------------------------------------------------------

    function extractIds(node, idCorpus) {
        return setFromArray(Array.prototype.map.call(nodeInclusiveQuerySelectorAll(node, idCorpus.selector()), idCorpus.extractId));
    }

    function generateNonce() {
        return ((Math.floor(Math.random() * 4294967296)).toString(16).padStart(8, '0'));
    }

    function makeIdCorpusSelector(generic, specific) {
        return function (id) {
            return (id === undefined) ? generic : specific.replace(/%s/g, function (match, offset, string) {
                return (string[offset - 1] !== '\\') ? cssEscape(id) : match;
            });
        };
    }

    var idCorpora = [];

    idCorpora.push({
        selector: makeIdCorpusSelector('[id]', '#%s'),
        extractId: function (node) { return node.id; },
        resolvers: [
            // <gallery type="slideshow"/>: <https://github.com/Wikia/app/tree/dev/extensions/wikia/WikiaPhotoGallery>
            function (conflictingId, node) {
                if (!node.classList.contains('wikia-slideshow')) return false;
                var js = parseJSSnippetsStackPush(node.nextSibling, 'WikiaPhotoGallerySlideshow.init');
                if (!(js && js.options && (js.options.id === conflictingId) && js.rewriteOptions)) return false;

                var nodesToIdSuffixes = new Map();
                nodesToIdSuffixes.set(node, '');
                var subNodes = node.querySelectorAll('a.wikia-slideshow-image');
                for (var i = 0; i < subNodes.length; ++i) {
                    var subNode = subNodes[i];
                    if (!subNode.id.startsWith(conflictingId + '-')) return false;
                    nodesToIdSuffixes.set(subNode, subNode.id.slice(conflictingId.length));
                }

                return {
                    generateNodesToNewIds: function () {
                        var prefix = 'slideshow-rewire_' + generateNonce();
                        var nodesToNewIds = new Map();
                        nodesToIdSuffixes.forEach(function (suffix, node) { nodesToNewIds.set(node, prefix + suffix); });
                        return nodesToNewIds;
                    },
                    patch: function (nodesToNewIds) {
                        nodesToNewIds.forEach(function (newId, node) { node.id = newId; });
                        js.options.id = nodesToNewIds.get(node);
                        js.rewriteOptions(js.options);
                    }
                };
            },
            // <gallery type="slider"/>: <https://github.com/Wikia/app/tree/dev/extensions/wikia/WikiaPhotoGallery>
            function (conflictingId, node) {
                if (!(conflictingId.startsWith('wikiaPhotoGallery-slider-body-') && node.classList.contains('wikiaPhotoGallery-slider-body'))) return false;
                var bareId = conflictingId.slice(30);
                var js = parseJSSnippetsStackPush(node.parentNode.nextSibling, 'WikiaPhotoGallerySlider.init');
                if (!(js && js.options && (String(js.options[0]) === bareId) && js.rewriteOptions)) return false;

                var nodesToIdAffixes = new Map();
                nodesToIdAffixes.set(node, ['wikiaPhotoGallery-slider-body-', '']);
                var subNodes = node.querySelectorAll('li[id^="wikiaPhotoGallery-slider-"]');
                for (var i = 0; i < subNodes.length; ++i) {
                    var subNode = subNodes[i];
                    var idSansPrefix = subNode.id.slice(25);
                    if (!idSansPrefix.startsWith(bareId + '-')) return false;
                    nodesToIdAffixes.set(subNode, ['wikiaPhotoGallery-slider-', idSansPrefix.slice(bareId.length)]);
                }

                return {
                    generateNodesToNewIds: function () {
                        var infix = 'rewire_' + generateNonce();
                        var nodesToNewIds = new Map();
                        nodesToIdAffixes.forEach(function (affix, node) { nodesToNewIds.set(node, affix[0] + infix + affix[1]); });
                        return nodesToNewIds;
                    },
                    patch: function (nodesToNewIds) {
                        nodesToNewIds.forEach(function (newId, node) { node.id = newId; });
                        js.options.splice(0, 1, nodesToNewIds.get(node).slice(30));
                        js.rewriteOptions(js.options);
                    }
                };
            },
            // <tabview/>: <https://github.com/Wikia/app/tree/dev/extensions/wikia/TabView>
            function (conflictingId, node) {
                if (!conflictingId.startsWith('flytabs_')) return false;
                var js = parseJSSnippetsStackPush(node.nextSibling, 'TabView.init');
                if (!(js && js.options && (js.options.id === conflictingId) && js.rewriteOptions)) return false;

                return {
                    generateNewId: function () { return 'flytabs_rewire_' + generateNonce(); },
                    patch: function (newId) {
                        node.id = newId;
                        js.options.id = newId;
                        js.rewriteOptions(js.options);
                    }
                };
            }
        ]
    });

    // <rss/>: <https://github.com/Wikia/app/tree/dev/extensions/wikia/WikiaRSS>
    idCorpora.push({
        selector: makeIdCorpusSelector('.wikiaRssPlaceholder[data-id]', '.wikiaRssPlaceholder[data-id="%s"]'),
        extractId: function (node) { return node.dataset.id; },
        resolvers: [
            function (conflictingId, node) {
                var js = parseJSSnippetsStackPush(node.previousSibling, 'WikiaRss.init');
                if (!(js && js.options && (String(js.options.id) === conflictingId) && js.rewriteOptions)) return false;

                return {
                    generateNewId: function () { return 'rewire_' + generateNonce(); },
                    patch: function (newId) {
                        node.dataset.id = newId;
                        js.options.id = newId;
                        js.rewriteOptions(js.options);
                    }
                };
            }
        ]
    });

    var loadables = [];

    // <twitter/>: <https://github.com/Wikia/app/tree/dev/extensions/wikia/TwitterTag>
    loadables.push({
        selector: 'a[data-wikia-widget="twitter"]',
        maybeInit: function (node) {
            if (!(window.twttr && window.twttr.widgets)) {
                mw.loader.load(['ext.TwitterTag'], null, true);
            } else {
                window.twttr.widgets.load(node);
            }
        }
    });

    var rewire = {};

    rewire.prepare = function () {
        var nodes = flattenNodes(arguments).filter(nodeIsDisconnected);
        if (!nodes.length) return;

        idCorpora.forEach(function (idCorpus) {
            var documentIds = extractIds(document, idCorpus);
            nodes.forEach(function (node) {
                do {
                    var candidateIds = extractIds(node, idCorpus);
                    var conflictingIds = setIntersection(documentIds, candidateIds);
                    var newDocumentIds = setUnion(documentIds, candidateIds);
                    if (!conflictingIds.size) break;

                    var numConflictingIdsResolved = 0;
                    conflictingIds.forEach(function (conflictingId) {
                        var allNodesResolved = Array.prototype.map.call(nodeInclusiveQuerySelectorAll(node, idCorpus.selector(conflictingId)), function (node) {
                            return idCorpus.resolvers.some(function (resolver) {
                                var nextStage = resolver(conflictingId, node);
                                if (!(nextStage && nextStage.patch)) return false;

                                if (nextStage.generateNewId) {
                                    do var newId = nextStage.generateNewId();
                                    while (newDocumentIds.has(newId));

                                    nextStage.patch(newId);
                                    newDocumentIds.add(newId);
                                    return true;
                                } else if (nextStage.generateNodesToNewIds) {
                                    do {
                                        var nodesToNewIds = nextStage.generateNodesToNewIds();
                                        var newIds = mapValuesAsSet(nodesToNewIds);
                                    } while (setIntersection(newDocumentIds, newIds).size);

                                    nextStage.patch(nodesToNewIds);
                                    setUnionSelf(newDocumentIds, newIds);
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        }).every(function (nodeResolved) { return nodeResolved; });
                        if (allNodesResolved) {
                            conflictingIds['delete'](conflictingId);
                            ++numConflictingIdsResolved;
                        };
                    });
                } while (conflictingIds.size && (numConflictingIdsResolved > 0));
                documentIds = newDocumentIds;

                if (conflictingIds.size && window.debug) {
                    var unresolvedIdsAsSelectors = new Set();
                    conflictingIds.forEach(function (unresolvedId) { unresolvedIdsAsSelectors.add(idCorpus.selector(unresolvedId)); });
                    console.log('[Rewire] Could not resolve the following identifier conflicts for node', node, ':', unresolvedIdsAsSelectors);
                }
            });
        });
    };

    rewire.load = function () {
        flattenNodes(arguments).filter(nodeIsConnected).forEach(function (node) {
            loadables.forEach(function (loadable) {
                if (nodeInclusiveQuerySelector(node, loadable.selector)) loadable.maybeInit();
            });
        });
    };

    window.dev.rewire = rewire;

    mw.hook('wikipage.content').add(function ($content) {
        rewire.load($content);
    });

    mw.hook('dev.rewire').fire(rewire);
}(this, jQuery, mediaWiki));