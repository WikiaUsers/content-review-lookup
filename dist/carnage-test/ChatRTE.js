(function(window, $, mw){
    if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") return;
    
    function a(){ return new Promise(function(r, j){ mainRoom.socket.bind("initial", r); }); }
    function b(){ return new Promise(function(r, j){ var i = null, d = 1000, t = 0; i = setInterval(function(){ if (mainRoom.isInitialized){ clearInterval(i); i = null; r(); } else t++; console.log(t); }, d); }); }
    
    var c = a(), d = b();
    
    Promise.race([c, d]).then(function(){
        function CRTE(){
            if (!(this instanceof CRTE)) return new CRTE();
            
            // Rich text editor options
            this.state = "";
            this.focused = false;
            this.delta = 0;
            this.charLimit = 1000;
            this.editable = false;
            this.addSendButton = false;
            this.buttons = [];
            
            // Rich text editor elements
            this.$wrapper = $("<section>", { "class": "crte-wrapper" });
            this.$container = $("<div>", { "class": "crte-container crte-content" }).prop("contenteditable", false);
            this.$toolbar = $("<nav>", { "class": "crte-toolbar" });
            
            return this;
        }
        
        function CRTEObserver(callback){
            if (typeof callback !== "function") throw new ReferenceError("The observer callback must be a function.");
            
            this._tracker = callback;
            this._tracked = [];
            this._queued = [];
            this._data = {};
            
            return this;
        }
        
        CRTEObserver._beginTracking = function(observer){
            (function track(){
                var records = observer.track();
                
                if (records.length){
                    observer._tracker(records, observer);
                }
                
                observer._timeout = setTimeout(track, CRTEObserver._delay);
            }).call(this);
        };
        
        CRTEObserver._delay = 100;
        
        CRTEObserver.prototype = {
            observe: function(target, config){
                var options = {
                    event: !!(config.event),
                    eventType: !!(config.eventType)
                };
                
                var tracked = this._tracked;
                
                for (var i = 0; i < tracked.length; i++){
                    if (tracked[i].target === target) tracked.splice(i, 1);
                }
                
                var $target = null, crte = null;
                
                if (options.event){
                    if (target instanceof CRTE){
                        crte = target;
                        $target = crte.$wrapper;
                    } else {
                        $target = $(target);
                        crte = CRTE.findByElement($target);
                    }
                    
                    if (!(this instanceof CRTE)) throw new ReferenceError("The target must be an instance of CRTE.");
                    
                    var trigger = $target.data("trigger");
                    
                    if (trigger !== config.event) return;
                    
                    $target.on(options.eventType ? config.eventType : "click", function(event){
                        event.preventDefault();
                        
                        crte.trigger(trigger);
                    });
                }
                
                tracked.push({
                    target: target,
                    instance: crte,
                    fn: CRTEObserver._search(target, crte, options)
                });
                
                if (!this._timeout){
                    CRTEObserver._beginTracking(this);
                }
            },
            track: function(){
                var records = [];
                
                var tracked = this._tracked;
                
                for (var i = 0; i < tracked.length; i++){
                    tracked[i].fn(records);
                }
                
                return records;
            }
        };
        
        CRTE.prototype.constructor = CRTE;
        
        CRTE.prototype.observe = function(name, options){};
    });
})(this === window ? this : window, jQuery, mediaWiki);