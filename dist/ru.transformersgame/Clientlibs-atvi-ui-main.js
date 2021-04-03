var ATVI = ATVI || {};

(function($) {

ATVI.utils =  {
    renderTemplate: function(template, fieldData, prefix, suffix) {
        prefix = prefix || "{{";
        suffix = suffix || "}}";
        var ret = template;
        for(var field in fieldData) {
            ret = ret.replace(new RegExp(prefix + field + suffix, "g"), fieldData[field]);
        }
        return ret;
    },

    getCookies: (function() {
        var map;
        return function(update) {
            if(!map || update) {
                map = {};
                var i, cookies = document.cookie.split(";");
                for (i = 0; i < cookies.length; i++) {
                    var index = cookies[i].indexOf('=');
                    var x = cookies[i].substr(0, index);
                    var y = cookies[i].substr(index + 1);
                    x = x.replace(/^\s+|\s+$/g, '');
                    if(x) map[x] = unescape(y);
                }
            }
            return map;
        };
    })(),

    getCookie: function(name, update) {
        return ATVI.utils.getCookies(update)[name];
    },

    setCookie: function(name, value, expireDate, path) {
        var value = escape(value);
        if(expireDate) value += '; expires=' + expireDate.toUTCString();
        value += "; path=" + (path || "/");
        document.cookie = name + '=' + value;
    },

    getQueryParameters: (function() {
        var map, q, ind, i;
        return function(update) {
            if(!map || update) {
                map = {};
                q = window.location.href;
                ind = q.indexOf("?");
                q = (ind >= 0) ? q.substring(ind + 1) : "";
                ind = q.indexOf("#");
                if(ind >= 0) q = q.substring(0, ind);
                q = q.split("&");
                for(i = 0; i < q.length; i++) {
                    p = q[i].split("=");
                    if(p[0]) map[p[0]] = p[1] ? decodeURIComponent(p[1]) : p[1];
                }
            }
            return map;
        };
    })(),

    getQueryParameter: function(parameter, update) {
        return this.getQueryParameters(update)[parameter];
    },

    errorLog: function(error, message) {
        try {
            if ($.cq.isAuthor() || window.location.hash == '#debug') {
                if (typeof console != 'undefined' && typeof console.log  != 'undefined') {
                    console.log(error);
                    console.log(message);
                }
                alert(error.name + ':\n' + error.message + '.\n' + message + '.');
            }
        } catch (e) { }
    },

    getPageProtocol: (function() {
        var protocol = (window.location.href.indexOf("https") == 0) ? "https:" : "http:";
        return function() {
            return protocol;
        };
    })(),

    decodeBase64: function(input) {
        var charMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var ret = "";

        var in1, in2, in3, in4, out1, out1, out3;

        input = input.replace(/[^a-zA-Z0-9\+\/\=]/g, "");
        var i = 0;
        do {
            in1 = charMap.indexOf(input.charAt(i++) || "=");
            in2 = charMap.indexOf(input.charAt(i++) || "=");
            in3 = charMap.indexOf(input.charAt(i++) || "=");
            in4 = charMap.indexOf(input.charAt(i++) || "=");

            out1 = (in1 << 2) | (in2 >> 4);
            out2 = ((in2 & 15) << 4) | (in3 >> 2);
            out3 = ((in3 & 3) << 6) | in4;

            ret = ret + String.fromCharCode(out1);
            if (in3 != 64) ret = ret + String.fromCharCode(out2);
            if (in4 != 64) ret = ret + String.fromCharCode(out3);

        } while (i < input.length);

        return ret;

    },

    allowedBots: ["google", "yahoo", "msnbot", "bingbot", "slurp", "teoma"],

    isBot: function() {
        var text = navigator.userAgent;
        var pattern = new RegExp(this.allowedBots.join("|"), "i");
        return pattern.test(text);
    },

    devHosts: ["localhost", "preview.", "uat.", "www-uat.", "cms-uat."],

    isProdSite: function() {
        var h = window.location.hostname;
        for(var i in this.devHosts) {
            if(h.indexOf(this.devHosts[i]) == 0) return false;
        }
        return true;
    },

    knownLocales: {
        "/da": 1,
        "/de": 1,
        "/en": 1,
        "/en_gb": 1, "/uk/en": 1,
        "/en_nz": 1, "/nz/en": 1,
        "/en_au": 1, "/au/en": 1,
        "/en_ca": 1, "/ca/en": 1,
        "/es": 1,
        "/fr": 1,
        "/fr_ca": 1, "/ca/fr": 1,
        "/fi": 1,
        "/it": 1,
        "/mx": 1,
        "/nl": 1,
        "/no": 1,
        "/pt": 1,
        "/sv": 1
    },

    parseLocalizedPath: function(path, matchFormatOnly) {
        var m = path.match(/^(\/\w\w(_\w\w|\/\w\w)?)(\/.*)?$/) || [];
        var l = m[1] || "";
        var n = m[3] || "";
        // special handling for id site
        if (l.indexOf("id") > 0) {
            l = l.substring(0, l.indexOf("id") - 1);
        }
        if(!matchFormatOnly) {
            if(!this.knownLocales[l]) {
                l = "";
                n = path;
            }
        }
        return {
            locale: l.replace(/^\//, "").replace(/^(\w+)\/(\w+)$/, "$2/$1").replace(/_/, "/") || "en",
            normalizedPath: n
        };
    },

    displayAbbrMonth: function(val) {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        return month[val];
    },

    getTimestamp: function(time) {      
        var eventTime = new Date(time);

        if (typeof(time) == "string" && eventTime == "Invalid Date") {
            var new_time = ('' + time).replace(/-/g,"/").replace(/[TZ]/g," ");
            eventTime = new Date(new_time);
        } 

        var currentTime = new Date();
        var diff = Math.floor((currentTime - eventTime) / 1000);
        if (diff <= 1) return "just now";
        if (diff < 30) return diff + " seconds ago";
        if (diff <= 90) return "one minute ago";
        if (diff <= 3540) return Math.round(diff / 60) + " minutes ago";
        if (diff <= 5400) return "1 hour ago";
        if (diff <= 86400) return Math.round(diff / 3600) + " hours ago";
        if (diff <= 129600) return "1 day ago";
        if (diff < 604800) return Math.round(diff / 86400) + " days ago";
        if (diff <= 777600) return "1 week ago";
        return ATVI.utils.displayAbbrMonth(eventTime.getMonth()) + ' ' + eventTime.getDate() + ', ' + eventTime.getFullYear();
    },

    uniqueId: function($els) {
        $els = $($els);
        var counter = 0;
        var prefix = "atvi-unique-" + (new Date().getTime()) + "-";
        $els.each(function() {
            if(this.id) return;
            var id;
            while(!id || $("#" + id).length) {
                id = prefix + (counter++);
            }
            this.id = id;
        });
        return $els;
    },

    mboxCall: function(f, n) {
        var m = document.cookie.match(/CRM_BLOB=(\")?([^\";]*)\1/);

        if(!m) {
            f(n);
            return;
        }
        var cookie = m[2];
        var parts = cookie.split(/\|/);
        var key = {
            n: "profile.network",
            g: "profile.ghosts",
            gsp: "profile.ghostsSeasonPass",
            x: "xbox",
            p: "psn",
            o: "other"
        };
        var arr = [];
        
        for(var i = 0; i < parts.length; i++) {
            var sides = parts[i].split(/:/);
            if(sides.length < 2) return;
            var k = sides[0];
            var v = sides[1];
            if(k == "i") continue;
            if(k == "n") v = key[v];
            k = key[k] || k;
            arr.unshift(k + "=" + v);
        }
        arr.unshift(n);
        f.apply(window, arr);
    },

    mboxCreate: function(n) {
		this.mboxCall(mboxCreate, n);
    },

    mboxUpdate: function(n) {
		this.mboxCall(mboxUpdate, n);
    }

};

})(jQuery);


// **** COMPONENTS ************************
ATVI.components = ATVI.components || {};

(function($) {

ATVI.components.common = {

    initComponents: function() {
        ATVI.components.columnControl.init();
        ATVI.components.floater.init();
    },

    makeSelectList: function(listObj) {
        listObj = $(listObj);
        var defaultValue = "", items = [], enabledItems = {};
        var i;
        var selectedItem = null;
        var changeFunc;
        
        var clearItems = function() {
            listObj.html("");
            items = [];
            enabledItems = {};
            selectedItem = null;
        };
        
        var setItems = function(defValue, allValues, enabledValues) {
            defaultValue = defValue;
            items = allValues;
            enabledItems = enabledValues;
            var s = "";
            for(i in allValues) {
                var className = "item-" + i.replace(/\s+/g, "_").replace(/\W/g, "");
                var disabledClass = enabledValues[i] ? "" : " disabled";
                s += '<li class="select-list-item ' + className + disabledClass + '">' + i + '</li>';
            }
            listObj.html(s);
            setClick();
        };

        var setClick = function() {
            listObj.find("li").not(".disabled").click(function() {
                var $this = $(this);
                if(selectedItem != $this) { 
                    if(selectedItem) selectedItem.removeClass("selected");
                    selectedItem = $this;
                    selectedItem.addClass("selected");
                    if(changeFunc) changeFunc();
                }
            });
        };

        return {
            isJSList: true,
            val: function(v) {
                if(v) {
                    // TODO set selected item
                } else {
                    return selectedItem ? selectedItem.text() : defaultValue;
                }
            },

            change: function(f) {
                changeFunc = f;
            },

            setEntries: function(defaultValue, allValues, enabledValues) {
                clearItems();
                setItems(defaultValue, allValues, enabledValues);
            }
        };
    },

    newPager: function(config) {

        var showComments = function(page) {
            initialVal = (page-1) * config.CPP; 
            finalVal = page * config.CPP;
            config.commentWrapper.each(function(index) {
                if (index < finalVal && index >= initialVal) {
                    $(this).show();
                }

                try {
                    $(".cq-text-placeholder-ipe.parsys-toggle").click(function() {
                        $(this).parent().find(".new.section").toggle("slow");
                    });     
                } catch (e) {
                    ATVI.utils.errorLog(e, 'Could not initialize the parsys toggle button');
                }
            });
        };

        var buildPages = function() {
            var count = config.commentWrapper.length;
            var insertedPages = 1;
            while(count >= config.CPP) {
                if(insertedPages>config.totalPages) break;
                if(insertedPages == 1) {
                    config.pageLinkWrapper.append("<li><a class='page-link selected' href='" + insertedPages + "'>" + insertedPages + "</a></li>");
                } else {
                    config.pageLinkWrapper.append("<li><a class='page-link' href='" + insertedPages + "'>" + insertedPages + "</a></li>");
                }

                insertedPages++;
                count = count - config.CPP;
            };  
        };

        var hideComments = function(page) {
            initialVal = (page-1) * config.CPP;
            finalVal = page * config.CPP;
            config.commentWrapper.each(function(index){
                if (index < finalVal && index >= initialVal) {
                    $(this).hide()          
                }
            });
        };
    
        var pager = {};
        pager.config = config;

        pager.init = function() { 
            var self = this;
            var CPP = this.config.CPP;
            var commentWrapper = this.config.commentWrapper;
            var pageLinkWrapper = this.config.pageLinkWrapper;
            var totalPages = this.config.totalPages;
    
            //initialize
            config.commentWrapper.hide();
            showComments(this.config.curPage);
            buildPages();
    
            var changePage = function(page) {
                hideComments(self.config.curPage);
                self.config.curPage = page;
                showComments(self.config.curPage);  
            }
    
            //add click event
            var pageLinkClass = this.config.wrapperId.find(this.config.linkClass);
            pageLinkClass.click(function(event) {
                event.preventDefault();
                var href = $(this).attr("href");
                $(this).parent().parent().find("a.selected").removeClass("selected");
                $(this).addClass("selected");
                // change page
                hideComments(config.curPage);
                config.curPage = href;
                showComments(config.curPage);
            });
        };
    
        return pager;       
    }
};

ATVI.components.columnControl = {
    init: function() {
        try {
            $(".cq-text-placeholder-ipe.parsys-toggle").click(function() {
                $(this).parent().find(".new.section").toggle("slow");
            });     
        } catch (e) {
            ATVI.utils.errorLog(e, "Could not initialize the parsys toggle button.");
        }
    }   
};

ATVI.components.floater = {
    init: function() {
        // Opacity fading conflicts in IE8 with the PNG fix and text
        // anti-aliasing
        var fadingSpeed = $.browser.msie ? 0 : 250;
    
        try {
            var top = $('.floating-content').offset().top - parseFloat($('.floating-content').css('marginTop').replace(/auto/, 0));
            $(window).scroll(function(event) {
                // what the y position of the scroll is
                var y = $(this).scrollTop();
    
                // whether that's below the form
                if (y >= top) {
                    // if so, add the fixed class
                    $('.floating-content').addClass('fixed');
                } else {
                    // otherwise remove it
                    $('.floating-content').removeClass('fixed');
                }
            });

        } catch (e) {
            ATVI.utils.errorLog(e, "Could not initialize floater.");
        }
    }
};

ATVI.components.preorder = {

    init: function(form, dataMap) {
        form = $(form);
        
        var regionSelect = form.find(".region-select");
        if(!regionSelect) {
            regionSelect = ATVI.components.common.makeSelectList(form.find(".region-list"));
        }
        
        var platformSelect = form.find(".platform-select");
        if(!platformSelect) {
            platformSelect = ATVI.components.common.makeSelectList(form.find(".platform-list"));
        }
        
        var retailerSelect = form.find(".retailer-select");
        if(!retailerSelect) {
            retailerSelect = ATVI.components.common.makeSelectList(form.find(".retailer-list"));
        }
        
        var image = form.find(".boxart");
        var submitBtn = form.find(".preorder-submit-btn");

        var initRetailerVal = retailerSelect.val();
        var initPlatformSelect = platformSelect.val();
        var initRegionSelect = regionSelect.val();
        
        var populateSelect = function(select, initOption, nextFunc) {
            
            if(select.isJSList) {
                return function(values) {
                    select.setEntries(initOption, values, allValues);
                };
            }
            
            return function(dataObj) {
                var i, o = "<option value=''>" + initOption + "</option>";
                for(i in dataObj) {
                    o += '\n<option value="' + i + '">' + i + '</option>';
                }
                select.html(o);
                if(nextFunc) nextFunc({});
            };
        };
        
        var getAttributeByIndex = function(obj, index) {
            var i = 0;
            for (var attr in obj){
                if (index === i){
                return obj[attr];
                }
                i++;
            }
            return null;
        };
        
        var populateRetailers = populateSelect(retailerSelect, initRetailerVal);
        var populatePlatforms = populateSelect(platformSelect, initPlatformSelect, populateRetailers);
        var populateRegions = populateSelect(regionSelect, initRegionSelect, populatePlatforms);

        populateRegions(dataMap);

        regionSelect.change(function() {
            populatePlatforms(dataMap[regionSelect.val()]);
        });
        
        platformSelect.change(function() {
            populateRetailers(dataMap[regionSelect.val()][platformSelect.val()]);
            var path = $("#imgPath").val();
            var imgVal = getAttributeByIndex(dataMap[regionSelect.val()][platformSelect.val()], 0);
            if(imgVal!=null){
                imgVal=imgVal["Image"];
                path += imgVal;
                image.attr("src",path);
            }

        });

        retailerSelect.change(function() {
            var linkVal = dataMap[regionSelect.val()][platformSelect.val()][retailerSelect.val()]["link"] || "#";
            form.attr("action", linkVal);
            //add retailer specfic values here
            submitBtn.attr("href", linkVal);
        });
    }

};

ATVI.components.youtubeData = {
    
    //Return a json object "ytObj" that contains certain data from a youtube video based on its id
    getData: function(ytId, callback) {
    
        var jsonUrl = "http://gdata.youtube.com/feeds/api/videos/" + ytId + "?v=2&alt=jsonc";
        var yt = ATVI.components.youtubeData;
    
        var ytObj = null;
        var async = callback ? true : false;
    
        $.ajax({
            'async': async,
            'global': false,
            'url': jsonUrl,
            'dataType': "json",
            'success': function (d) {
                var data = d.data;
                var mindur = Math.floor(data.duration / 60);
                var secdur = Math.floor(data.duration % 60);
                ytObj = {
                    "title": data.title,
                    "description": data.description,
                    "viewCount": yt.numberWithCommas(data.viewCount),
                    "likeCount": yt.numberWithCommas(data.likeCount),
                    "commentCount": yt.numberWithCommas(data.commentCount),
                    "duration": (mindur < 10 ? "0" + mindur : mindur) + ":" + (secdur < 10 ? "0" + secdur : secdur),
                    "uploaded": data.uploaded,
                    "favoriteCount": data.favoriteCount
                };
                if(async) callback(ytObj);
            }
        });
    
        return ytObj;               
    },
    
    numberWithCommas: function(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

ATVI.components.socialfeed = {

    twitterEntryTemplate: '<div class="tweet clearfix"><div class="tweet-avatar"><img src="{{imageUrl}}" /></div>' +
        '<div class="tweet-body"><div class="tweet-time">Posted {{timestamp}} on Twitter</div>' +
        '<div class="tweet-name">{{fromUser}}</div><div class="tweet-text">{{text}}</div></div></div>',
        
    twitterTreyarchTemplate: '<div class="tweet clearfix"><div class="tweet-avatar"><img src="{{imageUrl}}" /></div>' +
        '<div class="tweet-body"><div class="tweet-name">{{fromUser}}</div>' +
        '<div class="tweet-text">{{text}}</div><div class="tweet-time">Posted {{timestamp}}</div></div></div>', 

    facebookEntryTemplate: '<div class="fb-comment clearfix"><div class="fb-avatar"></div>' +
        '<div class="fb-body"><div class="fb-time">Posted {{timestamp}} on Facebook</div>' +
        '<div class="fb-name">{{fromName}}</div><div class="fb-text">{{text}}</div></div></div>',

    facebookEntryLinkableTemplate: '<div class="fb-comment clearfix"><div class="fb-avatar"></div>' +
        '<div class="fb-body"><div class="fb-time">Posted {{timestamp}} on Facebook</div>' +
        '<div class="fb-name">{{fromName}}</div><div class="fb-text"><a href="{{link}}" target="_blank">{{text}}</a></div></div></div>',
        
    jiveEntryTemplate: '<div class="jive-post"><div class="jive-post-body"><div class="jive-time">{{timestamp}}</div>' +
        '<div class="jive-title"><a href="{{link}}">{{title}}</a></div>' +
        '<div class="jive-text">{{text}}...</div></div></div>',

    jiveRssEntryTemplate: '<div class="jive-rss-post" style=""><div class="jive-rss-post-body"><div class="jive-rss-time">{{timestamp}}</div>' + 
        '<div class="jive-rss-title"><a href="{{link}}" {{jiveRssTarget}}>{{title}}</a></div>' + 
        '<div class="jive-rss-text">{{text}}...</div></div></div>',                       

    jiveRssTargetTemplate:  'target="_blank"',
        
    youTubeEntryTemplate: '<div class="youtube-VideoResult clearfix">' + 
        '{{youTubeThumbnail}} {{youTubeTitle}} {{youTubeDescription}} {{youTubeVideoAdded}}' +
        '{{youTubeRating}} {{youTubeNumViews}} </div>',
    
    youTubeThumbnailTemplate: '<div class="youtube-VideoSection youtube-Thumbnail"><a href="{{videoUrl}}" target="_blank">' +
        '<img src="{{thumbnailUrl}}" alt="{{title}} Preview"/></a></div>',
    youTubeTitleTemplate: '<div class="youtube-VideoSection youtube-VideoTitle"><a href="{{videoUrl}}" target="_blank"><span>{{title}}</span><div class="youtube-preview"></div></a></div>',
    youTubeDescriptionTemplate: '<div class="youtube-VideoSection youtube-VideoDescription"><span>{{description}}</span></div>',
    youTubeVideoAddedTemplate: '<div class="youtube-VideoSection youtube-VideoDateAdded"><span>Added: {{videoAdded}}</span></div>',
    youTubeRatingTemplate: '<div class="youtube-VideoSection youtube-VideoRating"><span>Rating: {{ratingAvg}} ({{numRaters}} ratings)</span></div>',
    youTubeNumViewsTemplate: '<div class="youtube-VideoSection youtube-VideoNumViews"><span>Number of Views: {{numViews}}</span></div>',

    googlePlusEntryTemplate: '<div class="googleplus-comment clearfix"><div class="googleplus-avatar"></div>' +
    '<div class="googleplus-body"><div class="googleplus-time">Posted {{timestamp}} on Google+</div>' +
    '<div class="google-name">{{fromName}}</div><div class="googleplus-text"><a href="{{link}}" target="_blank">{{text}}</a></div></div></div>',
    
    instagramTemplate: '<div class="instagram-post">' +
        '<div class="instagram-image"><a href="{{link}}" target="_blank"><img src="{{image}}"/><div class="instagram-preview"></div></a></div>' +
        '{{instagramTitle}}' +
        '<div class="instagram-createdTime"><span>Created: {{timestamp}}</span></div>' +
        '<div class="instagram-likes"><span>Number of Likes: {{likes}}</span></div></div>',
        
    instagramTitleTemplate: '<div class="instagram-caption"><a href="{{link}}" target="_blank"><span>{{title}}</span></a></div>',
    
    jiveFeedRegistry: {},
        
    populateFeed: function(entries, feedObj, maxObjs) {
        maxObjs = maxObjs || 10;
        var i;
    
        for(i = entries.length - 1; i >= 0; i--) {
            $(entries[i]).hide().prependTo(feedObj).fadeIn(1000);       
        }
    
        var currObjs = $(feedObj).children();
        for(i = maxObjs; i < currObjs.length; i++) {
            $(currObjs[i]).fadeOut(300, (function(o) {
                return function() {
                    $(o).remove();
                };
            })(currObjs[i]));
        }
    },

    getTimestamp: function(time) {
        var eventTime = new Date(time);
        var currentTime = new Date();
        var diff = Math.floor((currentTime - eventTime) / 1000);
        if (diff <= 1) return "just now";
        if (diff < 30) return diff + " seconds ago";
        if (diff <= 90) return "one minute ago";
        if (diff <= 3540) return Math.round(diff / 60) + " minutes ago";
        if (diff <= 5400) return "1 hour ago";
        if (diff <= 86400) return Math.round(diff / 3600) + " hours ago";
        if (diff <= 129600) return "1 day ago";
        if (diff < 604800) return Math.round(diff / 86400) + " days ago";
        if (diff <= 777600) return "1 week ago";
        return time;
    },

    initTwitterFeed: function(dataObj, defaultImageUrl, feedObj, updateRate) {
        var sf = ATVI.components.socialfeed;
        var feedStatus = {};
        var tweetsPerFeed = dataObj.rpp;
        dataObj.rpp = Math.max(60, dataObj.rpp * feedObj.length);
    
        var loadAndProcessTweets = function() {
            sf.getTweets(dataObj, function(d) {
                dataObj.rpp = tweetsPerFeed;
                var newTweets = sf.processTweets(d, defaultImageUrl, feedStatus);
                sf.populateTwitterFeed(newTweets, feedObj, dataObj.rpp, feedStatus);
            });
        };

        loadAndProcessTweets();

        if(updateRate > 0) {
            setInterval(function() {
                loadAndProcessTweets();
            }, updateRate * 1000);
        }
    },
    
    getTweets: function(dataObj, callback) {
        var url = "http://search.twitter.com/search.json?callback=?";
        $.getJSON(url, dataObj, callback);
    },

    processTweets: function(jsonData, defaultImageUrl, feedStatus) {

        var tweets = jsonData.results;
        var index;
        var entries = [];

        if (tweets) {
            var newLastTweet = null;
            for(index in tweets) {

                var tweet = tweets[index];
                newLastTweet = newLastTweet || tweet;
                if(feedStatus.lastTweet && tweet.id_str == feedStatus.lastTweet.id_str) break;

                if(!tweet.text || !tweet.from_user || !tweet.created_at) continue;
                var fieldData = {
                        timestamp: ATVI.utils.getTimestamp(tweet.created_at),
                        fromUser: tweet.from_user,
                        text: tweet.text
                };

                if(!tweet.profile_image_url || tweet.profile_image_url.indexOf('default') == 0) {
                    fieldData.imageUrl = defaultImageUrl;
                } else {
                    fieldData.imageUrl = tweet.profile_image_url;
                }

                entries.push(ATVI.utils.renderTemplate(ATVI.components.socialfeed.twitterEntryTemplate, fieldData));
            }
            feedStatus.lastTweet = newLastTweet;
        }
        return entries;
    },

    populateTwitterFeed: function(processedTweets, feedObj, numTweets, feedStatus) {
        if(!feedStatus.queue) {
            feedStatus.queue = [];
            feedStatus.feeds = [];
            feedStatus.maxTweets = 0;
            feedStatus.feedIndex = 0;
    
            setInterval(function() {
                var queue = feedStatus.queue;
                var feeds = feedStatus.feeds;
                var maxTweets = feedStatus.maxTweets;
    
                if(queue.length && feeds.length) {
                    var thisFeed = $(feedStatus.feeds[feedStatus.feedIndex]);
                    var numToPost = Math.max(Math.max(1, queue.length - 60),
                            maxTweets - thisFeed.children().length);
                    if(numToPost > queue.length) numToPost = queue.length;
                    var toPost = queue.splice(queue.length - numToPost, numToPost);
                    feedStatus.feedIndex = (feedStatus.feedIndex + 1) % feeds.length;
                    ATVI.components.socialfeed.populateFeed(toPost, thisFeed, maxTweets);
                }
            }, 3000);
        }
    
        feedStatus.maxTweets = numTweets;
        feedStatus.feeds = feedObj;
        feedStatus.queue = processedTweets.concat(feedStatus.queue);
    },
    
    initTwitterOAuthFeed: function(dataObj, defaultImageUrl, feedObj, templateType) {
        var sf = ATVI.components.socialfeed;
        var feedStatus = {};
        var tweetsPerFeed = dataObj.rpp;
        dataObj.rpp = Math.max(60, dataObj.rpp * feedObj.length);
        
        var template;
        
        if(templateType) {
            template = ATVI.components.socialfeed[templateType];
        } else {
            template = ATVI.components.socialfeed.twitterEntryTemplate;
        }
        
        var loadAndProcessTweets = function() {
            sf.getOAuthTweets(dataObj.jsonLoc, function(d) {
                dataObj.rpp = tweetsPerFeed;
                var newTweets = sf.processOAuthTweets(d, defaultImageUrl, feedStatus);
                sf.populateTwitterOAuthFeed(newTweets, feedObj, dataObj.rpp, feedStatus, template);
            });
        };
    
        loadAndProcessTweets();
    
        setInterval(function() {
            loadAndProcessTweets();
        }, 60000); 
    },
    
    getOAuthTweets: function(url, callback) {
        $.getJSON(url + ".js", "", callback);
    },
    
    processOAuthTweets: function(jsonData, defaultImageUrl, feedStatus) {
        var results = jsonData.searchResults;
        var tweets = [];
        
        for(var i = 0; i < results.length; i++) {
            tweets.push(results[i]);
        }
        
        var entries = [];
    
        if (tweets) {
            var newLastTweet = null;
            for(var j = 0; j < tweets.length; j++){
                for(var i = 0; i < (tweets[j].statuses.length); i++) {
                    var tweet = tweets[j].statuses[i];
                    newLastTweet = newLastTweet || tweet;
                    //if(feedStatus.lastTweet && tweet.id_str == feedStatus.lastTweet.id_str) break;
        
                    if(!tweet.text || !tweet.user.screen_name || !tweet.created_at) continue;
                    var fieldData = {
                            created_at: tweet.created_at, 
                            timestamp: ATVI.utils.getTimestamp(tweet.created_at),
                            fromUser: tweet.user.screen_name,
                            text: tweet.text
                    };
        
                    if(!tweet.user.profile_image_url || tweet.user.profile_image_url.indexOf('default') == 0) {
                        fieldData.imageUrl = defaultImageUrl;
                    } else {
                        fieldData.imageUrl = tweet.user.profile_image_url;
                    }
        
                    entries.push(fieldData);
                }
            }
            feedStatus.lastTweet = newLastTweet;
        }
        return entries;
    },
        
    populateTwitterOAuthFeed: function(tweetsObjs, feedObj, numTweets, feedStatus, template) {
        
        
        if(!feedStatus.queue) {
            feedStatus.queue = [];
            feedStatus.feeds = [];
            feedStatus.maxTweets = 0;
            feedStatus.feedIndex = 0;
            feedStatus.tweetIndex = 0;
    
            setInterval(function() {
                var queue = feedStatus.queue;
                var feeds = feedStatus.feeds;
                var maxTweets = feedStatus.maxTweets;
                
                if(queue.length && feeds.length) {
                    if(feedStatus.tweetIndex >= queue.length) feedStatus.tweetIndex = 0;
                    
                    var thisFeed = $(feedStatus.feeds[feedStatus.feedIndex]);
                    var numToPost = 
                        Math.max(Math.max(1, queue.length - 60), maxTweets - thisFeed.children().length);
                    if(numToPost > queue.length) numToPost = queue.length;
                    var toProcess = queue.slice(queue.length - (numToPost + feedStatus.tweetIndex), (queue.length - feedStatus.tweetIndex));

                    var toPost = [];
                    var urlRegex = /\s(https?:\/\/[^\s\<]+)/g;


                    for(var index = 0; index < toProcess.length; index++) {
                        toProcess[index].timestamp = ATVI.utils.getTimestamp(toProcess[index].created_at);

                        //toPost.push(ATVI.utils.renderTemplate(template, toProcess[index]));

                        var renderedContent = ATVI.utils.renderTemplate(template, toProcess[index]).replace(urlRegex, function(url) {
        						return ' <a href="' + url.replace(" ", "") + '" target="_blank">' + url.replace(" ", "") + '</a>';
    						});
						toPost.push(renderedContent);
                    }

                    feedStatus.feedIndex = (feedStatus.feedIndex + 1) % feeds.length;
                    ATVI.components.socialfeed.populateFeed(toPost, thisFeed, maxTweets);
                    feedStatus.tweetIndex++;
                }
            }, 3000);
        }
        
        feedStatus.maxTweets = numTweets;
        feedStatus.feeds = feedObj;
        feedStatus.queue = tweetsObjs;
    },
    
    getFacebookComments: function(dataObj, fbLink, feedObj, filterObj, maxEntries) {
        // TODO protocol
        var url = "https://graph.facebook.com/" + fbLink + "/feed?callback=?";
        $.getJSON(url, dataObj, function(json) {
            ATVI.components.socialfeed.populateFacebookFeed(ATVI.components.socialfeed.processFacebookComments(json, filterObj, maxEntries), feedObj);
        });
    },

    processFacebookComments: function(json, filterObj, maxEntries) {
        var fb;
        var entries = [];
        var template;
        var count = 0;
        for(index in json.data) {
            if(index=="remove") break;                                  
            var fb = json.data[index];
            
            if (filterObj.categoryFilter == "true" && fb.from.category == null) {
                continue;
            }
                        
            if (filterObj.filterByPageId && filterObj.filterByPageId.length > 0 && filterObj.filterByPageId != fb.from.id) {            	
            	continue;
            }
            
            if (fb.link) {
                template = ATVI.components.socialfeed.facebookEntryLinkableTemplate; 
            } else {
                template = ATVI.components.socialfeed.facebookEntryTemplate;
            }

            var message;
            if (fb.message) {
                message = fb.message;
            } else {
                message = fb.story;
            }
            
            var fieldData = {
                timestamp: ATVI.utils.getTimestamp(fb.updated_time),
                fromName: fb.from.name,
                text: message,
                link: fb.link
            };
                        
            entries.push(ATVI.utils.renderTemplate(template, fieldData));

            count++;
            if(count >= maxEntries) break;
        };
        
        return entries;
    },

    populateFacebookFeed: function(processedComments, feedObj) {
        ATVI.components.socialfeed.populateFeed(processedComments, feedObj);
    },

    initJiveFeed: function(feedObj, jiveLink, maxEntries, jiveTagName, spaceId) {
    	if (!feedObj[0].id) {
    		ATVI.utils.uniqueId(feedObj);
    	}
    	
    	if(this.jiveFeedRegistry[feedObj[0].id]) return;
    	
    	this.jiveFeedRegistry[feedObj[0].id] = feedObj[0].id;
    	
    	this.getJiveEntries(feedObj, jiveLink, maxEntries, jiveTagName, spaceId);    	
    },

    getJiveEntries: function(feedObj, jiveLink, maxEntries, jiveTagName, spaceId) {
        // TODO protocol
        var url;

        if(jiveLink.indexOf("blog.activision.com") > 0 && spaceId.length) url = "https://community.activision.com/community/feeds/blogs/json?community=" + spaceId + "&callback=?";
		else url = jiveLink + "/feeds/posts/json?callback=?";
        //var url = jiveLink + "/feeds/posts/json?callback=?";
        $.getJSON(url, function(json) {
            ATVI.components.socialfeed.populateJiveFeed(ATVI.components.socialfeed.processJiveNews(json, maxEntries, jiveTagName,spaceId), feedObj);
        });
    },

    processJiveNews: function(json, maxEntries, jiveTagName,spaceId) {
        var entries = [];
        var template = ATVI.components.socialfeed.jiveEntryTemplate;
        var newsBlips;
        if(spaceId.length) newsBlips = json.entries;
        else newsBlips = json;
        var counter = 0;
        if (newsBlips) {
            var count = 0;
            for(var i in newsBlips) {

                if (i == "remove") break;

                var blip = newsBlips[i]; 
                var hasTagName = false;

                if (jiveTagName != "" ) {
	                for (var j in blip.tags) {
	                	if (j == "remove") break;
	                	var tagName = blip.tags[j];
	                	if (tagName.indexOf(jiveTagName) != -1) {     
	                		hasTagName = true;
	                	}
	                }    
                }

                if (hasTagName == true || jiveTagName == "") {
	        		var fieldData = {
	                        title: blip.title,
	                        timestamp: (new Date(blip.date.time)).toDateString(),
	                        link: blip.link,
	                        text: blip.body
	                    };
	
	                entries.push(ATVI.utils.renderTemplate(template, fieldData));
	
	                count++;
	                if(count >= maxEntries) break;
                }	               
            }
        }
        return entries;
    },

    populateJiveFeed: function(processedEntries, feedObj) {
        ATVI.components.socialfeed.populateFeed(processedEntries, feedObj);
    },

 	getJiveRssEntries: function(dataObj, jiveLink, feedObj, maxEntries, newWindowToggle, jiveSpaceUrl, startDiscussionString) {
        var url = jiveLink + "&callback=?";

        $.ajax({
            type: 'GET',
             url: url,
             async: true,
             contentType: "application/json",
             dataType: 'jsonp',
             success: function(data) {       
                if(data.entries.length > 0)
                	ATVI.components.socialfeed.populateJiveRssFeed(ATVI.components.socialfeed.processJiveRssNews(data, maxEntries, newWindowToggle), feedObj)
				else
					feedObj.append("<div class='be-first-link'><a href='" + jiveSpaceUrl + "' target='_blank'>" + startDiscussionString + "</a></div>");
             }
         });
    },

   getJiveRssEntriesXML: function(dataObj, jiveLink, feedObj, maxEntries, newWindowToggle, jiveSpaceUrl, startDiscussionString) {  

       jiveLink = jiveLink.replace("/json", "");

       google.load("feeds", "1");

       google.setOnLoadCallback(function() {
			googleAPILoaded(); 
       });

       var googleAPILoaded = function () {

           var feed = new google.feeds.Feed(jiveLink);  

           feed.setNumEntries(maxEntries);  

           feed.load(function(data) {
               ATVI.components.socialfeed.populateJiveRssFeed(ATVI.components.socialfeed.processJiveRssNews(data.feed, maxEntries, newWindowToggle), feedObj); 
               replaceURL(); 
           });     

       }

       var replaceURL = function () {
           var urlElements =  [["img", "src"]];
           var $selector = $(feedObj); 

           for (var element in urlElements) 
           { 	
               $selector.find(urlElements[element][0]).attr(urlElements[element][1], function( i, val ) {
                   if (val != null) { 
                       return (val.match('http')) ? val : "http://community.activision.com" + val;
                   }
               })
           }
       }


    },     

    processJiveRssNews: function(json, maxEntries, newWindowToggle) {
        var entries = [];
        var template = ATVI.components.socialfeed.jiveRssEntryTemplate;
        var newsBlips = json;

        if (newsBlips) {
            var count = 0;
            for(var i in newsBlips.entries) {
                
                if (i == "remove") break;

                var blip = newsBlips.entries[i];

                var timeStamp = ( blip["date"] && blip["date"]["time"] ) ?  blip["date"]["time"] : blip["publishedDate"]; 

                var fieldData = {
                    title: blip.title,
                    timestamp: ATVI.utils.getTimestamp(timeStamp),
                    link: blip.link,
                    text: blip.body || blip.content
                };

                if (newWindowToggle == "true") {
                    fieldData.jiveRssTarget = ATVI.components.socialfeed.jiveRssTargetTemplate;
                } else {                    
                    fieldData.jiveRssTarget = "";
                }
                
                entries.push(ATVI.utils.renderTemplate(template, fieldData));

                count++;
                if(count >= maxEntries) break;
            }
        }
        return entries;
    },

    populateJiveRssFeed: function(processedEntries, feedObj) {
        ATVI.components.socialfeed.populateFeed(processedEntries, feedObj);
    },
    
    getYouTubeEntries: function(dataObj, youTubeLink, feedObj, initData) {
        var url = youTubeLink + "?alt=json-in-script&callback=?";
                
        $.ajax({
            type: 'GET',
             url: url,
             async: true,
             contentType: "application/json",
             dataType: 'jsonp',
             success: function(data) {              
                ATVI.components.socialfeed.populateYouTubeFeed(ATVI.components.socialfeed.processYouTubeNews(data, initData), feedObj, initData.videoDisplayLimit)
             }
         });
    },

    processYouTubeNews: function(json, initData) {
        var yt;
        var entries = [];
        var template = ATVI.components.socialfeed.youTubeEntryTemplate;
        var count = 0;

        for(i in json.feed.entry) {
            yt=json.feed.entry[i];
                            
            var fieldData = {};
                
            if( initData.thumbnailToggle == "true") {
                fieldData.youTubeThumbnail = ATVI.utils.renderTemplate(this.youTubeThumbnailTemplate, 
                        { thumbnailUrl: yt.media$group.media$thumbnail[0].url,
                          title: yt.title.$t,
                          videoUrl: (yt.media$group.media$player[0].url).replace("&feature=youtube_gdata_player", "") });
            } else {
                fieldData.youTubeThumbnail = "";
            }
            
            if( initData.titleToggle == "true") {
                fieldData.youTubeTitle = ATVI.utils.renderTemplate(this.youTubeTitleTemplate, 
                        { title: yt.title.$t, videoUrl: (yt.media$group.media$player[0].url).replace("&feature=youtube_gdata_player", "") });
            } else {
                fieldData.youTubeTitle = "";
            }

            if( initData.descriptionToggle == "true") {
                fieldData.youTubeDescription = ATVI.utils.renderTemplate(this.youTubeDescriptionTemplate, 
                        { description: yt.media$group.media$description.$t });
            } else {
                fieldData.youTubeDescription = "";
            }
            
            if( initData.videoAddedToggle == "true") {
                fieldData.youTubeVideoAdded = ATVI.utils.renderTemplate(this.youTubeVideoAddedTemplate, 
                        { videoAdded: ATVI.utils.getTimestamp(yt.published.$t) });
            } else {
                fieldData.youTubeVideoAdded = "";
            }

            if( initData.ratingToggle == "true") {
                fieldData.youTubeRating = ATVI.utils.renderTemplate(this.youTubeRatingTemplate, 
                        { ratingAvg: Math.round(yt.gd$rating.average), numRaters: yt.gd$rating.numRaters });
            } else {
                fieldData.youTubeRating = "";
            }   

            if( initData.numViewsToggle == "true") {
                fieldData.youTubeNumViews = ATVI.utils.renderTemplate(this.youTubeNumViewsTemplate, 
                        { numViews: yt.yt$statistics.viewCount });
            } else {
                fieldData.youTubeNumViews = "";
            }   
            
            entries.push(ATVI.utils.renderTemplate(template, fieldData));
            
            count++;
            if(count >= initData.videoDisplayLimit) break;
        };
        return entries;

    },

    populateYouTubeFeed: function(processedEntries, feedObj, maxEntries) {
        ATVI.components.socialfeed.populateFeed(processedEntries, feedObj, maxEntries);
    },
    
    getGooglePlusPosts: function(dataObj, userId, feedObj) {
        var url = "https://www.googleapis.com/plus/v1/people/" + userId + "/activities/public?callback=?";

        $.getJSON(url, dataObj, function(json) {
            ATVI.components.socialfeed.populateGooglePlusFeed(ATVI.components.socialfeed.processGooglePlusPosts(json), feedObj);
        });
    },

    processGooglePlusPosts: function(json) {
        var entries = [];
        var template = ATVI.components.socialfeed.googlePlusEntryTemplate;

        for(index in json.items) {
            if(index=="remove") break;
            
            var post = json.items[index];           
            var content;

            if (!post.title) {
                if (["album", "event", "article"].indexOf(post.object.attachments[0].objectType) > -1) {
                    if (post.object.attachments[0].objectType == "article") {
                        content = post.actor.displayName + " shared a link";
                    } else {
                        content = post.actor.displayName + " shared an " + post.object.attachments[0].objectType;
                    }
                } else {
                    content = post.actor.displayName + " shared a " + post.object.attachments[0].objectType;
                }
            } else {
                content = post.title;
            }
            
            var fieldData = {
                timestamp: ATVI.utils.getTimestamp(post.published),
                text: content,
                fromName: post.actor.displayName,
                link: post.url
            };
            
            entries.push(ATVI.utils.renderTemplate(template, fieldData));
        };
        return entries;
    },

    populateGooglePlusFeed: function(processedComments, feedObj) {
        ATVI.components.socialfeed.populateFeed(processedComments, feedObj);
    },

    getInstagramPosts: function(dataObj, url, feedObj) {
        $.getJSON(url, {}, function(json) {
            ATVI.components.socialfeed.populateInstagramFeed(ATVI.components.socialfeed.processInstagramPosts(json, dataObj), feedObj);
        });
    },

    processInstagramPosts: function(json, dataObj) {
        var entries = [];

        var template = ATVI.components.socialfeed.instagramTemplate;
        
        var limit = Math.min(json.data.length, dataObj.limit);
        
        for(var i = 0; i < limit; i++) {
            var post = json.data[i];
            
            var fieldData = {
                    image: post.images[dataObj.imageSize].url,
                    timestamp: ATVI.utils.getTimestamp(parseInt(post.created_time * 1000, 10)),
                    link: post.link,
                    likes: post.likes.count
                };

            if (post.caption) {
                fieldData.instagramTitle = ATVI.utils.renderTemplate(this.instagramTitleTemplate, 
                        { title: post.caption.text, link: post.link });
            } else {
                fieldData.instagramTitle = "";
            }
            
            entries.push(ATVI.utils.renderTemplate(template, fieldData));                   
        }

        return entries;
    },

    populateInstagramFeed: function(processedComments, feedObj) {
        ATVI.components.socialfeed.populateFeed(processedComments, feedObj);
    }           
};

ATVI.components.commenting = {
        config: {
            maxObjs: 1000
        },
        twitterEntryTemplate: '<div class="tweet-comment clearfix"><div class="tweet-avatar"><img src="{{imageUrl}}" /></div>' +
            '<div class="tweet-body"><div class="tweet-time">Posted {{timestamp}}</div>' +
            '<div class="source">Twitter</div><div class="tweet-name">{{fromUser}}</div><div class="tweet-text">{{text}}</div></div></div>',
        youtubeEntryTemplate: '<div class="youtube-comment clearfix"><div class="yt-avatar"><img src="{{imageUrl}}" /></div>' +
            '<div class="yt-body"><div class="yt-time">Posted {{timestamp}}</div>' +
            '<div class="source">Youtube</div><div class="yt-name">{{fromName}}</div><div class="yt-text">{{text}}</div></div></div>',

        jiveEntryTemplate: '<div class="jive-comment clearfix"><div class="jive-avatar"><img src="{{imageUrl}}" /></div><div class="jive-time">Posted {{timestamp}}</div>' +
            '<div class="source">{{sourceName}}</div>' +
            '<div class="jive-text">{{text}}...</div></div>',

        populateFeed: function(entries, feedObj, maxObjs) {
            maxObjs = maxObjs || this.config.maxObjs;
            var i;

            for(i = entries.length - 1; i >= 0; i--) {
                $(entries[i]).hide().prependTo(feedObj).fadeIn(1000);       
            }

            var currObjs = $(feedObj).children();
            for(i = maxObjs; i < currObjs.length; i++) {
                $(currObjs[i]).fadeOut(300, (function(o) {
                    return function() {
                        $(o).remove();
                    };
                })(currObjs[i]));
            }
        },

        getTimestamp: function(time) {
            var eventTime = new Date(time);
            var currentTime = new Date();
            var diff = Math.floor((currentTime - eventTime) / 1000);
            if (diff <= 1) return "just now";
            if (diff < 30) return diff + " seconds ago";
            if (diff <= 90) return "one minute ago";
            if (diff <= 3540) return Math.round(diff / 60) + " minutes ago";
            if (diff <= 5400) return "1 hour ago";
            if (diff <= 86400) return Math.round(diff / 3600) + " hours ago";
            if (diff <= 129600) return "1 day ago";
            if (diff < 604800) return Math.round(diff / 86400) + " days ago";
            if (diff <= 777600) return "1 week ago";
            return time;
        },

        initTwitterFeed: function(dataObj, defaultImageUrl, feedObj, pageConfig) {
            var sf = ATVI.components.commenting;
            var lastTweetCache = {};
    
            var loadAndProcessTweets = function() {
                sf.getTweets(dataObj, function(d) {
                    var newTweets = sf.processTweets(d, defaultImageUrl, lastTweetCache);
                    sf.populateTwitterFeed(newTweets, feedObj, dataObj.rpp);
                    pageConfig.commentWrapper =  pageConfig.wrapperId.find(".tweet-comment");
                    var pager = ATVI.components.common.newPager(pageConfig);
                    pager.init();
                });
            };

            loadAndProcessTweets();
        },

        getTweets: function(dataObj, callback) {
            var url = "http://search.twitter.com/search.json?callback=?";
            $.getJSON(url, dataObj, callback);
        },

        processTweets: function(jsonData, defaultImageUrl, lastTweetCache) {

            var tweets = jsonData.results;
            var index;
            var entries = [];

            if (tweets) {
                var newLastTweet = null;
                for(index in tweets) {

                    var tweet = tweets[index];
                    newLastTweet = newLastTweet || tweet;
                    if(lastTweetCache.tweet && tweet.id_str == lastTweetCache.tweet.id_str) break;

                    if(!tweet.text || !tweet.from_user || !tweet.created_at) continue;
                    var fieldData = {
                            timestamp: ATVI.components.commenting.getTimestamp(tweet.created_at),
                            fromUser: tweet.from_user,
                            text: tweet.text
                    };

                    if(!tweet.profile_image_url || tweet.profile_image_url.indexOf('default') == 0) {
                        fieldData.imageUrl = defaultImageUrl;
                    } else {
                        fieldData.imageUrl = tweet.profile_image_url;
                    }

                    entries.push(ATVI.utils.renderTemplate(ATVI.components.commenting.twitterEntryTemplate, fieldData));
                }
                lastTweetCache.tweet = newLastTweet;
            }
            return entries;
        },

        populateTwitterFeed: function(processedTweets, feedObj, numTweets) {
            ATVI.components.commenting.populateFeed(processedTweets, feedObj, numTweets);
        },
    
        getYoutubeComments: function(dataObj, url, defaultImageUrl, feedObj, pageConfig) {
            // TODO protocol
            $.getJSON(url, dataObj, function(json) {
                ATVI.components.commenting.populateYoutubeFeed(ATVI.components.commenting.processYoutubeComments(json, defaultImageUrl), feedObj);
                pageConfig.commentWrapper =  pageConfig.wrapperId.find(".youtube-comment");
                var ytPager = ATVI.components.common.newPager(pageConfig);
                ytPager.init();
            });
        },

        processYoutubeComments: function(json, defaultImageUrl) {
            var yt;
            var entries = [];
            var template = ATVI.components.commenting.youtubeEntryTemplate;
            for(i in json.feed.entry) {
                if(i=="remove") break;
                yt=json.feed.entry[i];
    
                var fieldData = {
                    timestamp: ATVI.components.commenting.getTimestamp(yt['published']['$t']),
                    fromName: yt['author'][0]['name']['$t'],
                    text: yt['content']['$t'],
                    imageUrl: defaultImageUrl
                };
                entries.push(ATVI.utils.renderTemplate(template, fieldData));
            };
            return entries;
        },

        populateYoutubeFeed: function(processedComments, feedObj) {
            ATVI.components.commenting.populateFeed(processedComments, feedObj);
        },

        getJiveEntries: function(dataObj, jiveLink, defaultImageUrl, feedObj, maxEntries, config) {
            // TODO protocol
            var url = jiveLink + "&callback=?";
            $.getJSON(url, function(json) {
                ATVI.components.commenting.populateJiveFeed(ATVI.components.commenting.processJiveComments(json, defaultImageUrl, maxEntries, config.sourceName), feedObj);
                config.commentWrapper =  config.wrapperId.find(".jive-comment");
                var pager = ATVI.components.common.newPager(config);
                pager.init();

            });
        },

        processJiveComments: function(json, defaultImageUrl, maxEntries, source) {
            var entries = [];
            var template = ATVI.components.commenting.jiveEntryTemplate;
            var commentsBlips = json['comments'];
            var resolvedSourceName = (source.length > 0) ? source : json['name'];

            if (commentsBlips) {
                var count = 0;
                for(var i in commentsBlips) {
                    if(commentsBlips[i]){
                        var blip = commentsBlips[i];
                        var fieldData = {
                            title: blip.title,
                            timestamp: ATVI.components.commenting.getTimestamp(blip.date.time),
                            link: blip.link,
                            text: blip.body,
                            imageUrl: defaultImageUrl,
                            sourceName: resolvedSourceName
                        };
                    };
                    entries.push(ATVI.utils.renderTemplate(template, fieldData));

                    count++;
                    if(count >= maxEntries) break;

                }
            }
            return entries;
        },

        populateJiveFeed: function(processedEntries, feedObj) {
            ATVI.components.commenting.populateFeed(processedEntries, feedObj);
        }
};

ATVI.components.pagenavigationmedia = {
    init: function() {
        var self = this,
        hoverTimeout;
    
        $('.page-button, .thumbnail, .all-media').bind('mouseover', function() {
            clearTimeout(hoverTimeout);
            $(this).parent().animate({width: '126px'}, 75, function() {
                $(this).addClass('hover');
            });
        }).bind('mouseout', function() {
            var $parent = $(this).parent();
            hoverTimeout = setTimeout(function() {
                $parent.removeClass('hover').animate({width: '67px'}, 100);
            }, 100);
        });
    }
}

// Initialize components
ATVI.components.common.initComponents();

// **** DETECT DEVICE ****

ATVI.device = ATVI.device || {};

ATVI.device.isMobile = {

    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        var m = navigator.userAgent.match(/(iPhone|iPad|iPod)/i) 
        return m ? m[1] : false;
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (ATVI.device.isMobile.Android() || ATVI.device.isMobile.BlackBerry() || ATVI.device.isMobile.iOS() || ATVI.device.isMobile.Opera() || ATVI.device.isMobile.Windows());
    
    }

}

$(document).ready(function() {
    
    if(ATVI.device.isMobile.any()) {
    
        if(!$("body").hasClass("mobile-device")) $("body").addClass("mobile-device"); 
    
    }
    else {
    
        if(!$("body").hasClass("desktop-device")) $("body").addClass("desktop-device");
    
    }

});



})(jQuery);

// Tubeplayer from: https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin/blob/master/src/tubeplayer.js
// Modified by Ben to remove invalid calls to e.g. getVideoBytesLoaded()

(function($){'use strict';var TUBEPLAYER=".tubeplayer",TUBEPLAYER_CLASS="jquery-youtube-tubeplayer",OPTS="opts"+TUBEPLAYER;var TP={inited:false,ytplayers:{},inits:[],iframeScriptInited:false,State:{'UNSTARTED':-1,'ENDED':0,'PLAYING':1,'PAUSED':2,'BUFFERING':3,'CUED':5},Error:{'BAD_INIT':0,'INVALID_PARAM':2,'NOT_FOUND':100,'NOT_EMBEDDABLE':101,'CANT_PLAY':150}};$.tubeplayer={events:{},TubePlayer:TP};$.tubeplayer.defaults={afterReady:function(){},stateChange:function(player){var _ret=this.onPlayer;return function(state){var _player=$('#'+player).parent();if(typeof(state)==="object"){state=state.data;}
switch(state){case TP.State.UNSTARTED:return _ret.unstarted[player].call(_player);case TP.State.ENDED:return _ret.ended[player].call(_player);case TP.State.PLAYING:return _ret.playing[player].call(_player);case TP.State.PAUSED:return _ret.paused[player].call(_player);case TP.State.BUFFERING:return _ret.buffering[player].call(_player);case TP.State.CUED:return _ret.cued[player].call(_player);default:return null;}};},onError:function(player){var _ret=this.onErr;return function(errorCode){var _player=$('#'+player).parent();if(typeof(errorCode)==="object"){errorCode=errorCode.data;}
switch(errorCode){case TP.Error.BAD_INIT:case TP.Error.INVALID_PARAM:return _ret.invalidParameter[player].call(_player);case TP.Error.NOT_FOUND:return _ret.notFound[player].call(_player);case TP.Error.NOT_EMBEDDABLE:case TP.Error.CANT_PLAY:return _ret.notEmbeddable[player].call(_player);default:return _ret.defaultError[player].call(_player);}};},qualityChange:function(player){var _this=this;return function(suggested){var _player=$('#'+player).parent();if(typeof(suggested)==="object"){suggested=suggested.data;}
return _this.onQualityChange[player].call(_player,suggested);};},onQualityChange:{},onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},onErr:{defaultError:{},notFound:{},notEmbeddable:{},invalidParameter:{}}};var defaults={width:425,height:355,allowFullScreen:"true",initialVideo:"DkoeNLuMbcI",start:0,preferredQuality:"auto",showControls:true,showRelated:false,playsinline:false,annotations:true,autoPlay:false,autoHide:true,loop:0,theme:'dark',color:'red',showinfo:false,modestbranding:true,protocol:'http',wmode:'transparent',swfobjectURL:"ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",loadSWFObject:false,allowScriptAccess:"always",playerID:"tubeplayer-player-container",iframed:true,onPlay:function(){},onPause:function(){},onStop:function(){},onSeek:function(){},onMute:function(){},onUnMute:function(){},onPlayerUnstarted:function(){},onPlayerEnded:function(){},onPlayerPlaying:function(){},onPlayerPaused:function(){},onPlayerBuffering:function(){},onPlayerCued:function(){},onQualityChange:function(){},onError:function(){},onErrorNotFound:function(){},onErrorNotEmbeddable:function(){},onErrorInvalidParameter:function(){}};$.fn.tubeplayer=function(input,xtra){var $this=$(this);var type=typeof input;if(arguments.length===0||type==="object"){return $this.each(function(){TP.init($(this),input);});}else if(type==="string"){return $this.triggerHandler(input+TUBEPLAYER,(typeof xtra!=='undefined'?xtra:null));}};var wrap_fn=function(fn){return function(evt,param){var p=TP.getPkg(evt);if(p.ytplayer){var ret=fn(evt,param,p);if(typeof(ret)==="undefined"){ret=p.$player;}
return ret;}
return p.$player;};};$.tubeplayer.getPlayers=function(){return TP.ytplayers;};TP.init=function($player,opts){if($player.hasClass(TUBEPLAYER_CLASS))return $player;var o=$.extend({},defaults,opts);o.playerID+="-"+guid();$player.addClass(TUBEPLAYER_CLASS).data(OPTS,o);for(var event in PLAYER)
$player.bind(event+TUBEPLAYER,$player,PLAYER[event]);TP.initDefaults($.tubeplayer.defaults,o);$("<div></div>").attr("id",o.playerID).appendTo($player);TP.initPlayer($player,o);return $player;};TP.getPkg=function(evt){var $player=evt.data;var opts=$player.data(OPTS);var ytplayer=TP.ytplayers[opts.playerID];return{$player:$player,opts:opts,ytplayer:ytplayer};};TP.iframeReady=function(o){TP.inits.push(function(){new YT.Player(o.playerID,{

videoId:o.initialVideo,width:o.width,height:o.height,playerVars:{
'autoplay':(o.autoPlay?1:0),
'autohide':(o.autoHide?1:0),
'controls':(o.showControls?1:0),
'loop':(o.loop?1:0),
'playlist':(o.loop?o.initialVideo:""),
'rel':(o.showRelated?1:0),
'fs':(o.allowFullScreen?1:0),
'wmode':o.wmode,
'showinfo':(o.showinfo?1:0),
'modestbranding':(o.modestbranding?1:0),
'iv_load_policy':(o.annotations?1:3),
'start':o.start,
'theme':o.theme,
'color':o.color,
'playsinline':o.playsinline,
html5:o.attemptHTML5
},events:{'onReady':function(evt){TP.ytplayers[o.playerID]=evt.target;var $player=$(evt.target.getIframe()).parents("."+TUBEPLAYER_CLASS);$.tubeplayer.defaults.afterReady($player);},'onPlaybackQualityChange':$.tubeplayer.defaults.qualityChange(o.playerID),'onStateChange':$.tubeplayer.defaults.stateChange(o.playerID),'onError':$.tubeplayer.defaults.onError(o.playerID)}});});if(TP.inits.length>=1&&!TP.inited){return function(){for(var i=0;i<TP.inits.length;i++){TP.inits[i]();}
TP.inited=true;};}
if(TP.inited){(TP.inits.pop())();}
return window.onYouTubePlayerAPIReady;};TP.initDefaults=function(d,o){var ID=o.playerID;var dp=d.onPlayer;dp.unstarted[ID]=o.onPlayerUnstarted;dp.ended[ID]=o.onPlayerEnded;dp.playing[ID]=o.onPlayerPlaying;dp.paused[ID]=o.onPlayerPaused;dp.buffering[ID]=o.onPlayerBuffering;dp.cued[ID]=o.onPlayerCued;d.onQualityChange[ID]=o.onQualityChange;var de=d.onErr;de.defaultError[ID]=o.onError;de.notFound[ID]=o.onErrorNotFound;de.notEmbeddable[ID]=o.onErrorNotEmbeddable;de.invalidParameter[ID]=o.onErrorInvalidParameter;};TP.initPlayer=function($player,o){if(o.iframed)TP.initIframePlayer($player,o);else TP.initFlashPlayer($player,o);};TP.initIframePlayer=function($player,o){if(!TP.iframeScriptInited){var tag=document.createElement('script');tag.src=o.protocol+"://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);TP.iframeScriptInited=true;}
window.onYouTubePlayerAPIReady=TP.iframeReady(o);};TP.initFlashPlayer=function($player,o){if(o.loadSWFObject){o.swfobjectURL=o.swfobjectURL.replace('http://','');o.swfobjectURL=o.swfobjectURL.replace('https://','');o.swfobjectURL=o.protocol+'://'+o.swfobjectURL;$.getScript(o.swfobjectURL,TP.init_flash_player(o));}else{TP.init_flash_player(o)();}};TP.init_flash_player=function(o){return function(){if(!window.swfobject){alert("YouTube Player couldn't be initialized. Please include swfobject.");return;}
var url=["//www.youtube.com/v/"];url.push(o.initialVideo);url.push("?&enablejsapi=1&version=3");url.push("&playerapiid="+o.playerID);url.push("&rel="+(o.showRelated?1:0));url.push("&autoplay="+(o.autoPlay?1:0));url.push("&autohide="+(o.autoHide?1:0));url.push("&loop="+(o.loop?1:0));url.push("&playlist="+(o.loop?o.initialVideo:""));url.push("&controls="+(o.showControls?1:0));url.push("&showinfo="+(o.showinfo?1:0));url.push("&modestbranding="+(o.modestbranding?1:0));url.push("&iv_load_policy="+(o.annotations?1:3));url.push("&start="+o.start);url.push("&theme="+o.theme);url.push("&color="+o.color);url.push("&playsinline="+o.playsinline);url.push("&fs="+(o.allowFullScreen?1:0));window.swfobject.embedSWF(url.join(""),o.playerID,o.width,o.height,"8",null,null,{allowScriptAccess:o.allowScriptAccess,wmode:o.wmode,allowFullScreen:o.allowFullScreen},{id:o.playerID});window.onYouTubePlayerReady=function(playerId){var player=document.getElementById(playerId);var pid=playerId.replace(/-/g,'');var d=$.tubeplayer.defaults;$.tubeplayer.events[pid]={"stateChange":d.stateChange(playerId),"error":d.onError(playerId),"qualityChange":d.qualityChange(playerId)};player.addEventListener("onStateChange","$.tubeplayer.events."+pid+".stateChange");player.addEventListener("onError","$.tubeplayer.events."+pid+".error");player.addEventListener("onPlaybackQualityChange","$.tubeplayer.events."+pid+".qualityChange");TP.ytplayers[playerId]=player;var $player=$(player).parents("."+TUBEPLAYER_CLASS);$.tubeplayer.defaults.afterReady($player);};};};TP.getVideoIDFromURL=function(sURL){sURL=sURL||"";var qryParamsStart=sURL.indexOf("?");var qryParams=sURL.substring(qryParamsStart,sURL.length);var videoStart=qryParams.indexOf("v=");if(videoStart>-1){var videoEnd=qryParams.indexOf("&",videoStart);if(videoEnd===-1){videoEnd=qryParams.length;}
return qryParams.substring(videoStart+"v=".length,videoEnd);}
return"";};var PLAYER={opts:wrap_fn(function(evt,param,p){return p.opts;}),cue:wrap_fn(function(evt,param,p){p.ytplayer.cueVideoById(param,0,p.opts.preferredQuality);}),play:wrap_fn(function(evt,param,p){if(typeof(param)==='object')p.ytplayer.loadVideoById(param.id,param.time,p.opts.preferredQuality);else if(typeof param!=='undefined')p.ytplayer.loadVideoById(param,0,p.opts.preferredQuality);else p.ytplayer.playVideo();p.opts.onPlay(param);}),pause:wrap_fn(function(evt,param,p){p.ytplayer.pauseVideo();p.opts.onPause(p);}),stop:wrap_fn(function(evt,param,p){p.ytplayer.stopVideo();p.opts.onStop(p);}),seek:wrap_fn(function(evt,param,p){if(/:/.test(param)){var parts=param.split(":").reverse();param=0;for(var i=0;i<parts.length;i++){param+=Math.pow(60,i)*(parts[i]|0);}}
p.ytplayer.seekTo(param,true);p.opts.onSeek(param);}),mute:wrap_fn(function(evt,param,p){p.$player.attr("data-prev-mute-volume",p.ytplayer.getVolume());p.ytplayer.mute();p.opts.onMute(p);}),unmute:wrap_fn(function(evt,param,p){p.ytplayer.unMute();p.ytplayer.setVolume((p.$player.attr("data-prev-mute-volume")||50));p.opts.onUnMute();}),isMuted:wrap_fn(function(evt,param,p){return p.ytplayer.isMuted();}),volume:wrap_fn(function(evt,param,p){if(typeof param!=='undefined'){p.ytplayer.setVolume(param);p.$player.attr("data-prev-mute-volume",p.ytplayer.getVolume());}else{return p.ytplayer.getVolume()||0;}}),quality:wrap_fn(function(evt,param,p){if(typeof param!=='undefined')p.ytplayer.setPlaybackQuality(param);else return p.ytplayer.getPlaybackQuality();}),playbackRate:wrap_fn(function(evt,param,p){if(typeof param!=="undefined")p.ytplayer.setPlaybackRate(param);else return p.ytplayer.getPlaybackRate();}),data:wrap_fn(function(evt,param,p){var ret={};var P=p.ytplayer;ret.videoLoadedFraction=P.getVideoLoadedFraction();ret.state=P.getPlayerState();ret.currentTime=P.getCurrentTime();ret.duration=P.getDuration();ret.videoURL=P.getVideoUrl();ret.videoEmbedCode=P.getVideoEmbedCode();ret.videoID=TP.getVideoIDFromURL(ret.videoURL);ret.availableQualityLevels=P.getAvailableQualityLevels();ret.availablePlaybackRates=P.getAvailablePlaybackRates();return ret;}),videoId:wrap_fn(function(evt,param,p){return TP.getVideoIDFromURL(p.ytplayer.getVideoUrl());}),size:wrap_fn(function(evt,param,p){if(typeof param!=='undefined'&&param.width&&param.height){p.ytplayer.setSize(param.width,param.height);$(p.ytplayer).css(param);}}),destroy:wrap_fn(function(evt,param,p){p.$player.removeClass(TUBEPLAYER_CLASS).data(OPTS,null).unbind(TUBEPLAYER).html("");delete TP.ytplayers[p.opts.playerID];var d=$.tubeplayer.defaults;var events=['unstarted','ended','playing','paused','buffering','cued'];$.each(events,function(i,event){delete d.onPlayer[event][p.opts.playerID];});events=['defaultError','notFound','notEmbeddable','invalidParameter'];$.each(events,function(i,event){delete d.onErr[event][p.opts.playerID];});delete d.onQualityChange[p.opts.playerID];delete $.tubeplayer.events[p.opts.playerID];if('destroy'in p.ytplayer){p.ytplayer.destroy();}
$(p.ytplayer).remove();return null;}),player:wrap_fn(function(evt,param,p){return p.ytplayer;})};function guid(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16);});}})(jQuery);

(function($) {
    ATVI.components.videoplayer = {
        init: function(wrapper, atviVideoConfig) {
            ATVI.components.videoplayer.a = "test";
            var self = this;
            ATVI.utils.uniqueId(wrapper);
            this.register(wrapper);
            
            if(atviVideoConfig.ageGateConfig) {
                wrapper.find(".atvi-video-player-wrapper").hide();
                ATVI.components.agegate.init(function() {
                    wrapper.find(".atvi-video-player-wrapper").show();
                    self.verifiedInit(wrapper, atviVideoConfig); 
                }, atviVideoConfig.ageGateConfig);
            } else {
                self.verifiedInit(wrapper, atviVideoConfig);
            }
        },

        registry: {},
        
        executeRegistryCommand: function(wrapper, command, arg) {
            if(!wrapper || !wrapper.length || !wrapper[0].id) return false;
            var o = this.registry[wrapper[0].id];
            if(!o || !o[command]) return false;
            o[command](arg, o.isMobile);
            return true;
        },

        cue: function(wrapper, arg, isMobile) {
            return this.executeRegistryCommand(wrapper, "cue", arg);
        },

        play: function(wrapper, arg) {
            return this.executeRegistryCommand(wrapper, "play", arg);
        },
        
        pause: function(wrapper) {
            return this.executeRegistryCommand(wrapper, "pause");
        },

        seek: function(wrapper, arg) {
            return this.executeRegistryCommand(wrapper, "seek", arg);
        },
        
        isRegistered: function(wrapper) {
            return this.registry.hasOwnProperty(wrapper[0].id);
        },
        
        register: function(wrapper) {
            var ret = this.registry[wrapper[0].id] = this.registry[wrapper[0].id] || {wrapper: wrapper};
            return ret;
        },
        
        verifiedInit: function(wrapper, atviVideoConfig) {
            var self = this;
            var initialHtml = wrapper.html();
            var player = wrapper.find(".player")
            var controls = wrapper.find(".controls");
            var timeline = controls.find(".master");
            var volume = controls.find(".volume");
            var share = controls.find(".sharecode");
            var currId = atviVideoConfig.youtubeId;

            var fs = wrapper.find(".fsbutton");
            var currClock = wrapper.find(".currClock");
            var fullClock = wrapper.find(".fullClock");

            var updateClock = function() {
                var data = player.tubeplayer("data");
                currClock.html(parseTime(data.currentTime));
                fullClock.html(" / " + parseTime(data.duration));
            };

            var cue = function(id, isMobile) {
                if(currId == id) return;
                if(isMobile) {
                	var mp = wrapper.find(".mobile-yt-player").attr("src", "");
                    mp.attr("id", "mplayer-" + id).attr("src", "http://www.youtube.com/embed/" + id + "?wmode=opaque&rel=0");
                } else {
                    // fix for "cue" not working!
					// player.tubeplayer("cue", id);
                    self.registry[wrapper[0].id] = null;
                    wrapper.html("");
                    wrapper.html(initialHtml);
                    clearInterval(sliderInterval);
                    if(registered.playInterval) clearInterval(registered.playInterval);
					atviVideoConfig.youtubeId = id;
                    self.verifiedInit(wrapper, atviVideoConfig);
                    try {
                        ATVI.analytics.setupClickHandlers(wrapper);
                    } catch(e) {}
                }
            };

            var play = function(arg) {
                player.tubeplayer("play", arg);
            };

            var pause = function() {
                player.tubeplayer("pause");
            };

            var seek = function(arg) {
                player.tubeplayer("seek", arg);
            };

            var onVideoPlayPause = function() {
                if(controls.find(".play-pause-button").hasClass('play-button')) {
                    play();
                } else {
                    pause();
                }
                if(registered && registered.onPlayPause) registered.onPlayPause();
            };

            var onVideoPlay = function() {
                controls.find('.play-pause-button').removeClass('play-button').addClass('pause-button');
                if(!registered.playInterval) registered.playInterval = setInterval(updateClock, 1000);
                $(".player-title").hide();
                timeline.slider("option", "max", player.tubeplayer("data").duration);
                if(registered && registered.onPlay) registered.onPlay();
            };
            
            var onVideoPause = function() {
                controls.find('.play-pause-button').removeClass('pause-button').addClass('play-button');    
                $(".player-title").show();
                if(registered && registered.onPause) registered.onPause();
            };

            var positionVolumeSlider = function() {
                var pos = $('.volume-slider.speaker').position();
                var newTop = pos.top - $('.controls .volume.ui-slider-vertical').height() + 5;
                var newLeft = pos.left + ($('.speaker').width()/2) - 2;
                $('.controls .volume.ui-slider-vertical').css({'left': newLeft + "px" , 'top': newTop + "px"});             
            };

            var config = {          
                    width: atviVideoConfig.playerWidth + atviVideoConfig.dimensiontype, // the width of the player
                    height: atviVideoConfig.playerHeight + atviVideoConfig.dimensiontype, // the height of the player
                    showControls: 0, // whether the player should have the controls visible, 0 or 1
                    allowFullScreen: "true", // true by default, allow user to go full screen
                    initialVideo: atviVideoConfig.youtubeId, // the video that is loaded into the player
                    start: atviVideoConfig.start,
                    preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
                    attemptHTML5: 1,// attempt to force html5, still in beta. 
                    onPlay: function(id) {}, // after the play method is called
                    onPlayerPlaying: function(id) {
                        onVideoPlay();
                    }, 
                    onPlayerPaused: function(id) {
                        onVideoPause();
                    }, 
                    onPause: function(id) {}, // after the pause method is called
                    onStop: function(id) {}, // after the player is stopped
                    onSeek: function(time) {}, // after the video has been seeked to a defined point
                    onMute: function() {}, // after the player is muted
                    onUnMute: function() {} // after the player is unmuted
            };

			// add control functions to registry
            var registered = this.register(wrapper);
            registered.play = play;
            registered.pause = pause;
    		registered.cue = cue;
    		registered.seek = seek;
			registered.isMobile = choice == "mobile";
    		registered.initialHtml = initialHtml;

            var mobileConfig = {
                width: atviVideoConfig.playerWidth + atviVideoConfig.dimensiontype, // the width of the player
                height: atviVideoConfig.playerHeight + atviVideoConfig.dimensiontype, // the height of the player
                youtubeID: atviVideoConfig.youtubeId
            };

            var mobileTemplate = "<iframe id='mplayer-" + mobileConfig.youtubeID + "' class='mobile-yt-player youtube-player' type='text/html' width='" + mobileConfig.width + "' height='" + mobileConfig.height + "' src='http://www.youtube.com/embed/" + mobileConfig.youtubeID + "?wmode=opaque&rel=0' frameborder='0' allowfullscreen></iframe>";

    		//var mobileTemplate = "<iframe class='mobile-yt-player youtube-player' width='" + mobileConfig.width + "' height='" + mobileConfig.height + "' src='//www.youtube.com/embed/" + mobileConfig.youtubeID + "' frameborder='0' allowfullscreen></iframe>";

    		var device = ATVI.device.isMobile.any();
            ATVI.components.videoplayer.playerChoice = ATVI.components.videoplayer.setupPlayerChoice(device);

                        /**REMOVE AFTER IPAD PROBLEM FIXED**/
                        ATVI.components.videoplayer.config = config;

    		var choice;
    		if(typeof ATVI.components.videoplayer.playerChoice == "function") {
				choice = ATVI.components.videoplayer.playerChoice(registered, device);
            } else {
                var playerChoice = ATVI.components.videoplayer.playerChoice || "auto";
                switch (playerChoice) {
                    case "desktop":
                        choice = "desktop";
                        break;
                    case "mobile":
                        choice = "mobile";
                        break;
                    case "desktopForIpad":
                        if(device && device != "iPad") choice = "mobile";
                        else choice = "desktop";
                        break;
                    case "auto":
                    default:
                        choice = device ? "mobile" : "desktop";
                }
            }

            if(choice == "mobile") {
                player.append(mobileTemplate);
            } else {
                player.tubeplayer(config);
            }

            ///////////////////////////////////

            // set up controls
            controls.find(".play-pause-button").click(function() {
                onVideoPlayPause();
            });

            // setup HD button
            controls.children(".SD-HD-button").click(function(e) {
                e.stopPropagation(); 
                if(controls.find(".SD-HD-button").hasClass('HD-button')){
                    controls.find('.SD-HD-button').addClass('SD-button').removeClass('HD-button');
                    player.tubeplayer("quality", "medium");
                } else {
                    controls.find('.SD-HD-button').addClass('HD-button').removeClass('SD-button');
                    player.tubeplayer("quality", "hd720");
                }
            });

            // set up share field
            wrapper.find(".video-player-share").hide();
            
            wrapper.find(".sharecode").click(function() {
                if($(this).hasClass("hover")) {
                    $(this).removeClass("hover");
                } else {
                    $(this).addClass("hover");
                }
                wrapper.find(".video-player-share").toggle();
            });
            
            wrapper.find(".video-player-share-close").click(function() {
                wrapper.find(".sharecode").removeClass("hover");
                wrapper.find(".video-player-share").hide();
            });
            
            // set up timeline

    		var mSliderTime = 0;

    		if (player.tubeplayer("data")) {
				mSliderTime  = player.tubeplayer("data").duration; 
            } 

            timeline.slider({
                min: 0,
                max: mSliderTime,
                value: 0,
                orientation: "horizontal",
                range: "min",
                slide: function(event, ui) {
                      player.tubeplayer("seek", ui.value);
                },
                animate: true
            });
        
            // set timer
            var sliderInterval = setInterval(function() {
				var tpData = player.tubeplayer("data");
                timeline.slider("option", "value", tpData ? tpData.currentTime : 0);
            }, 450);
    
            // setup volume
            volume.slider({
                min: 0,
                max: 100,
                value: 100,
                orientation: "vertical",
                range: "min",
                slide: function(event, ui) {
                        player.tubeplayer("volume", ui.value);
                },
                animate: true
            });
            
            var currVolume;
            
            // Mute and unmute functionality
            wrapper.find(".speaker").unbind('click').click(function() {
                if(!$(this).hasClass("mute")) {
                    $(this).addClass("mute");
                    player.tubeplayer("mute");
                    currVolume = volume.slider("value");
                    volume.slider("value", 0);
                } else {
                    $(this).removeClass("mute");
                    player.tubeplayer("unmute");
                    volume.slider("value", currVolume);
                }
            }); 
        
            this.setupFullscreenApi();
        
            var controlHeight = 70;
            
            // do something interesting with fullscreen support
            var fsButton = document.querySelectorAll("fsbutton"),
                fsElement = wrapper[0];
                    
            if (window.fullScreenApi.supportsFullScreen) {
                // handle button click
                wrapper.find('.fsbutton').click(function() {       
                    if(wrapper.find('.fsbutton').hasClass('non-fullscreen-mode')) {
                        window.fullScreenApi.cancelFullScreen(fsElement);
                    } else {
                        window.fullScreenApi.requestFullScreen(fsElement);
                    }
                });

                document.addEventListener(fullScreenApi.fullScreenEventName, function() {
                    //When player is fullscreen
                    if (fullScreenApi.isFullScreen()) {
                        //Make video player the size of the screen
                        player.tubeplayer("size", {
                            width: screen.width,
                            height: screen.height - controlHeight
                        });
                        wrapper.addClass("fullscreen");
                        timeline.width(screen.width - 400);
                        controls.width(screen.width);
                        controls.addClass('fullscreen');
                        fs.removeClass('fullscreen-mode').addClass('non-fullscreen-mode');
                        share.addClass('fullscreen-mode');
                      
                        positionVolumeSlider();
                        
                    } else {
                        player.tubeplayer("size", {
                            width: atviVideoConfig.playerWidth, 
                            height: atviVideoConfig.playerHeight
                        });
                        wrapper.removeClass("fullscreen");
                        timeline.width(atviVideoConfig.playerWidth - 400);
                        controls.width(atviVideoConfig.playerWidth);
                        controls.removeClass('fullscreen');
                        fs.removeClass('non-fullscreen-mode').addClass('fullscreen-mode');
                        share.removeClass('fullscreen-mode');
                        positionVolumeSlider();
                        
                    }
                }, true);
                
            } else {
                //use ie fallback
                //alert("This does not support fullscreen");
                wrapper.find(".fsbutton").hide();
            }
            
            //Timer functionality
            function parseTime(timeInSeconds) {
                var absSec = parseInt(timeInSeconds);
                var mins = Math.floor(absSec/60); 
                var secs = absSec % 60;
                if (secs<10) {
                    secs = '0' + secs;
                }
                if (mins<10) {
                    mins = '0' + mins;
                }
                return mins + ':' + secs;
            }

			var hideVolumeTimeout, isIn;

            //Volume functionality
            controls.find('.volume').hide();
            controls.find('.speaker, .volume').hover(function() {
                isIn = true;
                if(hideVolumeTimeout) clearTimeout(hideVolumeTimout);
                hideVolumeTimout = null;
                controls.find('.volume').show();
            },
            function() {
                isIn = false;
                if(hideVolumeTimeout) clearTimeout(hideVolumeTimout);
                hideVolumeTimout = setTimeout(function() {
                    if(!isIn) controls.find('.volume').hide();
                }, 500);
            });
            
            
            positionVolumeSlider();         
        },
        
        setupFullscreenApi: function() {
                        //Fullscreen api
            (function() {
                var fullScreenApi = { 
                        supportsFullScreen: false,
                        isFullScreen: function() {}, 
                        requestFullScreen: function() {false}, 
                        cancelFullScreen: function() {},
                        fullScreenEventName: '',
                        prefix: ''
                    };
                var browserPrefixes = 'webkit moz o ms khtml'.split(' ');
                
                // check for native support
                if (typeof document.cancelFullScreen != 'undefined') {
                    fullScreenApi.supportsFullScreen = true;
                } else {     
                    // check for fullscreen support by vendor prefix
                    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
                        fullScreenApi.prefix = browserPrefixes[i];
                        
                        if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                            fullScreenApi.supportsFullScreen = true;
                            break;
                        }
                    }
                }
                
                // update methods to do something useful
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
                    fullScreenApi.isFullScreen = function() {
                        switch (this.prefix) {  
                            case '':
                                return document.fullScreen;
                            case 'webkit':
                                return document.webkitIsFullScreen; 
                            default:
                                return document[this.prefix + 'FullScreen'];
                        }
                    }
                    fullScreenApi.requestFullScreen = function(el) {
                        return (this.prefix === '') ? 
                                el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
                    }
                    fullScreenApi.cancelFullScreen = function(el) {
                        return (this.prefix === '') ? 
                                document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
                    }       
                }
        
                // jQuery plugin
                if (typeof jQuery != 'undefined') {
                    jQuery.fn.requestFullScreen = function() {
                        return this.each(function() {
                            var el = jQuery(this);
                            if (fullScreenApi.supportsFullScreen) {
                                fullScreenApi.requestFullScreen(el);
                            }
                        });
                    };
                }
                // export api
                window.fullScreenApi = fullScreenApi;   
            })();
        }, 
        
        setupPlayerChoice: function (device) {
            if(device == "iPad")
                return "desktopForIpad";
            return false;
        }
    
    };
    
})(jQuery);


