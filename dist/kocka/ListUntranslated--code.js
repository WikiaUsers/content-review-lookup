/**
 * Name:        ListUntranslated
 * Version:     v1.0
 * Author(s):   KockaAdmiralac <1405223@gmail.com>
 * Description: Lists untranslated articles
 */
$(function()
{
    // Waiting for mw.Api to get defined
    var mwApiIntervalListUntranslated = setInterval(function()
    {
        if(typeof mw !== 'undefined' && typeof mw.Api !== 'undefined')
        {
            clearInterval(mwApiIntervalListUntranslated);
            /**
             * Main object
             */
            var ListUntranslated = {
                // List of all articles
                allpages: [],
                // API object
                api: new mw.Api(),
                // Plugin configuration
                config: $.extend({
                    // Vocabulary configuration (I18N)
                    vocab: {
                        untranslated: "Non-translated pages",
                        language: "Language",
                        execute: "Execute",
                        close: "Close"
                    },
                    // Width of the modal
                    modalWidth: 500
                }, window.ListUntranslatedConfig),
                // List of translated pages
                translated: {},
                // List of languages
                languages: {},
                // Cached content of the language modal
                languageModalContent: "",
                /**
                 * Function called upon loading
                 */
                init: function()
                {
                    this.i18n = this.config.vocab || {};
                    this.getNextPage();
                    this.getLanguages();
                    this.insertUI();
                },
                /**
                 * Get next article
                 * @param [String] next
                 */
                getNextPage: function(next)
                {
                    this.api.get({
                        action: "query",
                        list: "allpages",
                        apnamespace: 0,
                        aplimit: 5000,
                        apfrom: next,
                        apfilterredir: 'nonredirects'
                    }).done($.proxy(function(d)
                    {
                        this.allpages = this.allpages.concat(d.query.allpages.map(function(el){ return el.title; }));
                        if(d["query-continue"]) this.getNextPage(d["query-continue"].allpages.apfrom);
                        else this.packPages();
                    }, this)).fail($.proxy(function(){ this.getNextPage(next); }, this));
                },
                /**
                 * Pack pages into arrays of 50 to be passed to API
                 */
                packPages: function()
                {
                    var packed = [], temp = [];
                    this.allpages.forEach(function(el)
                    {
                        temp.push(el);
                        if(temp.length === 50)
                        {
                            packed.push(temp);
                            temp = [];
                        }
                    });
                    packed.push(temp);
                    packed.forEach(function(el) { this.findTranslated(el); }, this);
                },
                /**
                 * Small method to map language element returned by API to the language
                 * @param [Object] el
                 */
                mapLangElement: function(el){ return el.lang; },
                /**
                 * Method to find translations of the page
                 * @param [Array] pack
                 * @param [String] next
                 * @todo Not sure how to handle query continues
                 */
                findTranslated: function(pack, next)
                {
                    this.api.get({
                        action: "query",
                        prop: "langlinks",
                        titles: pack.join("|"),
                        lllimit: 500,
                        llcontinue: next
                    }).done($.proxy(function(d)
                    {
                        console.log(d);
                        for(var prop in d.query.pages)
                        {
                            var page = d.query.pages[prop];
                            if(page.langlinks) this.translated[page.title] = page.langlinks.map(this.mapLangElement);
                        }
                    }, this)).fail($.proxy(function() { this.findTranslated(pack, next); }, this));
                },
                /**
                 * Get all available languages on Wikia
                 */
                getLanguages: function()
                {
                    this.api.get({
                        action: "query",
                        meta: "siteinfo",
                        siprop: "languages"
                    }).done($.proxy(function(d)
                    {
                        d.query.languages.forEach(function(el)
                        {
                            if(!this.languages[el['*']] && el.code !== mw.config.get('wgContentLanguage'))
                            {
                                this.languages[el['*']] = el.code;
                                this.languageModalContent += "<option>" + el['*'] + "</option>";
                            }
                        }, this);
                    }, this)).fail($.proxy(function(){ this.getLanguages(); }, this));
                },
                /**
                 * Insert UI elements and CSS
                 * @todo Monobook support
                 */
                insertUI: function()
                {
                    mw.util.addCSS("#ListUntranslatedResults{height:400px;overflow-y:auto}");
                    if(typeof skin !== 'undefined' && skin === "oasis") $("#my-tools-menu").append("<li class='custom' id='ListUntranslatedButton'><a>" + this.i18n.untranslated + "</a></li>");
                    $("#ListUntranslatedButton").click($.proxy(this.showModal, this));
                },
                /**
                 * Show the modal
                 */
                showModal: function()
                {
                    $.showCustomModal(this.i18n.untranslated, "<div id='ListUntranslatedModalMain'>" +
                        this.i18n.language + "<select id='ListUntranslatedLanguage'>" + this.languageModalContent +
                        "</select><br/><ul id='ListUntranslatedResults'></ul></div>",
                    {
                        id: "ListUntranslatedModal",
                        width: this.config.modalWidth,
                        buttons: [{
                            id: "ListUntranslatedExecuteButton",
                            defaultButton: true,
                            message: this.i18n.execute,
                            handler: $.proxy(function()
                            {
                                var content = "", lang = this.languages[$("#ListUntranslatedLanguage").val()];
                                for(var prop in this.translated)
                                    if(!this.translated[prop].includes(lang))
                                        content += "<li class='ListUntranslatedResultsListItem'><a href='" + location.origin + "/wiki/" + prop + "'>" + prop + "</a></li>";
                                $("#ListUntranslatedResults").html(content);
                            }, this)
                        },
                        {
                            id: "ListUntranslatedCloseButton",
                            defaultButton: true,
                            message: this.i18n.close,
                            handler: function() { $("#ListUntranslatedModal").closeModal(); }
                        }]
                    });
                }
            };
            // Loading...
            $($.proxy(ListUntranslated.init, ListUntranslated));
        }
    }, 100);
});