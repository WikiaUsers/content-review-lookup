/**
 * @name            ChatTags
 * @version         v2.7.0
 * @author          Maria Williams
 * @author          Dorumin
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA
 * @copyright       Maria Williams 2013-2017
 * @description     A BBCode parser for Fandom Chat
 **/
(function(window, document, $, mw){
    // If this is not a chat window, do not run
    if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") return;
    // The core configuration object
    const OPTIONS = Object.assign({}, window.ChatTagsOptions);
    // Determines whether the user should load the legacy script
    const LOAD_LEGACY = Boolean(OPTIONS.loadLegacy);
    if (LOAD_LEGACY) return importArticle({ 
        type: 'script', 
        article: 'u:dev:MediaWiki:ChatTags/code.js'
    });
    // The name of the script
    const NAME = "ChatTags";
    // The version of the script
    const VERSION = "v2.7.0";
    // Determines whether to debug the script
    const DEBUG = (mw.config.get("wgUserName") === "Ultimate Dark Carnage") || Boolean(OPTIONS.debug);
    // The default tag limit
    const TAG_LIMIT = 24;
    // The image cache object
    const IMG_CACHE = [];
    // The video cache object
    const VIDEO_CACHE = [];
    // The audio cache object
    const AUDIO_CACHE = [];
    // Canonical image extensions
    const IMG_EXT = Object.freeze(['jpe?g', 'jfif', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']);
    // Canonical audio extensions
    const AUDIO_EXT = Object.freeze(['mp3', 'ogg', 'wave?', 'aac']);
    // Canonical video extensions
    const VIDEO_EXT = Object.freeze(['mp4', 'wmv', '3gp', 'avi', 'flv', 'm4v', 'mp(?:e|eg|g)']);
    // Create the core ChatTags constructor
    function ChatTags(options){
        this.__addDefaultConfigurations(options);
        this.__name = NAME;
        this.__version = VERSION;
        this.__tagPattern = /\[([\S]+)(.*|)\](.*)\[\/\1\]/g;
        this.__tagVoidPattern = /\[([\S]+)(.*|)(?:\s+)?\/\]/g;
        this.__attrPatternSQ = /([^\s=]+)=(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
        this.__attrPatternDQ = /([^\s=]+)=(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
        this.__attrPatternN = /([^\s=]+)=([\S]*)/g;
        this.__imgExtPattern = new RegExp('\\.(' + IMG_EXT.join("|") + ')', 'g');
        this.__videoExtPattern = new RegExp('\\.(' + VIDEO_EXT.join("|") + ')', 'g');
        this.__audioExtPattern = new RegExp('\\.(' + AUDIO_EXT.join("|") + ')', 'g');
        this.allowImages = options.allowImages;
        this.allowVideos = options.allowVideos;
        this.allowAudio = options.allowAudio;
        this.taglimit = options.tagLimit;
        this.incInlineAlert = options.incInlineAlert;
        return this;
    }
    
    ChatTags.prototype.__defaults = {
        allowImages: false,
        allowVideos: false,
        allowAudio: false,
        incInlineAlert: true,
        tagLimit: {
            condition: function(value){
                return !isNaN(value) || isFinite(value);
            },
            value: TAG_LIMIT
        }
    };
    
    ChatTags.prototype.__isset = function(value){
        return typeof value !== "undefined" || value !== null || value !== "";
    };
    
    ChatTags.prototype.__addDefaultConfigurations = function(options){
        let O = Object.assign({}, options), R = {}, D, V, S, T;
        Object.keys(this.__defaults).forEach(function(K){
            V = this.__defaults[K];
            D = options[K];
            if (typeof V === "object"){
                let condition = V.condition;
                if (typeof condition === "function"){
                    S = condition.apply(this, D);
                    T = S ? D : V.value;
                } else T = this.__isset(D) ? D : V.value;
            } else T = this.__isset(D) ? D : V;
            R[K] = T;
        }, this);
        Object.assign(options, R);
    };
    
    ChatTags.prototype.__getElement = function(html){
        if (html === "") return null;
        let doc = document.implementation.createHTMLDocument("html");
        doc.body.innerHTML = html;
        return doc.body.children[0];
    };
    
    ChatTags.prototype.__tags = Object.assign({}, {
        b: { html: '<span class="bold"></span>' },
        background: {
            attrs: {
                color: function(elem, value){
                    elem.style.backgroundColor = value;
                },
                shadow: function(elem, value){
                    elem.style.boxShadow = value;
                },
                border: function(elem, value){
                    elem.style.border = value;
                }
            },
            noContent: true,
            process: function(target){ return target.parentNode; }
        },
        bg: {
            html: '<span class="background"></span>',
            attrs: {
                color: function(elem, value){
                    elem.style.backgroundColor = value;
                },
                padding: function(elem, value){
                    elem.style.padding = value;
                },
                shadow: function(elem, value){
                    elem.style.boxShadow = value;
                }
            }
        },
        big: { html: '<span class="big"></span>' },
        button: { html: '<span class="wds-button"></span>' },
        code: { html: '<code></code>' },
        font: {
            attrs: {
                face: function(elem, value){
                    elem.style.fontFamily = value;
                },
                color: function(elem, value){
                    elem.style.color = value;
                },
                shadow: function(elem, value){
                    elem.style.textShadow = value;
                }
            },
            noContent: true,
            process: function(target){ return target.parentNode; }
        },
        i: { html: '<span class="italic"></span>' },
        pre: { html: '<pre></pre>', esc: true },
        small: { html: '<span class="small"></span>' },
        sub: { html: '<sub></sub>' },
        sup: { html: '<sup></sup>' },
        text: {
            html: '<span class="font"></span>',
            attrs: {
                face: function(elem, value){
                    elem.style.fontFamily = value;
                },
                color: function(elem, value){
                    elem.style.color = value;
                },
                shadow: function(elem, value){
                    elem.style.textShadow = value;
                }
            }
        },
        yt: {
            condition: function(){ return this.allowVideos; },
            html: '<iframe class="youtube-frame" frameborder="0">',
            noContent: true,
            attrs: {
                height: {
                    __default: 315,
                    process: function(elem, obj){
                        elem.height = (!isNaN(obj.value) || isFinite(obj.value)) ? parseInt(obj.value, 10) : obj.__default;
                    }
                },
                width: {
                    __default: 420,
                    process: function(elem, obj){
                        elem.width = (!isNaN(obj.value) || isFinite(obj.value)) ? parseInt(obj.value, 10) : obj.__default;
                    }
                },
                src: function(elem, value){
                    let src = "https://www.youtube.com/embed/" + value;
                    elem.src = src;
                }
            }
        },
        img: {
            condition: function(){ return this.allowImages; },
            html: '<img class="chattags-image" />',
            noContent: true,
            attrs: {
                height: {
                    __default: 300,
                    process: function(elem, obj){
                        elem.height = (!isNaN(obj.value) || isFinite(obj.value)) ? parseInt(obj.value, 10) : obj.__default;
                    }
                },
                width: {
                    __default: 300,
                    process: function(elem, obj){
                        elem.width = (!isNaN(obj.value) || isFinite(obj.value)) ? parseInt(obj.value, 10) : obj.__default;
                    }
                },
                alt: function(elem, value){
                    elem.alt = value;
                },
                src: function(elem, value){
                    let ext = value.slice(value.lastIndexOf('.'));
                    if (!this.__imageExtPattern.test(ext)) elem.src = NO_IMAGE;
                    else elem.src = value;
                }
            }
        },
        table: {
            html: '<table class="chattags-table"></table>',
            attrs: {
                style: function(elem, value){
                    elem.style = value;
                }
            }
        },
        th: {
            html: '<th class="chattags-table-heading"></th>',
            attrs: {
                rowspan: function(elem, value){
                    elem.rowSpan = value;
                },
                colspan: function(elem, value){
                    elem.colSpan = value;
                }
            }
        },
        tr: {
            html: '<tr class="chattags-table-row"></tr>',
            attrs: {
                rowspan: function(elem, value){
                    elem.rowSpan = value;
                },
                colspan: function(elem, value){
                    elem.colSpan = value;
                }
            }
        },
        td: {
            html: '<td class="chattags-table-cell"></td>',
            attrs: {
                rowspan: function(elem, value){
                    elem.rowSpan = value;
                },
                colspan: function(elem, value){
                    elem.colSpan = value;
                }
            }
        }
    }, OPTIONS.tags);
    
    ChatTags.prototype.parseFromString = function(string, entry){
        let tagsc = string.match(this.__tagPattern),
            tagsv = string.match(this.__tagVoidPattern),
            tags = [].concat(tagsc, tagsv), result = "";
        if (DEBUG) console.log(string, [tagsc, tagsv], tags);
        if (tags.length === 0 || !tags) return string;
        tags = tags.slice(0, this.tagLimit);
        tags.forEach(function(tag){
            let content = this.parseTag(tag, entry);
            result = string.replace(tag, content);
            if (DEBUG) console.log(content, result);
        }, this);
        return result;
    };
    
    ChatTags.prototype.parseTag = function(tag, entry){
        let orig = tag, isVoid = this.__tagVoidPattern.test(tag),
            result = "", obj = {}, pattern1 = this.__tagPattern,
            pattern2 = this.__tagVoidPattern, exec;
        if (!isVoid){
            exec = (pattern1.exec(tag) || []).slice(1);
            obj.name = exec[0];
            obj.attrs = this.parseAttributes((exec[1] || "").trim());
            obj.content = (exec[2] || "").trim();
        } else {
            exec = (pattern2.exec(tag) || []).slice(1);
            obj.name = exec[0];
            obj.attrs = this.parseAttributes((exec[1] || "").trim());
        }
        obj.entry = entry;
        obj.isVoid = isVoid;
        if (DEBUG) console.log(obj);
        result = this.parseTagContent(obj, entry);
        return result;
    };
    
    ChatTags.prototype.parseTagContent = function(obj){
        let name = obj.name, attrs = Object.assign({}, obj.attrs);
        if (!this.__tags.hasOwnProperty(name)) return "";
        let tagObj = this.__tags[name], noContent = false, target;
        if (obj.isVoid) (DEBUG ? console.log(obj.isVoid, (target = obj.entry)) : null);
        else target = this.__getElement(tagObj.html || "");
        if (tagObj.hasOwnProperty('condition')){
            let condition = tagObj.condition;
            if (typeof condition === "function"){
                let C = condition.call(this, target);
                if (!Boolean(C)) return "";
            } else {
                if (!Boolean(condition)) return "";
            }
        }
        if (tagObj.hasOwnProperty('noContent')){
            noContent = Boolean(tagObj.noContent);
        }
        let curr;
        if (tagObj.hasOwnProperty('process')){
            curr = tagObj.process.call(this, target);
        } else curr = target;
        Object.keys(attrs).forEach(function(name){
            if (!tagObj.hasOwnProperty(name)) return;
            let value = attrs[name], attrSetter = tagObj.attrs[name];
            if (typeof attrSetter === "function"){
                attrSetter.call(this, curr, value);
            } else if (typeof attrSetter === "object"){
                let __default = attrSetter.__default,
                    process = attrSetter.process,
                    obj = { value: value };
                obj.__default = __default;
                process.call(this, curr, obj);
            }
        }, this);
        if (DEBUG) console.log(noContent ? "" : target.outerHTML);
        return noContent ? "" : 
            this.parseFromString(target.outerHTML, obj.entry);
    };
    
    ChatTags.prototype.parseAttributes = function(attr){
        if (attr === "") return {};
        let attrssq = attr.match(this.__attrPatternSQ),
            attrsdq = attr.match(this.__attrPatternDQ),
            attrs = [].concat(attrssq, attrsdq), obj = {};
        if (DEBUG) console.log(attr, [attrssq, attrsdq], attrs);
        obj = attrs.reduce(function(o, a){
            let name, value, exec;
            if (this.__attrPatternSQ.test(a)){
                exec = (this.__attrPatternSQ.exec(a) || []).slice(1);
                name = exec[0] || "";
                value = exec[1] || "";
            } else if (this.__attrPatternDQ.test(a)){
                exec = (this.__attrPatternDQ.exec(a) || []).slice(1);
                name = exec[0] || "";
                value = exec[1] || "";
            } else if (this.__attrPatternN.test(a)){
                exec = (this.__attrPatternN.exec(a) || []).slice(1);
                name = exec[0] || "";
                value = exec[1] || "";
            } else return o;
            o[name] = value;
            return o;
        }.bind(this), {});
        if (DEBUG) console.log(obj);
        return obj;
    };
    
    ChatTags.prototype.parseFromMessage = ChatTags.prototype.parseFromString;
    
    ChatTags.prototype.bind = function(fn){
        function init(model){
            return fn.call(this, model, true);
        }
        mainRoom.model.chats.models.forEach(init.bind(this));
        mainRoom.model.chats.bind('afteradd', fn.bind(this));
        Object.keys(mainRoom.chats.privates).forEach(function(roomId){
            let room = mainRoom.chats.privates[roomId];
            room.model.chats.models.forEach(init.bind(this));
            room.model.chats.bind('afteradd', fn.bind(this));
        }, this);
        function priv(user){
            let roomId = user.attributes.roomId,
                room = mainRoom.chats.privates[roomid];
            room.model.chats.models.forEach(init.bind(this));
            room.model.chats.bind('afteradd', fn.bind(this));
        }
        mainRoom.model.privateUsers.bind('add', priv.bind(this));
        return this;
    };
    
    ChatTags.prototype.sendMessage = function(model){
        if (DEBUG) console.log(model);
        let text = model.attributes.text,
            entryParent = document.getElementById('entry-' + model.cid),
            entry = entryParent.querySelector('.message'),
            parsed = this.parseFromMessage(text, entry),
            isInlineAlert = model.attributes.isInlineAlert;
        if (DEBUG) console.log(text, entry, parsed);
        if (!text || (isInlineAlert && !this.incInlineAlert)) return;
        $(entry).html(parsed);
    };
    
    ChatTags.prototype.init = function(){
        return this.bind(this.sendMessage);
    };
    
    if (window.ChatTagsLoaded || OPTIONS.disabled) return;
    window.ChatTags = ChatTags;
    window.ChatTagsController = new ChatTags(OPTIONS);
    window.ChatTagsController.init();
    window.ChatTagsLoaded = true;
}(window, document, this.jQuery, this.mediaWiki));