//Check for custom name
if (typeof(apiCustomName) == "undefined") {
    apiCustomName = "Javascript API";
}
//Define api object
var api = {
    version: 0.2,
    branch: "Stable",
    author: "Gamedezyner",
    cookie: {
        get: function(cookie_name, pos) {
            var x, y, cookie_array = document.cookie.split(";");
            for (var i = 0; i < cookie_array.length; i++) {
                x = cookie_array[i].substr(0, cookie_array[i].indexOf("="));
                y = cookie_array[i].substr(cookie_array[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == cookie_name) {
                    var style_objects = y.split(", ");
                    return unescape(style_objects[pos]);
                }
            }
        },
        set: function(cookie_name, data) {
            var domain = wgServer.split("//")[1];
            document.cookie =
                cookie_name + "=" + data +
                "; max-age=" + 60 * 60 * 24 * 150 +
                "; path=/; domain=" + domain;
        }
    },
    actions: {
        block: function() {
            this.action = "block";
            this.format = "json";
        },
        edit: function() {
            this.token = api.tokens().edit;
            this.action = "edit";
            this.bot = "true";
            this.format = "json";
        },
        patrol: function() {
            this.token = api.tokens().patrol;
            this.action = "patrol";
            this.bot = "true";
            this.format = "json";
        },
        query: function() {
            this.action = "query";
            this.format = "json";
        },
        post: function(params) {
            $.ajax({
                url: wgServer + "/api.php",
                type: "POST",
                async: false,
                cache: false,
                timeout: 30000,
                dataType: "JSON",
                data: params
            }).done(function(data) {
                params.result = "Success";
                params.response = data;
            }).fail(function() {
                params.result = "Fail";
            });
        }
    },
    functions: {
        appendText: function(target, text, summary) {
            thisEdit = new api.actions.edit;
            thisEdit.title = target;
            thisEdit.appendtext = text;
            thisEdit.summary = summary;
            api.actions.post(thisEdit);
            return thisEdit;
        },
        prependText: function(target, text, summary) {
            thisEdit = new api.actions.edit;
            thisEdit.title = target;
            thisEdit.prependtext = text;
            thisEdit.summary = summary;
            api.actions.post(thisEdit);
            return thisEdit;
        },
        getCategoryMembers: function(targetcat) {
            thisQuery = new api.actions.query;
            thisQuery.list = "categorymembers";
            thisQuery.cmtitle = targetcat;
            thisQuery.cmlimit = api.settings.pagelimit;
            api.actions.post(thisQuery);
            return thisQuery.response;
        },
        getPageContents: function(targetpage) {
            thisQuery = new api.actions.query;
            thisQuery.prop = "revisions";
            thisQuery.rvprop = "content";
            thisQuery.titles = targetpage;
            api.actions.post(thisQuery);
            thisQuery.pages = thisQuery.response.query.pages;
            key = Object.keys(thisQuery.pages)[0];
            if (key != "-1") {
                thisQuery.content = thisQuery.pages[key]["revisions"][0]["*"];
                return thisQuery.content;
            } else {
                return "error";
            }
        },
        deletePage: function(target, reason) {
            thisEdit = new api.actions.edit;
            thisEdit.action = "delete";
            if (typeof(target) == "string") {
                thisEdit.title = target;
            }
            if (typeof(target) == "number") {
                thisEdit.pageid = target;
            }
            thisEdit.reason = reason;
            api.actions.post(thisEdit);
            return thisEdit;
        },
        editPage: function(target, text, summary) {
            thisEdit = new api.actions.edit;
            if (typeof(target) == "string") {
                thisEdit.title = target;
            }
            if (typeof(target) == "number") {
                thisEdit.pageids = target;
            }
            thisEdit.text = text;
            thisEdit.summary = summary;
            api.actions.post(thisEdit);
            return thisEdit;
        }
    },
    settings: {
        throttle: 1000,
        pagelimit: 100,
        name: apiCustomName
    },
    tokens: function() {
        if (mw.user.tokens.get("patrolToken") == null) {
            tokenQuery = new api.actions.query;
            tokenQuery.list = 'recentchanges';
            tokenQuery.rctoken = 'patrol';
            tokenQuery.rclimit = 1;
            api.actions.post(tokenQuery);
            mw.user.tokens.values.patrolToken = tokenQuery.response.query.recentchanges[0].patroltoken;
        }
        if (mw.user.tokens.get("blockToken") == null) {
            tokenQuery = new api.actions.block;
            tokenQuery.user = wgUserName;
            tokenQuery.gettoken = true;
            api.actions.post(tokenQuery);
            mw.user.tokens.values.blockToken = tokenQuery.response.block.blocktoken;
        }
        return {
            edit: mw.user.tokens.get("editToken"),
            watch: mw.user.tokens.get("watchToken"),
            patrol: mw.user.tokens.get("patrolToken"),
            block: mw.user.tokens.get("blockToken")
        }
    },
    userlevel: function() {
        userlevel = 0;
        if (wgUserGroups.indexOf("sysop") > -1) {
            userlevel = 1;
        }
        if (wgUserGroups.indexOf("bureaucrat") > -1) {
            userlevel = 2;
        }
        if (wgUserGroups.indexOf("staff") > -1) {
            userlevel = 3;
        }
        return userlevel
    }
};