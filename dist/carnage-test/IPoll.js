require([
    "wikia.window",
    "jquery",
    "mw"
], function(window, $, mw){
    function IPoll($content, config){
        config = $.extend({}, config);
        if (!(this instanceof IPoll)) return new IPoll($content, config);
        this.$base = $content;
        this.$wrapper = null;
        
        this.pollLength = 0;
        this.currPoll = null;
        this.$currTarget = null;
        
        this.polls = {};
        this.cache = [];
        this.process(config);
        return this;
    }
    
    IPoll.prototype = {
        process: function(config){
            if ("wrapper" in config){
                this.$wrapper = this.$base.find(config.wrapper);
            } else {
                this.$wrapper = this.$base;
            }
            
            this.$polls = this.$wrapper.find(".ajax-poll");
            this.percentage = !!config.percentage || false;
            this.images = !!config.image || false;
            this.links = !!config.link || false;
            this.$polls.each(this.parsePolls.bind(this));
        },
        parsePolls: function(index, element){
            this.pollLength++;
            
            var $poll = $(element), pollId;
            
            pollId = $poll.attr("id").split("-")[2];
            
            this.polls[pollId] = {};
            this.polls[pollId].$deferred = $.Deferred();
            this.polls[pollId].$element = $poll;
            this.polls[pollId].index = index;
            this.cache.push(pollId);
            
            this.polls[pollId].items = [];
            this.polls[pollId].length = 0;
            
            var $pollItem = $(".pollAnswerName label", $poll);
            this.polls[pollId].total = $pollItem.length;
            this.polls[pollId].last = this.polls[pollId].total - 1;
            
            $pollItem.each(this.appendItems.bind(this, pollId));
            
            $.when(this.polls[pollId].$deferred).done(this.makeElement.bind(this, pollId));
            return this;
        },
        appendItems: function(pollId, index, element){
            var param = {}, $pollItem, $input, title, id, value, name;
            
            $pollItem = $(element);
            title = $pollItem.text().trim();
            
            param.$element = $pollItem;
            
            $input = $("input[type=radio]", $pollItem);
            id = $input.attr("id");
            value = $input.attr("value");
            name = $input.attr("name");
            
            param.id = id;
            param.value = value;
            param.title = title;
            param.name = name;
            
            this.polls[pollId].length = this.polls[pollId].items.push(param);
            if (index === this.polls[pollId].last) 
                this.polls[pollId].$deferred.resolve();
        },
        makeElement: function(pollId){
            this.polls[pollId].items.forEach(function(item, index){
                var $container = $("<" + this.images ? "figure" : "section" + ">", {
                    "class": "IPoll-container" + (this.images ? " IPoll-image_container" : ""),
                    "id": "IPoll-container__" + item.id
                });
                
                $container.data("pollId", pollId);
                
                item.pollId = pollId;
                item.index = index;
                
                var $opts = this.parseOptions(item);
                
                $.when($opts).done(this.processOptions.bind(this, $container));
            }, this);
        },
        processOptions: function($container, params){
            var allowImages = this.images && (params.imgsrc !== ""
                    || params.imgsrc !== void 0 || params.imgsrc !== null),
                allowLinks = this.links && (params.link !== "" 
                    || params.links !== void 0 || params.link !== null),
                $label = $("<" + this.images ? "figcaption" : "label" + ">", 
                    $.extend({}, this.images ? {
                        "class": "IPoll-label",
                        "id": "IPoll-label__" + params.id,
                        "for": "IPoll-input__" + params.id
                    } : {
                        "class": "IPoll-caption",
                        "id": "IPoll-caption__" + params.id,
                        "data-name": params.name,
                        "data-id": params.id,
                        "data-value": params.value
                    })
                ),
                $text = $("<" + (allowLinks) ? "a" : "span" + ">",
                    $.extend({ text: params.title }, allowLinks ? {
                        "href": params.link
                    } : {})
                ),
                $imgcontainer = $("<div>", {
                    "class": allowImages ? "IPoll-image__container" : "IPoll-container"
                }),
                $radio = $("<input>", $.extend({ 
                    "type": "radio",
                    "name": params.name,
                    "data-radio": params.id,
                    "value": params.value
                }, { 
                    "id": "IPoll-input__" + params.id,
                    "class": "IPoll-input"
                })).hide(),
                $image = $("<img>", {
                    "src": params.imgsrc,
                    "alt": params.title
                }),
                $content = [$radio, $image],
                $html = [];
            
            $imgcontainer.html($content);
            $label.html($text);
            
            $html.push($label);
            if (allowImages) $html.push($imgcontainer);
            
            $container.html($html);
            
            var pollId = params.pollId, index = params.index;
            
            params.$element.html($container);
            this.polls[pollId].items[index] = params;
        },
        parseOptions: function(item){
            var $deferred = $.Deferred(), params = {};
            
            var p = /\[\[([^\[\]]+)\]\]/g, t = item.title, ns, r, l, q, s, u;
            
            if (p.test(t)){
                if (this.links){
                    q = t.replace(p, "$1");
                    s = q.split("|");
                    ns = ((r = (s[0] || "").split(":")).length === 1 ? (r = [""].concat(r)) : r)[0];
                    u = r;
                
                    if (this.image){
                        u = u.slice(1);
                        if (ns === "File"){
                            params.hasimage = true;
                            if (s[1]) params.link = (s[1] || "link=").replace(/^link\=/, "");
                            else params.link = r.join(":");
                            params.imgpage = s[0];
                            params.link = mw.util.wikiGetLink(params.link);
                        } else {
                            params.hasimage = false;
                            params.link = r.join(":");
                            params.imgpage = "";
                            params.link = mw.util.wikiGetLink(params.link);
                        }
                    } else {
                        params.hasimage = false;
                        params.link = r.join(":");
                        params.imgpage = "";
                        params.link = mw.util.wikiGetLink(params.link);
                    }
                    
                    params.title = u.filter(function(n){
                        return n !== null || n !== void 0 || n !== "";
                    }).join(":");
                } else {
                    params.hasimage = false;
                    params.link = "";
                    params.imgpage = "";
                    params.title = t;
                }
            }
            
            params = $.extend(true, {}, item, params);
            
            if (params.imgpage !== "" && this.images){
                $.ajax({
                    url: mw.util.wikiScript("api"),
                    data: {
                        action: "query",
                        titles: params.imgpage,
                        prop: "imageinfo",
                        iiprop: "url",
                        format: "json"
                    }
                }).done((function(data){
                    var j; for (j in data.query.pages) break;
                    if (j === "-1") return $deferred.resolve(params);
                    var page = data.query.pages[j];
                    params.imgsrc = page.imageinfo[0].url;
                    
                    $deferred.resolve(params);
                }).bind(this));
            } else {
                $deferred.resolve(params);
            }
            
            return $deferred;
        },
        init: function(){
            $("input[type='radio']", this.$polls).on("change", this.initEventInput.bind(this));
            $(".IPoll-caption", this.$polls).on("click", this.initEventCaption.bind(this));
        },
        initEventCaption: function(event){
            this.$currTarget = $(event.target);
            this.currPoll = this.$currTarget.parents().find(".ajax-poll").get(0);
            this.$currTarget.parents(".IPoll-container").addClass("active");
            
            var pollId = this.$currTarget.parents("[data-pollId").data("pollId"),
                id = this.$currTarget.data("id"),
                value = this.$currTarget.data("value"),
                params = {};
            
            params.pollId = pollId;
            params.id = id;
            params.value = value;
            this.prepAjax(params);
        },
        initEventInput: function(event){
            this.$currTarget = $(event.target);
            this.currPoll = this.$currTarget.parents().find(".ajax-poll").get(0);
            
            this.$currTarget.parents(".IPoll-container").addClass("active");
            var pollId = this.$currTarget.parents("[data-pollId]").data("pollId"),
                id = this.$currTarget.data("radio"),
                value = this.$currTarget.attr("value"),
                params = {};
            
            params.pollId = pollId;
            params.id = id;
            params.value = value;
            
            this.prepAjax(params);
        },
        prepAjax: function(params){
            var ajaxParams = {},
                pollId = params.pollId,
                id = params.id,
                value = params.value;
            ajaxParams.action = "ajax";
            ajaxParams.rs = "axAjaxPollSubmit";
            ajaxParams.title = mw.config.get("wgPageName");
            ajaxParams.wpPollId = pollId;
            ajaxParams.wpVote = "Vote!";
            ajaxParams[id] = value;
            ajaxParams.format = "json";
            
            this.$ajaxComplete = $.Deferred();
            $.when(this.sendAjax(ajaxParams)).done(this.update.bind(this, this.currPoll));
            
            $.when(this.$ajaxComplete).done((function(){
                this.$currTarget = null;
                this.currPoll = null;
                this.$ajaxComplete = null;
            }).bind(this));
        },
        sendAjax: function(params){
            return $.ajax({
                method: "POST",
                url: mw.util.wikiScript("index"),
                dataType: "json",
                data: params
            });
        },
        update: function(data, currPoll){
            var total = data.total;
            
            $(".pollAnswerVotes", currPoll).each(this.count.bind(this, total, data));
            this.$ajaxComplete.resolve();
        },
        count: function(total, data, index, element){
            var $span = $("span", element), $bar = $("div", element),
                currValue = $span.attr("id").split("-")[1], value;
            
            if (typeof data.votes[currValue] !== "undefined"){
                var tkey, vkey, obj = data.votes[currValue];
                if (this.percentage){
                    vkey = "percent";
                    tkey = "value";
                } else {
                    vkey = "value";
                    tkey = "percent";
                }
                
                var v = vkey === "percent" ? obj[vkey] + "%" : obj[vkey],
                    t = tkey === "percent" ? obj[tkey] + "%" : obj[tkey],
                    p = obj.percent + "%";
                    
                $span.text(v).attr("title", t);
                $bar.css("width", p);
            } else {
                var _p = "0%", _v = "0", percentage = this.percentage;
                $span.text(percentage ? _p : _v).title(percentage ? _v : _p);
                $bar.css("width", _p);
            }
        }
    };
    
    mw.hook("wikipage.content").add(function($content){
        var IPollInstance = new IPoll($content, $.extend({}, window.IPollConfig));
        
        IPoll.init();
    });
    
    window.IPoll = IPoll;
});