mw.loader.implement("SearchModal-Diqkpiub.js@1i38c", function($, jQuery, require, module) {
    /*@nomin*/
    var exports = {};
    require = window.fandomRequire || require;
    var index = require("./index-gVf2G9FK.js")
      , SearchModalApp = require("./SearchModalApp-BwokS_3X.js");
    function SearchModal(e) {
        return SearchModalApp.searchModalRender(index.React.createElement(SearchModalApp.SearchModalApp, null), e)
    }
    require("./_commonjsHelpers-Cyo8WBrJ.js"),
    require("./client-CzBcU33f.js"),
    require("./useTranslation-jTn9ikm-.js"),
    require("./env-B6wlgd82.js"),
    require("./_object_spread-Czkdil6m.js"),
    require("./_define_property-BS3YYi8G.js"),
    require("./_to_consumable_array-Cs8tLCwI.js"),
    require("./_unsupported_iterable_to_array-DfCX8vQ2.js"),
    require("./_sliced_to_array-BqkCFxvp.js"),
    require("./index-CIv83_KC.js"),
    require("./tslib.es6-c0cde917-D3JG3kvp.js"),
    require("./index-BUbqVfk1.js"),
    require("./ofType-Dlzjzzz5.js"),
    require("./_create_class-CVg0P84R.js"),
    require("./_object_spread_props-BwOhuI8I.js"),
    require("./_async_to_generator-1-lAVrQT.js"),
    require("./tslib.es6-vw_BMgip.js"),
    require("./index-DKT_f9qK.js"),
    require("./tooltips-BYh0x3gF.js"),
    require("./index-Crx1YJIV.js"),
    require("./InternalTracker-C283RyCX.js"),
    require("./_object_without_properties-D9Y0BAY7.js"),
    require("./js.cookie-BsVx4kCt.js"),
    require("./searchModalUtils-B6DLK-SC.js"),
    require("./tracking-B_14lK3Q.js"),
    require("./index-HE1dxjNu.js"),
    require("./Tracker-D7l7MoVX.js"),
    require("./first-BPCGT0Uz.js"),
    require("./style-inject.es-C5GBklBY.js"),
    require("./SearchModalInit-Dkutzbqy.js"),
    require("./geo-CJDOL6aW.js"),
    exports.default = SearchModal,
    module.exports = exports;

});
mw.loader.implement("SearchModalApp-BwokS_3X.js@1xw7n", function($, jQuery, require, module) {
    /*@nomin*/
    var exports = {};
    require = window.fandomRequire || require;
    var index = require("./index-gVf2G9FK.js")
      , client = require("./client-CzBcU33f.js")
      , useTranslation = require("./useTranslation-jTn9ikm-.js")
      , env = require("./env-B6wlgd82.js")
      , _sliced_to_array = require("./_sliced_to_array-BqkCFxvp.js")
      , index$3 = require("./index-CIv83_KC.js")
      , ofType = require("./ofType-Dlzjzzz5.js")
      , _async_to_generator = require("./_async_to_generator-1-lAVrQT.js")
      , tslib_es6 = require("./tslib.es6-vw_BMgip.js")
      , index$2 = require("./index-DKT_f9qK.js")
      , tooltips = require("./tooltips-BYh0x3gF.js")
      , index$1 = require("./index-Crx1YJIV.js")
      , InternalTracker = require("./InternalTracker-C283RyCX.js")
      , searchModalUtils = require("./searchModalUtils-B6DLK-SC.js")
      , styleInject_es = require("./style-inject.es-C5GBklBY.js")
      , _define_property = require("./_define_property-BS3YYi8G.js")
      , index$4 = require("./index-BUbqVfk1.js")
      , tracking = require("./tracking-B_14lK3Q.js");
    require("./Tracker-D7l7MoVX.js");
    var _create_class = require("./_create_class-CVg0P84R.js")
      , _object_spread = require("./_object_spread-Czkdil6m.js")
      , _object_spread_props = require("./_object_spread_props-BwOhuI8I.js")
      , _to_consumable_array = require("./_to_consumable_array-Cs8tLCwI.js")
      , SearchModalInit = require("./SearchModalInit-Dkutzbqy.js")
      , geo = require("./geo-CJDOL6aW.js");
    function searchModalRender(e, t) {
        var r = client.createRoot(t);
        return r.render(index.React.createElement(useTranslation.I18nContext.Provider, {
            value: env.mwMessages
        }, e)),
        function() {
            r.unmount()
        }
    }
    var css_248z$2 = ".SearchInput-module_input__LhjJF{background-color:initial;border:0;color:var(--fandom-text-color);display:block;flex:1;font-family:inherit;font-size:14px;outline:none;padding:2px 12px 2px 0;width:100%}.SearchInput-module_input__LhjJF::placeholder{color:rgba(var(--theme-page-text-color--rgb),.5)}.SearchInput-module_form__fAwdT{align-items:center;border-bottom:2px solid var(--fandom-accent-color);display:flex;padding-bottom:3px}.SearchInput-module_form__fAwdT .wds-button{--wds-primary-button-background-color:var(--fandom-accent-color);--wds-primary-button-background-color--hover:var(--fandom-accent-color--hover);--wds-primary-button-label-color:var(--fandom-accent-label-color)}.SearchInput-module_form__fAwdT .wds-button[type=button]{--wds-text-button-label-color:var(--fandom-text-color);--wds-text-button-label-color--hover:var(--fandom-text-color--hover)}.SearchInput-module_closeIcon__fxb9d{color:#fff;cursor:pointer;margin-left:100%;position:absolute;right:0;top:-42px}.SearchInput-module_arrowIcon__rnnHG{transform:rotate(180deg)}.SearchInput-module_clearButton__TioEW{font-size:14px;font-weight:400;padding-right:12px;text-transform:none}"
      , styles$2 = {
        input: "SearchInput-module_input__LhjJF",
        form: "SearchInput-module_form__fAwdT",
        closeIcon: "SearchInput-module_closeIcon__fxb9d",
        arrowIcon: "SearchInput-module_arrowIcon__rnnHG",
        clearButton: "SearchInput-module_clearButton__TioEW"
    };
    function SearchInput(e) {
        var t = e.results
          , r = e.setResults
          , a = e.selectedIndex
          , n = e.setSelectedIndex
          , s = e.visibleQuery
          , i = e.setVisibleQuery
          , l = e.query
          , o = e.setQuery
          , c = e.internalSearch
          , d = t.length + 1
          , u = index.reactExports.useRef()
          , _ = index.reactExports.useRef(null)
          , m = index.reactExports.useRef(null)
          , h = useTranslation.useTranslation()
          , p = _sliced_to_array._sliced_to_array(index.reactExports.useState(!1), 2)
          , g = p[0]
          , f = p[1]
          , x = "1" === env.mwUser.options.get("enableGoSearch")
          , v = searchModalUtils.isValidBeacon()
          , S = function(e, t) {
            return t.findIndex((function(t) {
                return e.trim().toLowerCase() === t.toLowerCase()
            }
            )) > -1
        };
        index.reactExports.useEffect((function() {
            m.current && tooltips.handleElementWithTooltip_1(m.current),
            a >= 0 && a < t.length ? (i(t[a].title),
            f(!0)) : (i(l),
            f(-1 === a && x && S(l, t.map((function(e) {
                return e.title
            }
            )))))
        }
        ), [a]),
        index.reactExports.useEffect((function() {
            var e;
            (u.current && u.current.abort(),
            y(l),
            l) || (null === (e = _.current) || void 0 === e || e.focus(),
            r([]),
            n(-1))
        }
        ), [l]),
        index.reactExports.useEffect((function() {
            f(-1 === a && x && S(l, t.map((function(e) {
                return e.title
            }
            ))))
        }
        ), [t]);
        var y = index.reactExports.useCallback(index$1.debounce(250, function() {
            var e = _async_to_generator._async_to_generator((function(e) {
                var t, a, s, i, l, o, d, _, m, h, p, g, f;
                return tslib_es6.__generator(this, (function(x) {
                    switch (x.label) {
                    case 0:
                        if (!e)
                            return [2];
                        ofType.communicationService.dispatch({
                            type: "[Search suggestions] Called",
                            query: e
                        }),
                        t = env.mwConfig.get("wgContentLanguage"),
                        a = env.mwConfig.get("wgServer") + env.mwConfig.get("wgScriptPath"),
                        s = t.startsWith("zh"),
                        x.label = 1;
                    case 1:
                        return x.trys.push([1, 8, , 9]),
                        u.current = new AbortController,
                        s ? [4, fetch(a + "/api.php?action=query&list=prefixsearch&pssearch=".concat(e.replace("#", " "), "&pslimit=6&format=json"), {
                            signal: u.current.signal
                        })] : [3, 4];
                    case 2:
                        return [4, x.sent().json()];
                    case 3:
                        return i = x.sent(),
                        r(i.query.prefixsearch.map((function(e) {
                            return {
                                title: e.title,
                                url: searchModalUtils.getLocalArticleURL(e.title),
                                redirect: null,
                                image: null
                            }
                        }
                        ))),
                        [3, 7];
                    case 4:
                        return (l = new URL(a + "/wikia.php")).searchParams.append("controller", "UnifiedSearchSuggestions"),
                        l.searchParams.append("method", "getSuggestions"),
                        l.searchParams.append("query", e.replace("#", " ")),
                        l.searchParams.append("format", "json"),
                        l.searchParams.append("scope", c ? "internal" : "cross-wiki"),
                        [4, fetch(l.toString(), {
                            signal: u.current.signal
                        })];
                    case 5:
                        return [4, x.sent().json()];
                    case 6:
                        o = x.sent(),
                        c ? (null == o ? void 0 : o.suggestions) && (d = o.suggestions.map((function(e) {
                            var t = e
                              , r = searchModalUtils.getLocalArticleURL(e)
                              , a = null
                              , n = null;
                            return o.images && o.ids && (n = o.images[o.ids[e]]),
                            o.redirects && (a = Object.keys(o.redirects).find((function(t) {
                                return o.redirects[t] === e
                            }
                            ))),
                            {
                                title: t,
                                url: r,
                                redirect: a,
                                image: n
                            }
                        }
                        )),
                        r(d)) : (null == o ? void 0 : o.data) && (_ = o.data.map((function(e) {
                            return {
                                title: e.title,
                                url: e.url,
                                redirect: null,
                                image: e.thumbnail
                            }
                        }
                        )),
                        r(_)),
                        (null == o ? void 0 : o.images) && v && (m = 0,
                        h = 0,
                        p = 0,
                        Object.entries(o.images).forEach((function(e) {
                            var t = _sliced_to_array._sliced_to_array(e, 1)[0];
                            m++,
                            t ? h++ : p++
                        }
                        )),
                        g = "search-performed-results-with-images | valid: ".concat(h, " | invalid ").concat(p, " | total: ").concat(m, " "),
                        searchModalUtils.track({
                            label: g,
                            action: InternalTracker.ACTIONS.IMPRESSION
                        })),
                        x.label = 7;
                    case 7:
                        return f = "search-performed ".concat(v ? "with-images" : ""),
                        searchModalUtils.track({
                            label: f,
                            action: InternalTracker.ACTIONS.IMPRESSION
                        }),
                        n(-1),
                        [3, 9];
                    case 8:
                        return x.sent(),
                        [3, 9];
                    case 9:
                        return [2]
                    }
                }
                ))
            }
            ));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()), [])
          , w = c ? h("search-modal-search-placeholder-in-wiki", env.mwConfig.get("wgSiteName")) : h("search-modal-search-placeholder-cross-wiki");
        return index.React.createElement("form", {
            onSubmit: function(e) {
                !function(e) {
                    e.preventDefault();
                    var r = a === d - 1;
                    -1 === a || r ? (searchModalUtils.openSearchResultsPage(l, !r, c),
                    searchModalUtils.track({
                        label: "submit-search-results ".concat(v ? "with-images" : "")
                    })) : (searchModalUtils.openArticle(t[a].url),
                    searchModalUtils.track({
                        label: "submit-view-page ".concat(v ? "with-images" : "")
                    }))
                }(e)
            },
            className: styles$2.form
        }, index.React.createElement("input", {
            className: "".concat(styles$2.input, " search-input"),
            value: s,
            onChange: function(e) {
                !function(e) {
                    o(e.target.value),
                    i(e.target.value)
                }(e)
            },
            ref: _,
            placeholder: w,
            onKeyDown: function(e) {
                !function(e) {
                    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
                        var t = -1;
                        "ArrowUp" === e.key ? t = a - 1 : "ArrowDown" === e.key && (t = a + 1),
                        t < -1 ? t = d - 1 : t >= d && (t = -1),
                        n(t)
                    }
                }(e)
            },
            autoFocus: !0,
            "data-testid": "search-modal-input"
        }), s.length > 0 && index.React.createElement(index$2.Button, {
            text: !0,
            type: "button",
            className: "".concat(styles$2.clearButton, " search-clear-button"),
            onClick: function() {
                o(""),
                i("")
            }
        }, h("search-modal-clear")), index.React.createElement("button", {
            type: "submit",
            className: "wds-button wds-is-square",
            ref: m,
            "data-wds-tooltip": h(g ? "search-modal-view-page" : "search"),
            "data-wds-tooltip-position": "top",
            "data-testid": g ? "search-modal__submit-view-page" : "search-modal__submit-search",
            disabled: 0 === s.length
        }, g ? index.React.createElement(index$3.Icon, {
            small: !0,
            name: "arrow-small",
            className: styles$2.arrowIcon
        }) : index.React.createElement(index$3.Icon, {
            small: !0,
            name: "magnifying-glass-small"
        })))
    }
    styleInject_es.styleInject(css_248z$2);
    var css_248z$1 = ".SearchResultHightlight-module_highlight__t087Y{font-weight:700}"
      , styles$1 = {
        highlight: "SearchResultHightlight-module_highlight__t087Y"
    };
    function escapeRegex(e) {
        return e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function SearchResultHighlight(e) {
        var t = e.text
          , r = e.pattern
          , a = new RegExp("^(".concat(escapeRegex(r), ")"),"gi")
          , n = t.split(a).filter((function(e) {
            return !!e
        }
        ));
        return index.React.createElement("span", null, n.map((function(e, t) {
            return 0 === t && e.match(a) ? index.React.createElement("span", {
                key: t,
                className: styles$1.highlight
            }, e) : e
        }
        )))
    }
    styleInject_es.styleInject(css_248z$1);
    var css_248z = ".SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a.SearchResults-module_seeAllResults__TFicN{color:var(--fandom-link-color);font-weight:700}.SearchResults-module_seeAllResults__TFicN .wds-icon{margin-left:6px;transform:rotate(180deg)}.SearchResults-module_results__k8itn.wds-list.wds-is-linked{margin-top:12px;padding:0}.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a{align-items:center;border:1px solid #0000;border-radius:3px;color:var(--fandom-text-color);display:flex;line-height:1.25;padding:9px 6px;transition:none}.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a.SearchResults-module_hasImage__BBNrD{padding:6px}@media only screen and (max-width:767px){.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a.SearchResults-module_hasImage__BBNrD{margin:3px 0}}.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a.SearchResults-module_isSelected__7oTZQ,.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a:hover{background-color:var(--fandom-link-color--fadeout)}.SearchResults-module_results__k8itn.wds-list.wds-is-linked>li>a.SearchResults-module_isSelected__7oTZQ{border-color:var(--fandom-link-color)}.SearchResults-module_searchResultImageContainer__saGjK{align-items:center;background-color:#d6d0d5;background-position:50%;background-repeat:no-repeat;background-size:cover;border-right:3px solid var(--theme-accent-color);display:flex;height:36px;justify-content:center;margin-right:6px;width:39px}.SearchResults-module_searchResultIconContainer__8hd07{align-items:center;background-color:#fff;border-radius:100px;display:flex;height:30px;justify-content:center;width:30px}.SearchResults-module_searchResultIconContainer__8hd07 svg{fill:var(--theme-accent-color)}.SearchResults-module_searchResultRedirect__16ND6{color:var(--fandom-text-color--secondary);font-size:12px;font-style:italic;font-weight:400;margin-left:5px}"
      , styles = {
        results: "SearchResults-module_results__k8itn",
        seeAllResults: "SearchResults-module_seeAllResults__TFicN",
        hasImage: "SearchResults-module_hasImage__BBNrD",
        isSelected: "SearchResults-module_isSelected__7oTZQ",
        searchResultImageContainer: "SearchResults-module_searchResultImageContainer__saGjK",
        searchResultIconContainer: "SearchResults-module_searchResultIconContainer__8hd07",
        searchResultRedirect: "SearchResults-module_searchResultRedirect__16ND6"
    };
    function useUrlWithTrackParam(e, t) {
        return index.reactExports.useMemo((function() {
            var r = new URL(e);
            return r.searchParams.append("so", t),
            r.toString()
        }
        ), [e])
    }
    styleInject_es.styleInject(css_248z);
    var trackSearchSeeding = tracking.buildGlobalComponentsTracker({
        category: "search-seeding",
        trackingMethod: InternalTracker.TRACKING_METHODS.ANALYTICS
    })
      , searchDataKey = "SearchExperimentSearchData"
      , getWikiId = function() {
        return env.mwConfig.get("wgCityId")
    }
      , filterUnique = function(e) {
        var t = e.map((function(e) {
            return e.toLowerCase()
        }
        ));
        return e.filter((function(e, r) {
            return -1 === t.slice(0, r).indexOf(e.toLowerCase())
        }
        ))
    }
      , removeLastUnmodifiedWikiData = function(e) {
        var t = (new Date).getTime()
          , r = "";
        if (Object.keys(e).forEach((function(a) {
            e[a].lastModified < t && (t = e[a].lastModified,
            r = a)
        }
        )),
        r) {
            var a = _object_spread._object_spread({}, e);
            return delete a[r],
            a
        }
        return {}
    }
      , SearchExperimentStoreData = function() {
        function e() {
            _create_class._class_call_check(this, e)
        }
        return _create_class._create_class(e, null, [{
            key: "storageData",
            get: function() {
                return JSON.parse(localStorage.getItem(searchDataKey)) || {}
            },
            set: function(t) {
                try {
                    localStorage.setItem(searchDataKey, JSON.stringify(t))
                } catch (a) {
                    if ("QUOTA_EXCEEDED_ERR" === (null == a ? void 0 : a.name)) {
                        var r = removeLastUnmodifiedWikiData(t);
                        Object.keys(r).length && (e.storageData = r)
                    }
                }
            }
        }, {
            key: "wikiData",
            get: function() {
                return e.storageData[getWikiId()] || {
                    queries: [],
                    articles: [],
                    lastModified: (new Date).getTime()
                }
            },
            set: function(t) {
                e.storageData = _object_spread_props._object_spread_props(_object_spread._object_spread({}, this.storageData), _define_property._define_property({}, getWikiId(), _object_spread_props._object_spread_props(_object_spread._object_spread({}, t), {
                    lastModified: (new Date).getTime()
                })))
            }
        }]),
        e
    }();
    _define_property._define_property(SearchExperimentStoreData, "saveSearchQuery", (function(e) {
        var t;
        if (!(null === env.mwUser || void 0 === env.mwUser || null === (t = env.mwUser.getId) || void 0 === t ? void 0 : t.call(env.mwUser))) {
            var r = SearchExperimentStoreData.wikiData;
            (null == r ? void 0 : r.queries) || (r.queries = []),
            r.queries = filterUnique([e].concat(_to_consumable_array._to_consumable_array(r.queries))).slice(0, 5),
            SearchExperimentStoreData.wikiData = r
        }
    }
    )),
    _define_property._define_property(SearchExperimentStoreData, "saveVisitedArticle", (function(e) {
        var t;
        if (!(null === env.mwUser || void 0 === env.mwUser || null === (t = env.mwUser.getId) || void 0 === t ? void 0 : t.call(env.mwUser))) {
            var r = SearchExperimentStoreData.wikiData;
            (null == r ? void 0 : r.articles) || (r.articles = []),
            r.articles = filterUnique([e].concat(_to_consumable_array._to_consumable_array(r.articles))).slice(0, 6),
            SearchExperimentStoreData.wikiData = r
        }
    }
    ));
    var NewTabLinkContext = index.reactExports.createContext(!1);
    function SearchResults$1(e) {
        var t = e.results
          , r = e.visibleQuery
          , a = e.query
          , n = e.selectedIndex
          , s = e.internalSearch
          , i = t.length + 1
          , l = useTranslation.useTranslation()
          , o = index.reactExports.useContext(NewTabLinkContext);
        return index.React.createElement("ul", {
            className: index$4.cn("wds-list", "wds-is-linked", styles.results)
        }, t.map((function(e, t) {
            return index.React.createElement("li", {
                key: e.title
            }, index.React.createElement(SearchLink, {
                result: e,
                query: a,
                isSelected: t === n,
                visibleQuery: r,
                internalSearch: s
            }))
        }
        )), index.React.createElement("li", null, index.React.createElement("a", {
            href: searchModalUtils.getSearchPageURL(r, !1, s),
            onClick: function(e) {
                e.preventDefault(),
                searchModalUtils.track({
                    label: "suggestion-search-results"
                });
                var t = searchModalUtils.getSearchPageURL(r, !1, s);
                o ? window.open(t, "_blank") : window.location.href = t
            },
            className: index$4.cn(_define_property._define_property({}, styles.isSelected, i - 1 === n), styles.seeAllResults)
        }, l("search-modal-see-all-results", r), index.React.createElement(index$3.Icon, {
            name: "arrow-tiny",
            tiny: !0
        }))))
    }
    function SearchLink(e) {
        var t = e.isSelected
          , r = e.result
          , a = e.query
          , n = e.visibleQuery
          , s = e.internalSearch
          , i = index.reactExports.useContext(NewTabLinkContext)
          , l = useUrlWithTrackParam(r.url, "search");
        return index.React.createElement("a", {
            href: l,
            onClick: function(e) {
                e.preventDefault(),
                searchModalUtils.track({
                    label: "suggestion-click ".concat(searchModalUtils.isValidBeacon() ? "with-images" : "")
                }),
                s && (SearchExperimentStoreData.saveVisitedArticle(r.title),
                SearchExperimentStoreData.saveSearchQuery(n)),
                i ? window.open(l, "_blank") : window.location.href = l
            },
            className: index$4.cn(_define_property._define_property({}, styles.isSelected, t), _define_property._define_property({}, styles.hasImage, searchModalUtils.isValidBeacon())),
            "data-testid": "search-modal-result"
        }, searchModalUtils.isValidBeacon() && index.React.createElement(SearchResultImage, {
            img: r.image
        }), index.React.createElement(SearchResultHighlight, {
            text: r.title,
            pattern: a
        }), r.redirect && index.React.createElement("span", {
            className: styles.searchResultRedirect
        }, "(Redirected from ", index.React.createElement(SearchResultHighlight, {
            text: r.redirect,
            pattern: a
        }), ")"))
    }
    var SearchResultImage = function(e) {
        var t = e.img;
        return index.React.createElement(index.React.Fragment, null, t ? index.React.createElement("div", {
            className: styles.searchResultImageContainer,
            style: {
                backgroundImage: "url(".concat(t, ")")
            }
        }) : index.React.createElement("div", {
            className: styles.searchResultImageContainer
        }, index.React.createElement("div", {
            className: styles.searchResultIconContainer
        }, index.React.createElement(index$3.Icon, {
            name: "page-small",
            small: !0
        }))))
    };
    function SearchButton(e) {
        return index.React.createElement("div", {
            className: "highlight__wiki-btn ".concat((null == e ? void 0 : e.articleCount) ? "highlight__wiki-btn__variant" : "")
        }, index.React.createElement(index$3.Icon, {
            name: "wikis-tiny",
            tiny: !0,
            fill: "var(--fandom-text-color)"
        }), index.React.createElement("span", {
            className: "tag-button__title"
        }, e.title))
    }
    function SearchResultsHeader() {
        var e = env.mwConfig.get("wgServer") + env.mwConfig.get("wgScriptPath")
          , t = index.React.createElement("p", {
            className: "top-results__header top-results__header--bold"
        }, "Top Trending Searches in:", index.React.createElement(SearchButton, {
            title: searchModalUtils.removeWikiWord(env.mwConfig.get("wgSiteName")),
            url: e
        }));
        return index.React.createElement(index.React.Fragment, null, t)
    }
    var SearchResults = function(e) {
        var t, r, a, n, s, i, l, o = e.topResults, c = e.isLoggedOut;
        index.React.useEffect((function() {
            var e = void 0 === (null == o ? void 0 : o.search_phrases) ? [] : null == o ? void 0 : o.search_phrases.map((function(e) {
                return e.term
            }
            ));
            trackSearchSeeding({
                label: e.join(","),
                action: "impression"
            })
        }
        ), []);
        var d = null !== (l = null === window || void 0 === window || null === (n = window.ads) || void 0 === n || null === (a = n.context) || void 0 === a || null === (r = a.opts) || void 0 === r || null === (t = r.noAdsReasons) || void 0 === t ? void 0 : t.length) && void 0 !== l && l;
        return index.React.createElement("div", {
            className: "top-results"
        }, index.React.createElement("div", null, index.React.createElement(SearchResultsHeader, null)), index.React.createElement("div", null, index.React.createElement("ul", {
            className: "top-results__list"
        }, c && !d && (null == o ? void 0 : o.sponsored) && index.React.createElement("li", {
            className: "top-results__item"
        }, index.React.createElement("a", {
            className: "top-results__link",
            rel: "nofollow",
            href: o.sponsored.url
        }, o.sponsored.title, index.React.createElement("span", {
            className: "top-results__label"
        }, void 0 === (null === (s = o.sponsored) || void 0 === s ? void 0 : s.label) ? "Sponsored" : o.sponsored.label)), o.sponsored.pixel && index.React.createElement("img", {
            src: o.sponsored.pixel,
            width: "1",
            height: "1",
            alt: ""
        })), null == o || null === (i = o.search_phrases) || void 0 === i ? void 0 : i.map((function(e) {
            return renderItem(e)
        }
        )).slice(0, 8))))
    };
    function renderItem(e) {
        var t = index.React.useContext(NewTabLinkContext)
          , r = useUrlWithTrackParam(searchModalUtils.getSearchPageURL(e.term, !0, !0), "trending");
        return index.React.createElement("li", {
            key: e.term,
            className: "top-results__item"
        }, index.React.createElement("a", {
            className: "top-results__link",
            href: r,
            onClick: function(a) {
                a.preventDefault(),
                trackSearchSeeding({
                    label: "".concat(e.term, " | article-click"),
                    action: "click"
                }),
                t ? window.open(r, "_blank") : window.location.href = r
            }
        }, e.term))
    }
    var SearchModalSeeding = function() {
        var e = _sliced_to_array._sliced_to_array(index.React.useState(!1), 2)
          , t = e[0]
          , r = e[1]
          , a = _sliced_to_array._sliced_to_array(index.React.useState(null), 2)
          , n = a[0]
          , s = a[1];
        return index.React.useEffect((function() {
            function e() {
                return (e = _async_to_generator._async_to_generator((function() {
                    var e, t, a, n;
                    return tslib_es6.__generator(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            return i.trys.push([0, 3, , 4]),
                            [4, fetch(getTopResultsEndpoint())];
                        case 1:
                            return [4, i.sent().json()];
                        case 2:
                            return a = i.sent(),
                            s(a),
                            (null == a || null === (t = a.sponsored) || void 0 === t || null === (e = t.targeting) || void 0 === e ? void 0 : e.geo) && !a.sponsored.targeting.geo.includes(geo.getCountryCode()) && (a.sponsored = void 0),
                            (a.sponsored || a.search_phrases && a.search_phrases.length > 0) && r(!0),
                            [3, 4];
                        case 3:
                            return n = i.sent(),
                            console.warn("fetchSearchPhrases issue:", n),
                            [3, 4];
                        case 4:
                            return [2]
                        }
                    }
                    ))
                }
                ))).apply(this, arguments)
            }
            !function() {
                e.apply(this, arguments)
            }()
        }
        ), []),
        t ? index.React.createElement("div", {
            className: "search-seeding"
        }, index.React.createElement(SearchResults, {
            topResults: n,
            isLoggedOut: isLoggedOutUser()
        })) : null
    };
    function getTopResultsEndpoint() {
        return env.mwConfig.get("wgScriptPath") + "/wikia.php?controller=SearchSeeding&method=getLocalSearchInfo&format=json"
    }
    function isLoggedOutUser() {
        return !env.mwConfig.get("wgUserId")
    }
    function SearchModalApp() {
        var e = _sliced_to_array._sliced_to_array(index.reactExports.useState(""), 2)
          , t = e[0]
          , r = e[1]
          , a = _sliced_to_array._sliced_to_array(index.reactExports.useState(""), 2)
          , n = a[0]
          , s = a[1]
          , i = _sliced_to_array._sliced_to_array(index.reactExports.useState(-1), 2)
          , l = i[0]
          , o = i[1]
          , c = _sliced_to_array._sliced_to_array(index.reactExports.useState([]), 2)
          , d = c[0]
          , u = c[1]
          , _ = _sliced_to_array._sliced_to_array(index.reactExports.useState(!1), 2)
          , m = _[0]
          , h = _[1]
          , p = env.mwConfig.get("wgIsFancentralWiki")
          , g = env.isWiki() && !p
          , f = function(e) {
            "Control" !== e.key && "Meta" !== e.key || h(!0)
        }
          , x = function(e) {
            "Control" !== e.key && "Meta" !== e.key || h(!1)
        };
        return index.reactExports.useEffect((function() {
            return document.addEventListener("keydown", f),
            document.addEventListener("keyup", x),
            function() {
                document.removeEventListener("keydown", f),
                document.removeEventListener("keyup", x)
            }
        }
        ), []),
        index.reactExports.useEffect((function() {
            ofType.communicationService.dispatch({
                type: "[Search suggestions] Initialized"
            })
        }
        ), []),
        index.React.createElement(NewTabLinkContext.Provider, {
            value: m
        }, index.React.createElement(index$3.Icon, {
            name: "close",
            className: styles$2.closeIcon,
            onClick: SearchModalInit.closeSearchModal,
            "data-testid": "search-modal-icon-close"
        }), index.React.createElement(SearchInput, {
            results: d,
            setResults: u,
            visibleQuery: n,
            setVisibleQuery: s,
            query: t,
            setQuery: r,
            selectedIndex: l,
            setSelectedIndex: o,
            internalSearch: g
        }), d.length > 0 && index.React.createElement(SearchResults$1, {
            results: d,
            visibleQuery: n,
            selectedIndex: l,
            query: t,
            internalSearch: g
        }), env.isWiki() && 0 === d.length && index.React.createElement(SearchModalSeeding, null))
    }
    exports.SearchModalApp = SearchModalApp,
    exports.searchModalRender = searchModalRender,
    module.exports = exports;

});