(function($) {

    ATVI.components.langSelect = {

        registry: {},

        init: function($container, data) {
            var context = {};
            context.container = $container = $($container);
            ATVI.utils.uniqueId($container);
            this.registry[$container[0].id] = context;

			context.mainFlag = $container.find(".main-flag-icon");
            context.langLink = $container.find(".locale-list li a");
            context.langBtn = $container.find(".main-flag");
            context.langDropDown = $container.find(".locale-menu");
			context.localeMenu = $container.find(".locale-menu");
            context.localeList = $container.find(".locale-list");
			context.closeBtn = $container.find(".locale-menu-close-btn");
            context.prodBaseFrag = data.prodBaseFrag;
            context.authorBaseFrag = data.authorBaseFrag;

            this.setupLangToggle(context, data.defaultCountry);
            this.setupLangLinks(context);

			if(data.resizeWidth != 0) this.resize(context, data.resizeWidth);
        },

        parsePath : function(path, langData, prodBaseFragment) {
            var ret = {};
            var locales = langData;
            prodBaseFragment = prodBaseFragment || "";
            var m = path.match(/^(\/content\/atvi\/\w+\/\w+\/\w+)(\/\w+)(\/.*)$/);
            if(m) {
                ret.rootPath = m[1];
                ret.basePath = m[1] + m[2];
                ret.localeFragment = ret.cmsLocaleFragment = m[2];
                ret.relPath = m[3] || "/";
                ret.locale = "en_US";
                for(var l in locales) {
                    if(ret.cmsLocaleFragment == locales[l][1]) {
                        ret.locale = l;
                        break;
                    }
                }
                ret.prodLocaleFragment = locales[ret.locale][0];
            } else {
                m = path.match(/^(\/\w\w)?(\/\w\w)?(\/.*)?$/);
                ret.rootPath = "";
                ret.basePath = (m[1] || "") + (m[2] || "");
                ret.localeFragment = ret.prodLocaleFragment = ret.basePath;
                ret.relPath = m[3] || "/";
                if(ret.relPath.indexOf(prodBaseFragment) == 0) {
                    ret.basePath += prodBaseFragment;
                    ret.relPath = (ret.relPath.substring(prodBaseFragment.length)) || "/";
                }
                ret.locale = "en_US";
                for(var l in locales) {
                    if(ret.prodLocaleFragment == locales[l][0]) {
                        ret.locale = l;
                        break;
                    }
                }
                ret.cmsLocaleFragment = locales[ret.locale][1];
            }

            if(!ret.locale) return null;

            m = ret.locale.match(/^(\w\w)_(\w\w)$/);
            ret.language = m[1];
            ret.region = m[2];

            if(ret.rootPath.indexOf("/content/atvi") == 0) ret.context = "author";
            else ret.context = "prod";

            return ret;
        },

        parseUrl : function(url) {
            var m = url.match(/((\w+):\/\/)?([\w:-]+(\.[\w:-]+)*)?(\/[\w\/\.%-]*)?(\?[^#]*)?(#.*)?/);
            if(!m) return null;
            var ret = {
                full: url,
                path: m[5]
            };
            return ret;	
        },

        setupLangToggle: function(context, defaultCountry) {
			var $langbtn = context.langBtn;
			var $closeBtn = context.closeBtn;
            var langdropdown = context.langDropDown;
            var localeList = context.localeList;

            $([$langbtn.get(0), $closeBtn.get(0)]).click(function() {
                 langdropdown.toggle();
            });
        },

        locales: {
            en_US: ["", "/en"],
            en_GB: ["/uk/en", "/en_gb"],
            en_CA: ["/ca/en", "/en_ca"],
            en_AU: ["/au/en", "/en_au"],
            en_NZ: ["/nz/en", "/en_nz"],
            fr_FR: ["/fr", "/fr"],
            fr_CA: ["/ca/fr", "/fr_ca"],
            es_ES: ["/es", "/es"],
            es_MX: ["/mx", "/mx"],
            pt_BR: ["/pt", "/pt"],
            de_DE: ["/de", "/de"],
            it_IT: ["/it", "/it"],
            sv_SE: ["/sv", "/sv"],
            nl_NL: ["/nl", "/nl"],
            da_DK: ["/da", "/da"],
            fi_FI: ["/fi", "/fi"],
            no_NO: ["/no", "/no"],
            ru_RU: ["/ru", "/ru"],
            pl_PL: ["/pl", "/pl"],
            jp_JP: ["/jp", "/jp"]
        },

        setupLangLinks: function(context) {

            var prodBaseFragment = context.prodBaseFrag;
            var authorBaseFragment = context.authorBaseFrag;
            var langData = this.locales;
            var fullUrl = window.location.href;
            var parsedUrl = this.parseUrl(fullUrl); 
            var data = this.parsePath(parsedUrl.path, langData, authorBaseFragment);
            var isProd = data.context == "prod";
            var relPath = data.relPath;

            var localeList = context.localeList;
			var mainFlag = context.mainFlag;
			var langLink = context.langLink;

            localeList.find(".locale-entry").removeClass("selected");

            for(var i = 0; i < langLink.length; i++) {

				var item = langLink.eq(i);
                var rel = item.attr("rel");
                if(!rel) continue;
                if(rel == data.locale) {
                    item.attr("href", fullUrl);
                    item.parent().addClass("selected")
                    continue;
                }
                if(!langData[rel]) continue;
                var locFragment = langData[rel][isProd ? 0 : 1];
                var newUrl = data.rootPath + locFragment + relPath;
                item.attr("href", newUrl);

            }

            if(context.mainFlagClass) mainFlag.removeClass(context.mainFlagClass);
			mainFlag.addClass(data.region);
            context.mainFlagClass = data.region;

            if(this.afterLinkUpdate) this.afterLinkUpdate(context, prodBaseFragment, authorBaseFragment);

        },

		resize: function(context, dataResizeWidth) {

			var windowWidth = $(window).width();

			var localeMenu = context.localeMenu;
			var targetWidthSize = dataResizeWidth;

			var checkPopupMode = function(width) {
				if(width <= targetWidthSize)
					localeMenu.addClass("popup");
				else 
					if(localeMenu.hasClass("popup")) localeMenu.removeClass("popup");
			};

			checkPopupMode(windowWidth);

			$(window).resize(function() {
				windowWidth = $(window).width();				
				checkPopupMode(windowWidth);
			});
			
		},

        update: function(context) {
            if(typeof context == "string") {
				context = this.registry[context];
            } else if(context.length) {
				context = this.registry[context[0].id];
            }
            this.setupLangLinks(context);
        }
    };

    
})(jQuery);
(function($) {

ATVI.components.agegate = {
 
	   /* config: {
			minimumAgeRequirement: 17,
			timeoutThreshold: 1000 * 60 * 2, // 2 mins
			ageGateId: 'age-gate'
	 },*/
 
		/*
	 * Initialize Media Detail page-specific features.
	 */
	init: function(callback, config) {
	
			var self = this,
				wrapper = config.ageGateWrapper,
				ageGateId = wrapper.find(".age-gate"),
				ssoCookie = false,
				cookieAge = ATVI.utils.getCookie('agegate'),
				minDate = new Date(),
				dateError = ageGateId.find(".invalid-date-error-message"),
				ageError = ageGateId.find(".age-gate-failure-error-message"),
				cookieExpdate = new Date();  
			
			if (document.cookie.indexOf('ACT_SSO_COOKIE') > -1) {
				ssoCookie = true;
			}

			minDate.setFullYear(minDate.getFullYear() - config.minimumAge);
			
			// if age gate is disabled
			if (config.disableAgeGate || ssoCookie || ATVI.utils.isBot()) {

				wrapper.hide();
				callback();
				
			} else if (cookieAge) {
				
				cookieAge = new Date(cookieAge);
				if (minDate.getTime() < cookieAge.getTime()) {
					ageGateId.show().find('.age-gate-failure-error-message').show();
                    ageGateId.find('.age-gate-alternate-age-error').show();
					ageGateId.find('.dob-prompt input').hide();
					ageGateId.find('.dob-prompt .submit').hide();
                    self.alternateAge();
				} else {
					wrapper.hide();
					callback();
				}
				
			} else {
				ageGateId.show();
			}

			// set up validation for age gate form inputs
		   ageGateId.find('fieldset input').each(function() {
					var defaultValue = this.value;
					$(this).bind('focusin', function() {
							if (this.value === defaultValue) {
									this.value = '';
									this.className = 'active';
							}
							else if (this.value != defaultValue) {
								this.className = 'active';
							}
					}).bind('focusout', function() {
							if (this.value === '') {
									this.value = defaultValue;
									this.className = '';
							} else if (this.value != defaultValue) {
								this.className = '';
							}
					});
			}).change(function() {
					self.hideErrors();
					$(this).val(function(i, val) {
							return self.checkSingleDigit(val);
					});
			}).filter('#age-gate-month').change(function() {
					if (!self.validateMonth($(this).val())) {
						self.showErrors('.invalid-date-error-message');
						return false;
					}
			}).end().filter('#age-gate-date').change(function() {
					if (!self.validateDate($(this).val())) {
						self.showErrors('.invalid-date-error-message');
						return false;
					}
			}).end().filter('#age-gate-year').change(function() {
					if (!self.validateYear($(this).val())) {
						self.showErrors('.invalid-date-error-message');
						return false;
					}
			});
			
			// submit handler for age gate form
			ageGateId.find('.dob-prompt .submit').bind('click', function() {
					var input=ageGateId.find(".dob-prompt input");
					var month = input.filter("#age-gate-month").val(),
						date = input.filter("#age-gate-date").val(),
						year = input.filter("#age-gate-year").val(),
						dob = new Date(year, month -1, date);
					self.hideErrors(ageGateId);

					if (!self.validateMonth(month) || !self.validateDate(date) || !self.validateYear(year)) {
							self.showErrors('.invalid-date-error-message');
							return false;
					}

					if (minDate.getTime() < dob.getTime()) {
							self.showErrors('.age-gate-failure-error-message');
                            self.showErrors('.age-gate-alternate-age-error');
                            self.alternateAge();
							$('.dob-prompt input, .dob-prompt .submit').hide();
							cookieExpdate.setTime(cookieExpdate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours
							ATVI.utils.setCookie('agegate', dob.toUTCString(), cookieExpdate);
					} else {
						wrapper.fadeOut('slow');
							callback();
							cookieExpdate.setFullYear(cookieExpdate.getFullYear() + 1);
							ATVI.utils.setCookie('agegate', dob.toUTCString(), cookieExpdate);
					}
					return false;
					
			});
	},
	
	showErrors: function(id) {
        if(!$('.age-gate fieldset').hasClass('error')) $('.age-gate fieldset').addClass('error');
        $(id).show();
	},
	
	hideErrors: function() {
        $('.age-gate fieldset').removeClass('error');
        $('.error-message').hide();
	},

	checkSingleDigit: function(val) {
        if(val === '') return val;
        if (val < 10 && val.length < 2) val = '0' + val;
        return val;
	},

	validateMonth: function(str) {
        var re = /0[1-9]|1[0-2]/;
        return str.match(re);
	},

	validateDate: function(str) {
        var re = /0[1-9]|[1-2][0-9]|3[0-1]/;
        return str.match(re);
	},

	validateYear: function(str) {
        var re = /19[0-9][0-9]|200[0-9]|201[0-1]/;
        return str.match(re);
	},

    alternateAge: function() {
    }
}
})(jQuery);
(function($) {
    
ATVI.analytics = {
    
    siteId: "cms-generic",
    ns_site: "dev",
    
    init: function() {
        this.setupPageLoad();
        this.setupClickHandlers($("body"));
    },
    
    setupClickHandlers: function(root) {
        root = $(root);
        this.setupTaggedElements(root);
        this.setupLinks(root);
    },
    
    prefixesToStrip: [],
    
    stripPathPrefixes: function(path) {
        var ret = path;
        for(var i = 0; i < this.prefixesToStrip.length; i++) {
            ret = ret.replace(new RegExp("^" + this.prefixesToStrip[i] + "(/.*)?$"), "$1");
        }
        return ret;
    },

    homePageFilename: "home",

    splitPath: function(path, includeFileExtension) {
        var ret = path.replace(/^\//, "").replace(/\/$/, "");
        if(!includeFileExtension) ret = ret.replace(/(.*)\.\w+$/, "$1");
        ret = ret.replace(/\./g, '_').replace(/\/+/g, '.');
        if(ret.length == 0) ret = this.homePageFilename;
        return ret.split('.');
    },

    // override as needed per site
    getSiteData: function() {
        var sitename = this.siteId;
        var locPathname = this.stripPathPrefixes(window.location.pathname);
        var parsed = ATVI.utils.parseLocalizedPath(locPathname);
        locPathname = this.stripPathPrefixes(parsed.normalizedPath);
        locPathname = this.splitPath(locPathname);

        var hierarchy = [];
        var i = locPathname.length - 4;
        if(i < 0) i = 0;
        var top = sitename;
        for(; i < locPathname.length; i++) {
            top += "." + locPathname[i];
            hierarchy.push(top);
        }

        while(hierarchy.length < 4) {
            hierarchy.push(top);
        }

        var csName = top;
        var csSection = hierarchy[0];
        var csSubSection = hierarchy[1];
        var csCtitle = hierarchy[2];
        var csCtype = csSection;

        return {
            csName: csName,
            csSection: csSection,
            csSubSection: csSubSection,
            csCtitle: csCtitle,
            csCtype: csCtype,
            csPathLocale: parsed.locale
        };
    },

    setupPageLoad: function() {
        var cookies = ATVI.utils.getCookies(true);
        var instr = {};
        if(cookies.ATVI_INSTRUMENT) {
            try {
                instr = JSON.parse(cookies.ATVI_INSTRUMENT);
            } catch(e) {
                instr = {};
            }
        }

        var siteData = this.getSiteData();

        var prevPage = instr.page;
        instr.page = siteData.csName;

        var pageData = {
            site: this.siteId,
            language: cookies.ACT_SSO_LOCALE || "en_US",
            "name": siteData.csName,
            previous_page: prevPage,
            c_type: siteData.csCtype,
            c_title: siteData.csCtitle,
            section: siteData.csSection,
            sub_section: siteData.csSubSection,
            path_locale: siteData.csPathLocale
        };

        var eventCookie = cookies.ACT_SSO_EVENT;
        if(eventCookie) {
            eventCookie = eventCookie.replace(/^\"(.*)\"$/, "$1");
            if(instr.event != eventCookie) {
                instr.event = eventCookie;
                eventCookie = eventCookie.split(":");
                if(eventCookie[0])
                    pageData.sso_event = eventCookie[0];
            }
        }

        ATVI.utils.setCookie("ATVI_INSTRUMENT", JSON.stringify(instr));
        this.sendData(pageData);
    },

    setupTaggedElements: function(root) {
        var self = this;

        root.find(".atvi-instrument").click(function() {
            var classes = this.className.split(/\s+/);
            var className;

            for(i in classes) {
                if(classes[i].indexOf("atvi-instrument-") >= 0) {
                    className = classes[i];
                    className = className.substring("atvi-instrument-".length);
                    break;
                }
            }

            if(className) {

                var strippedId = this.id.replace(/^(.+)-analytics-suffix-.*$/, "$1");

                var data = {
                        action_type: className,
                        action_details: strippedId,
                        ns_type: "hidden"
                };

                if(className == "preorder") {
                    //data.specialness = "preorder data!";
                }

                self.sendData(data);
            }
        });
    },

    setupLinks: function(root) {
        var self = this;

        root.find("a").not(".atvi-instrument").not(".atvi-no-instrument").click(function() {

            var href = this.href;
            var $this = $(this);

            var data = {
                    action_type: "atvi-anchor",
                    href: href,
                    ns_type: "hidden"
            };

            var detail = "";
            if(this.id) {
                var strippedId = this.id.replace(/^(.+)-analytics-suffix-.*$/, "$1");
                detail += strippedId + ": ";
            }
            var linkText = $this.text().substring(0, 30);
            if(linkText.length >= 30) linkText += "...";
            detail += linkText;
            data.action_details = detail;

            self.sendData(data);

        });
    },

    sendEvent: function(actionType, actionDetails, params) {
        var data = {
            action_type: actionType,
            action_details: actionDetails,
            ns_type: "hidden"
        };
        params = params || {};
        for(var i in params) {
			if(!params.hasOwnProperty(i)) continue;
            data[i] = params[i];
        }
        this.sendData(data);
    },

    sendData: function (data) {

        var loc = 'http' + (document.location.href.charAt(4) == 's' ? 's://sb' : '://b') + '.scorecardresearch.com/p?c1=2&c2=14880931';

        // common values
        data.visitorID = this.getVisitorId();
        data.anonVisitorID = this.getAnonVisitorId();
        data.ns__t = "" + new Date().getTime();
        data.ns_c = document.characterSet || document.defaultCharset || "";
        data.c8 = document.title;
        data.c7 = document.location.href || document.URL;
        data.c9 = document.referrer;

        if(ATVI.uxTest && ATVI.uxTest.campaigns) {
            var campaigns = ATVI.uxTest.campaigns;
			var campaignNames = [], campaignIds = [];
            var recipeNames = [], recipeIds = [];
            var offerNames = [], offerIds = [];
            var mboxNames = [];
            for(var i = 0; i < campaigns.length; i++) {
                campaignNames.push(campaigns[i].campaignName);
                campaignIds.push(campaigns[i].campaignId);
                recipeNames.push(campaigns[i].recipeName);
                recipeIds.push(campaigns[i].recipeId);
                offerNames.push(campaigns[i].offerName);
                offerIds.push(campaigns[i].offerId);
                mboxNames.push(campaigns[i].mboxName);
            }
        	data.campaignName = campaignNames.join(",");
            data.campaignId = campaignIds.join(",");
            data.recipeName = recipeNames.join(",");
            data.recipeId = recipeIds.join(",");
            data.offerName = offerNames.join(",");
            data.offerId = offerIds.join(",");
            data.mboxName = mboxNames.join(",");
        }

        var cookies = ATVI.utils.getCookies(true);
        if(cookies.comScore) data.comScore = cookies.comScore; 

        data.ns_site = ATVI.utils.isProdSite() ? (this.ns_site || "dev") : "dev";

        for(var i in data) {
            loc += "&" + i + "=" + encodeURIComponent(data[i]);
        }

        if (loc.length > 2048) {
            var s = loc.substr(0, 2040).lastIndexOf("&");
            loc = (loc.substring(0, s) + "&ns_cut=" + encodeURIComponent(loc.substring(s + 1))).substr(0, 2048);
        }
        //alert(loc.split("&").join("\n&"));

        $(document).append('<p><img src="' + loc + '" height="1" width="1" alt="*" /></p>' );
    },

    getVisitorId: function() {
        var cookies = ATVI.utils.getCookies(true);

        var ssoCookie = cookies.ACT_SSO_COOKIE || cookies.s_ACT_SSO_COOKIE; 

        if(ssoCookie) {
            var dec = ATVI.utils.decodeBase64(ssoCookie);
            var index = dec.indexOf(":");
            if(index >= 0) dec = dec.substring(0, index);
            return dec;
        }

        return this.getAnonVisitorId();
    },

    getAnonVisitorId: function() {

        var cookies = ATVI.utils.getCookies(true);

        if(cookies.ATVI_VISITOR_ID) return cookies.ATVI_VISITOR_ID;

        var date = new Date();
        var anonId = "anon-" + date.getTime() + "-" + Math.random();

        date.setTime(date.getTime() + 5 * 356 * 24 * 60 * 60000);
        ATVI.utils.setCookie("ATVI_VISITOR_ID", anonId, date);

        return anonId;
    }
};

$(function() {
    if(window.ssobar && ssobar.onReady) {
        ssobar.onReady(function() {
            ATVI.analytics.init();
        });
    } else {
        ATVI.analytics.init();
    }
});

})(jQuery);
(function($) {
    ATVI.components.tabpanel = {
    		
    	init: function(wrapper) {
    	    var tabMenu = wrapper.children(".atvi-tabs");
    	    var tabSections = wrapper.children(".atvi-tab-sections");
    	    
    	    //At first ... hide all tab sections except the first one
	    	tabSections.children(".atvi-tab-section-item:not(:first)").hide();
	    	
	    	//Then set the first tab of each tab panel to be active
    	    tabMenu.find(".atvi-tab-menu-item:first").addClass("active");
 
    	    $(".atvi-tab-menu-item").click(function(){
    	    	
    	    	//Get parent tab menu container of clicked tab menu item
    	    	var parentMenu = $(this).parent();
    	    	
    	    	//Get associated tab section container of clicked tab menu item
    	    	var nextTabSections = $(this).parent().parent().next(".atvi-tab-sections");
    	    	
    	    	//Get index of tab menu item clicked
    	    	var tabIndexNum = $(this).index();
	
		    	//Set clicked tab to active tab and remove active tab from previous tab
    	    	parentMenu.find(".atvi-tab-menu-item").removeClass("active");
		    	$(this).addClass("active");
		    	
		        //Hide all tabs first
		    	nextTabSections.children(".atvi-tab-section-item").hide();
		
		        //Then show selected tab
		    	nextTabSections.children(".atvi-tab-section-item:eq(" + tabIndexNum + ")").show();
	    	});
    	}
    }
})(jQuery);
(function($) {              
    ATVI.components.charCounter = function($el, options, $submitButton){
        // default configuration properties
        var defaults = {    
            allowed: 140,       
            warning: 25,
            css: 'counter',
            counterElement: 'span',
            cssWarning: 'warning',
            cssExceeded: 'exceeded',
            counterText: ''
        }; 
            
        var options = $.extend(defaults, options); 
        
        function calculate(obj, submitButton){
            var count = $(obj).val().length;
            var available = options.allowed - count;
            if(available <= options.warning && available >= 0){
                $(obj).next().addClass(options.cssWarning);
            } else {
                $(obj).next().removeClass(options.cssWarning);
            }
            if(available < 0){
                $(obj).next().addClass(options.cssExceeded);
                $(submitButton).attr("disabled", true);
            } else {
                $(obj).next().removeClass(options.cssExceeded);
                $(submitButton).attr("disabled", false);
            }
            if (count == 0) {
                $(submitButton).attr("disabled", true);
            }            
            $(obj).next().html(options.counterText + available);
        };

        $el = $($el);
        $submitButton = $($submitButton);
        $el.after('<' + options.counterElement + ' class="' + options.css + '">' + options.counterText + '</'+ options.counterElement + '>');
        calculate($el, $submitButton);
        $el.keyup(function() { calculate($el, $submitButton); });
        $el.change(function() { calculate($el, $submitButton); });

        return {
            update: function() {
                calculate($el, $submitButton);
            }
        };
    };  

    ATVI.components.jiveDiscussion = {
        registry: {},
        
        discussionTemplate: '<div class="jive-comment-{{commentId}} jive-user-comment clearfix" style="padding-top: 15px; color: white;">' +
            '<span class="source">{{sourceName}}</span> ' +
            '<span class="jive-time">{{timestamp}}</span> ' +
            '<div class="jive-text-{{commentId}} jive-comment-content">{{text}}</div>' +
            '<div class="jive-actions">' +
            '{{editDelete}}' +
            '</div></div>',

        editDeleteTemplate: '<a id="{{commentId}}" class="update-comment atvi-instrument atvi-no-instrument atvi-instrument-comments" href="#">{{editCommentLink}}</a> ' +
            '<a id="{{commentId}}" class="delete-comment atvi-instrument atvi-no-instrument atvi-instrument-comments" href="#">{{deleteCommentLink}}</a>',
            
        init: function(wrapper, initData, counterOptions) {
            var self = this;

            wrapper = $(wrapper);
            
            if(this.registry[wrapper[0].id]) return;
            
            var config = {
                wrapper: wrapper,
                initData: initData,
                onLoadedQueue: [],
                commentsLoaded: false,      
                addCommentLink: wrapper.find(".add-comment"),
                commentsDiv: wrapper.find(".comments"),
                commentCloseButton: wrapper.find(".comment-close"),
                commentFormDiv: wrapper.find(".comment-form-div"),
                commentInputTextarea: wrapper.find(".comment-input"),
                commentSubmitButton: wrapper.find(".comment-submit"),
                deleteCommentLink: wrapper.find(".delete-comment"),
                errorDiv: wrapper.find(".error-div"),
                loadingDiv: wrapper.find(".loading-div"),
                responseToTextDiv: wrapper.find(".response-to-div"),
                updateCommentLink: wrapper.find(".update-comment"),      
                inputAction: wrapper.find('input[name=actionType]'),
                paginationStartIndex: 0,
                nextLink: "",
                previousLink: "",
                paginationBar: wrapper.find(".discussion-pagination"),
                pageStart: 0
            };
            
            self.charCounter = ATVI.components.charCounter(config.commentInputTextarea, 
                    counterOptions, wrapper.find(".comment-submit"));   
            
            config.charCounter = self.charCounter;

            this.registry[wrapper[0].id] = config;

            self.initComments(config);                         
        },
        
        getConfig: function($el) {
            var id = $($el)[0].id;
            return id ? this.registry[id] : null;
        },
        
        initComments: function(config) {
            var self = this;
            var wrapper = config.wrapper;

            config.addCommentLink.on("click", function(e) {                   
            	if (!self.isLoggedIn(config)) {
                    return false;
                }
            	
                config.inputAction.attr("class", "add-comment-type");
                config.inputAction.val(config.initData.jiveDiscussionThreadID);
            	
                // Stops from going to top of page when click event happens
                e.preventDefault();
                config.commentInputTextarea.val("");
                config.responseToTextDiv.hide();
                self.charCounter.update();
                self.displayCommentForm(config);
            
                return false;
            });        
                
            config.commentSubmitButton.click(function() {     
                config.commentsLoaded = false;
                if (!self.isLoggedIn(config)) {
                    return false;
                }
                
                var userId = config.user.id;
                var commentText =  config.commentInputTextarea.val();
                var commentType = config.inputAction.attr("class");
                var actionType;
                var idToUse;
                
                if (commentType == "add-comment-type") {
                    actionType = "create";
                    idToUse = config.initData.jiveDiscussionThreadID;
                } else {
                    actionType = "update";
                    idToUse = config.inputAction.val();
                }
                
                self.postComment(config, idToUse, commentText, actionType, 
                    function(data) {
                        config.commentFormDiv.hide();
                        config.commentInputTextarea.val("");
                        self.getComments(config, function(data) {           
                        	self.processComments(config, data);    
                    });},
                    function() {
                        self.errorFunc(config);
                    }
                );                
                return false;
           });
           
           config.commentCloseButton.click(function() {
               config.commentFormDiv.hide();
               config.responseToTextDiv.hide();
               return false;
           });
           
           if(ssobar) {
               var timeoutTime = Date.now() + 6000;
               
               var runProcessComments = function() {
                   if(ssobar.user && ssobar.user.userInfo && ssobar.user.userInfo.jiveUserName) {
                       self.getJiveUser(ssobar.user.userInfo.jiveUserName, config.initData, function(data) {
                           // logged in
                           config.user = data;
                           self.getComments(config, function(data) {                       
                               self.processComments(config, data);    
                           });
                       });
                   } else if (ATVI.pageMode == "edit") {
                       self.getJiveUser("jive_dev", config.initData, function(data) {
                           config.user = data;
                           self.getComments(config, function(data) {                       
                               self.processComments(config, data);    
                           });
                       });
                   } else {
                       // not logged in
                	   self.getComments(config, function(data) {                       
                           self.processComments(config, data);    
                       });
                   }
               };
               
               var interval = setInterval(function() {
                   if((ssobar.user && ssobar.user.userInfo) || Date.now() > timeoutTime) {
                       clearInterval(interval);
                       runProcessComments();
                   }
               }, 100);
               
           } else {
        	   self.getComments(config, function(data) {                       
                   self.processComments(config, data);    
               });
           }
        },

        errorFunc: function(config) {
            config.loadingDiv.hide();
            config.commentFormDiv.hide();
            config.errorDiv.fadeIn(5000);
            config.commentFormDiv.show();
        },

        bindCommentEvent: function(config){
            var self = this; 
            
            config.wrapper.find(".update-comment").on("click", function(e) {
                // Stops from going to top of page when click event happens
                e.preventDefault();

                config.addCommentLink.hide();
                var commentId = this.id;
                
                config.responseToTextDiv.hide();
                config.inputAction.val(commentId);
                config.inputAction.attr("class", "update-comment");
                
                //update textarea with jive text
                var commentText = config.wrapper.find(".jive-text-" + commentId).html();
                config.commentInputTextarea.val(commentText);
                config.charCounter.update();               
                
                self.displayCommentForm(config);
                
                return false;
            });              
            
            config.wrapper.find(".delete-comment").on("click", function(e) {
                config.commentsLoaded = false;
                // Stops from going to top of page when click event happens
                e.preventDefault();
                var commentId = this.id;
                config.inputAction.val(commentId);

                var confirmDelete = confirm("Delete comment?")
                if (confirmDelete) {
                    self.deleteComment(config, commentId, function() {
                        self.getComments(config, function(data) {           
                            self.processComments(config, data);    
                        });
                    });
                }
                return false;
            });                         
        },

        processComments: function(config, data) {
            var self = this;
            var renderedComments = "";
           
            config.nextLink = "";
            if (data != null && data.list.length > 0) {  	                	               
            	var numPages = Math.ceil(data.list.length / config.initData.paginationCommentsPerPage);
            
            	if (data.links && data.links.next) { 
            		config.nextLink = data.links.next;
            		// TODO fix this later
            		//numPages = Math.floor(data.list.length / config.initData.paginationCommentsPerPage);
            	}                        
                for (var i = 0; i < data.list.length; i +=1) {
                    var c = data.list[i];     
                    
                	// Because Jive 6 upgrade, replies to comment is always registered as the ATVI user and not the Jive user commenting.
                	// So hide if it's the ATVI user.            	
                    if (c.author.displayName == "Activision Public") {
                    	c.author.displayName = "";
                    }   
                    
                    var comment;                                        
                    comment = {
                            timestamp: ATVI.components.jiveDiscussion.getTimestamp(config.initData.timestampConfig, c.published),
                            sourceName: c.author.displayName,
                            text: c.content.text,
                            commentId: c.id                                
                    };

                    if(config.user && config.user.displayName == c.author.displayName) {
                        comment.editDelete = ATVI.utils.renderTemplate(this.editDeleteTemplate, 
                            {   commentId: c.id, 
                                editCommentLink: config.initData.editCommentLink, 
                                deleteCommentLink: config.initData.deleteCommentLink
                            });
                    } else {
                        comment.editDelete = "";
                    }
                    renderedComments += ATVI.utils.renderTemplate(this.discussionTemplate, comment);                                        
                }
                
            }                       
            
            this.displayComments(config, renderedComments, numPages);
            
            while(config.onLoadedQueue.length && config.onLoadedQueue.length > 0) {
                config.onLoadedQueue.shift()();
            }
            config.commentsLoaded = true;
            
            var commentsWrapper = config.wrapper.find(".comments");
            ATVI.analytics.setupClickHandlers(commentsWrapper);
        },
        
        displayComments: function(config, renderedComments, numPages) {
            var self = this;                        

            //TODO need to get total count...
            config.wrapper.find(".count-number").text($(renderedComments).length);
            config.wrapper.find(".count-text").text(config.initData.commentsText);
            self.renderCommentsAndPages(config, numPages, renderedComments);
              
            config.loadingDiv.hide();
            self.bindCommentEvent(config);            
        },
                        
        renderCommentsAndPages: function(config, numPages, renderedComments) {
        	self = this;        	
        	
            var items_per_page = config.initData.paginationCommentsPerPage;            
            var maxPages = numPages + config.pageStart;
            var loopStart = config.pageStart + 1;
            var count = 1;
        	for (var i = loopStart; i <= maxPages; i++) {
        		
        		// Create comments divs
            	var comment = "";            	
            	var max_elem = Math.min(count * items_per_page, $(renderedComments).length);
            	for(var j=(count-1)*items_per_page; j<max_elem; j++) {
            		comment += $(renderedComments)[j].outerHTML;            		
                }               	
            	config.commentsDiv.append($("<div class=comments-div-" + i + ">" + comment + "</div>"));	
        		
        		// Create all pagination divs
            	var classString = "discussion-pagination-" + i;
            	var pageDiv = config.paginationBar.find("." + classString);
            	if (pageDiv.length == 0 && maxPages > 1) {
            		config.paginationBar.append($("<div class='" + classString + "'></div>"));
            		pageDiv = config.paginationBar.find("." + classString);
            	}        		
            	
            	if(i == (loopStart)) {
            		config.commentsDiv.find(".comments-div-"+i).show();
            		pageDiv.show();
            	} else {           
            		//TODO come back to see if we need this
            		config.commentsDiv.find(".comments-div-"+i).hide();
            		pageDiv.hide();
            	}
        		
            	// Generate the Previous link
            	if (config.pageStart > 0) {
            		var previousLink = $("<a href='#' class=page-" + config.pageStart + ">Previous</a>").click(function(e) {        			    				
                        e.preventDefault();
            			self.handlePreviousPage(config, previousLink.attr("class"));
        			});
            		pageDiv.append(previousLink);
            	}
            	
            	for (var j = loopStart; j <= maxPages; j++) {
            		var link;
            		if (j == i) {
            			link = "<span class='current'>" + i + "</span>";
            		} else {
            			link = $("<a href='#'>" + j + "</a>").click(function(e) {       
                            e.preventDefault();
            				config.paginationBar.find("*[class^='discussion-pagination-']").hide();
            				config.paginationBar.find(".discussion-pagination-"+this.outerText).show();
            				
            				config.commentsDiv.find("*[class^='comments-div']").hide();
            				config.commentsDiv.find(".comments-div-"+this.outerText).show();
            			});
            			link.addClass("atvi-instrument atvi-instrument-pagination")
            		}        		
            		pageDiv.append(link);
            	}  
            	
            	if (config.nextLink) {
            		var nextLink = $("<a href='#'>Next</a>").click(function(e) {
                        e.preventDefault();
            			self.handleNextPage(config, pageDiv.attr("class"));
            			config.pageStart += numPages;
        			});
            		pageDiv.append(nextLink);
            	}    
            	count++;
        	}
        },
        
        handleNextPage: function(config, pageClass) {
        	var self = this;

        	var page = parseInt(pageClass.replace(/discussion-pagination-/, ""));

        	config.paginationBar.find('*[class^="discussion-pagination-"]').hide();
        	config.commentsDiv.find("*[class^='comments-div']").hide();
        	
        	var nextPage = config.paginationBar.find(".discussion-pagination-" + (page+1));
        	if (nextPage.length > 0) {
        		config.commentsDiv.find(".comments-div-" + (page+1)).show();  
        		nextPage.show();        		
        	} else {        		
	        	self.getComments(config, 
		        		function(data) {                       
		                	self.processComments(config, data) 
		                },
		                config.nextLink);      		
        	}
        	return false;
        },
        
        handlePreviousPage: function(config, pageClass) {       	
        	var page = parseInt(pageClass.replace(/page-/, ""));
        	
        	config.paginationBar.find('*[class^="discussion-pagination-"]').hide();
        	config.paginationBar.find(".discussion-pagination-" + page).show();
        	
        	config.commentsDiv.find("*[class^='comments-div']").hide();
			config.commentsDiv.find(".comments-div-" + page).show();        	
        	        	
        	return false;
        },        

        displayCommentForm : function(config) {         
            config.errorDiv.hide();
            config.commentFormDiv.show();            
        },
        
        isLoggedIn: function(config) {
            if (typeof config.user === "undefined") {
                config.commentFormDiv.hide();
                config.responseToTextDiv.hide();
                window.location = config.initData.loginUrl;
                return false;
            }
            return true;
        },        
        
        deleteComment: function(config, commentId, callback) {
            config.loadingDiv.show();  
            var url = config.initData.socialUrl + "/social/jive/message/delete/" + commentId;
            $.ajax({
                type: 'GET',
                 url: url,
                 async: true,
                 contentType: "application/json",
                 dataType: 'jsonp',
                 success: callback
             });        
            return false;            
        },
        
        onCommentsLoaded: function(config, callback) {
            if(config.commentsLoaded) callback();
            else {
                config.onLoadedQueue.push(callback);
            }
        },
        
        getComments: function(config, callback, nextLink) {   
            config.loadingDiv.show();     

            var params = "startIndex=" + config.paginationStartIndex + "&itemsPerPage=" + config.initData.jiveCommentFetchSize;

            // If there's a pagination next link from Jive
            if (nextLink) {
            	var pagParams = {
                		count: "",
                		startIndex: ""        			
                	};
                	var params = config.nextLink.replace(/^.*\?/, "");
                	var vars = params.split("&");
                	for (var i = 0; i < vars.length; i++) {
                		var pair = vars[i].split('=');
                		console.log(pair[i]);
                		if (pair[0] == "count") {
                			pagParams.count = pair[1];        			
                		} else if (pair[0] == "startIndex") {
                			pagParams.startIndex = pair[1];
                		}
                	}
            	params = "startIndex=" + pagParams.startIndex + "&itemsPerPage=" + pagParams.count;
            } else {
            	config.paginationBar.html("");
    			config.commentsDiv.html("");  
    			config.pageStart = 0;
            }
                        
            var url = config.initData.socialUrl + "/social/jive/comments/discussion/" + config.initData.jiveDiscussionThreadID;
            var temp = "startIndex=" + config.paginationStartIndex + "&itemsPerPage=" + config.initData.paginationCommentsPerPage;
            
            $.ajax({
                type: 'GET',
                 url: url,
                 async: true,
                 contentType: "application/json",
                 dataType: 'jsonp',              
                 data: params,
                 success: callback                
            });        
        },

        postComment: function(config, id, commentText, action, successCallback, errorCallBack) {
            config.loadingDiv.show();   
            commentText = commentText.replace(/[\n\r]/g, ' ');
            commentText = commentText.replace(/#/g, '%23'); 
            var url = config.initData.socialUrl + "/social/jive/comment/" + action + "/discussion/" + id;    
            var params =  "personId=" + config.user.id + "&comment=" + commentText + "&personName=" + config.user.jive.username;
            
            if (action == "update") {
            	url = config.initData.socialUrl + "/social/jive/message/" + action + "/" + id;
            	params = "discussionId=" + config.initData.jiveDiscussionThreadID + "&comment=" + commentText
            }            
            
            $.ajax({
                type: 'GET',
                 url: url,
                 async: true,
                 contentType: "application/json",
                 dataType: 'jsonp',
                 data: params,
                 success: successCallback,
                 error: errorCallBack
             });        
            return false;            
        },             
        
        getJiveUser: function(username, initData, callback) {
            var url = initData.socialUrl + "/social/jive6/user/" + username;
            
            $.ajax({
                type: 'GET',
                 url: url,
                 async: true,
                 contentType: "application/json",
                 dataType: 'jsonp',
                 success: callback
             });        
            return false;            
        },
        
        getTimestamp: function(timestampConfig, time) {
            var timestampJSON = JSON.parse(timestampConfig);
            var eventTime = new Date(time);
            var currentTime = new Date();
            var diff = Math.floor((currentTime - eventTime) / 1000);

            if (diff <= 1) return timestampJSON.justNow;
            if (diff < 30) return ATVI.utils.renderTemplate(timestampJSON.xSecondsAgo, {num: diff}, "<", ">");
            if (diff <= 90) return ATVI.utils.renderTemplate(timestampJSON.oneMinuteAgo, {num: 1}, "<", ">");
            if (diff <= 3540) return ATVI.utils.renderTemplate(timestampJSON.xMinutesAgo, {num: Math.round(diff / 60)}, "<", ">");
            if (diff <= 5400) return ATVI.utils.renderTemplate(timestampJSON.oneHourAgo, {num: 1}, "<", ">");
            if (diff <= 86400) return ATVI.utils.renderTemplate(timestampJSON.xHoursAgo, {num: Math.round(diff / 3600)}, "<", ">");
            if (diff <= 129600) return ATVI.utils.renderTemplate(timestampJSON.oneDayAgo, {num: 1}, "<", ">");
            if (diff < 604800) return ATVI.utils.renderTemplate(timestampJSON.xDaysAgo, {num: Math.floor(diff / 86400)}, "<", ">");            
            if (diff <= 777600) return ATVI.utils.renderTemplate(timestampJSON.oneWeekAgo, {num: 1}, "<", ">");
            if (diff <= 1382400) return ATVI.utils.renderTemplate(timestampJSON.xWeeksAgo, {num: 2}, "<", ">");
            if (diff <= 1987200) return ATVI.utils.renderTemplate(timestampJSON.xWeeksAgo, {num: 3}, "<", ">");
            if (diff <= 2764800) return ATVI.utils.renderTemplate(timestampJSON.xWeeksAgo, {num: 4}, "<", ">");
            if (diff <= 3974400) return ATVI.utils.renderTemplate(timestampJSON.oneMonthAgo, {num: 1}, "<", ">");
            if (diff <= 7948800) return ATVI.utils.renderTemplate(timestampJSON.xMonthsAgo, {num: 2}, "<", ">");
            if (diff <= 11923200) return ATVI.utils.renderTemplate(timestampJSON.xMonthsAgo, {num: 3}, "<", ">");
            if (diff <= 15897600) return ATVI.utils.renderTemplate(timestampJSON.xMonthsAgo, {num: 4}, "<", ">");
            if (diff > 3974400) return "";            
            return "";
        }
    };
})(jQuery);

(function($) {

    ATVI.components.gallery = {
            registry: {},
            
            init: function($container, data, ageGateConfig) {
                var context = {};
                context.container = $container = $($container);
                ATVI.utils.uniqueId($container);
                this.registry[$container[0].id] = context;

                context.items = data.items;
                context.visibleThumbnailCount = data.visibleThumbnailCount;
				context.ageGateId = ageGateConfig.ageGateWrapper;
                context.displayMedia = $container.find(".display-media");
                context.displayFrame = $container.find(".display-frame");
                context.displayCaptions = $container.find(".display-caption");
                context.thumbnailContainer = $container.find(".thumbnail-container");
                context.displayLink = $container.find(".display-link");

                context.thumbnails = $container.find(".thumbnails li");

                if(data.resizeWidth != 0) this.resize(context, data.resizeWidth);

                var that = this;
                context.filter = function(filterFunc) {
                    that.filter(this, filterFunc);
                 };

                this.preloadImages(context);
                //this.showPane(context, 0);

                this.initThumbnailContainer(context, ageGateConfig);
                this.initNav(context, ageGateConfig);

                $container.touchwipe({
                     wipeLeft: function() { $container.find(".gallery-next").trigger("click"); },
                     wipeRight: function() { $container.find(".gallery-prev").trigger("click"); },
                     preventDefaultEvents: false
                });

				context.thumbnails[0].click();
            },



            getContext: function($el) {
                return this.registry[$($el)[0].id];
            },

            preloadImages: function(context) {
                var i;
                var preloadContainer = $("<div>").css("width", 0).css("height", 0).css("display", "block").css("overflow", "hidden").css("position", "inline");
                context.container.append(preloadContainer);
                for(i = 0; i < context.items.length; i++) {
                    var obj = context.items[i];
                    if(obj.mediaTypeVal != "image") continue;
                    var image = $("<img>").attr("src", obj.thumbnailLinkVal);
                    obj.image = image;
                    preloadContainer.append(image);
                }   
            },

            embedTemplate: "<iframe width='100%' height='100%' src='http://www.youtube.com/embed/{{thumbnailLinkVal}}?rel=0' frameborder='0' allowfullscreen></iframe>",


            showPane: function(context, index, ageGateConfig) {

				var that = this;

                if(index < 0 || index >= context.items.length) return;

                context.currentPane = index;

                context.displayMedia.empty();
                context.displayCaptions.empty();
                context.thumbnails.removeClass("active");
                context.thumbnails.eq(index).addClass("active");

                var obj = context.items[index];

				if(obj.ageGateVal) {
					context.displayMedia.empty();
					context.displayCaptions.empty();
					context.displayCaptions.removeClass("active");
                    context.displayLink.hide();
					context.ageGateId.show();
					ATVI.components.agegate.init(function() {

						// hide agegate div
						context.ageGateId.hide();

						displayMediaItem();

					}, ageGateConfig);

				} else {
					context.ageGateId.hide();
					displayMediaItem();
				}

				function displayMediaItem() {
					if(obj.mediaTypeVal == "image") {
						context.displayMedia.prepend(obj.image);
						if(obj.mediaLinkVal.length > 0) {
							context.displayLink.attr("href", obj.mediaLinkVal || "#");
							context.displayLink.css("display", "block");
						} else context.displayLink.hide();
						if(obj.newLinkWindowVal) {
							context.displayLink.attr("target", "_top");
						}
						else {
							context.displayLink.attr("target", "_blank");
						}
						if(obj.mediaCaptionVal != "") {
							context.displayCaptions.prepend(obj.mediaCaptionVal).addClass("active");
						}
						else {
							context.displayCaptions.removeClass("active");
							context.displayCaptions.empty();
						}

						context.displayFrame.removeClass("video-media").addClass("image-media");
					} else {
						// video
						var embedString = ATVI.utils.renderTemplate(that.embedTemplate, obj)
						context.displayLink.css("display", "none");
						//context.displayCaptions.empty();
						//context.displayCaptions.removeClass("active");
						if(obj.mediaCaptionVal != "") {
							context.displayCaptions.prepend(obj.mediaCaptionVal).addClass("active");
						}
						context.displayMedia.prepend($(embedString));
						context.displayFrame.removeClass("image-media").addClass("video-media");
					}
				}


                //context.displayCaptions.removeClass("active");
                //context.displayCaptions.eq(index).addClass("active");
            },

            showNextPane: function(context, ageGateConfig) {
                var index = ((context.currentPane || 0) + 1) % context.items.length;
                this.showPane(context, index, ageGateConfig);
            },
            
            showPreviousPane: function(context, ageGateConfig) {
                var index = ((context.currentPane || 0) + context.items.length - 1) % context.items.length;
                this.showPane(context, index, ageGateConfig);
            },
        
            initThumbnailContainer: function(context, ageGateConfig) {
                var thumbnailContainer = context.thumbnailContainer;
                var thumbWidth = context.thumbnails.outerWidth(true);
                if(context.items.length < context.visibleThumbnailCount) {
                    var totalContainerWidth = thumbWidth * context.items.length;
                }
                else
                {
                    var totalContainerWidth = thumbWidth * context.visibleThumbnailCount;
                }
                thumbnailContainer.css("width", totalContainerWidth);
                
                var that = this;
                
                context.thumbnails.click(function(e) {
                    e.preventDefault();
                    var index = context.thumbnails.index(this);

                    that.showPane(context, index, ageGateConfig);
                });
                
                context.displayLink.click(function(e) {
                    if($(this).attr("href") == "#") e.preventDefault();
                });
                
                this.update(context);
            },
            
            initNav: function(context, ageGateConfig) {            
                var thumbnailContainer = context.thumbnailContainer;
                var that = this;
                
                if(context.visibleThumbnailCount >= context.items.length) {
                    context.container.find(".gallery-prev, .gallery-next").hide();
                }
                
                var isCurrentThumbnailVisible = function() {
                    var currentThumbnails = context.container.find(".thumbnails li");
                    var displayIndex = currentThumbnails.index(context.thumbnails.eq(context.currentPane)[0]);
                    return displayIndex >= 0 && displayIndex < context.visibleThumbnailCount; 
                };
                
                context.container.find(".gallery-prev").click(function() {
                    that.showPreviousPane(context, ageGateConfig);
                    if(!isCurrentThumbnailVisible()) {
                        var lastThumb = thumbnailContainer.find("li:last");
                        lastThumb.prependTo(thumbnailContainer.find("ul"));
                    }
                });
                
                context.container.find(".gallery-next").click(function() {
                    that.showNextPane(context, ageGateConfig);
                    if(!isCurrentThumbnailVisible()) {
                        var firstThumb = thumbnailContainer.find("li:first");
                        firstThumb.appendTo(thumbnailContainer.find("ul"));
                    }
                });
            },
            
            update: function(context) {
                if(context.items.length > context.visibleThumbnailCount) {
                    context.thumbnailContainer.css("overflow", "hidden");
                } else {
                    context.container.find(".gallery-prev, .gallery-next").hide();
                }
            },
            
            filter: function(context, filterFunc) {
                var i;
                var newItems = [];
                for(i = 0; i < context.items.length; i++) {
                    var thumb = context.thumbnails.eq(i);
                    var caption = context.displayCaptions.eq(i);
                    if(filterFunc(context.items[i], thumb, caption)) {
                        newItems.push(context.items[i]);
                    } else {
                        thumb.addClass("to-remove");
                        caption.addClass("to-remove");
                    }
                }
                context.thumbnails = context.thumbnails.filter(":not(.to-remove)");
                context.container.find(".thumbnails li.to-remove").remove();
                context.displayCaptions = context.displayCaptions.filter(":not(.to-remove)");
                context.container.find(".display-caption.to-remove").remove();
                context.items = newItems;
                this.update(context);
                this.showPane(context, 0);
            },

        	resize: function(context, dataResizeWidth) {
		
                var windowWidth = $(window).width();
                
                var galleryWrapper = context.container;
                var targetWidthSize = dataResizeWidth;
                
                var checkGalleryMode = function(width) {
                    
                    if(width <= targetWidthSize)
                        galleryWrapper.addClass("responsive");
                    else 
                        if(galleryWrapper.hasClass("responsive")) galleryWrapper.removeClass("responsive");
                    
                };
                
                checkGalleryMode(windowWidth);
                
                $(window).resize(function() {
                    
                    windowWidth = window.innerWidth;
                    
                    checkGalleryMode(windowWidth);
                    
                });
                
            }
    };

})(jQuery);

(function($) {

    ATVI.components.gallery2 = {
            registry: {},
            
            init: function($container, data, ageGateConfig) {
                
				var context = {};
                context.container = $container = $($container);
                ATVI.utils.uniqueId($container);
                this.registry[$container[0].id] = context;

                context.items = data.items;
				
                context.numThumbsAtATime = data.numThumbsAtATime;
				context.numThumbs        = data.numThumbs;
				context.numThumbsMargin  = data.numThumbsMargin;
				context.asManyThumbs     = data.asManyThumbs;
				context.manyThumbsWidth  = data.manyThumbsWidth;
				context.manyThumbsMargin = data.manyThumbsMargin;

				context.videoRatio = data.videoRatio;
				
				context.ageGateId = ageGateConfig.ageGateWrapper;


                context.galleryDisplayFrame = $container.find(".gallery-display-frame");
				context.ageGatePreview = context.galleryDisplayFrame.find(".atvi-age-gate-preview-image");
				context.ageGatePreviewIcon =  $container.find(".age-gate-preview-icon");
                context.galleryDisplay = $container.find(".gallery-display");
                context.galleryCaption = $container.find(".gallery-caption");
                //context.displayLink = $container.find(".display-link");
                context.thumbnailContainer = $container.find(".gallery-thumbnails-container");
				context.thumbnailList = $container.find(".gallery-thumbnails .gallery-thumbnails-list");
                context.thumbnailItem = $container.find(".gallery-thumbnails .gallery-thumbnails-list li");
				context.paginationList = $container.find(".gallery-pagination");
				context.paginationItem = $container.find(".gallery-pagination li");
				context.galleryNav = $container.find(".gallery-nav");
				context.galleryNavPrev = $container.find(".gallery-nav-prev");
				context.galleryNavNext = $container.find(".gallery-nav-next");

                if(data.resizeWidth != 0) this.resize(context, data.resizeWidth);

				//Preload images
                this.preloadImages(context);

				//Initiate touchwipe for mobile mode
                $container.touchwipe({
                     wipeLeft: function() { context.galleryNavNext.trigger("click"); },
                     wipeRight: function() { context.galleryNavPrev.trigger("click"); },
                     preventDefaultEvents: false
                });
				
				//Initiate helper functions
				this.initThumbnailContainer(context, data.resizeWidth);
                this.initNav(context, ageGateConfig);
				this.initThumbnailBehavior(context, ageGateConfig);
				this.initAgeGatePreview(context, ageGateConfig);

				//Click on the first thumbnail to display
				context.thumbnailList.find("li:first-child").click();
            },



            getContext: function($el) {
                return this.registry[$($el)[0].id];
            },

            preloadImages: function(context) {
                var i;
                var preloadContainer = $("<div>").css("width", 0).css("height", 0).css("display", "block").css("overflow", "hidden").css("position", "inline");
                context.container.append(preloadContainer);
                for(i = 0; i < context.items.length; i++) {
                    var obj = context.items[i];
                    if(obj.mediaTypeVal == "video" && obj.ageGatePreviewVal) {
						var ageImage = $("<img>").attr("src", obj.ageGatePreviewVal);
                        obj.ageImage = ageImage;
                    }
                    if(obj.mediaTypeVal != "image") continue;
                    var image = $("<img>").attr("src", obj.thumbnailLinkVal);
                    obj.image = image;
                    preloadContainer.append(image);
                }   
            },

            embedTemplate: "<iframe style='visibility:hidden;' onload='this.style.visibility = \"visible\";' width='100%' height='100%' src='http://www.youtube.com/embed/{{thumbnailLinkVal}}' frameborder='0' allowfullscreen></iframe>",
			
			showPaneStepOne: function(context, index, ageGateConfig) {
				
				var that = this;
				
				//If we click on a thumbnail that is already active, then kill the rest of the code
				if(context.thumbnailList.find("li[rel='" + index + "']").hasClass("active")) {
					return false;	
				}
				
				
				//Add the active class to the new thumbnail clicked on and then add the active class to the associated pagination item
				context.thumbnailItem.each(function() {
				
					if($(this).attr("rel") == index) {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");	
					}
				});
				
				context.paginationItem.each(function() {

					if($(this).attr("rel") == index) {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");	
					}
					
				});
				
				var obj = context.items[index];

				if(obj.ageGateVal) {

					context.galleryDisplay.empty();
					context.galleryCaption.empty();
					//context.displayLink.hide();
					context.galleryCaption.addClass("disable");

                    var cookieAge = ATVI.utils.getCookie('agegate')
					
					if(obj.ageGatePreviewVal && !cookieAge) {
						
						context.ageGatePreview.prepend(obj.ageImage);
						context.ageGatePreview.show();
						context.ageGateId.hide();
						
					} else {
						
						that.initAgeGate(context, obj, ageGateConfig);
						context.ageGatePreview.find('img').remove();

					}
					
				} else {
					context.ageGatePreview.hide();
					context.ageGateId.hide();
					that.showPaneStepTwo(context, obj);
					
				}
				
			},
			
			showPaneStepTwo: function(context, obj) {
				
				var that = this;
					
				if(obj.mediaTypeVal == "image") {
					
					//context.galleryDisplay.html(obj.image);
					
					context.galleryDisplay.css("height", "auto");
				
					/*if(obj.mediaLinkVal.length > 0) {
						context.displayLink.attr("href", obj.mediaLinkVal || "#");
						context.displayLink.show();
					} else context.displayLink.hide();*/
					
					if(obj.mediaCaptionVal.length > 0) {
						context.galleryCaption.removeClass("disable");
						context.galleryCaption.prepend(obj.mediaCaptionVal);
					} else {
						context.galleryCaption.empty();
						context.galleryCaption.addClass("disable");
					}
					
					if(obj.mediaLinkVal) {
						/*context.displayLink.attr("href", obj.mediaLinkVal || "#");
						context.displayLink.show();*/

                        context.galleryDisplay.html(obj.image);
						
						context.galleryDisplay.find("img").wrap("<a id='gallery-display-link' class='display-link' href='" + obj.mediaLinkVal + "' target='_blank'></a>");
						
					} else {
						context.galleryDisplay.html(obj.image);
					}
					
				
					context.galleryDisplayFrame.removeClass("video-media").addClass("image-media");
					
				} else if (obj.mediaTypeVal == "video") {
				
					var embedString = ATVI.utils.renderTemplate(that.embedTemplate, obj);

					//context.displayLink.hide();
				
					if(obj.mediaCaptionVal.length > 0) {
						context.galleryCaption.removeClass("disable");
						context.galleryCaption.prepend(obj.mediaCaptionVal);
					} else {
						context.galleryCaption.empty();
						context.galleryCaption.addClass("disable");
					}

					context.galleryDisplay.html($(embedString));
				
					context.galleryDisplayFrame.removeClass("image-media").addClass("video-media");
					
					that.resizeDisplayFrame(context);
					
				}
									
			},

			initAgeGate: function(context, obj, ageGateConfig) {
				
				var that = this;
				
				context.ageGateId.show();
				that.resizeAgeGate(context);
					
				ATVI.components.agegate.init(function() {

					context.ageGateId.hide();
					context.ageGatePreview.hide();
					that.showPaneStepTwo(context, obj);

				}, ageGateConfig);
				
			},
			
			initAgeGatePreview: function(context, ageGateConfig) {
				
				var that = this;

                if (context.numThumbs === 0) {
					context.ageGatePreviewIcon.insertBefore(context.thumbnailList); 
                }

                context.ageGatePreviewIcon.click(function(){
					context.ageGatePreview.click(); 
                }); 

				context.ageGatePreview.click(function() {
					
					$(this).hide();
					
					var objIdx = context.thumbnailList.find("li.active").attr("rel");
					
					var obj = context.items[objIdx];
					
					that.initAgeGate(context, obj, ageGateConfig);
					
				});
				
			},

            initThumbnailContainer: function(context, resizeWidth) {
				
				var windowWidth = window.innerWidth;
				
				if(windowWidth > resizeWidth) {
					
					//Hide pagination bullets
					context.paginationList.hide();
					
					//Show nav arrows
					context.galleryNav.show();
					
					//Show thumbnail list

					context.thumbnailList.show();
										
					if(context.numThumbsAtATime) {
						
						//Get width in percentage of an individual thumbnail
						var numWidth = (100 - (context.numThumbs-1)*(context.numThumbsMargin)) / context.numThumbs;
												
						//Apply calculated width and given margin to the thumbnails. Make first thumbnail in list a margin left of 0						
						context.thumbnailItem.css("width", numWidth + "%");
						context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
						context.thumbnailList.find("li:first-child").css("margin-left", "0px");
						
						context.thumbnailContainer.css("overflow", "hidden");
						
						//On page load, get height of thumbnail
						var thumbHeight;

                        thumbHeight = context.thumbnailItem.outerHeight();

						//To fix a bug in non-Chrome browsers, trigger this script when the thumbnail images are loaded to get the height
						context.thumbnailContainer.find("img").load(function() {

							thumbHeight = context.thumbnailItem.outerHeight();

							context.thumbnailList.height(thumbHeight).css("overflow", "hidden");
						
						});
						
						context.thumbnailList.height(thumbHeight).css("overflow", "hidden");
						
						
					} else if(context.asManyThumbs) {
												
						//Get total length of all thumbnails including their margin
						var thumbnailListContainer = (context.thumbnailItem.length * context.manyThumbsWidth) + (context.thumbnailItem.length * context.manyThumbsMargin);
						
						//Apply given width and margin to thumbnails
						context.thumbnailItem.width(context.manyThumbsWidth);
						context.thumbnailItem.css("margin-right", context.manyThumbsMargin + "px");
						context.thumbnailContainer.css("overflow", "hidden");
						context.thumbnailList.width(thumbnailListContainer);
						
					}

				} else {
					
					//Show pagination bullets
					context.paginationList.show();
					
					//Hide nav arrows
					context.galleryNav.hide();
					
					//Hide thumbnail list
					context.thumbnailList.hide();
					
				}
				
			},
			
			initNav: function(context, ageGateConfig) {

                var that = this;
								
				//If AsManyThumbs is true
				if(context.asManyThumbs) {
					
					context.galleryNavNext.click(function(e) {
					
						e.preventDefault();
						
						//Get width of thumbnail container
						var thumbnailContainerWidth = context.thumbnailContainer.width();
						
						//Get total width of all thumbnails
						var thumbnailListContainerWidth = (context.thumbnailItem.length * context.manyThumbsWidth) + (context.thumbnailItem.length * context.manyThumbsMargin);
						
						//If total width of all thumbnails is greater than thumbnail container width, then that means there are more thumbnails outside of the viewing container
						if(thumbnailListContainerWidth > thumbnailContainerWidth) {
						
							//Move first thumbnail to the end of list
							context.thumbnailList.find("li:first-child").appendTo(context.thumbnailList);
							
							//Take current active thumbnail and move it to the next thumbnail
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If curthumbindex is the last thumbnail, put active class on first thumbnail which has rel attr value of 0
							if(curThumbIndex >= (context.items.length - 1)) {
								
								//context.thumbnailList.find("li[rel='0']").click();
                                that.showPaneStepOne(context, "0", ageGateConfig);

								
							} else {
							
								//context.thumbnailList.find("li[rel='" + ((parseInt(curThumbIndex) + 1).toString()) + "']").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) + 1).toString(), ageGateConfig);
							
							}
							
								
						} else {
							
							//Do not move first thumbnail to end of list
							
							//Get curThumbIndex
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If current thumb is the last one, then put active class to first thumbnail
							if(curThumbIndex >= (context.items.length - 1)) {
								
								//context.thumbnailList.find("li:first-child").click();
                                that.showPaneStepOne(context, "0", ageGateConfig);
								
							}
							
							//Else, move active class to next thumbnail
							else {
								
								//context.thumbnailList.find("li:eq(" + (parseInt(curThumbIndex) + 1) + ")").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) + 1).toString(), ageGateConfig);

							}
							
							
						}
						
					});
					
					context.galleryNavPrev.click(function(e) {
					
						e.preventDefault();
						
						//Get width of thumbnail container
						var thumbnailContainerWidth = context.thumbnailContainer.width();
						
						//Get total width of all thumbnails
						var thumbnailListContainerWidth = (context.thumbnailItem.length * context.manyThumbsWidth) + (context.thumbnailItem.length * context.manyThumbsMargin);
						
						//If total width of all thumbnails is greater than thumbnail container width, then that means there are more thumbnails outside of the viewing container
						if(thumbnailListContainerWidth > thumbnailContainerWidth) {
						
							//Move last thumbnail to the front of list
							context.thumbnailList.find("li:last-child").prependTo(context.thumbnailList);
							
							//Take current active thumbnail and move it to the next thumbnail
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If curthumbindex is the first thumbnail, put active class on last thumbnail which has rel attr value of 1 minutes the total number of thumbnails
							if(parseInt(curThumbIndex) <= 0) {
								
								//context.thumbnailList.find("li[rel='" + (context.items.length - 1).toString() + "']").click();
                                that.showPaneStepOne(context, (context.items.length - 1).toString(), ageGateConfig);
								
							} else {
							
								//context.thumbnailList.find("li[rel='" + ((parseInt(curThumbIndex) - 1).toString()) + "']").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) - 1).toString(), ageGateConfig);
							
							}
							
								
						} else {
							
							//Do not move last thumbnail to end of list
							
							//Get curThumbIndex
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If current thumb is the first one, then put active class to last thumbnail
							if(parseInt(curThumbIndex) <= 0) {

								//context.thumbnailList.find("li:last-child").click();
                                that.showPaneStepOne(context, (context.items.length - 1).toString(), ageGateConfig);
								
							}
							
							//Else, move active class to prev thumbnail
							else {
								
								//context.thumbnailList.find("li:eq(" + (parseInt(curThumbIndex) - 1) + ")").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) - 1).toString(), ageGateConfig);
								
							}
							
						}
						
					});
					
					
				//Else if NumThumbsAtATime is true
				} else if (context.numThumbsAtATime) {
					
					context.galleryNavNext.click(function(e) {
						
						e.preventDefault();
						
						//Check if there are any thumbnails outside the thumbnail
						if(context.items.length <= context.numThumbs) {
						
							//Do not move li elements around
							
							//Get curThumbIndex
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If current thumb is the last one, then click the first thumbnail
							if(parseInt(curThumbIndex) >= (context.items.length - 1)) {
								
								//context.thumbnailList.find("li:first-child").click();
                                that.showPaneStepOne(context, "0", ageGateConfig);

								
							}
							
							//Else, click next thumbnail
							else {
								
								//context.thumbnailList.find("li:eq(" + (parseInt(curThumbIndex) + 1) + ")").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) + 1).toString(), ageGateConfig);

							}
							
						} else {
							
							//Move li elements around
							
							//Move first thumbnail to the end of list
							context.thumbnailList.find("li:first-child").appendTo(context.thumbnailList);
							
							//Take current active thumbnail and move it to the next thumbnail
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If curthumbindex is the last thumbnail, click first thumbnail which has rel attr value of 0
							if(parseInt(curThumbIndex) >= (context.items.length - 1)) {
								
								//context.thumbnailList.find("li[rel='0']").click();
                                that.showPaneStepOne(context, "0", ageGateConfig);

								
							} else {
							
								//context.thumbnailList.find("li[rel='" + ((parseInt(curThumbIndex) + 1).toString()) + "']").click();
                                that.showPaneStepOne(context, (parseInt(curThumbIndex) + 1).toString(), ageGateConfig);
							
							}
							
							//Recalculate margin-left for each thumb			
							var numWidth = (100 - (context.numThumbs - 1)*(context.numThumbsMargin)) / context.numThumbs;
													
							context.thumbnailItem.css("width", numWidth + "%");
							context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
							context.thumbnailList.find("li:first-child").css("margin-left", "0px");
								
						}
						
					});
					
					context.galleryNavPrev.click(function(e) {
											
						e.preventDefault();
						
						//Check if there are any thumbnails outside the thumbnail
						if(context.items.length <= context.numThumbs) {
						
							//Do not move li elements around
							
							//Get curThumbIndex
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If current thumb is the first one, then click last thumbnail
							if(parseInt(curThumbIndex) <= 0) {
								
								//context.thumbnailList.find("li:last-child").click();
                                that.showPaneStepOne(context, (context.items.length - 1).toString(), ageGateConfig);
								
							}
							
							//Else, click  prev thumbnail
							else {
								
								//context.thumbnailList.find("li:eq(" + (parseInt(curThumbIndex) - 1) + ")").click();
								that.showPaneStepOne(context, (parseInt(curThumbIndex) - 1).toString(), ageGateConfig);

							}
							
						} else {
							
							//Move li elements around
							
							//Move last thumbnail to the front of list
							context.thumbnailList.find("li:last-child").prependTo(context.thumbnailList);
							
							//Take current active thumbnail and move it to the prev thumbnail
							var curThumbIndex = context.thumbnailList.find("li.active").attr("rel");
							
							context.thumbnailList.find("li.active").removeClass("active");
							
							//If curthumbindex is the first thumbnail, put active class on last thumbnail which has rel attr value of context.items.length - 1
							if(parseInt(curThumbIndex) <= 0) {
								
								//context.thumbnailList.find("li[rel='" + (context.items.length - 1).toString() + "']").click();
                                that.showPaneStepOne(context, (context.items.length - 1).toString(), ageGateConfig);
								
							} else {
							
								//context.thumbnailList.find("li[rel='" + ((parseInt(curThumbIndex) - 1).toString()) + "']").click();
								that.showPaneStepOne(context, (parseInt(curThumbIndex) - 1).toString(), ageGateConfig);
							
							}
							
							//Recalculate margin-left for each thumb
							var numThumbs = context.numThumbs;
							var numMargin = context.numThumbsMargin;
							
							var numWidth = (100 - (context.numThumbs - 1)*(context.numThumbsMargin)) / context.numThumbs;
													
							context.thumbnailItem.css("width", numWidth + "%");
							context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
							context.thumbnailList.find("li:first-child").css("margin-left", "0px");
								
						}
												
					});
				
				}
		
				
			},
			
			initThumbnailBehavior: function(context, ageGateConfig) {
				
				var that = this;
				
				context.thumbnailItem.click(function(e) {
                    e.preventDefault();
                    
					var index = $(this).attr("rel");

					that.showPaneStepOne(context, index, ageGateConfig);
                });
				
				context.paginationItem.click(function(e) {
                    
					e.preventDefault();
                    
					var index = $(this).attr("rel");

                    that.showPaneStepOne(context, index, ageGateConfig);
					
                });
				
			},
			
			resizeDisplayFrame : function(context) {
				
				//For videos in the display frame
				if(context.galleryDisplayFrame.hasClass("video-media")) {
					
					var displayWidth = context.galleryDisplay.width();
					var displayHeight;
					
					if(context.videoRatio == "big") {
						
						displayHeight = (displayWidth * 9) / 16;
						
					} else {
					
						displayHeight = (displayWidth * 3) / 4;
						
					}
					
					context.galleryDisplay.height(displayHeight);
					
				} else {
					context.galleryDisplay.css("height", "auto");
				}
						
			},
			
			resizeAgeGate : function(context) {
				
				//For videos in the display frame
				if(context.ageGateId.is(":visible")) {
					
					//By default, give age gate a 4/3 ratio
					var displayWidth = context.galleryDisplay.width();
					var displayHeight = (displayWidth * 3) / 4;
											
					context.ageGateId.height(displayHeight);
					
				} else {
					context.ageGateId.css("height", "auto");
				}
						
			},

        	resize: function(context, dataResizeWidth) {
				
				var that = this;
		
                $(window).resize(function() {
                                        
					that.initThumbnailContainer(context, dataResizeWidth);
					that.resizeDisplayFrame(context);
					that.resizeAgeGate(context)
                    
                });
                
            }
    };

})(jQuery);

(function($) {
    ATVI.components.lightbox = {

        registry: {},

    	init: function($container, data, ageGateConfig) {   	    		

			var context = {};
            context.wrapper = $container = $($container);
            ATVI.utils.uniqueId($container);
            this.registry[$container[0].id] = context;

            context.items = data.items;

            context.overlay = data.overlay;
            context.container = data.container;
            context.enableShare = data.enableShare;
            context.padding = data.padding;
            context.timeStamp = data.timeStamp;

            context.ageGateId = ageGateConfig.ageGateWrapper;

            this.closeAgeGate(context);
            this.initFancybox(context, ageGateConfig);
			this.resize(context);

        },

        initFancybox : function(context, ageGateConfig) {
			
			var that = this;

            //If share buttons are enabled, then for images ...
			if(context.enableShare) {
				
				context.wrapper.find("a.fancybox").fancybox({
					
					beforeShow : function() {
        
                        if (this.title) {
        
                            this.title += "<br />";
        
                            this.title += '<div class="addthis addthis_default_style "><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_1"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_2"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_3"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_4"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_compact"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_counter addthis_bubble_style"></a></div>';
        
        
                        } else {
        
                            this.title = '<div class="addthis addthis_default_style "><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_1"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_2"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_3"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_preferred_4"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_button_compact"></a><a href="' + this.href + '" addthis:url="' + this.href + '" addthis:title="' + this.title + '" class="addthis_counter addthis_bubble_style"></a></div>';
        
                        }
        
                    },
        
                    afterShow : function() {
        
                        addthis.toolbox($(".addthis").get());
                        addthis.counter($(".addthis_counter").get());
                    
                    },
        
                    helpers : {
        
                        title : {
                            type : 'inside'
                        } 
        
                    }
					
				});


            //Do regular lightbox without beforeShow or afterShow or helper functions    
			} else {
				
				context.wrapper.find("a.fancybox").fancybox();	
			}

            //If share buttons are enabled... then for videos
			
			if(context.enableShare) {
				
				context.wrapper.find("a.iframe").click(function() {
        
					//Create properties for age gate
			
			
					var linkEl = this;
					var linkElParentIndex = $(this).closest("li").index();
	
					var obj = context.items[linkElParentIndex];
			
					var showLightbox = function() {
						
						$.fancybox({
							'type' : 'iframe',
							// hide the related video suggestions and autoplay the video
							'href' : linkEl.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '?rel=0&wmode=transparent&autoplay=1&start=' + context.timeStamp,
							'overlayShow' : true,
							'centerOnScroll' : true,
							'padding' : context.timeStamp,
							'speedIn' : 100,
							'speedOut' : 50,
							beforeShow : function() {
				
								if(linkEl.title) {
				
									linkEl.title += "<br />";
	
									linkEl.title += '<div class="addthis addthis_default_style "><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_1"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_2"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_3"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_4"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_compact"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_counter addthis_bubble_style"></a></div>';
				
								} else {
				
									linkEl.title = '<div class="addthis addthis_default_style "><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_1"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_2"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_3"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_preferred_4"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_button_compact"></a><a href="' + linkEl.href + '" addthis:url="' + linkEl.href + '" addthis:title="' + linkEl.title + '" class="addthis_counter addthis_bubble_style"></a></div>';
				
								}
				
							},
				
							afterShow : function() {
								addthis.toolbox(
									$(".addthis").get()
								);
								addthis.counter(
									$(".addthis_counter").get()
								);
								
							},
				
							helpers : {
								
								title : {
									
									type : 'inside'
										
								}
								
							}
						
						});
			
					};
			
					//If agegate isn't disabled
					if(obj.ageGateVal) {
						
						// show agegate div
						context.overlay.addClass('display');
						context.container.addClass('show');
						
						that.resizeAgeGate(context);
			
						ATVI.components.agegate.init(function() {
							
							// hide agegate div
							context.overlay.removeClass('display');
							context.container.removeClass('show');
							
							showLightbox();
	
						}, ageGateConfig);
						
						// agegate is disabled, just show video
					} else {
						showLightbox();
					}
			
					return false;
			
				});


			//Excluse the use of beforeShow, afterShow, and helper functions	
			} else {
			
				context.wrapper.find("a.iframe").click(function() {
        
					//Create properties for age gate
			
			
					var linkEl = this;
					var linkElParentIndex = $(this).closest("li").index();
	
					var obj = context.items[linkElParentIndex];
			
					var showLightbox = function() {
						
						$.fancybox({
							'type' : 'iframe',
							// hide the related video suggestions and autoplay the video
							'href' : linkEl.href.replace(new RegExp('watch\\?v=', 'i'), 'embed/') + '?rel=0&wmode=transparent&autoplay=1&start=' + context.timeStamp,
							'overlayShow' : true,
							'centerOnScroll' : true,
							'padding' : context.timeStamp,
							'speedIn' : 100,
							'speedOut' : 50
						
						});
			
					};

					//If agegate isn't disabled
					if(obj.ageGateVal) {
						
						// show agegate div
						context.overlay.addClass('display');
						context.container.addClass('show');
						
						that.resizeAgeGate(context);
			
						ATVI.components.agegate.init(function() {
							
							// hide agegate div
							context.overlay.removeClass('display');
							context.container.removeClass('show');
							
							showLightbox();
	
						}, ageGateConfig);
						
						// agegate is disabled, just show video
					} else {
						showLightbox();
					}
			
					return false;
				});
				
			}

    	},

        closeAgeGate: function(context) {

            context.overlay.click(function() {

				if($(this).hasClass("display")) {

					context.overlay.removeClass("display");
                    context.container.removeClass("show");

            	}

            });

        },
		
		resizeAgeGate: function(context) {
			
			if(context.container.hasClass("show")) {
				
				var containerWidth = context.container.outerWidth();
				var containerLeft = containerWidth / 2;
				
				var containerHeight = context.container.outerHeight();
				var containerTop = containerHeight / 2;
				
				context.container.css("margin-left", "-" + containerLeft + "px");
				context.container.css("margin-top", "-" + containerTop + "px");
				
			}
			
		},

        resize: function(context) {
			
			var that = this;
			
			$(window).resize(function() {
				
				that.resizeAgeGate(context);
				
			});
                
        }
    };    	        

})(jQuery);

(function($) {

    ATVI.components.addthis = ATVI.components.addthis || {};

    ATVI.components.addthis.queue = ATVI.components.addthis.queue || [];
    
    ATVI.components.addthis.registry = ATVI.components.addthis.registry || {};
    
    ATVI.components.addthis.processQueue = ATVI.components.addthis.processQueue || function() {
        while(this.queue.length) {
            this.queue.shift()();
        }
    };
                    
    ATVI.components.addthis.initToolbox = ATVI.components.addthis.initToolbox || function($el, pubId, urlOverride, titleOverride) {

        var origin = window.location.protocol + "//" + window.location.host;
        if(urlOverride.indexOf("/") == 0) {
			urlOverride = origin + urlOverride;
        }
        $el.find("a").each(function() {
			var $this = $(this);
            var attr = $this.attr("addthis:url");
            if(attr && attr.indexOf("/") == 0) {
                $this.attr("addthis:url", origin + attr);
            }
        });

        var shareConfig = {
            url: urlOverride,
            title: titleOverride
        };

        this.registry[$el[0].id] = {
            html: $el.html(),
            pubId: pubId
        };
        this.setupToolbox($el, pubId, shareConfig);                
    };

    ATVI.components.addthis.setupToolbox = ATVI.components.addthis.setupToolbox || function($el, pubId, shareConfig) {
    
        var el = $el.find(".toolbox")[0];
        var config = {
            username: pubId,
            data_track_clickback: true,
            data_track_addressbar: false,
        };

        shareConfig = shareConfig || {};
        shareConfig.url = shareConfig.url || window.location.href;
        shareConfig.title = shareConfig.title || document.title;

        var alreadyLoaded = window.addthis;

        this.queue.push(function() {
                window.addthis.ost = 0;
                window.addthis.ready();
                addthis.toolbox(el, config, shareConfig);
                addthis.counter($el.find(".addthis_counter")[0], config, shareConfig);
        });

        if(this.scriptLoaded) {
            if(window.addthis) {

                this.processQueue();
            }
        } else {
            this.scriptLoaded = true;
            $(function() {
                $.getScript("//s7.addthis.com/js/250/addthis_widget.js#pubid=" + pubId + "&domready=1&async=1", function() {
                    addthis.init();
                    ATVI.components.addthis.processQueue();              
                });
            });
        }
    };
        
    ATVI.components.addthis.updateToolbox = ATVI.components.addthis.updateToolbox || function($el, shareConfig) {
        var reg = this.registry[$el[0].id];
        if(!reg) return;
        $el.html(reg.html);
        this.setupToolbox($el, reg.pubId, shareConfig);
    };
    
    ATVI.components.addthis.initSetupFollow =  ATVI.components.addthis.initSetupFollow  || function (options) {
    	
    	var $el = options.$el.find(".addthis_toolbox"); 
       	var addThisclasses = (ATVI.device.isMobile.any()) ? options.mobileStyle :  options.desktopStyle; //execute each time? 
       	var addThisArray = addThisclasses.split(" "); 
       	
    	if ($el && $el.length > 0)  {  
    		for (var count = 0; count < addThisArray.length; count++) {
    			$el.addClass(addThisArray[count]); 
    		}
    	}
    	
        if(!this.scriptLoaded) {
            this.scriptLoaded = true;
            $(function() {
                $.getScript("//s7.addthis.com/js/250/addthis_widget.js#pubid=" + options.pubId + "&domready=1&async=1", function() {
                	addthis.init();
                });
            });
        }
    
    };   
        
})(jQuery);

(function($) {
    ATVI.components.jobsFeed = {
        catMapArray : {
	        '200000042' : 'Animation',
	        '200000041' : 'Art',
	        '200000060' : 'Audio%2FSound',
	        '6160110982' : 'Business%20Development',
	        '6260110982' : 'Cinematics',
	        '6360110982' : 'Community%20Development',
	        '200000000' : 'Corporate%20Administration    ',
	        '8160110982' : 'Corporate%20Strategy',
	        '10160110982' : 'Creative%20Services',
	        '4460110982' : 'Customer%20Support',
	        '200000001' : 'Finance%2FAccounting', 
	        '200000043' : 'Game%2FLevel%20Design', 
	        '6860110982' : 'Hardware%20Engineering',
	        '200000021' : 'Human%20Resources',
	        '200000040' : 'Information%20Technology',
	        '200000022' : 'Legal',
	        '12260110982' : 'Licensing',
	        '6460110982' : 'Localisation',
	        '200000023' : 'Marketing',
	        '200000024' : 'Operations',                
	        '200000044' : 'Production',               
	        '200000045' : 'Programming',                
	        '4360110982' : 'Public%20Relations',
	        '4260110982' : 'Quality%20Assurance',
	        '200000027' : 'Sales',
	        '2160110982' : 'Studio%20Management',
	        '6560110982' : 'Studio%20Operations%2FAdministration',                                
	        '6660110982' : 'Supply%20Chain',                
	        '6760110982' : 'Web%20Design'
    	},
                
        locMapArray : [{locId: '-1', locValue: 'All', locType: 'location', locDisplay: 'All'},
	        {locId: '152160110982', locValue: 'BR', locType: 'country', locDisplay: 'Brazil'},
	        {locId: '152660110982', locValue: 'S&atilde;o Paulo', locType: 'city', locDisplay: 'S&atilde;o Paulo'},
	        {locId: '160110982', locValue: 'CA', locType: 'country', locDisplay: 'Canada'},
	        {locId: '10760110982', locValue: 'Vancouver', locType: 'city', locDisplay: 'Vancouver'},
	        {locId: '5560110982', locValue: 'Quebec City', locType: 'city', locDisplay: 'Quebec City'},
	        {locId: '78160110982', locValue: 'CN', locType: 'country', locDisplay: 'China'},
	        {locId: '83760110982', locValue: 'Shanghai', locType: 'city', locDisplay: 'Shanghai'},
	        {locId: '207260110982', locValue: 'DK', locType: 'country', locDisplay: 'Denmark'},
	        {locId: '235260110982', locValue: 'Copenhagen', locType: 'city', locDisplay: 'Copenhagen'},
	        {locId: '295160110982', locValue: 'FR', locType: 'country', locDisplay: 'France'},
	        {locId: '299860110982', locValue: 'Paris', locType: 'city', locDisplay: 'Paris'},
	        {locId: '184260110982', locValue: 'DE', locType: 'country', locDisplay: 'Germany'},
	        {locId: '197260110982', locValue: 'Munich', locType: 'city', locDisplay: 'Munich'},
	        {locId: '89360110982', locValue: 'IE', locType: 'country', locDisplay: 'Ireland'},
	        {locId: '120260110982', locValue: 'Dublin', locType: 'city', locDisplay: 'Dublin'},
	        {locId: '309560110982', locValue: 'IT', locType: 'country', locDisplay: 'Italy'},
	        {locId: '318860110982', locValue: 'Milan', locType: 'city', locDisplay: 'Milan'},
	        {locId: '235660110982', locValue: 'NL', locType: 'country', locDisplay: 'Netherlands'},
	        {locId: '240060110982', locValue: 'Venlo', locType: 'city', locDisplay: 'Venlo'},
	        {locId: '238360110982', locValue: 'Amsterdam', locType: 'city', locDisplay: 'Amsterdam'},
	        {locId: '240660110982', locValue: 'NO', locType: 'country', locDisplay: 'Norway'},
	        {locId: '286060110982', locValue: 'Oslo', locType: 'city', locDisplay: 'Oslo'},
	        {locId: '286160110982', locValue: 'ES', locType: 'country', locDisplay: 'Spain'},
	        {locId: '292660110982', locValue: 'Madrid', locType: 'city', locDisplay: 'Madrid'},
	        {locId: '46160110982', locValue: 'SE', locType: 'country', locDisplay: 'Sweden'},
	        {locId: '73760110982', locValue: 'Stockholm', locType: 'city', locDisplay: 'Stockholm'},
	        {locId: '124260110982', locValue: 'UK', locType: 'country', locDisplay: 'United Kingdom'},
	        {locId: '141060110982', locValue: 'Leeds', locType: 'city', locDisplay: 'Leeds'},
	        {locId: '141660110982', locValue: 'London', locType: 'city', locDisplay: 'London'},
	        {locId: '180160110982', locValue: 'Uxbridge', locType: 'city', locDisplay: 'Uxbridge'},
	        {locId: '147160110982', locValue: 'Warwickshire', locType: 'city', locDisplay: 'Warwickshire'},
	        {locId: '200000000', locValue: 'US', locType: 'country', locDisplay: 'United States'},
	        {locId: '200000023', locValue: 'Arkansas', locType: 'state', locDisplay: 'Arkansas'},
	        {locId: '176160110982', locValue: 'Bentonville', locType: 'city', locDisplay: 'Bentonville'},
	        {locId: '200000180', locValue: 'Fayetteville', locType: 'city', locDisplay: 'Fayetteville'},
	        {locId: '200000001', locValue: 'California', locType: 'state', locDisplay: 'California'},
	        {locId: '44260110982', locValue: 'Carlsbad', locType: 'city', locDisplay: 'Carlsbad'},
	        {locId: '42160110982', locValue: 'El Segundo', locType: 'city', locDisplay: 'El Segundo'},
	        {locId: '200000141', locValue: 'Encino', locType: 'city', locDisplay: 'Encino'},
	        {locId: '200000080', locValue: 'Foster City', locType: 'city', locDisplay: 'Foster City'},
	        {locId: '32160110982', locValue: 'Fresno', locType: 'city', locDisplay: 'Fresno'},
	        {locId: '200000101', locValue: 'Novato', locType: 'city', locDisplay: 'Novato'},
	        {locId: '328160110982', locValue: 'Santa Clara', locType: 'city', locDisplay: 'Santa Clara'},
	        {locId: '200000120', locValue: 'Santa Monica', locType: 'city', locDisplay: 'Santa Monica'},
	        {locId: '200000121', locValue: 'Woodland Hills', locType: 'city', locDisplay: 'Woodland Hills'},
	        {locId: '200000200', locValue: 'Maine', locType: 'state', locDisplay: 'Maine'},
	        {locId: '200000203', locValue: 'Portland', locType: 'city', locDisplay: 'Portland'},
	        {locId: '200000020', locValue: 'Minnesota', locType: 'state', locDisplay: 'Minnesota'},
	        {locId: '326160110982', locValue: 'Bloomington', locType: 'city', locDisplay: 'Bloomington'},
	        {locId: '200000037', locValue: 'Eden Prairie', locType: 'city', locDisplay: 'Eden Prairie'},
	        {locId: '200000021', locValue: 'New York', locType: 'state', locDisplay: 'New York'},
	        {locId: '200000038', locValue: 'Albany', locType: 'city', locDisplay: 'Albany'},
	        {locId: '200000027', locValue: 'Texas', locType: 'state', locDisplay: 'Texas'},
	        {locId: '200000043', locValue: 'Dallas', locType: 'city', locDisplay: 'Dallas'},
	        {locId: '338160110982', locValue: 'Washington', locType: 'state', locDisplay: 'Washington'},
	        {locId: '338560110982', locValue: 'Seattle', locType: 'city', locDisplay: 'Seattle'},
	        {locId: '200000022', locValue: 'Wisconsin', locType: 'state', locDisplay: 'Wisconsin'},
	        {locId: '324160110982', locValue: 'Middleton', locType: 'city', locDisplay: 'Middleton'}],
    	
	        locationLookup : {},

    	init: function(wrapper, initData) {    		
    		var self = this;
            wrapper = $(wrapper);
                        
            var config = {
                wrapper: wrapper,
                initData: initData
            };

			var head= document.getElementsByTagName('head')[0];
			var script= document.createElement('script');
			script.type= 'text/javascript';
			script.src= 'http://www.google.com/jsapi';
			head.appendChild(script);
							
	        var selectString = "";	        	        
	        for (var i=0; i<self.locMapArray.length; i++) {
	            var e = self.locMapArray[i];
	            self.locationLookup[e.locId] = e;
	            var indentBy = "";
	            if (e.locType == "state") {
	                indentBy = "&nbsp;- ";
	            } else if (e.locType == "city") {
	                indentBy = "&nbsp;&nbsp;-- ";
	            }
	            selectString += "<option value=" + e.locId + ">" + indentBy + e.locDisplay + "</option>";
	        }
	        wrapper.find(".location-dropdown").append(selectString);
	        
	        wrapper.find(".location-dropdown").change( function() {            
	            var feedUrl = config.initData.rssFeed;
	            if (feedUrl.indexOf("location=") == -1) {
	            	feedUrl = feedUrl + "&location=-1";
	            }	        	
	            
	            feedUrl= feedUrl.replace(/(location=)[^\&]+/, '$1' + this.value);
	            config.initData.rssFeed = feedUrl;
	            self.onLoad(config);            
	        });				        
	        
	        google.load("feeds", "1");
	        
	        google.setOnLoadCallback(function() {
	            self.onLoad(config);
	        }); 
        },

        onLoad : function(config) {
        	var self = this;
            if (config.initData.isLocationSearch == "true") {
                config.wrapper.find(".location-dropdown-div").show();
            } 

            if (config.initData.displayViewAll == "true") {                
                config.wrapper.find(".view-all-div").show();                
            }
            
            var feed = new google.feeds.Feed(config.initData.rssFeed);  
            feed.setNumEntries(config.initData.numResults);  
            
            feed.load(function(result) {
            	self.feedLoaded(config, result);
            });            
        },
        
        feedLoaded : function(config, result) {            
        	var self = this;
            if (!result.error) {
            	config.wrapper.find(".job-content").html("");             
                var haveResults = true;  
                for (var i = 0; i < result.feed.entries.length; i++) {
                    var entry = result.feed.entries[i];
                    var div = document.createElement("div");                   
                                        
                    var link = entry.link;  
                    if (config.initData.useDefaultJobsLink != "true") {
                        if (i < 10) { //11th result is More Jobs link and we need Jibe Pretty Url if needed
                        	var jobCode = entry.link.replace(/^.*?job=/, "");
                        	link = config.initData.jobUrl + "/" + jobCode;         
                        } else {
							link = config.initData.jobUrl;
                        }
                    }

                    var categoryIndex = entry.title.indexOf(" [");
                    var title = entry.title;

                    if (categoryIndex > 0) {
                        title = entry.title.substring(0, categoryIndex);
                    }
                             
                    var toPrint = "";                                        
                    toPrint += "<div class='job-inner-class" + i + "'>";

                    if (title == "No Jobs Found") {
                        haveResults = false;
                        toPrint += "<span class='noResultMesg'>" + config.initData.noResultMesg + "</span>";
                    } else {
                    	if (config.initData.openJobLinksNewWindow == "true") {
                    		toPrint += "<span class='job-title'><a href='" + link + "' target='_blank'>" + title + "</a></span><br />";
                    	} else {
                    		toPrint += "<span class='job-title'><a href='" + link + "'>" + title + "</a></span><br />";
                    	}
    
                        if (config.initData.displayCategory == "true") {
                            var category = "";
                            for (var j = 0; j < entry.categories.length; j++) {
                                if (j > 0) {
                                    category += ", ";
                                }
                                category += entry.categories[j];
                            }
                            if (category.length > 0) {
                                toPrint += "<span class='job-category'> Category: " + category + "</span><br/>";      
                            }
                        }
                        
                        if (config.initData.displayPubDate == "true") {
                            var pubDate = entry.publishedDate.match(/^([a-zA-Z,]+\s+[0-9]+\s+[a-zA-Z]+\s+[0-9]{4})/); 
                            if (pubDate.length > 0) {
                                pubDate = pubDate[0];
                                toPrint += "<span class='job-publish-date'>" + pubDate + "</span><br/><br/>";
                            }   
                        }
                        
                        if (config.initData.displayDescription == "true") {
                            toPrint += "<span class='job-description'>" +entry.content + "</span><br/><br/>";
    
                        }
                        if (config.initData.openLearnMoreNewWindow == "true") {
                        	toPrint += "<span class='job-learn-more'><a href='" + link + "' target='_blank'>" + config.initData.learnMoreLocalized + "</a></span>";
                        } else {
                        	toPrint += "<span class='job-learn-more'><a href='" + link + "'>" + config.initData.learnMoreLocalized + "</a></span>";
                        }
                    }
                    toPrint += "</div>";
                  
                    config.wrapper.find(".job-content").html(config.wrapper.find(".job-content").html() + toPrint);                    
                }
                
                if (config.initData.displayViewAll == "true" && haveResults == true) {                             
                    var viewAllUrl = result.feed.link;

                    if (config.initData.useDefaultJobsLink != "true") {      
                        viewAllUrl = config.initData.jobUrl;
                    }
                    if (config.initData.openViewAllNewWindow == "true") {
                    	var viewAllLink =   "<a href='" + viewAllUrl + "' target='_blank'>" + config.initData.viewAllLocalized + "</a>";
                    } else {
                    	var viewAllLink =   "<a href='" + viewAllUrl +"'>" + config.initData.viewAllLocalized + "</a>";
                    }
                    config.wrapper.find(".view-all-div").html(viewAllLink);             
                } else {
                	config.wrapper.find(".view-all-div").html("");
                }
            }            
        }
    };    	        
})(jQuery);

(function($) {

    ATVI.components.selectbox = {
            registry: {},
            
            init: function($container, data) {
                var context = {};
                context.container = $container = $($container);
                ATVI.utils.uniqueId($container);
                this.registry[$container[0].id] = context;

                /*var that = this;
                context.filter = function(filterFunc) {
                    that.filter(this, filterFunc);
                 };*/

                //this.showPane(context, 0);

                if(data.enableButton) {

                	this.initSelectbox(context);
                	this.initButton(context);

                }

                if(data.resize != 0) {

					this.resize(context, data);

                }

            },



            initSelectbox: function(context) {

                context.container.find(".sbHolder .sbOptions li a").click(function(e) {

					e.preventDefault();

                    var link = $(this).attr("rel");

                    if(link == "none") {

                    	context.container.find(".select-button a").attr("href", "");

                    } else {

						context.container.find(".select-button a").attr("href", link);

                    }

                });

            },

            initButton: function(context) {

                context.container.find(".select-button a").click(function(e) {

					var link = $(this).attr("href");

                    if(!link || link == "#") {

						e.preventDefault();

                    }

                });
    
            },

            resize: function(context, data) {
		
                var windowWidth = $(window).width();
                
                var selectboxWrapper = context.container;
                var targetWidthSize = data.resize;
                
                var checkSelexboxMode = function(width) {
                    
                    if(width <= targetWidthSize)
                        selectboxWrapper.addClass("responsive");
                    else 
                        if(selectboxWrapper.hasClass("responsive")) selectboxWrapper.removeClass("responsive");
                    
                };
                
                checkSelexboxMode(windowWidth);
                
                $(window).resize(function() {

                    windowWidth = window.innerWidth;
                    
                    checkSelexboxMode(windowWidth);
                    
                });
                
            }


    };

})(jQuery);
(function($) {
    ATVI.components.countdownClock = {
                	        
    	init: function(wrapper, initData) {    	    		
    		var self = this;
    		var notZero = true;
            wrapper = $(wrapper);

            wrapper.find(".time-reached-message").hide();
            wrapper.find(".countdown-clock").show();  
                        
			var target_date = new Date(initData.year, initData.month, initData.day, initData.hour, initData.minute);
			
			var days, hours, minutes, seconds;

			if (notZero) {
				setInterval(function () {

				    // find the amount of "seconds" between now and target
				    var current_date = new Date().getTime();
				    var seconds_left = (target_date - current_date) / 1000;
				 
				    // do some time calculations
				    days = parseInt(seconds_left / 86400);
				    if (days < 10) days = "0" + days;
				    
				    seconds_left = seconds_left % 86400;
				    hours = parseInt(seconds_left / 3600);
				    if (hours < 10) hours = "0" + hours;
				    
				    seconds_left = seconds_left % 3600;
				     
				    minutes = parseInt(seconds_left / 60);
				    if (minutes < 10) minutes = "0" + minutes;
				    
				    seconds = parseInt(seconds_left % 60);
				    if (seconds < 10) seconds = "0" + seconds;
				     			    
				    // if reached zero
				    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
				    	notZero = false;
				    	self.reachedZero(wrapper);
				    } else {			   
					    wrapper.find(".countdown-day").html(days);
					    wrapper.find(".countdown-hour").html(hours);
					    wrapper.find(".countdown-minute").html(minutes);
					    wrapper.find(".countdown-second").html(seconds);
				    }
				 
				}, 1000);
			}

        },

        reachedZero: function(wrapper) {
        	wrapper.find(".time-reached-message").show();
        	wrapper.find(".countdown-clock").hide();
        	
        }
    };    	        
})(jQuery);

(function($) {
    ATVI.components.audio = {
                	        
    	init: function(wrapper, initData) {    	    		
    		var self = this;
            wrapper = $(wrapper);

			var enableAudioButton = initData.enableAudioButton;
            var enableAudioImage = initData.enableAudioImage; 
			var triggerType = initData.trigger;

            if(enableAudioButton || (enableAudioButton && enableAudioImage)) {

				var button = wrapper.find(".audio-button");
                var audio = wrapper.find("audio")[0];

                if(triggerType == "click") {

                    button.click(function() {

                        audio.play();

                    });

                } else {


                    $(document).ready(function() {

                        button.hover(function(){
            
                            audio.play();
        
                        }, function() {
                
                            audio.load();
        
                        });
        
                    });

                }

            } else if (enableAudioImage) {

                var button = wrapper.find(".audio-image");
                var audio = wrapper.find("audio")[0];

                if(triggerType == "click") {

                    button.click(function() {

                        audio.play();

                    });

                } else {


                    $(document).ready(function() {

                        button.hover(function(){
            
                            audio.play();
        
                        }, function() {
                
                            audio.load();
        
                        });
        
                    });

                }

            }
        }
    };    	        
})(jQuery);

(function($) {
	


    ATVI.components.parallax = {


            init: function($container, data) {

				var that = this;
				
				data.curSlide = 0;
				data.animationActive = false;
				
				that.initSliderDimensions($container, data);

                that.preloadImages($container);
				
				$container.find(".fs_loader").fadeOut(1500, function() {
					
					that.initParallaxSlider($container, data);
					that.initNavigation($container, data);
					that.initPagination($container, data);
                    that.resizeFont($container, data);
					that.resize($container, data);
					$container.find(".fs_loader").remove();
					
				});

            },

            preloadImages: function($container) {

                var i;
                var preloadContainer = $("<div>").css("width", 0).css("height", 0).css("display", "block").css("overflow", "hidden").css("position", "inline");
                $container.append(preloadContainer);
                $container.find("img").each(function(){
					var imagesrc = $(this).attr("src");
                    var img = $("<img>");
                    img.attr("src", imagesrc);
                    img.appendTo(preloadContainer);
                });

            },

            initParallaxSlider: function($container, data) {

				var that = this;

				//This code runs the first time the page is loaded and will designate the first .slide child as the current slide
				var $newSlide = $container.find(".slide:eq(" + data.curSlide + ")");
				
				$newSlide.addClass("new-active");

                this.showPane($container, $newSlide, data, "righttoleft");
				
				//If autoplay, init pause rotation behavior  
				if(data.autoPlay) {
				
					that.pauseRotation($container, data);
					
				}
				

            },

			showPane: function($container, $newSlide, data, movement) {
				
				var that = this;

                //If data.animationActive is false and container does not have class "animating" ...
				//This is checked to make sure we are not already in the middle of an animation. Animation has to finish first before we continue.
				if(!data.animationActive && !$container.hasClass("animating")) {
					
					//Animation will begin
					data.animationActive = true;
					$container.addClass("animating");

					//Get Active slide
					var $activeSlide = $container.find(".active");
					
					//Get newslide info
					var newslide = that.getSlideInfo($newSlide, data);

					//Get activeslide info
					var activeslide = that.getSlideInfo($activeSlide, data);
					
					//Readjust pagination active class based on the index of the new  slide
					var newSlideIndex = $newSlide.index();
					that.readjustPagination($container, data, newSlideIndex);

					//Determine left css based on movement
					var leftEndPosition;
					var leftStartPosition;
                    var rightEndPosition;
                    var rightStartPosition;

                    //Position for slides
					if(movement == "righttoleft") {
						
						leftStartPosition = "100%";
						leftEndPosition = "-100%";
                        rightStartPosition = "-100%";
                        rightEndPosition = "100%";

					} else if(movement == "lefttoright") {
						
						leftStartPosition = "-100%";
						leftEndPosition = "100%";
						rightStartPosition = "100%";
                        rightEndPosition = "-100%";
					}
					
					//Position all direct children inside slide
					$newSlide.children().each(function(index) {

                        //If position left chosen
                        if(newslide[index].left != "auto") {

                            //All non fixed elements should be 100% left of slide container
                            $(this).css({
                                position: 'absolute',
                                top: newslide[index].top + "%",
                                left: leftStartPosition
                            });
                            
                            //All fixed elements should be inside slide container
                            if(newslide[index].fix == "on") {
                                $(this).css("left", newslide[index].left + "%");	
                            }

                        //If position right chosen
                        } else if(newslide[index].right != "auto") {

							//All non fixed elements should be 100% right of slide container
                            $(this).css({
                                position: 'absolute',
                                top: newslide[index].top + "%",
                                right: rightStartPosition
                            });
                            
                            //All fixed elements should be inside slide container
                            if(newslide[index].fix == "on") {
                                $(this).css("right", newslide[index].right + "%");	
                            }

                        }

					});
	
					//Animate current slide in viewport to the left
					if($activeSlide.length) {
						
						$activeSlide.animate({
							
							left: leftEndPosition
							
						}, data.slideSpeed, "easeOutExpo", function() {
							
							$activeSlide.css("left","100%").hide();

							$activeSlide.removeClass("active");
							
						});

						//Get each direct child of active slide and animate them with a 30% delay in time for parallax effect
						var activeSlideChildren = $activeSlide.children();
						
						$activeSlide.children().each(function(index) {
							
							if(activeslide[index].fix == "off") {

                                //If position left chosen
                                if(activeslide[index].left != "auto") {
									
									$(this).delay(data.slideSpeed).animate({
										
										left: leftEndPosition
										
									}, 1500, "easeOutExpo");

                                //If position right chosen
                                } else if (activeslide[index].right != "auto") {

									$(this).delay(data.slideSpeed).animate({
										
										right: rightEndPosition
										
									}, 1500, "easeOutExpo");

                                }
							}

						});
	
					}
					
					//Display slide and animate it into view
					$newSlide.css("left", leftStartPosition).show();
				
					$newSlide.animate({
						
						left: "0px"
						
					}, data.slideSpeed, "easeOutExpo", function() {
						
						//newDone()
						$newSlide.removeClass("new-active").addClass("active");
						
					});
					
					//Get each direct child and animate them with a 30% delay in time for parallax effect
					var newSlideChildren = $newSlide.children();
					
					data.longestSlideTime = 0;

					//Once last element animates in, set data.animationActive to false and remove "animating" class to indicate animation is over
                    //Is helps lock the pagination bullets and navigation arrows from being clicked during animation.
                    //Once data.animation is set to false, and "animating" class is removed from main container, the nav arrows and pagination bullets are enabled again to be clicked.
					function animationFinish() {
						
						setTimeout(function(){
							data.animationActive = false;
							$container.removeClass("animating");
						}, 1000);

                        that.resizeFont($container, data);
						
					}
					
					$newSlide.children().each(function(index) {
						
						//Add speed in time plus delay time
						var slideTime = newslide[index].elDelay + newslide[index].elSpeedIn;
						
						if(slideTime > data.longestSlideTime) {
						
							data.longestSlideTime = slideTime;
							
						}
						
						if(newslide[index].fix == "off") {

                            //If we are on the last child being animated, call the animationFinish function
							if(index == ($newSlide.children().length - 1)) {

                                //If position left chosen
                                if(newslide[index].left != "auto") {

									$(this).delay(newslide[index].elDelay).animate({
										
										left: newslide[index].left + "%"
										
									}, newslide[index].elSpeedIn, "easeOutExpo", function() {
										
										animationFinish();
										
									});

                                //If position right chosen
                                } else if (newslide[index].right != "auto") {
									
									$(this).delay(newslide[index].elDelay).animate({
										
										right: newslide[index].right + "%"
										
									}, newslide[index].elSpeedIn, "easeOutExpo", function() {
										
										animationFinish();
										
									});

                                }
								

							//If we are not on the last child, do not call the animationFinish function
							} else {

                                //If position left chosen
                                if(newslide[index].left != "auto") {

									$(this).delay(newslide[index].elDelay).animate({
										
										left: newslide[index].left + "%"
										
									}, newslide[index].elSpeedIn, "easeOutExpo");

                               	//If position right chosen
                                } else if (newslide[index].right != "auto") {

                                    $(this).delay(newslide[index].elDelay).animate({
										
										right: newslide[index].right + "%"
										
									}, newslide[index].elSpeedIn, "easeOutExpo");

                                }

							}
							
						}
						
						
					});
					
					if(data.autoPlay) {
									
						data.rotateTimer = setTimeout(function() {that.initRotation($container, data);}, (data.autoPlay + data.longestSlideTime));
							
					}
					
				
				}
				
			},

            initSliderDimensions: function($container, data) {

				var sliderWidth = $container.width();
				var sliderHeight = (sliderWidth * data.height) / data.width;

				$container.height(sliderHeight);

            },
			
			initNavigation: function($container, data) {
				
				that = this;
				
				if(!data.navigation) {
					
					$container.parent().find(".p-nav-arrows").hide();
					
				}
				
				$container.parent().find(".p-nav-next").click(function(){
					
					data.autoPlay = 0;
					clearTimeout(data.rotateTimer);
					that.showNextPane($container, data);
					
				});
				
				$container.parent().find(".p-nav-prev").click(function(){
					
					data.autoPlay = 0;
					clearTimeout(data.rotateTimer);
					that.showPrevPane($container, data);
					
				});
				
			},
			
			showNextPane: function($container, data) {
				
				var that = this;
				
				var $activeSlide = $container.find(".slide.active");
				var activeSlideIndex = $activeSlide.index(".slide");
				var $newSlide;
				
				if(activeSlideIndex >= (that.getNumSlides($container) - 1)) {
					
					$newSlide = $container.find(".slide:eq(0)");
					
				} else {
					
					$newSlide = $activeSlide.next();

				}

				that.showPane($container, $newSlide, data, "righttoleft");
				
				
				
			},
			
			showPrevPane: function($container, data) {
				
				var $activeSlide = $container.find(".slide.active");
				var activeSlideIndex = $activeSlide.index(".slide");
				var $newSlide;
				
				if(activeSlideIndex == 0) {
					
					$newSlide = $container.find(".slide:eq(" + (that.getNumSlides($container) - 1) + ")");
					
				} else {
					
					$newSlide = $activeSlide.prev();
					
				}
				
				that.showPane($container, $newSlide, data, "lefttoright");
				
			},
			
			initPagination: function($container, data) {

                var that = this;
				
				//If data.pagination is false, then hide pagination
				if(!data.pagination) {
					
					$container.parent().find(".p-pagination").hide();
					
				}

                //Insert pagination bullets
                var numSlides = that.getNumSlides($container);

				for(var i = 0; i < numSlides; i++) {
				
					$container.parent().find(".p-pagination ul").append("<li>" + (i + 1) + "</li>");
					
				}

                //Add active class to first bullet
                var paginationContainer = $container.parent().find(".p-pagination");

                paginationContainer.find("ul li:first-child").addClass("active");

                //Add click handlers
                paginationContainer.find("ul li").click(function() {

                    //If carousel is not in the middle of animating
					if(!$container.hasClass("animating")) {
						
						//Get bullet index
						var newBulletIndex = $(this).index();
	
						//Get current index
						var curBulletIndex = paginationContainer.find("ul li.active").index();
	
						//If we dont click on the active bullet
						if(curBulletIndex != newBulletIndex) {
	
							//Get slide based on that bullet index
							var $newSlide = $container.find(".slide:eq(" + newBulletIndex + ")");
		
							//Remove active class on all li tags and add it to the one that was clicked
							paginationContainer.find("ul li").removeClass("active");
							$(this).addClass("active");
	
							//Execute show pane with new slide and turn off autoplay
							data.autoPlay = 0;
							clearTimeout(data.rotateTimer);
							
							//Determine if the slide will go from left to right or vise versa
							if(newBulletIndex > curBulletIndex) {
								that.showPane($container, $newSlide, data, "righttoleft");
							} else {
								that.showPane($container, $newSlide, data, "lefttoright");	
							}
	
						}
					
					}

                });
				
			},
			
			readjustPagination: function($container, data, index) {
				
				$container.parent().find(".p-pagination ul li").removeClass("active");
				$container.parent().find(".p-pagination ul li:eq(" + index + ")").addClass("active");
				
			},
			
			initRotation: function($container, data) {
				
				this.showNextPane($container, data);
				
			},
			
			pauseRotation: function($container, data) {
				
				var that = this;

				$container.hover(function() {
					
					//Stop autoplay
					clearTimeout(data.rotateTimer);
					
				}, function() {
					
					//Hit the next button after a delay if autoplay is not 0
					
					if(data.autoPlay) {
						
						data.rotateTimer = setTimeout(function() {that.initRotation($container, data);}, (data.autoPlay + data.longestSlideTime));
						
					}
					
				});
				
			},

        	getNumSlides:function($container) {

                var numSlides = $container.find(".slide").length;

				return numSlides;

        	},
			
			getSlideInfo: function($slide, data) {
				
				var slideData = {};
				
				var slideChildren = $slide.children();
				
				slideChildren.each(function(index) {
					
					slideData[index] = {};
					
					var positionLeft = $(this).data("positionleft");
                    var positionRight = $(this).data("positionright");
					var fix = $(this).data("fix");
					var elSpeedIn = $(this).data("speed-in");
					var elDelay = $(this).data("delay");

					var top;
                    var left;
                    var right;
                    var newTop;
                    var newLeft;
                    var newRight;

                    if(positionLeft.length) {
                    	var positionLeftSplit = positionLeft.split(",");
                        top = parseInt(positionLeftSplit[0]); //First value in pair is for top value
						left = parseInt(positionLeftSplit[1]); //Second value in pair is for left value
						newLeft = (left/data.width * 100).toString();
                        newTop = (top/data.height * 100).toString();
                        slideData[index].left = newLeft;
                        slideData[index].right = "auto";
                    } else {
						var positionRightSplit = positionRight.split(",");
                        top = parseInt(positionRightSplit[0]); //First value in pair is for top value
						right = parseInt(positionRightSplit[1]); //Second value in pair is for left value
						newRight = (right/data.width * 100).toString();
                        newTop = (top/data.height * 100).toString();
                        slideData[index].right = newRight;
                        slideData[index].left = "auto";
                    }
					
					slideData[index].top = newTop;
					slideData[index].fix = fix;
					slideData[index].elSpeedIn = elSpeedIn;
					slideData[index].elDelay = elDelay;
					
				});
				
				return slideData;
				
			},

        	initTouchWipe: function($container, data) {

				//Initiate touchwipe for mobile mode
                $container.touchwipe({
                     wipeLeft: function() { $container.parent().find(".p-nav-next").trigger("click"); },
                     wipeRight: function() { $container.parent().find(".p-nav-prev").trigger("click"); },
                     preventDefaultEvents: false
                });

        	},

            resizeFont:function($container, data) {

				var value = null, n = null, objs = $container.children('.slide').find("> div");

                objs.each(function() {

                    obj = $(this);

                    var value = obj.data("fontsize");
    

                    n = pixelToPercent(value, data.height) * ($container.height() / 100);
                    obj.css("font-size", n + "px");


                });

                function pixelToPercent(value, d) {
                    return value / (d / 100);
                }

            },

        	resize: function($container, data) {
				
				var that = this;
		
                $(window).resize(function() {
                                        
					that.initSliderDimensions($container, data);
                    that.resizeFont($container, data);

                });
                
            }
    };

})(jQuery);

(function($) {

    ATVI.components.mediacarousel = {
            registry: {},

            init: function($container, data, ageGateConfig) {
                
				var that = this;
				
				var context = {};
                context.container = $container = $($container);
                ATVI.utils.uniqueId($container);
                this.registry[$container[0].id] = context;

				//Context properties
                context.items = data.items;
				context.numThumbsAtATime = data.numThumbsAtATime;
				context.numThumbs        = data.numThumbs;
				context.numThumbsMargin  = data.numThumbsMargin;
				context.asManyThumbs     = data.asManyThumbs;
				context.manyThumbsWidth  = data.manyThumbsWidth;
				context.manyThumbsMargin = data.manyThumbsMargin;
				
				context.width = data.width;
				context.height = data.height;
				context.transitiontype = data.transitiontype;
				context.autoplay = data.autoplay;
				context.slidespeed = data.slidespeed;
                context.pauseonhover = data.pauseonhover;
				context.navigation = data.navigation;
				context.thumbnailnavigation = data.thumbnailnavigation;
				context.pagination = data.pagination;
				context.thumbnails = data.thumbnails;
				context.counter = data.counter;
				context.bpnavigation = data.bpnavigation;
				context.bpthumbnailnavigation = data.bpthumbnailnavigation;
				context.bppagination = data.bppagination;
				context.bpthumbnails = data.bpthumbnails;
				context.bpcounter = data.bpcounter;
				context.videoRatio = data.videoRatio;
				context.resizeWidth = data.resizeWidth;
                context.videoautoplay = data.videoautoplay;
				context.pietimer = data.pietimer;
				context.posterImage = data.posterImage;
                context.enableLightbox = data.enableLightbox;
				
				context.ageGateId = ageGateConfig.ageGateWrapper;
				context.ageGateIdName = ageGateConfig.ageGateId;
				context.ageGateClasses = ageGateConfig.ageGateClasses;
				context.enterDobString = ageGateConfig.enterDobString;
				context.invalidDateMsg = ageGateConfig.invalidDateMsg;
				context.ageFailureMsg = ageGateConfig.ageFailureMsg;
				context.submitText = ageGateConfig.submitText;
				context.minimumAge = ageGateConfig.minimumAge;

				context.carouselContainer = $container.find(".media-carousel-container");
				context.innerCarouselContainer = context.carouselContainer.find(".media-carousel-inner-container");
                context.thumbnailContainer = $container.find(".media-carousel-thumbnails-container");
				context.thumbnailList = $container.find(".media-carousel-thumbnails .media-carousel-thumbnails-list");
                context.thumbnailItem = $container.find(".media-carousel-thumbnails .media-carousel-thumbnails-list li");
				context.paginationList = $container.find(".media-carousel-pagination");
				context.paginationItem = $container.find(".media-carousel-pagination li");
				context.mediaCarouselNav = $container.find(".media-carousel-nav");
				context.mediaCarouselNavPrev = $container.find(".media-carousel-nav-prev");
				context.mediaCarouselNavNext = $container.find(".media-carousel-nav-next");
                context.mediaThumbnailNav = $container.find(".media-thumbnail-nav");
				context.mediaThumbnailNavPrev = $container.find(".media-thumbnail-nav-prev");
				context.mediaThumbnailNavNext = $container.find(".media-thumbnail-nav-next");
				context.mediaCarouselCounter = $container.find(".media-carousel-counter");
					
				//Initiate starter function
				this.initCarousel(context, ageGateConfig);
				
            },

            getContext: function($el) {
                return this.registry[$($el)[0].id];
            },

			initCarousel: function(context, ageGateConfig) {
				
				this.preloadImages(context);
				this.breakpoints(context);
				this.initAgeGatePreview(context, ageGateConfig);
				this.setupBgImages(context);
				this.initThumbnailContainer(context);
                this.initNav(context, ageGateConfig);
				this.initThumbnailBehavior(context, ageGateConfig);
				this.initCarouselDimensions(context);
				this.initTouchWipe(context);
                this.initLightbox(context);
				this.resize(context);

				//Preinit autoplay only if lightbox mode isn't enabled
                if(context.autoplay > 0 && !context.enableLightbox) this.setupAutoPlay(context);

				//Click on the first thumbnail to display
				context.container.find(".media-carousel-loader").fadeOut(1500, function() {
					
					//Click on the first thumbnail to display
					context.thumbnailList.find("li:first-child").click();
										
					context.container.find(".media-carousel-loader").remove();
					
				});
				
			},
			
			preloadImages: function(context) {
                var i;
                var preloadContainer = $("<div>").css("width", 0).css("height", 0).css("display", "block").css("overflow", "hidden").css("position", "inline");
                context.container.append(preloadContainer);
                for(i = 0; i < context.items.length; i++) {
                    var obj = context.items[i];
                    if(obj.mediaTypeVal == "ytvideo" && obj.ageGatePreviewVal) {
						var ageImage = $("<img>").attr("src", obj.ageGatePreviewVal);
                        obj.ageImage = ageImage;
                    }
                    if(obj.mediaTypeVal != "image") continue;
                    var image = $("<img>").attr("src", obj.mediaSourceVal);
                    obj.image = image;
                    preloadContainer.append(image);
                }   
            },
			
			breakpoints: function(context) {
    
                var windowWidth = window.innerWidth;
                    
                if(windowWidth > context.resizeWidth) {
                    
                    if(context.thumbnails) 
                        context.thumbnailList.show();
                    else
                        context.thumbnailList.hide();
                    
                    if(context.pagination) 
                        context.paginationList.show();
                    else
                        context.paginationList.hide();
                    
                    if(context.navigation) 
                        context.mediaCarouselNav.show();
                    else
                        context.mediaCarouselNav.hide();
                    
                    if(context.thumbnailnavigation) 
                        context.mediaThumbnailNav.show();
                    else
                        context.mediaThumbnailNav.hide();	
                    
                    if(context.counter) 
                        context.mediaCarouselCounter.show();
                    else
                        context.mediaCarouselCounter.hide();	
                    
                    
                } else {
                    
                    if(context.bpthumbnails) 
                        context.thumbnailList.show();
                    else
                        context.thumbnailList.hide();
                    
                    if(context.bppagination) 
                        context.paginationList.show();
                    else
                        context.paginationList.hide();
                    
                    if(context.bpnavigation) 
                        context.mediaCarouselNav.show();
                    else
                        context.mediaCarouselNav.hide();
                    
                    if(context.bpthumbnailnavigation) 
                        context.mediaThumbnailNav.show();
                    else
                        context.mediaThumbnailNav.hide();	
                    
                    if(context.bpcounter) 
                        context.mediaCarouselCounter.show();
                    else
                        context.mediaCarouselCounter.hide();	
                    
                }
    
            },
			
			initTouchWipe: function(context) {
				
				//Initiate touchwipe for mobile mode
                context.container.touchwipe({
                     wipeLeft: function() { context.mediaThumbnailNavNext.trigger("click"); },
                     wipeRight: function() { context.mediaThumbnailNavPrev.trigger("click"); },
                     preventDefaultEvents: false
                });
				
				
			},

        	setupAutoPlay: function(context) {

				if(context.autoplay) {

                    if(context.pauseonhover) {
						this.pauseAutoplayOnHover(context);
                    }
					
					this.autoplayHtml5Videos(context);

				}

        	},
			
			showPaneStepOne: function(context, index, ageGateConfig, movement) {
				
				var that = this;

				//If we are not in the middle of an animation, then continue with the code
				if(!context.innerCarouselContainer.hasClass("animate")) {
					
					//We are now in animation
					context.innerCarouselContainer.addClass("animate");
					
					//Add the active class to the new thumbnail clicked on and then add the active class to the associated pagination item
					context.thumbnailItem.add(context.paginationItem).each(function() {
					
						if($(this).attr("rel") == index) {
							$(this).addClass("active");
						} else {
							$(this).removeClass("active");	
						}
						
					});
					
					var obj = context.items[index];
					var $newSlide = that.getNewSlide(context, index);
					
					//Update counter
					that.initCounter(context, index);
					
					//Check media type!!!
					that.showPaneStepTwo(context, $newSlide, obj, movement, ageGateConfig);
					
				}
				
			},
			
			showPaneStepTwo: function(context, $newSlide, obj, movement, ageGateConfig) {
				
				var that = this;
				
				switch(obj.mediaTypeVal) {
				
					case "ytvideo":
					case "iframe":
					
						if(obj.ageGateVal) {
						
							//Check if agegate cookie exists
							var cookieAge = document.cookie.indexOf('agegate');
							
							//If user already passed age gate, hide preview image and just insert iframe
							if(cookieAge >= 0) {
								
								//If preview image is set, display it
								if(obj.ageGatePreviewVal) {
									$newSlide.find(".media-preview-image").show();
									$newSlide.find(".media-frame").hide();
									
								//If preview image isn't set, just embed iframe
								} else {
									that.insertIframe($newSlide, obj);	
								}
								
								that.showPaneStepThree(context, $newSlide, obj, movement);
								
							//If user hasn't passed age gate yet ...	
							} else {
								
								//If user provided an age gate poster image, show it and hide media frame
								if(obj.ageGatePreviewVal) {
									$newSlide.find(".media-preview-image").show();
									$newSlide.find(".media-frame").hide();
									
								//Else if no age gate poster image was provided, hide preview image and activate age gate
								} else {
									$newSlide.find(".media-preview-image").hide();
									that.initAgeGate(context, $newSlide, obj, ageGateConfig);
								}
								
								that.showPaneStepThree(context, $newSlide, obj, movement);
								
							}
							
						//If youtube slide does not have an age gate
						} else {
						
							//If a preview image was set, display it ...
							if(obj.ageGatePreviewVal) {
								$newSlide.find(".media-preview-image").show();
								$newSlide.find(".media-frame").hide();
								
							//Else if no preview image was set, insert iframe	
							} else {
								that.insertIframe($newSlide, obj);
							}
							
							that.showPaneStepThree(context, $newSlide, obj, movement);
							
						}	
					
						break;
						
					case "html5video":
					
						//See if we need to show image poster if we are on mobile
						that.setupVideoPlayback(context, $newSlide, obj, movement);
					
						break;

					default: 
						that.showPaneStepThree(context, $newSlide, obj, movement);
						break;
					
				}
				
			},
			
			showPaneStepThree: function(context, $newSlide, obj, movement) {
				
				var that = this;

				//Position for slides
				var leftStartPosition, leftEndPosition;
				
				if(movement == "righttoleft") {

					leftStartPosition = "100%";
					leftEndPosition = "-100%";

				} else if(movement == "lefttoright") {
					
					leftStartPosition = "-100%";
					leftEndPosition = "100%";

				}
				
				//Get Active slide
				var $activeSlide = that.getActiveSlide(context);
				
				//If active slide exists (only time it doesn't exist is on page load)
				if($activeSlide.length) {
					
					switch(context.transitiontype) {
					
						case "slide":
						
							$activeSlide.animate({
								left: leftEndPosition
							}, context.slidespeed, "easeOutExpo", function() {
								$activeSlide.css("left","100%").hide();
							});
							
							break;
							
						case "fade":
						
							$activeSlide.animate({
								opacity: 0
							}, context.slidespeed, "easeOutExpo", function() {
								$activeSlide.css("left","100%").hide();
							});
						
							break;
						
					}
					
				}
				
				//Display slide and animate it into view
				
				switch(context.transitiontype) {
					
					case "slide":
					
						$newSlide.css("left", leftStartPosition).show();
				
						$newSlide.animate({
							left: "0px"
						}, context.slidespeed, "easeOutExpo", function() {
							that.afterAnimation(context, $newSlide, $activeSlide);
						});
						
						break;
						
					case "fade":
					
						$newSlide.css("left", 0).css("opacity", 0).show();
				
						$newSlide.animate({
							opacity: 1
						}, context.slidespeed, "easeOutExpo", function() {
							that.afterAnimation(context, $newSlide, $activeSlide);
						});
					
						break;
					
				}
				
			},
			
			afterAnimation: function(context, $newSlide, $activeSlide) {
				
				var that = this;
				var type = $activeSlide.data("type");
				
				//Check what type of slide animated out to see if we need to stop any media from continuing to play
				switch(type) {
				
					case "ytvideo":
					case "iframe":
					
						//If there is a youtube video in the old slide that just animated off screen ...
						if($activeSlide.find(".media-frame iframe").length) {
						
							//Then remove it to stop any sound coming from any video or media. Hacky i know :P
							$activeSlide.find(".media-frame iframe").remove();
							
							//We'll reinsert the iframe when slide animates back into view
						
						//Else if there is an age gate still visible, then just remove it to make sure the media-frame is empty
						} else if($activeSlide.find(".media-frame .atvi-age-gate-container").length) {
							
							$activeSlide.find(".media-frame .atvi-age-gate-container").remove();
							
						}
					
						break;
						
						
					case "html5video":
					
						//If there is a video in the old slide that just animated off screen
						//Then pause the video from playing
						var videoPlayer = $activeSlide.find(".media-frame video")[0];
						videoPlayer.pause(); 
					
						break;	
					
				}
				
				//Clear autoplay after each animation and then restart it again to start a new timer
				if(context.autoplay) {
					that.clearAutoplay(context);
					that.initAutoplay(context);
				}
				
				//Now we declare the animation is finished and the user can now click on the thumbnails, pagination, or nav buttons again
				
				$activeSlide.removeClass("active");
				
				//End of new slide animation
				$newSlide.addClass("active");
				
				//Nav Controls and Thumbnails can now be used
				context.innerCarouselContainer.removeClass("animate");
				
			},
			
			initAgeGate: function(context, $newSlide, obj, ageGateConfig) {
				
				var that = this;
				
				$newSlide.find(".media-frame").show();
								
				var ageGateTemplate = '<div id="' + context.ageGateIdName + '" class="atvi-age-gate-container ' + context.ageGateClasses + '">';
				ageGateTemplate += '<form class="age-gate">';
				ageGateTemplate += '<div class="dob-prompt">';
				ageGateTemplate += '<h2>' + context.enterDobString + '</h2>';
				ageGateTemplate += '<fieldset id="dob-fields" class="clearfix">';
				ageGateTemplate += '<input type="text" id="age-gate-month" name="month" size="2" maxlength="2" required placeholder="MM">';
				ageGateTemplate += '<input type="text" id="age-gate-date" name="date" size="2" maxlength="2" required placeholder="DD">';
				ageGateTemplate += '<input type="text" id="age-gate-year" name="year" size="4" maxlength="4" required placeholder="YYYY">';
				ageGateTemplate += '<div id="invalid-date" class="error-message invalid-date-error-message"  hidden="hidden">';
				ageGateTemplate += context.invalidDateMsg;
				ageGateTemplate += '</div>';
				ageGateTemplate += '<div id="age-gate-failure" class="error-message age-gate-failure-error-message" style="display:none;">';
				ageGateTemplate += context.ageFailureMsg;
				ageGateTemplate += '</div>';
				ageGateTemplate += '<div id="age-gate-alternate-age-error" class="error-message age-gate-alternate-age-error" style="display:none;"></div>';
				ageGateTemplate += '</fieldset>'
				ageGateTemplate += '<input id="' + context.ageGateIdName + '-submit-button" type="submit" class="submit atvi-instrument atvi-instrument-video-agegate-submit-button" value="' + context.submitText + '" />';
				ageGateTemplate += '</div>';
				ageGateTemplate += '</form>';
				ageGateTemplate += '</div>';
				
				$newSlide.find(".media-frame").prepend(ageGateTemplate);
				
				that.resizeAgeGate(context, $newSlide);
								
				ageGateConfig.ageGateWrapper = $newSlide.find(".media-frame .atvi-age-gate-container");

				ATVI.components.agegate.init(function() {

					$newSlide.find(".media-frame .atvi-age-gate-container").remove();
					$newSlide.find(".media-frame").show();
					
					that.insertIframe($newSlide, obj);

				}, ageGateConfig);
				
			},
			
			initAgeGatePreview: function(context, ageGateConfig) {
				
				var that = this;
				
				context.innerCarouselContainer.find(".media-carousel-slide .media-preview-image").click(function() {
					
					$(this).hide();

					var idx = that.getCurIndex(context, "string");
					
					var obj = context.items[idx];
					
					var $newSlide = that.getNewSlide(context, idx);
					
					var cookieAge = document.cookie.indexOf('agegate');
					
					//If age gate was checked but user hasn't passed age gate yet, display age gate
					if(obj.ageGateVal && cookieAge < 0) {
						that.initAgeGate(context, $newSlide, obj, ageGateConfig);
						
					//Else just embed iframe
					} else {
						$newSlide.find(".media-frame").show();
						that.insertIframe($newSlide, obj);
					}
					
					
				});
				
			},
			
			initThumbnailContainer: function(context) {
								
				//Get width in percentage of an individual thumbnail
				var numWidth = (100 - (context.numThumbs-1)*(context.numThumbsMargin)) / context.numThumbs;
										
				//Apply calculated width and given margin to the thumbnails. Make first thumbnail in list a margin left of 0						
				context.thumbnailItem.css("width", numWidth + "%");
				context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
				context.thumbnailList.find("li:first-child").css("margin-left", "0px");
				
				context.thumbnailContainer.css("overflow", "hidden");

				//We will use padding bottom percentage to display the thumbnails instead of recalculating the height in pixels
				
				//Get a thumbnail's width
				var widthPx = (numWidth / 100) * context.thumbnailList.width();
				
				//Get the thumbnail's height based off the carousel dimensions the user provided, then using some cool alegbra to find the height
				var heightPx = (context.height * widthPx) / context.width;

				//Use the height in pixels and covert that into a height percentage and turn it into a string with the % at the end.
				var heightPer = ((heightPx / context.thumbnailContainer.width()) * 100).toString() + "%"; 
				
				context.thumbnailList.css("overflow", "hidden");
				context.thumbnailList.height(0);
				context.thumbnailList.css("padding-bottom", heightPer);

			},

			initNav: function(context, ageGateConfig) {

                var that = this;

				//if (context.numThumbsAtATime) {

					context.mediaThumbnailNavNext.add(context.mediaCarouselNavNext).click(function(e) {
						
						e.preventDefault();
						
						//Check if there are any thumbnails outside the thumbnail container
						if(context.numThumbs < context.items.length ) {

							//Move li elements around
							
							//Move first thumbnail to the end of list
							context.thumbnailList.find("li:first-child").appendTo(context.thumbnailList);
							
							//Recalculate margin for new first thumbnail
							context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
							context.thumbnailList.find("li:first-child").css("margin-left", "0px");
								
						}
						
						var curThumbIndex = that.getCurIndex(context, "int");
						var nextThumbIndex = curThumbIndex + 1;
						
						if(nextThumbIndex >= context.items.length) nextThumbIndex = 0;
						
						var newThumbIndex = nextThumbIndex.toString();
													
						that.showPaneStepOne(context, nextThumbIndex, ageGateConfig, "righttoleft");
						
					});
					
					context.mediaThumbnailNavPrev.add(context.mediaCarouselNavPrev).click(function(e) {
											
						e.preventDefault();
						
						//Check if there are any thumbnails outside the thumbnail
						if(context.numThumbs < context.items.length) {
						
							//Move li elements around
							
							//Move last thumbnail to the front of list
							context.thumbnailList.find("li:last-child").prependTo(context.thumbnailList);
							
							context.thumbnailItem.css("margin-left", context.numThumbsMargin + "%");
							context.thumbnailList.find("li:first-child").css("margin-left", "0px");
							
						} 
						
						//Get curThumbIndex
						var curThumbIndex = that.getCurIndex(context, "int");
						var nextThumbIndex = curThumbIndex - 1;
					
						if(nextThumbIndex < 0) nextThumbIndex = context.items.length - 1;
						
						var newThumbIndex = nextThumbIndex.toString();
						
						that.showPaneStepOne(context, newThumbIndex, ageGateConfig, "lefttoright");
												
					});
				
				//}

                //Carousel arrows functionality
				/*context.mediaCarouselNavNext.click(function(e) {
					
					context.mediaThumbnailNavNext.click();
					
				});
				
				context.mediaCarouselNavPrev.click(function(e) {
					
					context.mediaThumbnailNavPrev.click();
					
				});*/
		
				//Clear autoplay if enabled so that timer starts refreshed
				that.clearAutoplay(context);
				
			},
			
			initThumbnailBehavior: function(context, ageGateConfig) {
				
				var that = this;
				
				context.thumbnailItem.add(context.paginationItem).click(function(e) {
					
                    e.preventDefault();
					                    
					var curIndex;
					        
					if(context.thumbnailList.find("li.active").length <= 0) curIndex = 0;
					else curIndex = that.getCurIndex(context, "int");
															
					var newIndex = $(this).attr("rel");
					var newIntIndex = parseInt(newIndex);

					var movement = "righttoleft";
					
					//Clear autoplay if enabled so that timer starts refreshed
					that.clearAutoplay(context);
					
					//We make sure we dont make a comparison if the curIndex and newIntIndex equal each other
					//because that way this code will not execute if the user clicks on the active thumbnail/pagination item 
					
					//If an active slide already exists
					if(context.thumbnailList.find("li.active").length) {
						if(curIndex > newIntIndex) {
							movement = "lefttoright";
							that.showPaneStepOne(context, newIndex, ageGateConfig, movement);
						} else if(curIndex < newIntIndex){
							movement = "righttoleft";
							that.showPaneStepOne(context, newIndex, ageGateConfig, movement);
						}
						
					//Else if we are loading the page for the first time, there is no active slide so by default we animate the first slide from right to left
					} else {
						movement = "righttoleft";
						that.showPaneStepOne(context, newIndex, ageGateConfig, movement);	
					}
					
                });
				
			},
			
            insertIframe: function($newSlide, obj) {
				
				var that = this;
				
				//If the iframe has not already been embedded as the new slide is about to animate into view, embed iframe
				if(!$newSlide.find(".media-frame iframe").length) {
					
					var embedString;
					
					switch(obj.mediaTypeVal) {
					
						case "ytvideo":
							embedString = ATVI.utils.renderTemplate(that.ytTemplate, obj);
							break;
						case "iframe":
							embedString = ATVI.utils.renderTemplate(that.iframeTemplate, obj);
							break;
						
					}
									
					$newSlide.find(".media-frame").html(embedString);
				
				}
														
			},

			ytTemplate: "<iframe style='visibility:hidden;' onload='this.style.visibility = \"visible\";' width='100%' height='100%' src='http://www.youtube.com/embed/{{mediaSourceVal}}' frameborder='0' allowfullscreen></iframe>",

        	iframeTemplate: "<iframe style='visibility:hidden;' onload='this.style.visibility = \"visible\";' width='100%' height='100%' src='{{mediaSourceVal}}' scrolling='no' frameborder='0'></iframe>",

        	initCounter: function(context, index) {
				
				var counter = parseInt(index) + 1;
				var numSlides = context.items.length;
				
				if(counter <= 0) counter = numSlides;
				if(counter > numSlides) counter = 1;
				
				context.mediaCarouselCounter.html(counter.toString() + " / " + numSlides.toString());

			},

            setupBgImages: function(context) {

				setupBg("image");

				if(ATVI.device.isMobile.any()) {
				
					setupBg("html5video");
					
				}

				function setupBg(dataType) {
				
					var slide;
				
					if(dataType == "image") {
						
						slide = context.container.find(".media-carousel-slide[data-type!='html5video']");
							
					} else if (dataType == "html5video") {
						
						slide = context.container.find(".media-carousel-slide[data-type='html5video']");
						
					}
					
					slide.each(function() {
                    
						var img = $(this).find("img");
						var parent = img.parent();
						var imgsrc = img.attr("src");
						
						parent.css("background-image", "url(" + imgsrc + ")");
						parent.css("background-size", "cover");
						parent.css("background-position", "center center");
						parent.css("position", "relative");
						parent.css("display", "block");
						parent.css("height", "100%");
						
					});
					
				}
                
            },

			setupVideoPlayback: function(context, $newSlide, obj, movement) {
				
				var that = this; 
				
				//If mobile device...
				if($("body").hasClass("mobile-device")) {
					
					//If author enabled poster image for mobile devices
					if(context.posterImage) {
					
						//Hide video tag and display poster image
						$newSlide.find(".media-frame video").hide();
						$newSlide.find(".media-frame video")[0].load();
						//$newSlide.find(".media-frame .media-video-poster-image").show();
						
					//If author doesn't enable poster image for mobile devices, then html 5 video will load normal as in desktop.
					//But video won't automatically play.
					} else {
					
						$newSlide.find(".media-frame video").show();
						//$newSlide.find(".media-frame .media-video-poster-image").hide();
						playVideo();
						
					}
					
				//If desktop devices
				} else {
					
					$newSlide.find(".media-frame video").show();
					$newSlide.find(".media-frame .media-video-poster-image").hide();
					playVideo();
					
				}
				
				function playVideo() {
				
					var videoPlayer = $newSlide.find(".media-frame video")[0];

					videoPlayer.load();
								
					//If video autoplay is true, then play video
					if(context.videoautoplay) {
						
						videoPlayer.play();
						
						//If carousel autoplay is on, then clear it so that video can play without interruptions					
						if(context.autoplay) that.clearAutoplay(context);
						
					}
										
				}
				
				that.showPaneStepThree(context, $newSlide, obj, movement);
				
			},
			
			autoplayHtml5Videos: function(context) {
				
				var that = this;
					
				context.innerCarouselContainer.find(".media-carousel-slide").each(function() {
					
					//If there is a video tag in the slide
					if($(this).find(".media-frame video").length) {

						//Add an event listener to wait until video ends
						$(this).find(".media-frame video")[0].addEventListener('ended',function(e){

							//Go to next slide
							context.mediaThumbnailNavNext.click();
						
						});

						
					}
					
				});
				
			},
			
			initAutoplay: function(context) {
				
				var mediaAutoplay = setInterval(function() {
					
					context.mediaThumbnailNavNext.click();
					
				}, (context.autoplay + context.slidespeed));
				
				context.container.attr("data-timer-id", mediaAutoplay);
				
			},
			
			pauseAutoplayOnHover: function(context) {
				
				var that = this; 
				
				//Pause autoplay on hover
			 	context.innerCarouselContainer.hover(function() {
					
					that.clearAutoplay(context);
					
				}, function() {
					
					that.initAutoplay(context);
					
				});
				
			},

			
			clearAutoplay: function(context) {

				var timerId = parseInt(context.container.attr("data-timer-id"));
				clearInterval(timerId);
				
				context.container.attr("data-timer-id", "");
				
			},
			
			getNewSlide: function(context, index) {
				
				var $newSlide;
				
				context.innerCarouselContainer.find(".media-carousel-slide").each(function(idx) {
						
					if($(this).data("index") == index) {
						
						$newSlide = $(this);
						
					}

				});
				
				return $newSlide;
				
			},
			
			getActiveSlide: function(context) {
				
				var $activeSlide = context.innerCarouselContainer.find(".media-carousel-slide.active");
				
				return $activeSlide;
				
			},
			
			getCurIndex: function(context, type) {
				
				var idx = context.thumbnailList.find("li.active").attr("rel");
				var returnedIdx;
				
				switch(type) {
				
					case "string":
						returnedIdx = idx;
						break;
					
					case "int":
						returnedIdx = parseInt(idx);
						break;
						
					default:
						returnedIdx = idx;
					
				}
				
				return returnedIdx;
				
			},
			
			
			initCarouselDimensions: function(context) {

				var carouselWidth = context.carouselContainer.width();
				var carouselHeight = (carouselWidth * context.height) / context.width;

                var per = ((context.height / context.width) * 100).toString() + "%";

				context.innerCarouselContainer.height(0);
				context.innerCarouselContainer.css("padding-bottom", per);
				
            },

        	initLightbox: function(context) {

                if(context.enableLightbox) {

                    var carousel = context.container;
                    var dataname = carousel.data("name");
                    var overlayTarget = $(".atvi-media-carousel-overlay[data-name='" + dataname + "']");

                    //Insert media carousel its respective overlay (after close button div) only when in preview mode
                    if(ATVI.pageMode != "edit") {

                        overlayTarget.find(".atvi-media-carousel-close-button").after(carousel);
                            
                    }

                    //Click handlers for button label and thumbnail to launch lightbox 
                    var thumbTarget = $(".atvi-media-carousel-lb-thumb[data-name='" + dataname + "']");
                    var thumbImg = thumbTarget.find(".media-carousel-lb-thumb-image");
                    var thumbButton = thumbTarget.find(".media-carousel-lb-button");

                    thumbImg.add(thumbButton).click(function() {

                        overlayTarget.fadeIn();

                    });

                    //Click handlers to close overlay
                    overlayTarget.add(overlayTarget.find(".atvi-media-carousel-close-button")).click(function() {

						overlayTarget.fadeOut();

                    });
					
					overlayTarget.find(".atvi-media-carousel-inner-overlay").click(function(e) {
						e.preventDefault();
						e.stopImmediatePropagation();
					});

                    //Click handlers for nav
                    var overlayPrev = overlayTarget.find(".atvi-media-carousel-overlay-prev");
					var overlayNext = overlayTarget.find(".atvi-media-carousel-overlay-next");

                    overlayPrev.click(function(e) {

                        e.preventDefault();

                        overlayNavigation("prev", $(this));

                    });

                    overlayNext.click(function(e) {

                        e.preventDefault();

                        overlayNavigation("next", $(this));

                    });

                    function overlayNavigation(movement, $el) {

                        var overlayDataGroupArray = [];

						var curOverlayId = $el.closest(".atvi-media-carousel-overlay").attr("id");
                        var curDataGroup = $el.closest(".atvi-media-carousel-overlay").data("group");

						//Get all overlays with same group name
                        var overlays = $(".atvi-media-carousel-overlay[data-group='" + curDataGroup + "']");

                        overlays.each(function() {

							//Push each of those overlays into an array which can be obtained through an index
							overlayDataGroupArray.push($(this));

                        });

						$el.closest(".atvi-media-carousel-overlay").hide();

						//Go through each overlay ...
                        for(var i = 0; i < overlayDataGroupArray.length; i++) {

							//If the overlay has the right ID of the overlay we are currently on
                            if(overlayDataGroupArray[i].attr("id") == curOverlayId) {

								//Then we found our overlay index in the array list
								var curIndex = i;
								var nextIndex;

								//If we click the next button on our current overlay
                                if(movement == "next") {
                                	nextIndex = curIndex + 1;
                                	if(nextIndex >= overlayDataGroupArray.length) nextIndex = 0;
                                } else {
								//If we click the prev button on our current overlay
                                    nextIndex = curIndex - 1;
                                    if(nextIndex < 0) nextIndex = overlayDataGroupArray.length - 1;
                                }

								//Show the new overlay in the group array list
                                overlayDataGroupArray[nextIndex].show();

                            }

                        };

                    }

                }

        	},
			
			resizeAgeGate: function(context, $newSlide) {

				var ageGateHeight = $newSlide.find(".media-frame .age-gate").height();
				var ageGateTopMargin = ageGateHeight / 2;
				
				$newSlide.find(".media-frame .age-gate").css("margin-top", "-" + ageGateTopMargin + "px");
				
				function resizeAgeGate() {

					var ageGateHeight = $newSlide.find(".media-frame .age-gate").height();
					var ageGateTopMargin = ageGateHeight / 2;
				
					$newSlide.find(".media-frame .age-gate").css("margin-top", "-" + ageGateTopMargin + "px");

				}
				
				$(window).resize(function() {

					resizeAgeGate();
					
				});
				
			},
			
			resize: function(context) {
				
				var that = this;
		
                $(window).resize(function() {

                    that.breakpoints(context);
                    
                });
                
            },

    };

})(jQuery);