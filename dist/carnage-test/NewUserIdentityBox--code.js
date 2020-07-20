require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw", 
    "wikia.nirvana",
    require.optional("BannerNotification")
], function(window, document, $, mw, nirvana, BannerNotification){
    const CLASSNAMES = Object.freeze({
        MAIN: "ProfileHeader wds-profile__header",
        // Profile masthead
        MASTHEAD: "Masthead wds-profile__masthead",
        AVATAR: "MastheadAvatar wds-profile__avatar wds-avatar",
        AVATAR_IMAGE: "MastheadAvatarImage wds-profile__avatar-image wds-avatar__image",
        HEADER: "MastheadHeader wds-profile__masthead-header",
        HEADING: "MastheadHeading wds-profile__masthead-heading",
        SUBHEADING: "MastheadSubheading wds-profile__masthead-subheading",
        TAGS: "MastheadTags wds-profile__tags",
        TAG: "MastheadTag wds-profile__tag",
        INFO: "MastheadInfo wds-profile__info",
        SECTION: "MastheadInfoSection wds-profile__section",
        SECTION_HEAD: "MastheadInfoSectionHead wds-profile__section-head",
        SECTION_BODY: "MastheadInfoSectionBody wds-profile__section-body",
        TALLY: "MastheadTally wds-profile__tally",
        TALLY_MAIN: "MastheadTallyMain wds-profule__tally-main",
        TALLY_EDIT_COUNTER: "MastheadTallyCounter wds-profile__tally-counter",
        TALLY_EDIT_TEXT: "MastheadTallyText wds-profile__tally-text",
        TALLY_JOIN: "MastheadTallyJoin wds-profile__tally-join",
        TALLY_JOIN_HEAD: "MastheadTallyJoinHead wds-profile__tally-join-head",
        TALLY_JOIN_BODY: "MastheadTallyJoinBody wds-profile__tally-join-body",
        WIKIS: "MastheadWikis wds-profile__wikis",
        WIKI: "MastheadWiki wds-profile__wiki",
        OCCUPATION: "MastheadOccupation wds-profile__occupation",
        // User profile tabs
        TABS: "ProfileTabs wds-profile__tabs",
        TABS_INNER: "ProfileTabsContainer wds-profile__tabs-inner wds-tabs",
        TAB: "ProfileTab wds-profile__tab wds-tabs__tab",
        TAB_LABEL: "ProfileTabLabel wds-profile__tab-label wds-tabs__tab-label"
    });
    
    const RESOURCES = [
        { id: "colors", script: "u:dev:MediaWiki:Colors/code.js" },
        { id: "i18n", process: processI18n, script: "u:dev:MediaWiki:I18n-js/code.js" },
        { id: "enablewallext", script: "u:dev:MediaWiki:WgMessageWallsExist.js" },
        { id: "wds", script: "u:dev:MediaWiki:WDSIcons/code.js" }
    ];
    
    const NAME = "NewUserIdentityBox";
    
    function procesI18n(i18no){
        return $.when(i18no.loadMessages(NAME));
    }
    
    var DEFERRED = {}, LOADED = false;
    
    RESOURCES.forEach(function(resource){
        function process(){
            DEFERRED[resource.id] = $.Deferred();
            mw.hook("dev." + resource.id).add(processResource);
        }
        
        function processResource(){
            let a = arguments[0];
            if (typeof resource.process === "function"){
                $.when(resource.process.call(null, a)).done(DEFERRED[resource.id].resolve);
            } else {
                DEFERRED[resource.id].resolve(a);
            }
        }
        
        $(importArticle({ type: "script", article: resource.script }))
            .done(process);
    });
    
    function Masthead(options){
        options = Object.assign({}, options);
        if (!(this instanceof Masthead)) return new Masthead(options);
        
        this.staffLogo = "https://images.wikia.nocookie.net/common/extensions/wikia/DesignSystem/bower_components/design-system/dist/svg/wds-company-logo-fandom.svg";
        this.sections = [];
        this.username = mw.config.get("wgUserName");
        this.page = mw.config.get("wgPageName");
        this.domain = mw.config.get("wgServer");
        this.groups = mw.config.get("wgUserGroups");
        
        this.theme = options.theme || "";
        return this;
    }
    
    Masthead.prototype = {
        getProfileData: function(){
            return nirvana.getJson("UserProfilePage", "renderUserIdentityBox", {
                title: this.page.replace(/_/g, "")
            });
        },
        createHTML: function(){
            this.$main = $("<header>", { "class": CLASSNAMES.MAIN, "id": "ProfileHeader" });
            this.$masthead = $("<section>", { "class": CLASSNAMES.MASTHEAD });
            this.$tabs = $("<nav>", { "class": CLASSNAMES.TABS });
        }
    };
    
    Object.keys(DEFERRED).forEach(function(key){
        $.when(DEFERRED[key]).done(function(value){
            if (key !== "i18n"){
                Masthead[key] = value;
            } else {
                Masthead.i18no = value;
                Masthead[key] = {};
                Masthead[key].messages = {};
                
                var messages = value._messages.en;
                Object.keys(messages).forEach(function(msg){
                    var message = value.msg(msg), base = {};
                    base.parse = message.parse();
                    base.escape = message.escape();
                    base.plain = message.plain();
                    base.replace = function(){
                        var a = Array.from(arguments),
                            _msg = value.msg.apply(this, a), o = {};
                        o.parse = _msg.parse();
                        o.escape = _msg.escape();
                        o.plain = _msg.plain();
                        return o;
                    };
                    Masthead[key].messages[msg] = base;
                });
            }
        });
    });
});